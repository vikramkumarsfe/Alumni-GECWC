'use client'
import ErrorState from "@/components/shared/Errorstate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/utils/fetcher";
import { Empty, Skeleton } from "antd";
import moment from "moment";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

interface childrenInterface {
    link?: string
}

const RecentChats: FC<childrenInterface> = ({ link = "/student/chats" }) => {
    const { data: connections, error, isLoading } = useSWR('/api/connection', fetcher)
    const [chats, setChats] = useState<any[] | null>(null)

    useEffect(() => {
        if (connections) {
            // Slice to get only recent 3 chats
            setChats(connections.slice(0, 3))
        }
    }, [connections])

    if (error) return <ErrorState />;
    if (isLoading) 
      return <Card className="p-6 shadow-none border-slate-200"><Skeleton active /></Card>;

    return (
        <Card className="border border-slate-200 shadow-none bg-transparent">
            <CardHeader className="px-6 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-bold text-slate-800 tracking-tight">
                    Recent Messages
                </CardTitle>
                <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-semibold" asChild>
                    <Link href={link}>Open Inbox</Link>
                </Button>
            </CardHeader>

            <CardContent className="px-4 pb-4">
                <div className="flex flex-col gap-3">
                    {chats && chats.map((chat: any) => (
                        <div 
                            key={chat.user._id || chat.user.fullname} 
                            className="group flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                        >
                            {/* Avatar Section */}
                            <Avatar className="w-12 h-12 rounded-full border border-slate-200 shadow-sm flex-shrink-0">
                                <AvatarImage src={chat.user.image || "/images/alumni.png"} alt={chat.user.fullname} />
                                <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-sm">
                                    {chat.user.fullname?.split(" ").map((n: any) => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>

                            {/* Content Section */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                        {chat.user.fullname}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                                        {moment(chat.updatedAt).fromNow(true)}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate leading-relaxed">
                                    {chat.lastMsg || "No messages yet"}
                                </p>
                            </div>
                        </div>
                    ))}

                    {chats?.length === 0 && <Empty/>}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentChats;