'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Users, MessageSquare,  Calendar,  Award, Settings, UserCircle, LogOut } from 'lucide-react'
import { useEffect } from "react"


import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar } from '@/components/ui/sidebar'

import Logo from '../shared/Logo'
import { signOut } from 'next-auth/react'

const mainNav = [
  { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { label: 'My Profile', href: '/student/profile', icon: User },
]

const networkNav = [
  { label: 'Alumni Directory', href: '/student/directory', icon: Users },
  { label: 'connections', href: '/student/connection', icon: UserCircle },
  { label: 'Chat with Alumni', href: '/student/chat', icon: MessageSquare },
]

const opportunitiesNav = [
  { label: 'Events', href: '/student/events', icon: Calendar },
]

const accountNav = [
  { label: 'Become Alumni', href: '/student/become-alumni', icon: Award },
  { label: 'Settings', href: '/student/settings', icon: Settings },
]

const StudentAppSidebar = () => {
  const pathname = usePathname()
  const { setOpen } = useSidebar()

  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false)
    }
  }, [pathname])

  const isActive = (href: string) =>
    href === '/student' ? pathname === '/student' : pathname.startsWith(href)

  const handleClick = () => {
  if (window.innerWidth < 768) {
    setOpen(false)
  }
}

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
                    onClick={handleClick}
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
                    <Link href={item.href} onClick={handleClick}>
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
                    <Link href={item.href} onClick={handleClick}>
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
                    <Link href={item.href} onClick={handleClick}>
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

      {/* Footer */}
      <SidebarFooter className="pb-6">
        <SidebarMenu> 
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={()=>signOut()}>
                <LogOut className="size-4" />
                <span className="text-black">Logout</span> 
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}
export default StudentAppSidebar