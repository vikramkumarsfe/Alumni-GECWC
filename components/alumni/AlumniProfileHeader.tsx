import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Building2, 
  MapPin, 
  Briefcase,
  CalendarDays
} from "lucide-react";

interface Props {
  user: {
    fullname: string;
    image?: string;
    department?: string;
    batch?: string;
    company?: string;
    position?: string;
    location?: string; // Added for a more complete profile feel
  };
}

export default function AlumniProfileHeader({ user }: Props) {
  const initials = user.fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border shadow-sm">
      {/* Optional: Subtle Background Pattern/Accent */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-violet-600/10 via-transparent to-violet-600/5" />

      <div className="relative p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image with Shadow Ring */}
        <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
          <AvatarImage src={user.image} alt={user.fullname} className="object-cover" />
          <AvatarFallback className="text-2xl font-bold bg-violet-50 text-violet-600">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {user.fullname}
              </h1>
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 hover:bg-violet-100 border-none">
                Alumni
              </Badge>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-muted-foreground">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Briefcase className="w-4 h-4 text-violet-500" />
                {user.department}
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <CalendarDays className="w-4 h-4 text-violet-500" />
                Batch {user.batch}
              </div>
            </div>
          </div>

          {/* Current Professional Role Card-let */}
          {user.company && (
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-lg border border-border/50">
              <div className="p-2 bg-background rounded-md shadow-sm">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Current Position
                </p>
                <p className="text-sm font-semibold">
                  {user.position} <span className="text-muted-foreground font-normal">at</span> {user.company}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Placeholder */}
        <div className="flex gap-3">
          {/* You could add a 'Follow' or 'Message' button here using shadcn Button */}
        </div>
      </div>
    </div>
  );
}