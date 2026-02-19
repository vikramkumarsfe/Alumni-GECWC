import React from "react";
import { Calendar, MapPin, Clock, UserCircle, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const  AlumniEventDetails = () =>
{
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 lg:px-8 lg:py-6">
          <div className=" mx-auto space-y-6">
            <Link href="/alumni/events" className="mb-3 block">
                <Button variant="ghost" className="p-0 text-muted-foreground hover:bg-transparent hover:text-primary">
                <ArrowLeft className=" h-4 w-4" /> Back to Events
                </Button>
            </Link>
            <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                alt="Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                <Badge className="w-fit mb-3 bg-primary">Annual Reunion</Badge>
                <h1 className="text-3xl font-bold text-white mb-3">Grand Alumni Homecoming 2024</h1>
                <div className="flex flex-wrap gap-6 text-white/90 text-sm">
                  <div className="flex items-center gap-2 font-medium"><Calendar size={16} /> October 15, 2024</div>
                  <div className="flex items-center gap-2 font-medium"><MapPin size={16} /> University Main Auditorium</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-xl">About the Event</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-slate-600 leading-relaxed space-y-4 text-[15px]">
                      <p>We are thrilled to invite you back to campus for the Grand Alumni Homecoming 2024! This year marks a special milestone as we celebrate the 50th anniversary of our university.</p>
                      <p>The day will be packed with exciting activities including campus tours, department showcases, a networking lunch, and an evening gala dinner. We have invited distinguished alumni speakers to share their journey and insights.</p>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Event Agenda</h3>
                      <div className="grid gap-4">
                        <AgendaItem time="09:00 AM" title="Registration & Welcome Breakfast" />
                        <AgendaItem time="10:30 AM" title="Keynote Speech by Distinguished Alumni" />
                        <AgendaItem time="01:00 PM" title="Networking Lunch" />
                        <AgendaItem time="06:00 PM" title="Cultural Night & Gala Dinner" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-6 border-slate-200 shadow-md">
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-5">
                      <DetailRow icon={<Clock className="text-primary" size={20} />} label="Date & Time" value="Oct 15, 2024 • 09:00 AM" />
                      <DetailRow icon={<MapPin className="text-primary" size={20} />} label="Venue" value="Main Auditorium, Block A" />
                      <DetailRow icon={<UserCircle className="text-primary" size={20} />} label="Organizer" value="Alumni Relations Office" />
                      <DetailRow icon={<Mail className="text-primary" size={20} />} label="Contact" value="alumni@university.edu" />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-500">Seats Available</span>
                      <span className="text-sm font-bold">45 / 200</span>
                    </div>

                    <Button className="w-full bg-primary py-6 text-base font-semibold shadow-blue-200 shadow-lg">
                      RSVP Now
                    </Button>

                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">128 Alumni Attending</p>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <Avatar key={i} className="border-2 border-white h-9 w-9">
                            <AvatarImage src={`https://i.pravatar.cc/100?u=${i}`} />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 border-2 border-white text-[10px] font-bold text-slate-600">
                          +124
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="h-10" />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AlumniEventDetails

function AgendaItem({ time, title }: { time: string; title: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-sm font-bold text-primary w-20 shrink-0">{time}</span>
      <span className="text-sm text-slate-600">{title}</span>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-900 leading-none mb-1">{label}</p>
        <p className="text-sm text-slate-500 leading-snug">{value}</p>
      </div>
    </div>
  );
}