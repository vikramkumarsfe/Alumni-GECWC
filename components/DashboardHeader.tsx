import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search,  Mail } from "lucide-react"
import { useSession } from "next-auth/react";
import { Skeleton } from "antd";
import AuthSection from "./authSection";
import NotificationBell from "./shared/NotificationBell";

const DashboardHeader = () =>  {
  const { data: session } = useSession();

  const name = session?.user.name;
  if (!name) return <Skeleton active />;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-8 sticky top-0 z-10">
      
      {/* LEFT */}
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

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <Mail className="h-5 w-5 text-muted-foreground cursor-pointer" />

        <NotificationBell redirectUrl="/alumni/announcements" />

        {/* USER */}
        <div className="flex items-center gap-2 cursor-pointer">
          <AuthSection />
          <span className="text-sm font-medium hidden md:block">
            {session?.user.name?.toUpperCase()}
          </span>
        </div>

      </div>
    </header>
  );
};

export default DashboardHeader