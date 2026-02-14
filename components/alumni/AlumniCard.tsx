import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, MapPin, Building2 } from "lucide-react";

interface AlumniCardProps {
  alumni: {
    _id: string;
    fullname: string;
    image?: string;
    department?: string;
    batch?: string;
    company?: string; // New field
    location?: string; // New field
  };
}

export default function AlumniCard({ alumni }: AlumniCardProps) {
  const initials = alumni.fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-muted bg-card">
      {/* Location Badge - Positioned Top Right */}
      {!alumni.location && (
        <div className="absolute right-3 top-3">
          <Badge variant="secondary" className="font-normal gap-1 bg-secondary/50 backdrop-blur-sm">
            <MapPin className="h-3 w-3" />
            {alumni.location ||"delhi"}
          </Badge>
        </div>
      )}

      <CardContent className="flex flex-col items-center p-6 text-center">
        <Avatar className="h-24 w-24 border-4 border-background shadow-md mb-4 transition-transform duration-300 group-hover:scale-105">
          <AvatarImage src={alumni.image} alt={alumni.fullname} className="object-cover" />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {alumni.fullname}
            </h3>
            {/* Current Company Line */}
            {alumni.company && (
              <p className="text-sm font-medium text-primary flex items-center justify-center gap-1.5 mt-0.5">
                <Building2 className="h-3.5 w-3.5" />
                {alumni.company}
              </p>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-1 pt-1 border-t border-border/50">
            <div className="flex items-center text-sm text-muted-foreground gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{alumni.department || "General Studies"}</span>
            </div>
            
            <div className="flex items-center text-xs font-medium text-muted-foreground/60 gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Class of {alumni.batch || "2024"}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full font-semibold transition-colors" variant="outline">
          <Link href={`/alumni/${alumni._id}`}>
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}