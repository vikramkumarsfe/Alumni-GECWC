"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, ChevronRight, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthSection from "../authSection";

const titles: Record<string, string> = {
  alumni: "Alumni", student: "Students", events: "Events",
  announcements: "Announcements", "become-alumni": "Alumni requests",
  feedback: "Feedback", campaign: "Email campaigns", reports: "Reports",
};

export default function AdminDashboardHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const section = titles[pathname.split("/")[2]] || "Overview";

  return (
    <header className="sticky top-0 z-10 flex h-[72px] shrink-0 items-center justify-between gap-4 border-b bg-background px-4 sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="size-10 rounded-lg" />
        <div className="hidden h-6 w-px bg-border sm:block" />
        <span className="hidden text-sm text-muted-foreground sm:block">Administration</span>
        <ChevronRight className="hidden size-3.5 text-muted-foreground sm:block" />
        <span className="truncate text-sm font-semibold">{section}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <Link href="/admin/announcements" aria-label="View announcements" className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2">
          <Bell className="size-5" />
        </Link>
        <div className="flex items-center gap-3 border-l pl-3 sm:pl-5">
          <AuthSection />
          <div className="hidden sm:block">
            <p className="max-w-40 truncate text-sm font-semibold">{session?.user.name || "Administrator"}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><ShieldCheck className="size-3" /> Admin account</p>
          </div>
        </div>
      </div>
    </header>
  );
}
