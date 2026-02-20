'use client'
import {  Users, Calendar, Briefcase, Megaphone, Edit3, Search, MapPin, ChevronRight, Clock, FileText, BellRing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useSWR, { mutate } from "swr"
import { fetcher } from "@/utils/fetcher"
import { message, Skeleton } from "antd"
import ErrorState from "../shared/Errorstate"
import { useEffect, useState } from "react"
import moment from "moment"
import axios from "axios"
import clientCatchError from "@/utils/clientCatchError"
import { useSession } from "next-auth/react"


const STATS = [
  { label: "Total Connections", value: "0", icon: Users,},
  { label: "Upcoming Events", value: "0", icon: Calendar},
  { label: "Applied Jobs", value: "0", icon: FileText},
  { label: "New Notices", value: "0", icon: BellRing},
]

const EVENTS = [
  {
    title: "Annual Tech Symposium",
    date: "Oct 15, 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600"
  },
  {
    title: "Winter Alumni Dinner",
    date: "Nov 20, 2026",
    time: "7:00 PM",
    location: "Hotel Grand Central",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600"
  },
  {
    title: "Start-up Career Fair",
    date: "Dec 05, 2026",
    time: "9:00 AM",
    location: "Campus Grounds",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600"
  }
]

export default function AlumniDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const { data : Event, isLoading, error } = useSWR('/api/event', fetcher)
  const { data: session, status, update } = useSession()
  const userId = session?.user.id

  useEffect(() => {
      if (Event?.events) {
        const upcoming = Event.events.filter(
          (event: any) => event.status === "upcoming"
        )

        setUpcomingEvents(upcoming)
      }
    }, [Event])

  if(isLoading)
    return <Skeleton active />

  if(error)
    return <ErrorState />

  console.log(upcomingEvents)

    const rsvpNow = async( id : string) => {
    try {
      const payload = {
        eventId : id
      }

      const { data } = await axios.put('/api/event/add-rsvp', payload)

      message.success("You are now attending the Event")
      mutate(`/api/event/${id}`)
    }
    catch(err)
    {
      return clientCatchError(err)
    }
  }

  const getUser = () => {

    if(data.attendees.includes(userId))
    {
      return true
    }
    return false
  }

  const cancelRSVP = async(id : string) => {
    try {
      const payload = {
        eventId : id
      }

      const { data } = await axios.put('/api/event/remove-rsvp', payload)

      message.success("Event schedule is updated!!")
      mutate(`/api/event/${id}`)
    }
    catch(err)
    {
      return clientCatchError(err)
    }
  }
  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-8 bg-slate-100 min-h-screen">
      
      <section className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back, <span className="text-violet-600">Vikram!</span>
            </h1>
            <p className="text-slate-500 max-w-md">
              You have 3 new connection requests and 2 upcoming events this week.
            </p>
          </div>
          <div className="w-full md:w-72 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-600">Profile Strength</span>
              <span className="font-bold text-violet-600">75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-[11px] text-slate-400">Add your work experience to reach 100%</p>
          </div>
        </div>
        {/* Subtle decorative background blob */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-50/50 blur-3xl" />
      </section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm ring-1 ring-slate-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-xl p-3`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- QUICK ACTIONS --- */}
      <Card className="border-dashed bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">Quick Access</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
            <Edit3 className="mr-2 h-4 w-4" /> Update Profile
          </Button>
          <Button size="sm" variant="outline" className="bg-white">
            <Search className="mr-2 h-4 w-4" /> Find Alumni
          </Button>
          <Button size="sm" variant="outline" className="bg-white">
            <Briefcase className="mr-2 h-4 w-4" /> Post a Job
          </Button>
        </CardContent>
      </Card>

      {/* --- MAIN CONTENT SPLIT --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* EVENTS SECTION (LEFT 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-slate-900">Recommended Events</h2>
            <Button variant="ghost" className="text-violet-600 hover:text-violet-700 font-semibold text-sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.slice(0, 2).map((event: any) => (
              <div key={event.title} className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={event.bannerImage} 
                    alt={event.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-violet-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 gap-3">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {`${moment(event.date).format('MMMM Do YYYY')}`}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {`${event.startTime} - ${event.endTime}`}</span>
                    </div>
                    <p className="flex items-center text-sm text-slate-500 gap-1"><MapPin size={14} /> {event.venueName}</p>
                  </div>
                  <Button className="w-full bg-slate-900 hover:bg-violet-600 transition-colors" onClick={()=>}>Register Interest</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ANNOUNCEMENTS (RIGHT 1/3) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-slate-900">Latest Notices</h2>
            <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-100">New</Badge>
          </div>

          <div className="space-y-4">
            {[
              { title: "Convocation 2026", date: "2 hrs ago", type: "Official" },
              { title: "Alumni Meetup '26", date: "Yesterday", type: "Event" },
              { title: "Placement Drive", date: "2 days ago", type: "Career" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border bg-white hover:border-violet-200 transition-colors cursor-pointer shadow-sm">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                  <Megaphone size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500">New registration updates for the batch 2022-26...</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{item.date}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-slate-500 text-xs py-6 border-2 border-dashed border-slate-100 rounded-xl hover:bg-slate-50">
              Check Archive
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}