import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Bell, Mail } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "next-auth/react";
import { Skeleton } from "antd";
import Link from "next/link";
import AuthSection from "./authSection";

const AdminDashboardHeader = () =>  {
  const { data: session, status, update } = useSession()

  const name = session?.user.name
  if(!name)
    return <Skeleton active />

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            className="h-9 w-64 rounded-md border bg-muted pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500" 
            placeholder="Search alumni, jobs..."
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Mail className="h-5 w-5 text-muted-foreground cursor-pointer" />
        <Link href="/alumni/announcements" className="block">
          <Bell className="h-5 w-5 text-muted-foreground cursor-pointer" />
        </Link>
        <div className="flex items-center gap-2 cursor-pointer">
          <div>
            <AuthSection />
          </div>
          <span className="text-sm font-medium hidden md:block">{session?.user.name?.toLocaleUpperCase()}</span>
        </div>
      </div>
    </header>
  )
}

export default AdminDashboardHeader