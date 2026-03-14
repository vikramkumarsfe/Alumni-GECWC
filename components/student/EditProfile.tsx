"use client";

import { useState } from "react";
import { Upload, Save, X, Linkedin, Github, Globe, Twitter } from "lucide-react";

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function Button({
  children, variant = "default", size = "default", className = "", style, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "danger";
  size?: "default" | "sm";
}) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors cursor-pointer focus:outline-none disabled:opacity-50";
  const variants = {
    default: "bg-[#1565d8] text-white hover:bg-[#1251b5] border-0",
    outline: "border border-[#e2e8f0] bg-white text-[#0f172a] hover:bg-gray-50",
    danger: "border border-[#f59e0b] text-[#f59e0b] bg-transparent hover:bg-amber-50",
  };
  const sizes = { default: "px-5 py-2.5 text-sm h-10", sm: "px-4 py-2 text-sm h-9" };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} style={style} {...rest}>
      {children}
    </button>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full h-10 px-3.5 py-2.5 text-sm border border-[#00000014] rounded-md bg-[#f8faff] text-[#0f172a]",
        "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1565d8]",
        "disabled:bg-[#e8f1ff] disabled:text-[#6b7280] placeholder:text-[#9ca3af]",
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full px-3.5 py-2.5 text-sm border border-[#00000014] rounded-md bg-[#f8faff] text-[#0f172a]",
        "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1565d8] placeholder:text-[#9ca3af]",
        className
      )}
      {...props}
    />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-[#0f172a] mb-1.5 block">{children}</label>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-[#6b7280] mt-1.5">{children}</p>;
}

function NativeSelect({
  value, onChange, options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3.5 text-sm border border-[#00000014] rounded-md bg-[#f8faff] text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1565d8] cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
        appearance: "none",
      }}
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden">
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-5 border-b border-[#e2e8f0]">
      <h2 className="text-lg font-semibold text-[#0f172a]">{children}</h2>
    </div>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-6">{children}</div>;
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">{children}</div>;
}

function FormCol({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

function AvatarImg({ src, size = "sm" }: { src: string; size?: "sm" | "lg" }) {
  const s = size === "lg" ? "w-[100px] h-[100px]" : "w-9 h-9";
  return (
    <div className={cn("rounded-full overflow-hidden border border-[#e2e8f0] bg-[#e8f1ff] flex-shrink-0", s)}>
      <img src={src} alt="avatar" className="w-full h-full object-cover" />
    </div>
  );
}

function SkillBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-medium bg-[#e8f1ff] text-[#0f172a]">
      {label}
      <button onClick={onRemove} className="flex items-center text-[#6b7280] hover:text-red-500 transition-colors">
        <X size={13} />
      </button>
    </span>
  );
}

function SocialInput({ icon: Icon, defaultValue }: { icon: React.ElementType; defaultValue?: string }) {
  return (
    <div className="flex items-center border border-[#00000014] rounded-md overflow-hidden bg-[#f8faff]">
      <div className="w-11 h-10 flex items-center justify-center border-r border-[#e2e8f0] bg-[#e8f1ff] flex-shrink-0">
        <Icon size={17} className="text-[#6b7280]" />
      </div>
      <input
        defaultValue={defaultValue}
        className="flex-1 h-10 px-3.5 text-sm text-[#0f172a] bg-[#f8faff] focus:outline-none"
      />
    </div>
  );
}

const AVATAR_URL = "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F1";
const INITIAL_SKILLS = ["Web Development", "React.js", "Data Structures", "UI/UX Design", "Cloud Computing", "Python"];

export default function EditProfile() {
  const [skills, setSkills] = useState<string[]>(INITIAL_SKILLS);
  const [newSkill, setNewSkill] = useState("");
  const [gender, setGender] = useState("male");
  const [degree, setDegree] = useState("btech");
  const [dept, setDept] = useState("cse");
  const [gradYear, setGradYear] = useState("2024");

  const addSkill = () => {
    const t = newSkill.trim();
    if (t && !skills.includes(t)) { setSkills([...skills, t]); setNewSkill(""); }
  };

  return (
    <div className=" min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 pt-8 pb-10 flex flex-col gap-6">

        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Edit Profile</h1>
          <p className="text-sm mt-1 text-[#64748b]">Update your personal, academic, and professional information.</p>
        </div>

        {/* ── Basic Information ── */}
        <Card>
          <CardHeader>Basic Information</CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <AvatarImg src={AVATAR_URL} size="lg" />
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Button variant="outline"><Upload size={15} />Change Picture</Button>
                  <Button variant="danger">Remove</Button>
                </div>
                <Hint>Recommended size: 400x400px. Max size: 5MB.</Hint>
              </div>
            </div>

            <FormRow>
              <FormCol><Label>First Name</Label><Input defaultValue="Alex" /></FormCol>
              <FormCol><Label>Last Name</Label><Input defaultValue="Sharma" /></FormCol>
            </FormRow>

            <div className="mb-5">
              <Label>Headline / Title</Label>
              <Input defaultValue="Final Year B.Tech Student | Aspiring Software Engineer" />
              <Hint>A brief description that appears below your name on your profile.</Hint>
            </div>

            <FormRow>
              <FormCol><Label>Email Address</Label><Input type="email" defaultValue="alex.sharma@university.edu" /></FormCol>
              <FormCol><Label>Phone Number</Label><Input defaultValue="+1 (555) 123-4567" /></FormCol>
            </FormRow>

            <FormRow>
              <FormCol>
                <Label>Gender</Label>
                <NativeSelect value={gender} onChange={setGender} options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                  { value: "prefer-not", label: "Prefer not to say" },
                ]} />
              </FormCol>
              <FormCol><Label>Date of Birth</Label><Input type="date" defaultValue="2002-08-14" /></FormCol>
            </FormRow>

            <div>
              <Label>Address</Label>
              <Textarea defaultValue="123 Campus Drive, Apt 4B, SF, CA" className="resize-none h-20" />
            </div>
          </CardContent>
        </Card>

        {/* ── Academic Information ── */}
        <Card>
          <CardHeader>Academic Information</CardHeader>
          <CardContent>
            <div className="mb-5">
              <Label>College / University</Label>
              <Input defaultValue="State University of Technology" />
            </div>

            <FormRow>
              <FormCol>
                <Label>Degree</Label>
                <NativeSelect value={degree} onChange={setDegree} options={[
                  { value: "btech", label: "Bachelor of Technology (B.Tech)" },
                  { value: "bsc", label: "Bachelor of Science (B.Sc)" },
                  { value: "mtech", label: "Master of Technology (M.Tech)" },
                  { value: "mba", label: "MBA" },
                  { value: "phd", label: "Ph.D" },
                ]} />
              </FormCol>
              <FormCol>
                <Label>Department / Major</Label>
                <NativeSelect value={dept} onChange={setDept} options={[
                  { value: "cse", label: "Computer Science and Engineering" },
                  { value: "ece", label: "Electronics & Communication" },
                  { value: "mech", label: "Mechanical Engineering" },
                  { value: "civil", label: "Civil Engineering" },
                  { value: "EE", label: "Electrical Engineering" },
                ]} />
              </FormCol>
            </FormRow>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <FormCol><Label>Batch Year</Label><Input defaultValue="2020-2024" /></FormCol>
              <FormCol>
                <Label>Expected Graduation</Label>
                <NativeSelect value={gradYear} onChange={setGradYear}
                  options={[2023, 2024, 2025, 2026, 2027].map(y => ({ value: String(y), label: String(y) }))} />
              </FormCol>
              <FormCol>
                <Label>Student ID</Label>
                <Input defaultValue="CS2020-0451" disabled />
                <Hint>Contact admin to change ID.</Hint>
              </FormCol>
            </div>
          </CardContent>
        </Card>

        {/* ── Professional Interests ── */}
        <Card>
          <CardHeader>Professional Interests &amp; Goals</CardHeader>
          <CardContent>
            <div className="mb-5">
              <Label>Internship Interests</Label>
              <Input defaultValue="Frontend Engineering, Full-stack Development, UI/UX" />
              <Hint>Separate multiple interests with commas.</Hint>
            </div>
            <div className="mb-5">
              <Label>Preferred Industries</Label>
              <Input defaultValue="Technology, FinTech, E-commerce" />
            </div>
            <div>
              <Label>Career Goals / About Me</Label>
              <Textarea
                className="resize-none h-28"
                defaultValue="I am passionate about building scalable web applications and enhancing user experiences. Looking for opportunities to work in a fast-paced environment where I can contribute to meaningful projects and learn from experienced engineers."
              />
            </div>
          </CardContent>
        </Card>

        {/* ── Skills ── */}
        <Card>
          <CardHeader>Skills &amp; Technologies</CardHeader>
          <CardContent>
            <Label>Add Skill</Label>
            <div className="flex gap-3 mt-0">
              <Input
                placeholder="e.g. JavaScript, Project Management..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                className="flex-1"
              />
              <Button variant="outline" onClick={addSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <SkillBadge key={skill} label={skill} onRemove={() => setSkills(skills.filter(s => s !== skill))} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Social Links + Actions (same card) ── */}
        <Card>
          <CardHeader>Social Links</CardHeader>
          <CardContent>
            <FormRow>
              <FormCol><Label>LinkedIn Profile</Label><SocialInput icon={Linkedin} defaultValue="linkedin.com/in/alexsharma" /></FormCol>
              <FormCol><Label>GitHub Profile</Label><SocialInput icon={Github} defaultValue="github.com/alexsharmadev" /></FormCol>
            </FormRow>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-0">
              <FormCol><Label>Personal Website / Portfolio</Label><SocialInput icon={Globe} defaultValue="alexsharma.dev" /></FormCol>
              <FormCol><Label>Twitter / X (Optional)</Label><SocialInput icon={Twitter} defaultValue="@alexsharma_tech" /></FormCol>
            </div>
          </CardContent>
        </Card>

        {/* Cancel + Save inside Social Links card */}
          <div className="px-4 md:px-8 py-2 border-t border-[#e2e8f0] flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button><Save size={15} /> Save Changes</Button>
          </div>
      </div>
    </div>
  );
}
