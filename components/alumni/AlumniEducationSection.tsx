import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Education {
  _id: string;
  degreeName: string;
  universityName: string;
  completionYear: number;
  score?: string;
}

interface Props {
  education: Education[];
}

export default function AlumniEducationSection({ education }: Props) {
  if (!education?.length) return null;

  return (
    <div className="mt-16 max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Education
        </h2>
      </div>

      <div className="relative space-y-4 border-l-2 border-muted ml-3 pl-6">
        {education.map((item) => (
          <div key={item._id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-background bg-primary" />
            
            <Card className="overflow-hidden transition-all hover:shadow-md border-muted/60">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-lg font-bold text-primary">
                    {item.degreeName}
                  </CardTitle>
                  {item.score && (
                    <Badge variant="secondary" className="w-fit font-medium">
                      <Award className="mr-1 h-3 w-3" />
                      {item.score}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="grid gap-2">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">{item.universityName}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="text-sm">{item.completionYear}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}