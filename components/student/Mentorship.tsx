"use client";

import { useState } from "react";
import {
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  tags: string[];
  status?: "active" | "pending";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const myMentors: Mentor[] = [
  {
    id: 1,
    name: "Priya Patel",
    title: "Senior Software Engineer",
    company: "Google",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2",
    tags: ["Career Guidance", "Resume Review", "Interview Prep"],
    status: "active",
  },
  {
    id: 2,
    name: "David Smith",
    title: "Product Manager",
    company: "Microsoft",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FEuropean%2F3",
    tags: ["Product Management", "Leadership"],
    status: "pending",
  },
];

const availableMentors: Mentor[] = [
  {
    id: 3,
    name: "Sarah Chen",
    title: "Data Scientist",
    company: "Amazon",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FEast%20Asian%2F4",
    tags: ["Data Science", "Machine Learning", "Python"],
  },
  {
    id: 4,
    name: "James Osei",
    title: "Frontend Developer",
    company: "Netflix",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FAfrican%2F1",
    tags: ["React", "UI/UX", "Web Dev"],
  },
  {
    id: 5,
    name: "Emily Davis",
    title: "UX Researcher",
    company: "Meta",
    avatar: "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F35-50%2FNorth%20American%2F2",
    tags: ["UX Research", "Design Thinking"],
  },
];

// ─── Tag Badge ────────────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[12px] font-medium">
      {label}
    </span>
  );
}

// ─── My Mentor Card ───────────────────────────────────────────────────────────

function MyMentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=e2e8f0&color=475569&size=64`;
          }}
        />
        <div className="min-w-0">
          <p className="font-semibold text-[16px] text-slate-900 leading-snug">{mentor.name}</p>
          <p className="text-[14px] text-slate-500 mt-0.5">{mentor.title}</p>
          <p className="text-[13px] text-slate-800 font-semibold mt-0.5">{mentor.company}</p>
        </div>
      </div>

      {/* Status Badge */}
      {mentor.status === "active" && (
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[12px] font-semibold">
            <CheckCircle size={12} />
            Active Mentor
          </span>
        </div>
      )}
      {mentor.status === "pending" && (
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-500 text-[12px] font-semibold">
            <Clock size={12} />
            Request Pending
          </span>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {mentor.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-slate-100 mt-auto">
        {mentor.status === "active" ? (
          <>
            <button className="flex-1 flex items-center justify-center gap-2 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg text-[14px] font-medium text-white transition-colors">
              <Calendar size={15} />
              Book Session
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 h-10 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
              <MessageSquare size={15} />
              Message
            </button>
          </>
        ) : (
          <button className="w-full flex items-center justify-center h-10 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Available Mentor Card ────────────────────────────────────────────────────

function AvailableMentorCard({ mentor }: { mentor: Mentor }) {
  const [requested, setRequested] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=e2e8f0&color=475569&size=64`;
          }}
        />
        <div className="min-w-0">
          <p className="font-semibold text-[16px] text-slate-900 leading-snug">{mentor.name}</p>
          <p className="text-[14px] text-slate-500 mt-0.5">{mentor.title}</p>
          <p className="text-[13px] text-slate-800 font-semibold mt-0.5">{mentor.company}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {mentor.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      {/* Action */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <button
          onClick={() => setRequested(!requested)}
          className={`w-full flex items-center justify-center h-10 rounded-lg text-[14px] font-semibold transition-colors ${
            requested
              ? "bg-slate-100 text-slate-500 hover:bg-slate-200"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {requested ? "Request Sent ✓" : "Request Mentorship"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MentorshipPage() {
  const [search, setSearch] = useState("");

  const filtered = availableMentors.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.company.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="px-8 py-8 flex flex-col gap-10 max-w-[1200px] mx-auto">

        {/* ══════════════════════════════════════════
            MY MENTORS
        ══════════════════════════════════════════ */}
        <div>
          {/* Section Header */}
          <div className="mb-5">
            <h2 className="text-[22px] font-bold text-slate-900">My Mentors</h2>
            <p className="text-[14px] text-slate-500 mt-1">
              Manage your active mentorships and schedule sessions.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {myMentors.map((mentor) => (
              <MyMentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            FIND A MENTOR
        ══════════════════════════════════════════ */}
        <div>
          {/* Section Header */}
          <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
            <div>
              <h2 className="text-[22px] font-bold text-slate-900">Find a Mentor</h2>
              <p className="text-[14px] text-slate-500 mt-1">
                Connect with alumni willing to share their experience and guide you.
              </p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white shadow-sm">
              <Search size={15} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by role, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-[14px] text-slate-700 placeholder:text-slate-400 w-[200px]"
              />
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((mentor) => (
                <AvailableMentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-16 text-slate-400 text-[14px]">
              No mentors found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}