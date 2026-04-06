import ErrorState from "@/components/shared/Errorstate"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetcher } from "@/utils/fetcher"
import { Empty, Skeleton } from "antd"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

const IncomingRequests = () =>{

    const { data, isLoading, error } = useSWR('/api/connection/all', fetcher)

    if (isLoading) 
        return 
            <div className="p-8">
                <Skeleton active avatar paragraph={{ rows: 4 }} />
            </div>;

    if (error) 
        return <ErrorState />

    const PENDING = data?.received.slice(0,3) || []

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-indigo-600" /> Incoming Requests
          </CardTitle>
          <Link href="/alumni/connections">
            <Button className="cursor-pointer bg-slate-50 text-black hover:text-white" >
                View all
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 flex flex-col divide-y divide-slate-100">
        {PENDING.length === 0 ?
        <Empty />
        :
        PENDING.map((r : any) => (
          <div key={r.otherUser.fullname || "N/A"} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11">
                <AvatarImage src={r.otherUser.image || "/images/alumni.png"} />
                <AvatarFallback>{r.otherUser.fullname[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-slate-900">{r.otherUser.fullname || "N/A"}</p>
                <p className="text-xs text-slate-500 mt-0.5">{r.otherUser.profile.headline || "N/A"}</p>
              </div>
            </div>
            <div className="flex gap-2">
                <Link href="/alumni/connections">
                    <Button variant="outline" size="sm" className="h-8 text-xs cursor-pointer">Review Request</Button>
                </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default IncomingRequests