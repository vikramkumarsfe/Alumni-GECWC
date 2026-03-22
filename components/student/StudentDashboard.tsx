'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { message, Skeleton, Typography } from 'antd'
import UpcomingEvents from './dashboard/events'
import RecentChats from './dashboard/recentChats'
import RecommendedAlumni from './dashboard/recomendedAlumni'
import { useSession } from 'next-auth/react'

const { Text } = Typography

function WelcomeCard() {
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
            Connect with alumni, explore opportunities, and build your professional network.
          </Text>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <Link href="/student/edit-profile">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 cursor-pointer">
              Complete Profile
            </Button>
          </Link>
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
          <Button 
            variant="outline" 
            className="w-full text-sm h-9 cursor-pointer" 
            onClick={()=>message.info("we are continuosly working on this feature!")}
          >
            Request a Mentor
          </Button>
          <Link href="/student/connection">
            <Button 
              variant="ghost" 
              className="w-full text-sm h-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"  
            >
              View Active Requests
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1200px] mx-auto py-4">
      {/* Welcome banner */}
      <WelcomeCard />

      {/* Stats row */}


      {/* Main 8/4 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <RecommendedAlumni />
          <RecentChats />
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <UpcomingEvents />
          <MentorshipCard />
        </div>
      </div>
    </div>
  )
}