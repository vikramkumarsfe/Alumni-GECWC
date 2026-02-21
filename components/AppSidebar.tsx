'use client'
import { LayoutDashboard, UserCircle, Users, Calendar, Briefcase, Bell, LogOut, GraduationCap, Settings } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "antd"
import { signOut } from "next-auth/react"

const items = [
  { title: "Dashboard", url: "/alumni", icon: LayoutDashboard },
  { title: "My Profile", url: "/alumni/profile", icon: UserCircle },
  { title: "Alumni Directory", url: "/alumni/directory", icon: Users },
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
              <Link href="/">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">Alumni-GECWC</span>
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
              <Button onClick={()=>signOut()}>
                <LogOut className="size-4" />
              </Button>
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}