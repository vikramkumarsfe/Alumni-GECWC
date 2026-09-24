const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const ts = require("typescript");

// Execute the production modules with database, session and email services stubbed.
function load(relative, mocks = {}) {
  const filename = path.resolve(__dirname, "..", relative);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const localRequire = createRequire(filename);
  const module = { exports: {} };
  const resolve = name => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name.startsWith("@/")) return load(`${name.slice(2)}.ts`, mocks);
    return localRequire(name);
  };
  new Function("require", "module", "exports", source)(resolve, module, module.exports);
  return module.exports;
}

const userId = "507f1f77bcf86cd799439011";
const user = {
  _id: userId,
  fullname: "Test Student",
  email: "student@example.test",
  password: "stored-password-hash",
  role: "student",
  isActive: "pending",
};

function rejectionHarness(options = {}) {
  const events = [];
  const target = Object.hasOwn(options, "user") ? options.user : user;
  const session = Object.hasOwn(options, "session") ? options.session : { user: { id: "admin-id", role: "admin" } };
  const route = load("app/api/admin/users/[id]/route.ts", {
    "@/app/api/auth/[...nextauth]/route": { authOptions: {} },
    "next-auth": { getServerSession: async () => session },
    "@/lib/mongodb": { connectDB: async () => {} },
    "@/models/academics.model": {},
    "@/models/experience.model": {},
    "@/models/user.model": {
      findById: async id => { events.push({ type: "lookup", id }); return target; },
      findByIdAndDelete: async id => { events.push({ type: "delete", id }); return target; },
    },
    "@/utils/send-mail": { sendMail: async mail => {
      events.push({ type: "email", mail });
      if (options.mailFailure) throw new Error("SMTP unavailable");
      return { accepted: [mail.sendTo] };
    } },
  });
  return {
    events,
    reject: (body = { remark: "Please correct your registration number." }, id = userId) => route.DELETE(
      new Request(`http://localhost/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: typeof body === "string" ? body : JSON.stringify(body),
      }),
      { params: Promise.resolve({ id }) }
    ),
  };
}

test("rejection requires an admin session before looking up or emailing the user", async () => {
  for (const [session, status] of [[null, 401], [{ user: { role: "student" } }, 403]]) {
    const harness = rejectionHarness({ session });
    assert.equal((await harness.reject()).status, status);
    assert.deepEqual(harness.events, []);
  }
});

test("rejection validates the ID and requires a nonblank remark of at most 2000 characters", async () => {
  const harness = rejectionHarness();
  for (const body of [null, {}, { remark: " \n " }, { remark: 123 }, { remark: "x".repeat(2001) }, "{invalid-json"]) {
    assert.equal((await harness.reject(body)).status, 400);
  }
  assert.equal((await harness.reject({ remark: "Reason" }, "bad-id")).status, 400);
  assert.deepEqual(harness.events, []);
});

test("missing users and admin accounts are never emailed or deleted", async () => {
  for (const [target, status] of [[null, 404], [{ ...user, role: "admin" }, 403]]) {
    const harness = rejectionHarness({ user: target });
    assert.equal((await harness.reject()).status, status);
    assert.deepEqual(harness.events.map(event => event.type), ["lookup"]);
  }
});

test("student and alumni rejection emails the saved address from the configured sender with the trimmed remark", async () => {
  for (const role of ["student", "alumni"]) {
    const harness = rejectionHarness({ user: { ...user, role } });
    const response = await harness.reject({
      remark: "  Registration number does not match.\nPlease contact the office.  ",
      email: "untrusted@example.test",
    });
    assert.equal(response.status, 200);
    assert.deepEqual(harness.events.map(event => event.type), ["lookup", "email", "delete"]);
    const mail = harness.events[1].mail;
    assert.equal(mail.sendTo, user.email);
    assert.equal(mail.email, `"Alumni Portal" <${process.env.SMTP_SERVER_USERNAME}>`);
    assert.match(mail.text, /Admin remark:\nRegistration number does not match.\nPlease contact the office./);
    assert.match(mail.html, /Registration number does not match.<br\/>Please contact the office./);
    assert.doesNotMatch(mail.text, /Reset your password/);
  }
});

test("SMTP failure preserves the account and returns a retryable error", async () => {
  const harness = rejectionHarness({ mailFailure: true });
  const response = await harness.reject();
  assert.equal(response.status, 502);
  assert.match((await response.json()).message, /account has not been rejected/);
  assert.deepEqual(harness.events.map(event => event.type), ["lookup", "email"]);
});

test("rejection email escapes user-supplied HTML and preserves multiline remarks", () => {
  const { accountRejectedTemplate } = load("utils/emailTemplates/accountRejected.mail.template.ts");
  const html = accountRejectedTemplate('<img src=x onerror="alert(1)">', 'Check <script>alert("x")</script> & details.\r\nSecond line.', "support@example.test");
  assert.doesNotMatch(html, /<img|<script/);
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; details.<br\/>Second line./);
  assert.match(html, /mailto:support@example.test/);
});

function authorizeHarness(target, validPassword = true) {
  const events = [];
  const { authOptions } = load("app/api/auth/[...nextauth]/route.ts", {
    "next-auth": () => () => {},
    "@/lib/mongodb": { connectDB: async () => { events.push("connect"); } },
    "@/models/user.model": { findOne: async () => { events.push("lookup"); return target; } },
    bcrypt: { compare: async (password, hash) => {
      events.push("password");
      assert.equal(password, "submitted-password");
      assert.equal(hash, user.password);
      return validPassword;
    } },
  });
  return { authorize: authOptions.providers[0].options.authorize, events };
}

const credentials = { email: user.email, password: "submitted-password" };
const { getLoginErrorMessage } = load("lib/auth-errors.ts");

test("missing, unknown and incorrect credentials fail without exposing account status", async () => {
  const missing = authorizeHarness(user);
  assert.equal(await missing.authorize(undefined), null);
  assert.equal(await missing.authorize({ email: user.email }), null);
  assert.deepEqual(missing.events, []);
  const unknown = authorizeHarness(null);
  assert.equal(await unknown.authorize(credentials), null);
  assert.deepEqual(unknown.events, ["connect", "lookup"]);
  for (const isActive of ["approved", "pending", "inactive"]) {
    assert.equal(await authorizeHarness({ ...user, isActive }, false).authorize(credentials), null);
  }
  assert.equal(getLoginErrorMessage("CredentialsSignin"), "Email or password is incorrect.");
});

test("correct credentials for pending or inactive accounts produce the separate inactive message", async () => {
  for (const isActive of ["pending", "inactive"]) {
    const harness = authorizeHarness({ ...user, isActive });
    await assert.rejects(() => harness.authorize(credentials), error => {
      assert.equal(error.message, "AccountInactive");
      assert.equal(getLoginErrorMessage(error.message), "Your account is not active. Please contact the admin.");
      return true;
    });
    assert.deepEqual(harness.events, ["connect", "lookup", "password"]);
  }
});

test("approved users can sign in and unexpected login errors use a generic message", async () => {
  const result = await authorizeHarness({ ...user, isActive: "approved" }).authorize(credentials);
  assert.equal(result.id, userId);
  assert.equal(result.email, user.email);
  assert.equal(result.role, "student");
  assert.equal(result.isActive, "approved");
  assert.equal(getLoginErrorMessage("Database error with private details"), "Unable to sign in. Please try again later.");
});
