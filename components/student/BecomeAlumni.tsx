"use client";

import {
  Sparkles,
  Send,
  FileText,
  Users,
  MessagesSquare,
  BriefcaseBusiness,
  Clock3,
  BadgeCheck,
  FileCheck,
  School,
  UserRoundCheck,
  Check,
  UserRoundPlus,
  Handshake,
  CalendarDays,
  BadgeHelp,
  ClipboardList,
  PencilLine,
  UserPen,
  LifeBuoy,
  CheckCircle2,
} from "lucide-react";

// ─── Check Item ───────────────────────────────────────────────────────────────

function CheckItem({
  status,
  title,
  description,
  compact = false,
}: {
  status: "complete" | "pending";
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl ${
        compact ? "px-3.5 py-3" : "px-4 py-3.5"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          status === "complete"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-amber-100 text-amber-600"
        }`}
      >
        {status === "complete" ? <Check size={14} /> : <Clock3 size={14} />}
      </div>
      <div>
        <p className="text-[14px] font-semibold text-slate-900">{title}</p>
        <p className="text-[13px] text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
      <Icon size={20} className="text-blue-600" />
      <p className="text-[24px] font-bold text-slate-900">{value}</p>
      <p className="text-[13px] text-slate-500">{label}</p>
    </div>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────

function BenefitCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
        <Icon size={18} className="text-blue-600" />
      </div>
      <p className="text-[14px] font-semibold text-slate-900">{title}</p>
      <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[13px] text-slate-500">{label}</span>
      <span className="text-[14px] font-semibold text-slate-900 text-right whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BecomeAlumniPage() {
  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="px-8 py-8">
        {/* Two-column layout */}
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

          {/* ══════════════════════════════════════════
              LEFT / MAIN COLUMN
          ══════════════════════════════════════════ */}
          <div className="flex flex-col gap-6">

            {/* ── Hero Card ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[12px] font-semibold mb-5">
                <Sparkles size={14} />
                Graduation transition
              </div>

              {/* Hero grid: left text + right status */}
              <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
                {/* Left: title + stats + buttons */}
                <div className="flex flex-col gap-5">
                  <div>
                    <h1 className="text-[28px] font-bold text-slate-900 leading-tight">
                      Convert your student account into an alumni profile
                    </h1>
                    <p className="text-[14px] text-slate-500 mt-2 leading-relaxed">
                      Stay connected to your university community after graduation. Your profile,
                      connections, mentorship history, event activity, and professional journey
                      can continue seamlessly as an alumni account.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <StatCard icon={Users} value="28" label="Alumni connections preserved" />
                    <StatCard icon={MessagesSquare} value="12" label="Chats and mentorship records kept" />
                    <StatCard icon={BriefcaseBusiness} value="4" label="Career opportunities bookmarked" />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <button className="flex items-center gap-2 px-5 h-11 bg-blue-600 hover:bg-blue-700 rounded-lg text-[14px] font-medium text-white transition-colors shadow-md shadow-blue-100">
                      <Send size={15} />
                      Request Alumni Conversion
                    </button>
                    <button className="flex items-center gap-2 px-5 h-11 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                      <FileText size={15} />
                      View Eligibility Guide
                    </button>
                  </div>
                </div>

                {/* Right: status panel */}
                <div className="bg-gradient-to-b from-blue-50/90 to-white border border-blue-100 rounded-2xl p-5 flex flex-col gap-5">
                  {/* Status header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[13px] text-slate-500 mb-2">Current request status</p>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[13px] font-semibold">
                        <Clock3 size={13} />
                        Pending review
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0">
                      <BadgeCheck size={22} />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        icon: FileCheck,
                        title: "Application submitted",
                        desc: "Your conversion request was submitted on 14 May 2025.",
                      },
                      {
                        icon: School,
                        title: "Academic verification in progress",
                        desc: "The university is confirming your graduation and final record details.",
                      },
                      {
                        icon: UserRoundCheck,
                        title: "Alumni profile activation",
                        desc: "Once approved, your account will unlock alumni networking and mentor features.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-slate-900">{item.title}</p>
                          <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Eligibility Checklist ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
              <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                <div>
                  <h2 className="text-[20px] font-bold text-slate-900">Eligibility checklist</h2>
                  <p className="text-[14px] text-slate-500 mt-1">
                    Complete the items below so the alumni office can review your request faster.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[13px] font-semibold whitespace-nowrap">
                  <CheckCircle2 size={14} />
                  3 of 4 completed
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <CheckItem
                  status="complete"
                  title="Final year profile is complete"
                  description="Your academic details, career interests, and contact information are up to date."
                />
                <CheckItem
                  status="complete"
                  title="Expected graduation date verified"
                  description="B.Tech Computer Science, Class of 2025, has been confirmed by the registrar."
                />
                <CheckItem
                  status="pending"
                  title="Placement or next-step information pending"
                  description="Add your current company, higher studies plan, or job-seeking status to strengthen your alumni profile."
                />
                <CheckItem
                  status="complete"
                  title="University email linked"
                  description="Your student identity remains attached for account continuity and verification."
                />
              </div>
            </div>

            {/* ── What Changes After Graduation ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
              <h2 className="text-[20px] font-bold text-slate-900">What changes after graduation</h2>
              <p className="text-[14px] text-slate-500 mt-1 mb-5">
                Your account becomes an alumni-facing profile while preserving your existing activity and network.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BenefitCard
                  icon={UserRoundPlus}
                  title="Listed in Alumni Directory"
                  description="Current students will be able to discover your profile and reach out for career guidance."
                />
                <BenefitCard
                  icon={Handshake}
                  title="Mentor and support students"
                  description="Accept mentorship requests, host sessions, and share your professional journey."
                />
                <BenefitCard
                  icon={CalendarDays}
                  title="Access alumni events"
                  description="Join reunions, guest sessions, and networking events curated for graduates."
                />
                <BenefitCard
                  icon={BadgeHelp}
                  title="Keep your academic legacy"
                  description="Your department, batch, achievements, and campus association remain visible on your profile."
                />
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════
              RIGHT / SIDE COLUMN
          ══════════════════════════════════════════ */}
          <div className="flex flex-col gap-6">

            {/* ── Request Summary ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-[18px] font-bold text-slate-900">Request summary</p>
                  <p className="text-[13px] text-slate-500 mt-0.5">Current conversion details</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <ClipboardList size={18} />
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <InfoRow label="Role transition" value="Student → Alumni" />
                <div className="h-px bg-slate-100" />
                <InfoRow label="Department" value="Computer Science" />
                <div className="h-px bg-slate-100" />
                <InfoRow label="Batch" value="2021–2025" />
                <div className="h-px bg-slate-100" />
                <InfoRow label="Expected graduation" value="June 2025" />
                <div className="h-px bg-slate-100" />
                <InfoRow label="Review owner" value="Alumni Office" />
              </div>
            </div>

            {/* ── Next Steps ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <div className="mb-4">
                <p className="text-[18px] font-bold text-slate-900">Next steps</p>
                <p className="text-[13px] text-slate-500 mt-0.5">Recommended actions before approval</p>
              </div>
              <div className="flex flex-col gap-2.5 mb-4">
                <CheckItem
                  status="pending"
                  title="Add professional status"
                  description="Mention job offer, internship conversion, or higher studies plan."
                  compact
                />
                <CheckItem
                  status="complete"
                  title="Upload profile photo"
                  description="Students and alumni will recognize you in the directory."
                  compact
                />
                <CheckItem
                  status="complete"
                  title="Confirm mentorship availability"
                  description="Choose whether you want to mentor juniors after activation."
                  compact
                />
              </div>
              <button className="w-full flex items-center justify-center gap-2 h-10 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                <UserPen size={15} />
                Update Profile Details
              </button>
            </div>

            {/* ── Need Help ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <div className="mb-4">
                <p className="text-[18px] font-bold text-slate-900">Need help?</p>
                <p className="text-[13px] text-slate-500 mt-0.5">Support for verification and account conversion</p>
              </div>

              {/* Support box */}
              <div className="flex gap-3 items-start bg-blue-50 rounded-xl p-4 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-blue-600 flex-shrink-0">
                  <LifeBuoy size={18} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-900">Contact alumni relations</p>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-relaxed">
                    Get help with eligibility, approval delays, or documentation requirements.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center h-10 bg-blue-600 hover:bg-blue-700 rounded-lg text-[13px] font-medium text-white transition-colors">
                  Contact Office
                </button>
                <button className="flex items-center justify-center h-10 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                  View FAQ
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}