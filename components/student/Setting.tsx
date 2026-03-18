"use client";

import { useState } from "react";
import { Save, KeyRound } from "lucide-react";

// ─── Toggle Switch Component ──────────────────────────────────────────────────

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex items-center w-[44px] h-[24px] rounded-full flex-shrink-0 transition-colors duration-200 ${
        enabled ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block w-[20px] h-[20px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
          enabled ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-[20px] font-semibold text-slate-900">{title}</h2>
        <p className="text-[14px] text-slate-500 mt-1">{description}</p>
      </div>
      {/* Body */}
      <div className="px-8 py-6 flex flex-col gap-5">{children}</div>
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-slate-100" />;
}

// ─── Setting Row (toggle) ─────────────────────────────────────────────────────

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <p className="text-[15px] font-medium text-slate-900">{title}</p>
        <p className="text-[13px] text-slate-500">{description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

// ─── Form Input ───────────────────────────────────────────────────────────────

function FormInput({
  label,
  type = "text",
  value,
  onChange,
  hint,
  readOnly,
  placeholder,
}: {
  label: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  hint?: string;
  readOnly?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[15px] font-medium text-slate-900">{label}</label>
      <input
        type={type}
        defaultValue={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[14px] text-slate-800 bg-white outline-none transition-colors
          ${readOnly ? "cursor-not-allowed opacity-70" : "focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"}`}
      />
      {hint && <p className="text-[12px] text-slate-400">{hint}</p>}
    </div>
  );
}

// ─── Timezone Select ──────────────────────────────────────────────────────────

function TimezoneSelect() {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[15px] font-medium text-slate-900">Timezone</label>
      <select
        defaultValue="utc-5"
        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[14px] text-slate-800 bg-slate-50 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50 appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
      >
        <option value="utc-8">(UTC-08:00) Pacific Time</option>
        <option value="utc-7">(UTC-07:00) Mountain Time</option>
        <option value="utc-6">(UTC-06:00) Central Time</option>
        <option value="utc-5">(UTC-05:00) Eastern Time</option>
        <option value="utc+0">(UTC+00:00) Greenwich Mean Time</option>
        <option value="utc+1">(UTC+01:00) Central European Time</option>
        <option value="utc+5:30">(UTC+05:30) India Standard Time</option>
        <option value="utc+8">(UTC+08:00) China Standard Time</option>
        <option value="utc+9">(UTC+09:00) Japan Standard Time</option>
      </select>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SettingsPage() {
  // Privacy toggles
  const [publicProfile, setPublicProfile] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Notification toggles
  const [newMessages, setNewMessages] = useState(true);
  const [mentorshipUpdates, setMentorshipUpdates] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="px-2 py-8 max-w-[900px] mx-auto w-full flex flex-col gap-6">


        {/* ══════════════════════════════════════════
            1. ACCOUNT INFORMATION
        ══════════════════════════════════════════ */}
        <SettingsSection
          title="Account Information"
          description="Update your basic account details and preferences."
        >
          {/* Row 1: Email fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormInput
              label="Email Address"
              type="email"
              value="alex.sharma@university.edu"
              readOnly
              hint="Contact admin to change university email."
            />
            <FormInput
              label="Personal Email (Optional)"
              type="email"
              value="alex.sharma@gmail.com"
            />
          </div>

          {/* Row 2: Phone + Timezone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormInput
              label="Phone Number"
              type="tel"
              value="+1 (555) 123-4567"
            />
            <TimezoneSelect />
          </div>

          {/* Save button */}
          <div className="flex justify-end pt-1">
            <button className="flex items-center gap-2 px-5 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg text-[14px] font-medium text-white transition-colors">
              <Save size={15} />
              Save Changes
            </button>
          </div>
        </SettingsSection>

        {/* ══════════════════════════════════════════
            2. PRIVACY & VISIBILITY
        ══════════════════════════════════════════ */}
        <SettingsSection
          title="Privacy & Visibility"
          description="Manage what information is visible to other students and alumni."
        >
          <SettingRow
            title="Public Profile"
            description="Make your profile visible in the Alumni & Student Directory."
            enabled={publicProfile}
            onChange={setPublicProfile}
          />
          <Divider />
          <SettingRow
            title="Show Email Address"
            description="Allow other users to see your email address on your profile."
            enabled={showEmail}
            onChange={setShowEmail}
          />
          <Divider />
          <SettingRow
            title="Show Phone Number"
            description="Allow other users to see your phone number."
            enabled={showPhone}
            onChange={setShowPhone}
          />
        </SettingsSection>

        {/* ══════════════════════════════════════════
            3. NOTIFICATIONS
        ══════════════════════════════════════════ */}
        <SettingsSection
          title="Notifications"
          description="Choose what updates you want to receive."
        >
          <SettingRow
            title="New Messages"
            description="Receive an email when an alumni or student messages you."
            enabled={newMessages}
            onChange={setNewMessages}
          />
          <Divider />
          <SettingRow
            title="Mentorship Updates"
            description="Get notified about session bookings and mentorship requests."
            enabled={mentorshipUpdates}
            onChange={setMentorshipUpdates}
          />
          <Divider />
          <SettingRow
            title="Job & Internship Alerts"
            description="Weekly digest of new opportunities matching your skills."
            enabled={jobAlerts}
            onChange={setJobAlerts}
          />
        </SettingsSection>

        {/* ══════════════════════════════════════════
            4. SECURITY
        ══════════════════════════════════════════ */}
        <SettingsSection
          title="Security"
          description="Manage your password and account security."
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-[15px] font-medium text-slate-900">Change Password</p>
              <p className="text-[13px] text-slate-500">
                Update your password regularly to keep your account secure.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 h-10 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap flex-shrink-0">
              <KeyRound size={15} className="text-slate-500" />
              Update Password
            </button>
          </div>
        </SettingsSection>

      </div>
    </div>
  );
}