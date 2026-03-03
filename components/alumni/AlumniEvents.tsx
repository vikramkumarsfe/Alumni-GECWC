'use client'
import {  Search,  Calendar, MapPin, Video, Tag, ArrowUpDown, ChevronDown, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import useSWR from "swr"
import { fetcher } from "@/utils/fetcher"
import { Skeleton } from "antd"
import ErrorState from "../shared/Errorstate"
import { useEffect, useState } from "react"
import moment from "moment"


const AlumniEvents = () => {
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

  
  return (
    <div className="flex flex-col gap-8 lg:py-8 lg:px-12 p-4 bg-slate-100 min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          Stay connected with alumni gatherings, webinars, and professional workshops.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-10" />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" /> Date <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>Next Month</DropdownMenuItem>
              <DropdownMenuItem>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Tag className="h-4 w-4" /> Event Type <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Conference</DropdownMenuItem>
              <DropdownMenuItem>Workshop</DropdownMenuItem>
              <DropdownMenuItem>Reunion</DropdownMenuItem>
              <DropdownMenuItem>Social</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* --- UPCOMING EVENTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <Card key={event._id} className="overflow-hidden flex flex-col group transition-all hover:shadow-md">
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={event.bannerImage || "/images/event_pic.jpg"} 
                alt={event.title} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white backdrop-blur-md">
                {event.category}
              </Badge>
            </div>
            <CardHeader className="space-y-1 flex-none">
              <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors cursor-pointer">
                {event.title}
              </CardTitle>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{moment(event.date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                </div>
                <div className="flex items-center gap-2">
                  {event.isOnline ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                  <span>{event.venueName} . {event.venueAddress}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {event.description}
              </p>
            </CardContent>
            <CardFooter className="gap-3">
              <Button className="flex-1">RSVP Now</Button>
              <Link href={`/alumni/events/${event._id}`}>
                <Button variant="outline" className="flex-1">Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* --- PAST EVENTS SECTION --- */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-bold">Past Events</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-80">
          {pastEvents.map((event) => (
            <Card key={event._id} className="overflow-hidden bg-slate-50/50 grayscale-[0.5] hover:grayscale-0 transition-all">
              <div className="relative h-32 w-full">
                <img src={event.bannerImage || "/images/event_pic.jpg"} alt={event.title} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/20" />
                <Badge variant="secondary" className="absolute top-2 right-2">Completed</Badge>
              </div>
              <CardHeader className="p-4 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{event.category}</p>
                <CardTitle className="text-sm line-clamp-1">{event.title}</CardTitle>
                <CardDescription className="text-xs">{moment(event.date).format('MMMM Do YYYY, h:mm:ss a')}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs gap-2" >
                   <ImageIcon className="h-3 w-3" /> View Gallery
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlumniEvents