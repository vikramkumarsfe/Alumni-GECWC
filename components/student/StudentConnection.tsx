"use client";
import { useEffect, useState } from "react";
import { Users, UserPlus, Send, BookOpen, Calendar, MapPin, MessageCircle, User, UserMinus, Briefcase, Clock, Search, UsersRound } from "lucide-react";
import { Button } from "../ui/button";
import EmptyState from "../shared/emptyState";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import { message, Skeleton, Button as AntdButton } from "antd";
import ErrorState from "../shared/Errorstate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";
import Link from "next/link";


function ConnectionCard({ c }: { c: any }) {
    const [ loadingId, setLoadingId] = useState<string | null>(null)

    const handleCancelRequest = async(id: string) => {
        try {
            setLoadingId(id)
            const data =await axios.delete(`/api/connection/${id}`)
            mutate('/api/connection/all')
            message.success("Connection removed")
        }
        catch(err)
        {
            return clientCatchError(err)
        }
        finally {
            setLoadingId(null)
        }
    }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-14 h-14 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
            <AvatarImage src={c.otherUser.image || "/images/alumni.png"} alt={c.otherUser.fullname || "N/A"} />
            <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                {c.otherUser.fullname
                    .split(" ")
                    .map((n : any) => n[0])
                    .join("")}
            </AvatarFallback>
        </Avatar>
        <p className="text-[16px] font-semibold text-slate-900 truncate w-full">{c.otherUser.fullname || "N/A"}</p>
        <p className="text-[13px] text-slate-500 truncate w-full">{c.otherUser.profile.headline || "N/A"} @ {c.otherUser.company || "N/A"}</p>
      </div>
      <div className="flex flex-col gap-2 py-4 border-t border-b border-slate-100">
        <div className="flex items-center gap-2 text-[13px] text-slate-500"><BookOpen size={15} />{c.otherUser.branch || "N/A"}</div>
        <div className="flex items-center gap-2 text-[13px] text-slate-500"><Calendar size={15} />Batch of {c.otherUser.batch || "N/A"}</div>
        <div className="flex items-center gap-2 text-[13px] text-slate-500"><MapPin size={15} />{c.otherUser.address.city || "city"} , {c.otherUser.address.state || "state"}</div>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/student/chat" className="w-full">
            <Button size="sm" className="flex-1 gap-1.5 cursor-pointer w-full"><MessageCircle size={15} />Message</Button>
        </Link>
        <Link href={`/student/alumni-profile/${c.otherUser._id}`}>
            <Button size="sm" variant="outline" className="flex-1 gap-1.5 cursor-pointer "><User size={15} />Profile</Button>
        </Link>
        <Button size="sm" variant="outline" className="w-9 h-9 p-0 cursor-pointer" title="Remove" onClick={()=> handleCancelRequest(c._id)}><UserMinus size={15} /></Button>
      </div>
    </div>
  );
}

function RequestRow({ r, type }: { r: any, type: "pending" | "sent" }) {
    const [ loadingId, setLoadingId] = useState<string | null>(null)

    const handleCancelRequest = async(id: string) => {
        try {
            setLoadingId(id)
            const data =await axios.delete(`/api/connection/${id}`)
            mutate('/api/connection/all')
            message.success("Request Cancelled")
        }
        catch(err)
        {
            return clientCatchError(err)
        }
        finally {
            setLoadingId(null)
        }
    }

    const handleApprove = async(id : string) => {
        try {
            setLoadingId(id)

            const payload = {
                status : "approved"
            }
            const data = await axios.put(`/api/connection/${id}`, payload)

            message.success("Approved the request")
            mutate('/api/connection/all')
        }
        catch(err)
        {
            return clientCatchError(err)
        }
        finally {
            setLoadingId(null)
        }
    }
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 px-6 flex items-center gap-5 shadow-sm">
      <Avatar className="w-14 h-14 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
            <AvatarImage src={r.otherUser.image || "/images/alumni.png"} alt={r.otherUser.fullname || "N/A"} />
            <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                {r.otherUser.fullname
                    .split(" ")
                    .map((n : any) => n[0])
                    .join("")}
            </AvatarFallback>
        </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-[16px] font-semibold text-slate-900">{r.otherUser.fullname}</p>
        <div className="flex items-center gap-2 text-[13px] text-slate-500 flex-wrap">
          <Briefcase size={13} />{r.otherUser.profile.headline || "N/A"} at {r.otherUser.company || "N/A"}
          <span className="text-slate-200">|</span>
          <Calendar size={13} />Batch of {r.otherUser.batch || "N/A"}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {type === "pending" ? (
          <>
            <AntdButton 
                type="primary"
                danger
                size="large"
                variant="outlined" 
                className="cursor-pointer !px-4 !py-3" 
                onClick={()=> handleCancelRequest(r._id) } 
                loading={ r._id === loadingId}    
            >Reject</AntdButton>
            <Button size="sm" className="cursor-pointer" onClick={()=>handleApprove(r._id)}>Accept</Button>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1.5 text-amber-500 text-[13px] font-medium"><Clock size={15} />Pending</span>
            <AntdButton 
                type="primary"
                size="large"
                variant="outlined" 
                className="cursor-pointer !px-4 !py-3" 
                onClick={()=> handleCancelRequest(r._id) } 
                loading={ r._id === loadingId}    
            >Cancel Request</AntdButton>
          </>
        )}
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────

//const TABS = [`All Connections (${CONNECTIONS.length})`, `Pending Requests (${PENDING.length})`, `Sent Requests (${SENT.length})`];

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const [connections, setConnections] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [requested, setRequested] = useState<any[]>([])

  const { data, isLoading, error } = useSWR('/api/connection/all', fetcher)

    useEffect(() => {
      if (data) {
        setConnections(data.connected)
        setRequested(data.sent)
        setRequests(data.received)
      }
    }, [data])

    if(isLoading)
      return <Skeleton active />
  
    if(error)
      return <ErrorState />

    const PENDING = requests || []
    const CONNECTIONS = connections || []
    const SENT = requested || []

    console.log(SENT)

    const TABS = [`All Connections (${CONNECTIONS.length})`, `Pending Requests (${PENDING.length})`, `Sent Requests (${SENT.length})`];
    
  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="px-8 py-6 flex flex-col gap-5">

        {/* Header */}
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 mb-1">My Connections</h1>
          <p className="text-[14px] text-slate-500">Manage your alumni network and stay connected</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: <Users size={22} />,   value: 42, label: "Total Connections",          bg: "#eff6ff", color: "#2563eb" },
            { icon: <UserPlus size={22} />, value: 5,  label: "Pending Requests Received",  bg: "#fffbeb", color: "#f59e0b" },
            { icon: <Send size={22} />,     value: 8,  label: "Pending Requests Sent",       bg: "#f1f5f9", color: "#475569" },
          ].map(({ icon, value, label, bg, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg, color }}>{icon}</div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="text-[13px] text-slate-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-slate-200">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-[14px] cursor-pointer font-medium border-b-2 transition-colors -mb-px ${activeTab === i ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 0 && (
          CONNECTIONS.length > 0
            ? <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{CONNECTIONS.map(c => <ConnectionCard key={c.id} c={c} />)}</div>
            : <EmptyState />
        )}
        {activeTab === 1 && (
          PENDING.length > 0
            ? <div className="flex flex-col gap-4">{PENDING.map(r => <RequestRow key={r.id} r={r} type="pending" />)}</div>
            : <EmptyState />
        )}
        {activeTab === 2 && (
          SENT.length > 0
            ? <div className="flex flex-col gap-4">{SENT.map(r => <RequestRow key={r.id} r={r} type="sent" />)}</div>
            : <EmptyState />
        )}

      </div>
    </div>
  );
}