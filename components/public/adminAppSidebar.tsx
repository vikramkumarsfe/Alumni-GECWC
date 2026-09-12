'use client'
import { LayoutDashboard, Users, Calendar, Megaphone, BarChart3, LogOut, MessageSquareQuote, UserCheck2Icon } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react"
import Logo from "../shared/Logo"

const items = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Alumni", href: "/admin/alumni", icon: Users },
  { title: "Students", href: "/admin/student", icon: Users },
  { title: "Events", href: "/admin/events", icon: Calendar },
  { title: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { title: "Alumni Requests", href: "/admin/become-alumni", icon: UserCheck2Icon },
  { title: "Feedback", href: "/admin/feedback", icon: MessageSquareQuote },
  { title: "Email Campaigns", href: "/admin/campaign", icon: MessageSquareQuote },
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
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1.5">
            {items.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`))
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    isActive={isActive}
                    className={`h-11 rounded-lg px-3 font-medium transition-colors ${isActive ? "text-violet-600 bg-violet-50 hover:bg-violet-100" : ""}`}
                  >
                    <Link href={item.href} aria-current={isActive ? "page" : undefined}>
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
            <SidebarMenuButton className="h-11 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer" onClick={()=>signOut()}>
                <LogOut className="size-4" />
                <span className="text-black">Logout</span> 
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AdminAppSidebar