"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Video,
  Users,
  Clock,
  MapPin,
  Mic,
  Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Event {
  id: number;
  title: string;
  type: "Online" | "In-Person";
  month: string;
  day: string;
  time: string;
  location: string;
  speaker: string;
  image: string;
  attendees: string[];
  attendeeCount: string;
  rsvped: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const eventsData: Event[] = [
  {
    id: 1,
    title: "Transitioning from College to Tech Industry",
    type: "Online",
    month: "Nov",
    day: "12",
    time: "6:00 PM - 7:30 PM (IST)",
    location: "Zoom Link will be provided upon RSVP",
    speaker: "Priya Singh, Senior SDE at Google",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/44df3460-58bd-4946-9d0e-741fc578b89c.jpg",
    attendees: [
      "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F2",
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F3",
      "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F4",
    ],
    attendeeCount: "+42 attending",
    rsvped: false,
  },
  {
    id: 2,
    title: "Annual Alumni Networking Mixer 2025",
    type: "In-Person",
    month: "Nov",
    day: "18",
    time: "4:00 PM - 8:00 PM (IST)",
    location: "Main Auditorium, University Campus",
    speaker: "Multiple Industry Experts",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/6ed09875-4c05-4019-8a42-4de777366096.jpg",
    attendees: [
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FSouth%20Asian%2F1",
      "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F1",
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F4",
    ],
    attendeeCount: "+128 attending",
    rsvped: true,
  },
  {
    id: 3,
    title: "Startup Funding 101 for Student Founders",
    type: "Online",
    month: "Nov",
    day: "24",
    time: "5:00 PM - 6:30 PM (IST)",
    location: "Google Meet",
    speaker: "Rahul Verma, Founder at TechNova",
    image: "https://storage.googleapis.com/banani-generated-images/generated-images/314cae10-7278-4c5f-a207-e3e267a4d9a6.jpg",
    attendees: [
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F5",
      "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F1",
    ],
    attendeeCount: "+24 attending",
    rsvped: false,
  },
];

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ event }: { event: Event }) {
  const [rsvped, setRsvped] = useState(event.rsvped);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-[160px] w-full bg-blue-50 flex-shrink-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Type badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[12px] font-semibold text-slate-800">
          {event.type === "Online" ? (
            <Video size={13} className="text-blue-600" />
          ) : (
            <Users size={13} className="text-blue-600" />
          )}
          {event.type}
        </div>

        {/* Date badge */}
        <div className="absolute top-4 right-4 bg-white rounded-xl px-2.5 py-2 flex flex-col items-center shadow-md min-w-[54px]">
          <span className="text-[11px] font-bold text-blue-600 uppercase leading-none">
            {event.month}
          </span>
          <span className="text-[20px] font-bold text-slate-900 leading-tight mt-0.5">
            {event.day}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <h3 className="text-[18px] font-bold text-slate-900 leading-snug">
          {event.title}
        </h3>

        {/* Details */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2.5 text-[13px] text-slate-500">
            <Clock size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start gap-2.5 text-[13px] text-slate-500">
            <MapPin size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-start gap-2.5 text-[13px] text-slate-500">
            <Mic size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
            <span>{event.speaker}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          {/* Attendees */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {event.attendees.map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt="Attendee"
                  className="w-7 h-7 rounded-full object-cover border-2 border-white"
                  style={{ marginLeft: i === 0 ? 0 : -8 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://ui-avatars.com/api/?name=U&background=e2e8f0&color=475569&size=28";
                  }}
                />
              ))}
            </div>
            <span className="text-[12px] font-medium text-slate-500">
              {event.attendeeCount}
            </span>
          </div>

          {/* RSVP Button */}
          {rsvped ? (
            <button
              onClick={() => setRsvped(false)}
              className="flex items-center gap-1.5 px-4 h-9 border border-blue-500 rounded-lg text-[13px] font-medium text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              <Check size={14} />
              Going
            </button>
          ) : (
            <button
              onClick={() => setRsvped(true)}
              className="flex items-center gap-1.5 px-4 h-9 bg-blue-600 hover:bg-blue-700 rounded-lg text-[13px] font-medium text-white transition-colors"
            >
              RSVP Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = ["Upcoming Events", "My RSVPs", "Past Events"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = eventsData.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.speaker.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="px-8 py-6 flex flex-col gap-5">

        {/* ── Page Header ── */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-[28px] font-bold text-slate-900 mb-1">
              Discover Events
            </h1>
            <p className="text-[14px] text-slate-500">
              Join workshops, webinars, and networking sessions hosted by alumni and the university.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 h-10 bg-white border border-slate-200 rounded-lg w-[260px]">
              <Search size={16} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-[14px] text-slate-700 placeholder:text-slate-400 w-full"
              />
            </div>
            <button className="flex items-center gap-2 px-4 h-10 bg-white border border-slate-200 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
              <SlidersHorizontal size={15} className="text-slate-500" />
              Filters
            </button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-0 border-b border-slate-200">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-[14px] font-medium border-b-2 transition-colors -mb-px ${
                activeTab === i
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Events Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 text-slate-400 text-[14px]">
            No events found matching your search.
          </div>
        )}

      </div>
    </div>
  );
}