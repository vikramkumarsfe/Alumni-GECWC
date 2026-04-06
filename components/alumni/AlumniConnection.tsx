"use client";
import { useEffect, useState } from "react";
import { Users, UserPlus, Send, BookOpen, Calendar, MapPin, MessageCircle, User, UserMinus, Briefcase, Clock } from "lucide-react";
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
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCancelRequest = async (id: string) => {
    try {
      setLoadingId(id);
      await axios.delete(`/api/connection/${id}`);
      mutate('/api/connection/all');
      message.success("Connection removed");
    } catch (err) {
      return clientCatchError(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-16 h-16 rounded-full border border-slate-100 shadow-sm mb-2">
          <AvatarImage src={c.otherUser.image || "/images/alumni.png"} alt={c.otherUser.fullname || "N/A"} />
          <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-lg">
            {c.otherUser.fullname?.split(" ").map((n: any) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <p className="text-base font-bold text-slate-900 truncate w-full">{c.otherUser.fullname || "N/A"}</p>
        <p className="text-sm text-slate-500 line-clamp-1 w-full">
          {c.otherUser.profile?.headline || "N/A"} @ {c.otherUser.company || "N/A"}
        </p>
      </div>
      
      <div className="flex flex-col gap-2 py-4 border-t border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-500"><BookOpen size={14} />{c.otherUser.branch || "N/A"}</div>
        <div className="flex items-center gap-2 text-sm text-slate-500"><Calendar size={14} />Batch of {c.otherUser.batch || "N/A"}</div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{c.otherUser.address?.city || "City"}, {c.otherUser.address?.state || "State"}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href="/alumni/chats" className="flex-1 min-w-[100px]">
          <Button size="sm" className="w-full gap-1.5 cursor-pointer"><MessageCircle size={15} />Message</Button>
        </Link>
        <Link href={`/alumni/${c.otherUser._id}`} className="flex-1 min-w-[100px]">
          <Button size="sm" variant="outline" className="w-full gap-1.5"><User size={15} />Profile</Button>
        </Link>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-9 h-9 p-0 shrink-0 text-red-500 border-red-100 hover:bg-red-50 md:flex hidden" 
          onClick={() => handleCancelRequest(c._id)}
          disabled={loadingId === c._id}
        >
          <UserMinus size={15} />
        </Button>
      </div>
    </div>
  );
}

function RequestRow({ r, type }: { r: any, type: "pending" | "sent" }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCancelRequest = async (id: string) => {
    try {
      setLoadingId(id);
      await axios.delete(`/api/connection/${id}`);
      mutate('/api/connection/all');
      message.success("Request processed");
    } catch (err) {
      return clientCatchError(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setLoadingId(id);
      await axios.put(`/api/connection/${id}`, { status: "approved" });
      message.success("Request approved");
      mutate('/api/connection/all');
    } catch (err) {
      return clientCatchError(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
      <div className="flex items-center gap-4 flex-1 w-full">
        <Avatar className="w-12 h-12 rounded-full border border-slate-100 shrink-0">
          <AvatarImage src={r.otherUser.image || "/images/alumni.png"} alt={r.otherUser.fullname} />
          <AvatarFallback>{r.otherUser.fullname?.[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-slate-900 truncate">{r.otherUser.fullname || "N/A"}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Briefcase size={12} />{r.otherUser.company || "N/A"}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1"><Calendar size={12} />Batch of {r.otherUser.batch}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto sm:shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
        {type === "pending" ? (
          <>
            <AntdButton 
              danger 
              className="flex-1 sm:flex-none" 
              onClick={() => handleCancelRequest(r._id)} 
              loading={r._id === loadingId}
            >Reject</AntdButton>
            <Button 
              className="flex-1 sm:flex-none" 
              onClick={() => handleApprove(r._id)}
              disabled={loadingId === r._id}
            >Accept</Button>
          </>
        ) : (
          <div className="flex items-center justify-between w-full gap-4">
            <span className="flex items-center gap-1.5 text-amber-500 text-sm font-medium"><Clock size={14} />Pending</span>
            <AntdButton 
              onClick={() => handleCancelRequest(r._id)} 
              loading={r._id === loadingId}
            >Cancel Request</AntdButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AlumniConnectionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading, error } = useSWR('/api/connection/all', fetcher);

  if (isLoading) return <div className="p-8"><Skeleton active avatar paragraph={{ rows: 4 }} /></div>;
  if (error) return <ErrorState />;

  const PENDING = data?.received || [];
  const CONNECTIONS = data?.connected || [];
  const SENT = data?.sent || [];
  const totalCount = CONNECTIONS.length + PENDING.length + SENT.length;

  const TABS = [
    `Connections (${CONNECTIONS.length})`,
    `Pending (${PENDING.length})`,
    `Sent (${SENT.length})`
  ];

  return (
    <div className="bg-slate-50 min-h-screen w-full pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Connections</h1>
          <p className="text-sm text-slate-500">Manage your alumni network and stay connected</p>
        </div>

        {/* Stats - Stacks on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <Users size={20} />, value: totalCount, label: "Total Network" },
            { icon: <UserPlus size={20} />, value: PENDING.length, label: "Requests Received" },
            { icon: <Send size={20} />, value: SENT.length, label: "Requests Sent" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs - Scrollable on very small screens */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-full sm:min-w-0">
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-[14px] cursor-pointer font-medium border-b-2 transition-colors -mb-px ${activeTab === i ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              {tab}
            </button> 
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-2">
          {activeTab === 0 && (
            CONNECTIONS.length > 0
              ? <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">{CONNECTIONS.map((c: any) => <ConnectionCard key={c._id} c={c} />)}</div>
              : <EmptyState />
          )}
          {activeTab === 1 && (
            PENDING.length > 0
              ? <div className="flex flex-col gap-3">{PENDING.map((r: any) => <RequestRow key={r._id} r={r} type="pending" />)}</div>
              : <EmptyState />
          )}
          {activeTab === 2 && (
            SENT.length > 0
              ? <div className="flex flex-col gap-3">{SENT.map((r: any) => <RequestRow key={r._id} r={r} type="sent" />)}</div>
              : <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}