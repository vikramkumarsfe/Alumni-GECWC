import React from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  UserCircle, 
  ArrowLeft, 
} from "lucide-react";

// Shadcn UI Primitives
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const AlumniEventDetails = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:px-8  md:py-6 bg-slate-50">
      <div className="mx-auto space-y-6">
        
        <Link href="/alumni/events" className="block mb-3">
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:bg-transparent hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Button>
        </Link>

        {/* Hero Section */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
            alt="Event Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end">
            <Badge className="w-fit mb-3 bg-slate-50 text-black">Annual Reunion</Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">Grand Alumni Homecoming 2024</h1>
            <div className="flex flex-wrap gap-4 md:gap-8 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-2"><Calendar size={18} /> Oct 15, 2024</span>
              <span className="flex items-center gap-2"><MapPin size={18} /> University Auditorium</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Description & Schedule */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">About the Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-slate-600 leading-relaxed text-[15px] space-y-4">
                  <p>Reconnect with old classmates, share your professional journey, and see how much the campus has changed. This homecoming features networking sessions, department tours, and a special address from the Dean.</p>
                  <p>Whether you graduated last year or 40 years ago, there is a place for you at this celebration of our shared heritage.</p>
                </div>

                <Separator className="bg-slate-100" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Event Schedule</h3>
                  <div className="space-y-4">
                    <AgendaRow time="09:00 AM" event="Registration & Networking" />
                    <AgendaRow time="11:30 AM" event="Main Hall Keynote" />
                    <AgendaRow time="01:00 PM" event="Alumni Buffet Lunch" />
                    <AgendaRow time="03:30 PM" event="Department Breakout Sessions" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Registration Card */}
          <div className="space-y-6">
            <Card className="sticky top-8 border-none shadow-xl">
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-5">
                  <DetailItem icon={<Clock />} label="Date & Time" value="Oct 15, 2024 • 9AM - 5PM" />
                  <DetailItem icon={<MapPin />} label="Venue" value="Main Hall, Block A" />
                  <DetailItem icon={<UserCircle />} label="Organizer" value="Alumni Relations Office" />
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider">Availability</span>
                    <span className="text-sm font-bold">45 / 200</span>
                  </div>
                </div>

                <Button className="w-full h-12 text-base font-bold shadow-lg cursor-pointer" variant="ghost">
                  RSVP for Event
                </Button>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Attending Alumni</p>
                  <div className="flex justify-center -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Avatar key={i} className="border-2 border-white h-10 w-10">
                        <AvatarImage src={`https://i.pravatar.cc/100?u=${i + 10}`} />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 border-2 border-white text-[10px] font-bold text-slate-600">
                      +123
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AlumniEventDetails

function AgendaRow({ time, event }: { time: string; event: string }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-20 font-bold text-blue-600 shrink-0">{time}</span>
      <span className="text-slate-600">{event}</span>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-3">
      <div className="text-blue-500 mt-0.5">{icon}</div>
      <div>
        <h4 className="text-sm font-bold text-slate-900">{label}</h4>
        <p className="text-sm text-slate-500 leading-tight">{value}</p>
      </div>
    </div>
  );
}