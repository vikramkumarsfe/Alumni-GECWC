import ErrorState from "@/components/shared/Errorstate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/utils/fetcher";
import { Skeleton } from "antd";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const RecentChats = () =>  {

    const { data: connections, error, isLoading } = useSWR('/api/connection', fetcher)
    const [chats, setChats] = useState<any | null>(null)

    useEffect(() => {
            if (connections) {
                const chat = connections.slice(0,3)
                setChats(chat)
            }
        }, [connections])

    if (error) 
    return <ErrorState />;

  if (isLoading) 
    return <Skeleton active className="p-10" />

  console.log(connections)
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="px-5 py-4 flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold text-slate-800">Recent Chats</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm" asChild>
          <Link href="/student/chat">Open Inbox</Link>
        </Button>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        <div className="flex flex-col divide-y divide-slate-100">
          {chats && chats.map((chat : any) => (
            <div key={chat.user.fullname || "N/A"} className="flex items-start gap-3 py-3">
              <Avatar className="w-14 h-14 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
                    <AvatarImage src={chat.user.image || "/images/alumni.png"} alt={chat.user.fullname || "N/A"} />
                    <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                        {chat.user.fullname
                            .split(" ")
                            .map((n : any) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-800">{chat.user.fullname}</span>
                  <span className="text-[11px] text-slate-400">{moment(chat.updatedAt).fromNow()}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentChats
