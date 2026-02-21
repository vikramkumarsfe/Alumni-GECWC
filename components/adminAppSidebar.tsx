'use client'
import { LayoutDashboard, Users, Calendar, Briefcase, Megaphone, BarChart3, LogOut, GraduationCap } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Manage Alumni", href: "/admin/alumni", icon: Users },
  { title: "Manage Events", href: "/admin/events", icon: Calendar },
  { title: "Manage Announcements", href: "/admin/announcements", icon: Megaphone },
  { title: "Reports", href: "/admin/reports", icon: BarChart3 },
]

const AdminAppSidebar = () => {
  const pathname = usePathname()
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                  <GraduationCap className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">Alumni-GECWC</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    isActive={isActive}
                    className={isActive ? "text-violet-600 bg-violet-50 hover:bg-violet-100" : ""}
                  >
                    <Link href={item.href}>
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
export default AdminAppSidebar