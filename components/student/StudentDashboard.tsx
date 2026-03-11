'use client'
import Link from 'next/link'
import { Users,  MessageCircle, Calendar, Briefcase, Award, MapPin, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from 'antd'

const { Text } = Typography

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Alumni Connections', value: 24,  icon: Users,         color: ''   },
  { label: 'Unread Messages',    value: 5,   icon: MessageCircle, color: '' },
  { label: 'Upcoming Events',    value: 3,   icon: Calendar,      color: '' },
]

const recommendedAlumni = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior SWE at Google',
    avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FEuropean%2F2',
    initials: 'SJ',
  },
  {
    name: 'David Osei',
    role: 'Product Manager at Stripe',
    avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FAfrican%2F1',
    initials: 'DO',
  },
  {
    name: 'Emily Chen',
    role: 'Data Scientist at Netflix',
    avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FEast%20Asian%2F3',
    initials: 'EC',
  },
  {
    name: 'Carlos Rivera',
    role: 'UX Designer at Apple',
    avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FHispanic%2F2',
    initials: 'CR',
  },
]

const jobs = [
  {
    title: 'Frontend Engineering Intern',
    company: 'TechFlow Inc.',
    location: 'San Francisco, CA (Hybrid)',
  },
  {
    title: 'Junior Data Analyst',
    company: 'Quantify Analytics',
    location: 'Remote',
  },
  {
    title: 'Backend Developer Intern',
    company: 'CloudStack',
    location: 'Bangalore, India',
  },
]

const recentChats = [
  {
    name: 'David Osei',
    avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FAfrican%2F1',
    initials: 'DO',
    message: "Sure, I'd be happy to review your resume next week.",
    time: '2h ago',
    unread: false,
  },
  {
    name: 'Sarah Jenkins',
    avatar: 'https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FEuropean%2F2',
    initials: 'SJ',
    message: "Thanks for reaching out! Let's set up a call.",
    time: '1d ago',
    unread: true,
  },
]

const events = [
  {
    title: 'Annual Tech Symposium 2024',
    date: 'Oct 15',
    location: 'Virtual',
    icon: Calendar,
  },
  {
    title: 'Alumni Meet & Greet: Finance',
    date: 'Oct 22',
    location: 'Main Campus',
    icon: MapPin,
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {stats.map((s) => (
        <Card key={s.label} className="border border-slate-200 shadow-none">
          <CardContent className="p-5 flex justify-center items-center gap-8">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon className="h-10 w-10" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function WelcomeCard() {
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, Alex! 👋</h1>
          <Text className="text-slate-500 text-sm">
            Connect with alumni, explore opportunities, and build your professional network.
          </Text>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 cursor-pointer">
            Complete Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function RecommendedAlumni() {
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="px-6 py-4 flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold text-slate-800">Recommended Alumni</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm" asChild>
          <Link href="/student/directory">View Directory </Link>
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendedAlumni.map((alumni) => (
            <div
              key={alumni.name}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/40 transition-colors"
            >
              <Avatar className="h-11 w-11 shrink-0">
                <AvatarImage src={alumni.avatar} />
                <AvatarFallback>{alumni.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-800 truncate">{alumni.name}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{alumni.role}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    Connect
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-3 text-xs cursor-pointer">
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentOpportunities() {
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="px-6 py-4 flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold text-slate-800">Recent Opportunities</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm" asChild>
          <Link href="/student/jobs">View All Jobs</Link>
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-2">
        <div className="flex flex-col divide-y divide-slate-100">
          {jobs.map((job) => (
            <div key={job.title} className="flex items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-800">{job.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {job.company} · {job.location}
                </p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0 h-8 text-xs cursor-pointer">
                Apply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentChats() {
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
          {recentChats.map((chat) => (
            <div key={chat.name} className="flex items-start gap-3 py-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>{chat.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-800">{chat.name}</span>
                  <span className="text-[11px] text-slate-400">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{chat.message}</p>
              </div>
              {chat.unread && (
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingEvents() {
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
          {events.map((event) => (
            <div key={event.title} className="py-3 flex flex-col gap-2">
              <p className="text-sm font-semibold text-slate-800">{event.title}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <event.icon className="h-3.5 w-3.5" />
                  {event.date} · {event.location}
                </div>
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 border-0"
                  variant="outline"
                >
                  RSVP
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MentorshipCard() {
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="px-5 py-4 space-y-0">
        <CardTitle className="text-base font-semibold text-slate-800">Mentorship</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <Text className="text-sm text-slate-500 block mb-4 leading-relaxed">
          Get guidance from experienced alumni in your field of interest.
        </Text>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full text-sm h-9 cursor-pointer">
            Request a Mentor
          </Button>
          <Button variant="ghost" className="w-full text-sm h-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer">
            View Active Requests (1)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto">
      {/* Welcome banner */}
      <WelcomeCard />

      {/* Stats row */}
      <StatCards />

      {/* Main 8/4 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <RecommendedAlumni />
          <RecentOpportunities />
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <RecentChats />
          <UpcomingEvents />
          <MentorshipCard />
        </div>
      </div>
    </div>
  )
}