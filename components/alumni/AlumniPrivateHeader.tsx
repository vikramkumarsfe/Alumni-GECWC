import Link from "next/link";
import { Edit2, GraduationCap, Building2 } from "lucide-react"; // Modern Icons
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  user: {
    fullname: string;
    image?: string;
    department?: string;
    batch?: string;
  };
}

export default function AlumniPrivateHeader({ user }: Props) {
  // Get initials for Avatar Fallback
  const initials = user.fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-slate-50/50">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Shadcn Avatar with high-end styling */}
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.image} alt={user.fullname} className="object-cover" />
              <AvatarFallback className="text-2xl bg-slate-100 text-slate-600">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {user.fullname}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {user.department && (
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full text-sm font-medium">
                    <Building2 className="w-4 h-4" />
                    {user.department}
                  </div>
                )}
                
                {user.batch && (
                  <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                    <GraduationCap className="w-4 h-4" />
                    Class of {user.batch}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <Button asChild variant="default" className="shadow-sm gap-2">
              <Link href="/alumni/dashboard/edit">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}