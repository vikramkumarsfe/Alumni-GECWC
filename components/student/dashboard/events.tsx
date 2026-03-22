import ErrorState from "@/components/shared/Errorstate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetcher } from "@/utils/fetcher"
import { Skeleton } from "antd"
import { Book, ChevronRight } from "lucide-react"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"

const UpcomingEvents = () => {
    const { data, isLoading, error } = useSWR('/api/event', fetcher)
    const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])

    useEffect(() => {
        if (data?.events) {
            const data1 = data.events.slice(0,3)
            const upcoming = data1.filter(
                (event: any) => event.status === "upcoming"
            )
            setUpcomingEvents(upcoming)
        }
    }, [data])

    if(isLoading)
      return <Skeleton active />
  
    if(error)
      return <ErrorState />

    console.log(data)
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="px-5 py-4 flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold text-slate-800">Upcoming Events</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm" asChild>
          <Link href="/student/events">
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        <div className="flex flex-col divide-y divide-slate-100">
          {upcomingEvents.map((event) => (
            <div key={event.title} className="py-3 flex flex-col gap-2 overflow-hidden">
              <p className="text-sm font-semibold text-slate-800">{event.title}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Book className="h-3.5 w-3.5" />
                  {moment(event.date).format('ll')}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Book className="h-3.5 w-3.5" />
                  {event.venueAddress}
                </div>
                </div>
                <Link href={`/student/events/${event._id}`}>
                    <Button
                    size="sm"
                    className="h-7 px-3 text-xs bg-slate-50  hover:bg-slate-100 border-0 cursor-pointer"
                    variant="outline"
                    >
                    Event Details
                    </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
export default UpcomingEvents