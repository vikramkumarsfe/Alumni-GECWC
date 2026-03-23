'use client'

import { Bell, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from "next/link";
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { Skeleton } from 'antd'
import AuthSection from '../authSection'

const StudentDashboardHeader = () => {

  const { data: session, status, update } = useSession()
  
    const name = session?.user.name

    if(!name)
      return <Skeleton active />
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 sticky top-0 z-20">
      {/* Left: sidebar trigger + breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-5" />
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-2 hover:bg-slate-100">
              <AuthSection />
              <span className="text-sm font-medium text-slate-700">{name}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/student/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/student/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </div>
    </header>
  )
}

export default StudentDashboardHeader