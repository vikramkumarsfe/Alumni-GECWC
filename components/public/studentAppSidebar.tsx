'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Users, MessageSquare, Compass, Calendar, Briefcase, Award, Settings, GraduationCap} from 'lucide-react'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Logo from '../shared/Logo'

const mainNav = [
  { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { label: 'My Profile',  href: '/student/profile', icon: User },
]

const networkNav = [
  { label: 'Alumni Directory', href: '/student/directory', icon: Users },
  { label: 'Chat with Alumni',  href: '/student/chat', icon: MessageSquare },
  { label: 'Mentorship', href: '/student/mentorship', icon: Compass },
]

const opportunitiesNav = [
  { label: 'Events', href: '/student/events', icon: Calendar },
  { label: 'Jobs & Internships', href: '/student/jobs', icon: Briefcase },
]

const accountNav = [
  { label: 'Become Alumni', href: '/student/become-alumni', icon: Award },
  { label: 'Settings', href: '/student/settings', icon: Settings },
]

const StudentAppSidebar = () => {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/student' ? pathname === '/student' : pathname.startsWith(href)

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      {/* Logo */}
      <SidebarHeader className="h-16 flex flex-row items-center gap-2 px-6 pt-2">
        <Logo />
        
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Main */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className="gap-3 font-medium"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Network */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Network
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {networkNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className="gap-3 font-medium"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Opportunities */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Opportunities
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {opportunitiesNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className="gap-3 font-medium"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className="gap-3 font-medium"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: current user */}
      <SidebarFooter className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F1" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-800 truncate">Alex Sharma</span>
            <span className="text-xs text-slate-400 truncate">Student · 3rd Year</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default StudentAppSidebar