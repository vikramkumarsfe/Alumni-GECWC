"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import { Button } from "../ui/button";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Skeleton } from "antd";
import ErrorState from "../shared/Errorstate";
import moment from "moment";

function EventCard({ event }: { event: any }) {

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-[160px] w-full bg-blue-50 flex-shrink-0">
        <img
          src={'/images/event_pic.jpg'}
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
        <div className="absolute top-4 right-4 bg-slate-50 rounded-xl px-2.5 py-2 flex flex-col items-center shadow-md min-w-[54px]">
          <span className="text-[10px] text-gray-400 uppercase leading-none">
            { moment(event.date).format('MMMM Do YYYY') }
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
            <span>{ moment(event.date).format('MMMM Do YYYY, h:mm a') }</span>
          </div>
          <div className="flex items-start gap-2.5 text-[13px] text-slate-500">
            <MapPin size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
            <span> {event.venueName} • {event.venueAddress}</span>
          </div>
          <div className="flex items-start gap-2.5 text-[13px] text-slate-500">
            <Mic size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
            <span>{event.organizerName}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <Link href={`/student/events/${event._id}`} className="w-full">
                <Button variant="outline" className="w-full cursor-pointer">View Details</Button>
              </Link>
        </div>
      </div>
    </div>
  );
}

const TABS = ["Upcoming Events", "Past Events"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const [pastEvents, setPastEvents] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  
  const { data, isLoading, error } = useSWR('/api/event', fetcher)

  useEffect(() => {
      if (data?.events) {
        const upcoming = data.events.filter(
          (event: any) => event.status === "upcoming"
        )
  
        const past = data.events.filter(
          (event: any) => event.status === "completed"
        )
  
        setUpcomingEvents(upcoming)
        setPastEvents(past)
      }
    }, [data])

    if(isLoading)
      return <Skeleton active />
  
    if(error)
      return <ErrorState />

  const displayEvents = activeTab === 0 ? upcomingEvents : pastEvents;

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
              className={`px-4 py-3 text-[14px] cursor-pointer font-medium border-b-2 transition-colors -mb-px ${
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
        {displayEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayEvents.map((event) => (
              <EventCard key={event._id} event={event} />
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