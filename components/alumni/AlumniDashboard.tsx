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
            <div className="max-w-7xl mx-auto p-4 sm:p-8">
                <Skeleton active avatar paragraph={{ rows: 4 }} />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                    <div className="col-span-1 md:col-span-8"><Skeleton active paragraph={{ rows: 6 }} /></div>
                    <div className="col-span-1 md:col-span-4"><Skeleton active paragraph={{ rows: 6 }} /></div>
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
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Welcome back, {name || "N/A"} ! 👋</h1>
          <Text className="text-slate-500 text-sm block">
            Connect with <strong>alumni and juniors</strong>, explore opportunities, and build your professional network.
          </Text>
        </div>
        <div className="flex items-center gap-5 w-full sm:w-auto shrink-0">
          <Link href="/alumni/profile/edit" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shrink-0 cursor-pointer">
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
        <Link href={a.link} key={a.label} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer">
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
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" /> Mentorship Requests
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col divide-y divide-slate-100">
        <div className='flex items-center justify-center py-8'>
          <p className='text-lg sm:text-xl font-semibold text-center'>We are coming soon.....</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AlumniDashboardPage() {
  return (
    <div className="flex overflow-hidden bg-slate-50">
        <div className="flex-1 overflow-y-auto  sm:px-6 sm:py-6">
          <div className="max-w-[1300px] mx-auto flex flex-col gap-3">
            <HeroCard />
            <QuickActions />

            {/* Main grid: Stack on mobile (grid-cols-1), Side-by-side on desktop (lg:grid-cols-2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Left Column */}
              <div className="flex flex-col gap-3">
                <IncomingRequests />
                <UpcomingEvents link="/alumni/events" />
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-3">
                <RecentChats link="/alumni/chats" />
                <MentorshipRequests />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}