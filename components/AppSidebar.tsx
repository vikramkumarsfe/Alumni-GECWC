'use client'
import { LayoutDashboard, UserCircle, Users, Calendar, Briefcase, Bell, LogOut, GraduationCap, Settings } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"


const items = [
  { title: "Dashboard", url: "/alumni/dashboard", icon: LayoutDashboard },
  { title: "My Profile", url: "/alumni/profile", icon: UserCircle },
  { title: "Alumni Directory", url: "/alumni", icon: Users },
  { title: "Events", url: "/alumni/events", icon: Calendar },
  { title: "Announcements", url: "/alumni/announcements", icon: Bell },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/alumni">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                  <GraduationCap className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">AlumniConnect</span>
                  <span className="text-xs text-muted-foreground">Portal v1.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* --- Main Navigation --- */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    isActive={isActive}
                    className={isActive ? "text-violet-600 bg-violet-50 hover:bg-violet-100" : ""}
                  >
                    <Link href={item.url}>
                      <item.icon className={isActive ? "text-violet-600" : ""} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* --- Footer / Logout --- */}
      <SidebarFooter className="pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}