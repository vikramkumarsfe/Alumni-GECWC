'use client'
import React, { useEffect } from "react";
import {  Calendar, MapPin, Clock, UserCircle, ArrowLeft} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import { message, Skeleton } from "antd";
import moment from "moment";
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";
import { useSession } from "next-auth/react";

const AlumniEventDetails = () => {
  const pathname = usePathname()
  const id = pathname.split('/').pop()
  const { data: session, status, update } = useSession();
  const userId = session?.user.id
  const { data , error, isLoading } = useSWR(`/api/event/${id}`, fetcher)
  
  if(error)
    return <ErrorState />

  if(isLoading)
    return <Skeleton active />

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
    <main className="flex-1 overflow-y-auto p-4 md:px-8  md:py-6 bg-slate-50">
      <div className="mx-auto space-y-6">
        
        <Link href="/alumni/events" className="block mb-3">
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:bg-transparent hover:text-primary cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Button>
        </Link>
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
            alt="Event Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end">
            <Badge className="w-fit mb-3 bg-slate-50 text-black">{data.category}</Badge>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">{data.title}</h1>
            <div className="flex flex-wrap gap-4 md:gap-8 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-2"><Calendar size={18} />{moment(data.date).format('MMMM Do YYYY, h:mm:ss a')}</span>
              <span className="flex items-center gap-2"><MapPin size={18} /> {data.venueName}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">About the Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-slate-600 leading-relaxed text-[15px] space-y-4">
                  <p>{data.description}</p>
                </div>

                <Separator className="bg-slate-100" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Event Schedule</h3>
                  <div className="space-y-4">
                    {
                      data && data.agenda.map((item: any, index: number)=>(
                        <AgendaRow time={item.time} event={item.title} key={index}/>
                      ))
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="sticky top-8 border-none shadow-xl">
              <CardContent className="pt-8 space-y-6">
                <div className="space-y-5">
                  <DetailItem icon={<Clock />} label="Date & Time" value={`${moment(data.date).format('MMMM Do YYYY')} • ${data.startTime} - ${data.endTime}`} />
                  <DetailItem icon={<MapPin />} label="Venue" value={data.venueAddress} />
                  <DetailItem icon={<UserCircle />} label="Organizer" value={data.organizerName}/>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider">Seat Filled</span>
                    <span className="text-sm font-bold">{data.attendees.length} / {data.capacity}</span>
                  </div>
                </div> 
                {
                  data && getUser() ? 
                  <Button className="w-full h-12 text-base font-bold shadow-lg cursor-pointer bg-rose-400 hover:bg-rose-600" variant="ghost" onClick={()=>cancelRSVP(data._id)}>
                    Cancel the RSVP
                  </Button>
                  :
                  <Button className="w-full h-12 text-base font-bold shadow-lg cursor-pointer" variant="ghost" onClick={()=>rsvpNow(data._id)}>
                    RSVP for Event
                  </Button>
                }

                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Attending Alumni</p>
                  <div className="flex justify-center -space-x-2">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 border-2 border-white text-[10px] font-bold text-slate-600">
                      {data.attendees.length }
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