"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Building,
  Briefcase,
  User,
  Compass,
  Award,
  Link2,
  Mail,
  Github,
  Globe,
  Linkedin,
  UserPlus,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  Building2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
  current?: boolean;
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

interface AlumniProfile {
  name: string;
  headline: string;
  location: string;
  batch: string;
  department: string;
  faculty: string;
  avatar: string;
  verified: boolean;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  mentorshipNote: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    website: string;
  };
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const profile: AlumniProfile = {
  name: "Priya Patel",
  headline: "Senior Software Engineer at Google",
  location: "Seattle, WA, United States",
  batch: "Class of 2019",
  department: "Computer Science",
  faculty: "Information Technology",
  avatar:
    "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2",
  verified: true,
  about:
    "Passionate Software Engineer with over 5 years of experience in building scalable web applications and distributed systems. Currently working at Google on the Cloud Infrastructure team. I enjoy tackling complex backend challenges and mentoring junior developers. Always open to connecting with fellow alumni and students who are interested in cloud computing and system design.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Google",
      duration: "Jan 2022 - Present • 2 yrs 8 mos",
      description:
        "Leading the development of core microservices for Google Cloud infrastructure. Mentoring a team of 4 engineers and improving system reliability by 15%.",
      current: true,
    },
    {
      title: "Software Engineer",
      company: "Amazon",
      duration: "Jul 2019 - Dec 2021 • 2 yrs 6 mos",
      description:
        "Developed backend services for AWS Lambda using Java and Node.js. Optimized API response times and contributed to internal deployment tools.",
      current: false,
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "University Institute of Technology",
      duration: "Aug 2015 - May 2019",
      description:
        "Graduated with Honors. President of the Coding Club. Led the technical team for the annual tech fest.",
    },
  ],
  skills: [
    "React",
    "Node.js",
    "System Design",
    "Java",
    "Microservices",
    "AWS",
    "GCP",
    "Kubernetes",
    "Mentoring",
  ],
  mentorshipNote:
    "I am currently accepting mentorship requests for career guidance, resume reviews, and technical interview preparation.",
  contact: {
    email: "priya.patel@example.com",
    linkedin: "linkedin.com/in/priyapatel",
    github: "github.com/priyacodes",
    website: "priyapatel.dev",
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlumniProfilePage() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="px-8 py-6 flex flex-col gap-6 max-w-[1200px] mx-auto w-full">

        {/* ── Back Link ── */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[14px] font-medium text-slate-500 hover:text-slate-800 transition-colors w-fit"
        >
          <ArrowLeft size={15} />
          Back to Directory
        </button>

        {/* ══════════════════════════════════════════
            PROFILE HEADER CARD
        ══════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-6 sm:px-8 sm:py-7">
          {/* On mobile: stack vertically. On desktop: single row */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">

            {/* Top row on mobile: avatar + buttons side by side */}
            <div className="flex items-start justify-between sm:contents gap-4">

              {/* Avatar */}
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full object-cover border-4 border-slate-100 shadow-sm flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile.name) +
                    "&background=e2e8f0&color=475569&size=110";
                }}
              />

              {/* Buttons — show beside avatar on mobile, top-right on desktop */}
              <div className="flex items-center gap-2 sm:hidden">
                <button className="flex items-center gap-1.5 px-3 h-9 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap">
                  <UserPlus size={14} />
                  Connect
                </button>
                <button className="flex items-center gap-1.5 px-3 h-9 bg-blue-600 hover:bg-blue-700 rounded-lg text-[13px] font-semibold text-white transition-colors whitespace-nowrap">
                  <MessageSquare size={14} />
                  Message
                </button>
              </div>
            </div>

            {/* Name + headline + meta */}
            <div className="flex-1 min-w-0 sm:pt-1">
              {/* Name + badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-[22px] sm:text-[28px] font-bold text-slate-900 leading-tight">
                  {profile.name}
                </h1>
                {profile.verified && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-[12px] sm:text-[13px] font-semibold whitespace-nowrap">
                    <CheckCircle2 size={12} />
                    Verified Alumni
                  </span>
                )}
              </div>

              {/* Headline */}
              <p className="text-[14px] sm:text-[16px] text-slate-500 font-normal mt-1.5">
                {profile.headline}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500">
                  <MapPin size={14} className="text-slate-400" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500">
                  <GraduationCap size={14} className="text-slate-400" />
                  {profile.batch} • {profile.department}
                </span>
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500">
                  <Building size={14} className="text-slate-400" />
                  {profile.faculty}
                </span>
              </div>
            </div>

            {/* Buttons — hidden on mobile (shown above), visible on desktop */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0 pt-1">
              <button className="flex items-center gap-2 px-5 h-11 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap">
                <UserPlus size={16} />
                Connect
              </button>
              <button className="flex items-center gap-2 px-5 h-11 bg-blue-600 hover:bg-blue-700 rounded-lg text-[14px] font-semibold text-white transition-colors whitespace-nowrap">
                <MessageSquare size={16} />
                Message
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TWO COLUMN GRID
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* About */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <User size={17} className="text-slate-400" />
                About
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                {profile.about}
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Briefcase size={17} className="text-slate-400" />
                Experience
              </div>
              <div className="flex flex-col gap-6">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Icon box */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        exp.current ? "bg-blue-50" : "bg-slate-100"
                      }`}
                    >
                      <Building2
                        size={22}
                        className={exp.current ? "text-blue-500" : "text-slate-400"}
                      />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="font-semibold text-[16px] text-slate-900 leading-snug">
                        {exp.title}
                      </p>
                      <p className="text-[14px] text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-[13px] text-slate-400 mt-0.5">{exp.duration}</p>
                      <p className="text-[14px] text-slate-600 leading-relaxed mt-1">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <GraduationCap size={17} className="text-slate-400" />
                Education
              </div>
              <div className="flex flex-col gap-6">
                {profile.education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Icon box */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={22} className="text-blue-500" />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="font-semibold text-[16px] text-slate-900 leading-snug">
                        {edu.degree}
                      </p>
                      <p className="text-[14px] text-blue-600 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-[13px] text-slate-400 mt-0.5">{edu.duration}</p>
                      <p className="text-[14px] text-slate-600 leading-relaxed mt-1">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Mentorship */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Compass size={17} className="text-slate-400" />
                Mentorship
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-5">
                {profile.mentorshipNote}
              </p>
              <button className="w-full flex items-center justify-center h-11 bg-blue-600 hover:bg-blue-700 rounded-lg text-[14px] font-semibold text-white transition-colors">
                Request Mentorship
              </button>
            </div>

            {/* Skills */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Award size={17} className="text-slate-400" />
                Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[13px] font-medium hover:bg-slate-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact & Links */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Link2 size={17} className="text-slate-400" />
                Contact &amp; Links
              </div>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 truncate">
                    {profile.contact.email}
                  </span>
                </div>
                {/* LinkedIn */}
                <a
                  href={`https://${profile.contact.linkedin}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Linkedin size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                    {profile.contact.linkedin}
                  </span>
                </a>
                {/* GitHub */}
                <a
                  href={`https://${profile.contact.github}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Github size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                    {profile.contact.github}
                  </span>
                </a>
                {/* Website */}
                <a
                  href={`https://${profile.contact.website}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Globe size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                    {profile.contact.website}
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}