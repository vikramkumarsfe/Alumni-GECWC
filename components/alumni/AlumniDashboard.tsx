'use client'

import { Users, UserPlus, MessageSquare, GraduationCap, Briefcase, Search, Edit3, MessageCircle, Bell, ChevronDown, Network, Clock, MapPin, Video, Award, CalendarCheck, X, Check } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { Skeleton, Typography } from 'antd'
import RecentChats from '../student/dashboard/recentChats'
import UpcomingEvents from '../student/dashboard/events'
import Link from 'next/link'
import IncomingRequests from './dashboard/upcomingRequest'

const { Text } = Typography

const connectionRequests = [
  { name: 'Priya Sharma',    role: 'Product Manager at Google',    avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FSouth%20Asian%2F2' },
  { name: 'David Miller',    role: 'Frontend Developer at Meta',   avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FEuropean%2F1' },
  { name: 'Sarah Chen',      role: 'UX Designer at Apple',         avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FEast%20Asian%2F3' },
]

const quickActions = [
  { label: 'Update Profile', icon: Edit3 , link : "/alumni/profile/edit"},
  { label: 'Find Alumni',    icon: Search , link : "/alumni/directory"},
  { label: 'View Requests',  icon: Users, link:"/alumni/connections" },
  { label: 'Open Chats',     icon: MessageCircle , link : "/alumni/chats"},
]


function HeroCard() {
  const { data: session, status, update } = useSession();

    if (status === "loading") {
        return (
            <div className="max-w-7xl mx-auto p-8">
                <Skeleton active avatar paragraph={{ rows: 4 }} />
                <div className="grid grid-cols-12 gap-6 mt-6">
                    <div className="col-span-8"><Skeleton active paragraph={{ rows: 6 }} /></div>
                    <div className="col-span-4"><Skeleton active paragraph={{ rows: 6 }} /></div>
                </div>
            </div>
        );
    }

    if (!session || !session.user) {
        return <div className="flex justify-center items-center h-screen">Not authenticated</div>;
    }

    const name = session.user.name;
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, {name || "N/A"} ! 👋</h1>
          <Text className="text-slate-500 text-sm">
            Connect with <strong>alumni and juniors</strong>, explore opportunities, and build your professional network.
          </Text>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <Link href="/alumni/edit-profile">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 cursor-pointer">
              Complete Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  return (
    <div className="flex gap-3 flex-wrap">
      {quickActions.map((a) => (
        <Link href = {a.link} key={a.label}>
          <button  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer">
            <a.icon className="w-4 h-4 text-indigo-600" />
            {a.label}
          </button>
        </Link>
      ))}
    </div>
  )
}


function MentorshipRequests() {
  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="px-6 py-5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" /> Mentorship Requests
          </CardTitle>
          
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 flex flex-col divide-y divide-slate-100">
        {/* {mentorshipRequests.map((r) => (
          <div key={r.name} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11">
                <AvatarImage src={r.avatar} />
                <AvatarFallback>{r.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 max-w-[180px]">{r.sub}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs cursor-pointer">Decline</Button>
              <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 cursor-pointer">Approve</Button>
            </div>
          </div>
        ))} */}

        <div className='flex items-center justify-center'>
          <p className='text-xl font-semibold '>We are coming soon.....</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AlumniDashboardPage() {

  return (
    <div className="flex overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
            <HeroCard />
            <QuickActions />

            {/* Main 2-col grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left */}
              <div className="flex flex-col gap-6">
                <IncomingRequests />
                <UpcomingEvents link="/alumni/events" />
              </div>
              {/* Right */}
              <div className="flex flex-col gap-6">
                <RecentChats link="/alumni/chats" />
                
                <MentorshipRequests />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}