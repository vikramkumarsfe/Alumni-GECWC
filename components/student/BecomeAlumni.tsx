"use client";

import { Skeleton, Button } from "antd"; // Added Button here
import { 
  Send, FileText, Users, MessagesSquare, BriefcaseBusiness, 
  UserRoundPlus, Handshake, CalendarDays, BadgeHelp, ClipboardList, 
  UserPen, LifeBuoy, ArrowRightCircle 
} from "lucide-react";
import { useSession } from "next-auth/react";

// ─── Check Item ───────────────────────────────────────────────────────────────

function CheckItem({
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
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-slate-600`} >
         <ArrowRightCircle size={14} /> 
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
    <div className="bg-slate-50 border border-slate-200 rounded-xl md:px-8 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between md:px-4">
        <Icon size={20}  />
        <p className="text-[24px] font-bold text-slate-900">{value}</p>
      </div>
      <p className="text-[14px] text-slate-500">{label}</p>
    </div>
  )
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
      <div className="w-9 h-9 rounded-xl  flex items-center justify-center">
        <Icon size={18} className="text-zinc-600" />
      </div>
      <p className="text-[14px] font-semibold text-slate-900">{title}</p>
      <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-[13px] text-slate-500">{label}</span>
      <span className="text-[14px] font-semibold text-slate-900 text-right  ">
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const BecomeAlumni = () => {
  const { data: session, status } = useSession()

      if (status === "loading") {
          return (
              <div className="max-w-7xl mx-auto p-8">
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                  <div className="grid grid-cols-12 gap-6 mt-6">
                      <div className="col-span-8"><Skeleton active paragraph={{ rows: 6 }} /></div>
                      <div className="col-span-4"><Skeleton active paragraph={{ rows: 6 }} /></div>
                  </div>
              </div>
          );
      }
  
      if (!session || !session.user) {
          return <div className="flex justify-center items-center h-screen">Not authenticated</div>;
      }
  
      const user = session.user;
      

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="md:px-8 px-4 md:py-8 py-4">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

          <div className="flex flex-col gap-6">

            {/* ── Hero Card ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-blue-400 text-[12px] font-semibold mb-3">
                Graduation transition
              </div>

              <div className=" ">
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

                  <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
                    <StatCard icon={Users} value="0" label="Alumni connections preserved" />
                    <StatCard icon={MessagesSquare} value="0" label="Chats and mentorship records kept" />
                    <div className="md:block hidden">
                      <StatCard icon={BriefcaseBusiness} value="0" label="Career opportunities bookmarked" />
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {/* Ant Design Button replace */}
                    <Button 
                      type="primary" 
                      size="large"
                      icon={<Send size={15} />}
                      className="bg-blue-600 hover:!bg-blue-700 border-none shadow-md shadow-blue-100 h-11 px-6 rounded-lg text-[14px] font-medium"
                    >
                      Request Alumni Conversion
                    </Button>
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

          <div className="flex flex-col gap-6">

            {/* ── Request Summary ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-[18px] font-bold text-slate-900">Request summary</p>
                  <p className="text-[13px] text-slate-500 mt-0.5">Current conversion details</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-rose-400 flex-shrink-0">
                  <ClipboardList size={18} />
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <InfoRow label="Role transition" value="Student → Alumni" />
                <div className="h-px bg-slate-100" />
                <InfoRow label="Department" value={user.branch || "N/A"} />
                <div className="h-px bg-slate-100" />
                <InfoRow label="Batch" value={`${user.batch} - ${(user.batch || 0) + 4}` || "N/A"} />
                <div className="h-px bg-slate-100" />
                <InfoRow label="Expected graduation" value={`${(user.batch || 0) + 4} July`} />
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
              {/* Ant Design Button replace */}
              <Button 
                block
                icon={<UserPen size={15} />}
                className="h-10 border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 hover:!text-blue-600 hover:!border-blue-600 transition-colors"
              >
                Update Profile Details
              </Button>
            </div>

            {/* ── Need Help ── */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
              <div className="mb-4">
                <p className="text-[18px] font-bold text-slate-900">Need help?</p>
                <p className="text-[13px] text-slate-500 mt-0.5">Support for verification and account conversion</p>
              </div>

              <div className="flex gap-3 items-start bg-blue-50 rounded-xl p-4 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-600 flex-shrink-0">
                  <LifeBuoy size={18} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-900">Contact alumni relations</p>
                  <p className="text-[13px] text-slate-500 mt-0.5 leading-relaxed">
                    Get help with eligibility, approval delays, or documentation requirements.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {/* Ant Design Button replace */}
                <Button 
                  type="primary"
                  block
                  style={{ backgroundColor: '#60a5fa', borderColor: '#60a5fa' }} // blue-400
                  className="h-10 rounded-lg text-[15px] font-bold hover:!opacity-90"
                >
                  Contact Office
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomeAlumni;