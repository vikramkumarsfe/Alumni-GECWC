const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const ts = require("typescript");

// Compile the actual TypeScript modules, substituting only external services.
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
    if (name.startsWith(".") && !path.extname(name)) return load(path.relative(path.resolve(__dirname, ".."), path.resolve(path.dirname(filename), `${name}.ts`)), mocks);
    return localRequire(name);
  };
  new Function("require", "module", "exports", source)(resolve, module, module.exports);
  return module.exports;
}
const content = load("lib/campaign-content.ts");
const { CampaignError } = load("lib/campaign-errors.ts");
const id = "0123456789abcdef01234567";
const request = body => new Request("https://portal.example/api/admin/campaign", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
const template = { name: "Reunion", subject: "Join us", html: "<p>Hello {{fullname}}</p>", audience: { role: "alumni", batches: [2022], branches: ["Civil"] } };
const auth = { requireCampaignAdmin: async () => ({ id, email: "admin@example.com", fullname: "Admin" }), CampaignError };
const responseModule = { NextResponse: { json: (body, options) => Response.json(body, options) } };
const quietConsole = console.error;

function route(mocks = {}) {
  return load("app/api/admin/campaign/route.ts", {
    "next/server": responseModule,
    "@/lib/campaign-auth": auth,
    "@/lib/campaign-content": content,
    "@/lib/campaign-queue": { checkCampaignConfiguration() {}, queueCampaign: async () => ({ queueFailed: false }) },
    "@/lib/campaign-mail": { sendCampaignMail: async () => ({}) },
    "@/models/user.model": {}, "@/models/campaign.model": {}, ...mocks,
  });
}

test("pasted full document keeps table layout and inlines stylesheet classes", () => {
  const html = content.cleanEmailHtml('```html\n<html><head><style>.card { background: #fff; padding: 24px; } .title { color: #2563eb; }</style></head><body><table class="card"><tr><td class="title">Hello</td></tr></table></body></html>\n```');
  assert.match(html, /<table/); assert.match(html, /padding:24px/); assert.match(html, /color:#2563eb/);
  assert.doesNotMatch(html, /<style|```/);
});
test("sanitizer removes scripts, handlers, forms, unsafe links and CSS resource URLs", () => {
  const html = content.cleanEmailHtml('<script>alert(1)</script><form action="https://bad.example"><input></form><a href="javascript:alert(1)" onclick="alert(1)">Click</a><img src="data:text/html,bad" onerror="alert(1)"><p style="background:url(https://bad.example);color:red">Hi</p>');
  assert.doesNotMatch(html, /script|onclick|onerror|<form|<input|javascript:|data:text|url\(/i);
  assert.match(html, /color:red/);
});
test("safe links, images, plaintext and personalization survive without HTML injection", () => {
  const html = content.cleanEmailHtml('<p>Hello {{fullname}}</p><a href="https://example.com/?a=1&amp;b=2">Join</a><img src="https://example.com/banner.png" alt="Banner">');
  const rendered = content.personalize(html, '<img src=x onerror=alert(1)>');
  assert.match(rendered, /&lt;img/); assert.doesNotMatch(rendered, /<img src="?x/);
  assert.match(content.plainText(html), /Join/); assert.match(html, /https:\/\/example.com/);
});
test("targeting combines batch and branch filters and always requires approved members", () => {
  assert.deepEqual(content.audienceFilter(template.audience), { isActive: "approved", role: "alumni", batch: { $in: [2022] }, branch: { $in: ["Civil"] } });
  assert.deepEqual(content.audienceFilter({ role: "all", batches: [], branches: [] }), { isActive: "approved", role: { $in: ["alumni", "student"] } });
  assert.equal(content.audienceSchema.safeParse({ role: "admin" }).success, false);
  assert.equal(content.audienceSchema.safeParse({ role: "all", branches: [{ $ne: "" }] }).success, false);
});
test("admin authentication rejects missing sessions and non-admin database roles", async () => {
  const base = { "@/lib/mongodb": { connectDB: async () => {} }, "@/app/api/auth/[...nextauth]/route": { authOptions: {} } };
  const unauth = load("lib/campaign-auth.ts", { ...base, "next-auth": { getServerSession: async () => null }, "@/models/user.model": {} });
  await assert.rejects(() => unauth.requireCampaignAdmin(request({})), error => error.status === 401);
  const student = load("lib/campaign-auth.ts", { ...base, "next-auth": { getServerSession: async () => ({ user: { id } }) }, "@/models/user.model": { findById: () => ({ select: () => ({ lean: async () => ({ role: "student", isActive: "approved" }) }) }) } });
  await assert.rejects(() => student.requireCampaignAdmin(request({})), error => error.status === 403);
});
test("API does not bypass administrator authentication for preview", async () => {
  const api = route({ "@/lib/campaign-auth": { ...auth, requireCampaignAdmin: async () => { throw new CampaignError("Forbidden", 403); } } });
  assert.equal((await api.POST(request({ action: "preview", html: "<p>Hi</p>" }))).status, 403);
});
test("invalid subject headers and empty content cannot be saved", async () => {
  assert.equal((await route().POST(request({ action: "save", content: { ...template, subject: "Hello\r\nBcc: attacker@example.com" } }))).status, 400);
  assert.equal((await route().POST(request({ action: "save", content: { ...template, html: "<script>alert(1)</script>" } }))).status, 400);
});
test("draft updates require the current revision and draft status", async () => {
  let filter;
  const api = route({ "@/models/campaign.model": { findOneAndUpdate: async f => { filter = f; return null; } } });
  const result = await api.POST(request({ action: "save", id, revision: 3, content: template }));
  assert.equal(result.status, 409); assert.deepEqual(filter, { _id: id, status: "draft", revision: 3 });
});
test("test emails can only go to the signed-in administrator", async () => {
  let destination;
  const api = route({ "@/lib/campaign-mail": { sendCampaignMail: async to => { destination = to; } } });
  const result = await api.POST(request({ action: "test", content: template, email: "stranger@example.com" }));
  assert.equal(result.status, 200); assert.equal(destination, "admin@example.com");
});
test("send freezes the approved audience before publishing, and rejects repeat submissions", async () => {
  let queued = false; let frozen;
  const api = route({
    "@/models/user.model": { aggregate: async pipeline => { assert.deepEqual(pipeline[0].$match, content.audienceFilter(template.audience)); return [{ _id: "member@example.com", fullname: "Member" }]; } },
    "@/models/campaign.model": {
      findOne: () => ({ lean: async () => queued ? null : { ...template, revision: 0 } }),
      findOneAndUpdate: (filter, update) => ({ lean: async () => { assert.equal(filter.status, "draft"); frozen = update.$set.recipients; queued = true; return { _id: id, recipients: frozen }; } }),
    },
    "@/lib/campaign-queue": { checkCampaignConfiguration() {}, queueCampaign: async campaign => { assert.equal(campaign.recipients[0].email, "member@example.com"); return { queueFailed: false, totalRecipients: 1 }; } },
  });
  const body = { action: "send", id, revision: 0 };
  assert.equal((await api.POST(request(body))).status, 202);
  assert.equal(frozen[0].status, "pending");
  assert.equal((await api.POST(request(body))).status, 409);
});
test("zero recipients never queue a campaign", async () => {
  const api = route({ "@/models/campaign.model": { findOne: () => ({ lean: async () => template }) }, "@/models/user.model": { aggregate: async () => [] } });
  assert.equal((await api.POST(request({ action: "send", id, revision: 0 }))).status, 400);
});

function worker({ valid = true, eligible = true, recipients = [], send = async () => {}, update = async () => ({ modifiedCount: 1 }) } = {}) {
  return load("app/api/queue/send-email/route.ts", {
    "next/server": responseModule,
    "@upstash/qstash": { Receiver: class { async verify() { return valid; } } },
    "@/lib/mongodb": { connectDB: async () => {} },
    "@/lib/campaign-content": content,
    "@/lib/campaign-queue": { CAMPAIGN_BATCH_SIZE: 10, campaignWorkerUrl: () => "https://portal.example/api/queue/send-email" },
    "@/lib/campaign-mail": { sendCampaignMail: send },
    "@/models/user.model": { exists: async () => eligible },
    "@/models/campaign.model": { findById: () => ({ lean: async () => ({ status: "queued", subject: "Hello", html: template.html, recipients }) }), updateOne: update, exists: async () => true },
  });
}
const workerRequest = (signed = true) => new Request("https://portal.example/api/queue/send-email", { method: "POST", headers: signed ? { "upstash-signature": "test-signature" } : {}, body: JSON.stringify({ campaignId: id, offset: 0 }) });
test("worker rejects missing and invalid QStash signatures", async () => {
  assert.equal((await worker().POST(workerRequest(false))).status, 401);
  assert.equal((await worker({ valid: false }).POST(workerRequest())).status, 401);
});
test("worker skips previously sent recipients and claims pending deliveries", async () => {
  let sends = 0; const updates = [];
  const api = worker({ recipients: [{ email: "sent@example.com", status: "sent" }, { email: "new@example.com", status: "pending", fullname: "New" }], send: async () => { sends++; }, update: async (filter, update) => { updates.push([filter, update]); return { modifiedCount: 1 }; } });
  assert.equal((await api.POST(workerRequest())).status, 200);
  assert.equal(sends, 1); assert.equal(updates[0][1].$set["recipients.$.status"], "processing");
  assert.equal(updates[1][1].$set["recipients.$.status"], "sent");
  assert.ok(updates[1][0].recipients.$elemMatch.leaseToken);
});
test("worker returns retryable failure when SMTP fails", async () => {
  const updates = [];
  const api = worker({ recipients: [{ email: "failed@example.com", status: "pending" }], send: async () => { throw new Error("SMTP unavailable"); }, update: async (_, update) => { updates.push(update); return { modifiedCount: 1 }; } });
  console.error = () => {};
  try { assert.equal((await api.POST(workerRequest())).status, 503); } finally { console.error = quietConsole; }
  assert.equal(updates.at(-1).$set["recipients.$.status"], "failed");
});

test("workers skip members whose approval was revoked after queueing", async () => {
  let sent = false; const updates = [];
  const api = worker({ eligible: false, recipients: [{ email: "revoked@example.com", status: "pending" }], send: async () => { sent = true; }, update: async (_, update) => { updates.push(update); return { modifiedCount: 1 }; } });
  assert.equal((await api.POST(workerRequest())).status, 200);
  assert.equal(sent, false); assert.equal(updates.at(-1).$set["recipients.$.status"], "skipped");
});
test("duplicate workers cannot send a recipient with an existing lease", async () => {
  let sent = false;
  const api = worker({ recipients: [{ email: "member@example.com", status: "pending" }], send: async () => { sent = true; }, update: async () => ({ modifiedCount: 0 }) });
  await api.POST(workerRequest()); assert.equal(sent, false);
});
test("queue publication persists partial failure and skips completed batches", async () => {
  const previous = process.env.SERVER; process.env.SERVER = "https://portal.example";
  const jobs = []; let persisted;
  try {
    const queue = load("lib/campaign-queue.ts", {
      "@/models/campaign.model": { updateOne: async (_, update) => { persisted = update.$set; } },
      "./campaign-mail": { checkMailConfiguration() {} },
      "@/utils/qstash": { qstash: { publishJSON: async job => { jobs.push(job); if (job.body.offset === 20) throw new Error("Queue unavailable"); } } },
    });
    const recipients = Array.from({ length: 30 }, (_, index) => ({ email: `member${index}@example.com`, status: index < 10 ? "sent" : "pending" }));
    const result = await queue.queueCampaign({ _id: id, revision: 2, recipients });
    assert.deepEqual(jobs.map(job => job.body.offset), [10, 20]);
    assert.equal(result.queueFailed, true); assert.equal(persisted.status, "queue_failed");
    assert.equal(jobs[0].deduplicationId, `${id}-2-10`);
    assert.equal(jobs[0].flowControl.parallelism, 1);
    assert.deepEqual(Object.keys(jobs[0].body).sort(), ["campaignId", "offset"]);
  } finally { if (previous === undefined) delete process.env.SERVER; else process.env.SERVER = previous; }
});
