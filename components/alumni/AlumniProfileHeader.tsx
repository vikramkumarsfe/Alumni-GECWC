import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Mail,
  Phone,
} from "lucide-react";

interface Props {
  user: {
    fullname: string;
    image?: string;
    email: string;
    mobile?: string;
    role: string;
    isActive: boolean;
    bio?: string;
    createdAt: string;
  };
}

export default function AlumniProfileHeader({ user }: Props) {

  const initials = user.fullname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const imageUrl = user.image
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.image}`
    : undefined;

  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border shadow-sm">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-violet-600/10 via-transparent to-violet-600/5" />

      <div className="relative p-8 flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Avatar */}
        <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
          <AvatarImage
            src={imageUrl}
            alt={user.fullname}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-bold bg-violet-50 text-violet-600">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left space-y-4">

          {/* Name + Role */}
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {user.fullname}
              </h1>

              <Badge
                variant="secondary"
                className="bg-violet-100 text-violet-700 border-none"
              >
                {user.role}
              </Badge>

              {!user.isActive && (
                <Badge variant="destructive">
                  Inactive
                </Badge>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-muted-foreground">

              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Mail className="w-4 h-4 text-violet-500" />
                {user.email}
              </div>

              {user.mobile && (
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <Phone className="w-4 h-4 text-violet-500" />
                  {user.mobile}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-sm font-medium">
                <CalendarDays className="w-4 h-4 text-violet-500" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
