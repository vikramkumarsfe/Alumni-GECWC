import { Plus, GraduationCap, Calendar, Award, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function AlumniPrivateEducationSection({ education }: Props) {
  return (
    <div className="mt-16 max-w-4xl">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Education</h2>
          <p className="text-sm text-slate-500">Manage your academic qualifications and achievements.</p>
        </div>

        <Button className="gap-2 shadow-sm shrink-0">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {/* Education List */}
      <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-0 md:before:left-8 before:w-[2px] before:bg-slate-100 before:hidden md:before:block">
        {education.map((item, index) => (
          <div key={index} className="relative md:pl-20">
            {/* Timeline Dot (Visible on Desktop) */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white bg-primary shadow-sm hidden md:block z-10" />

            <Card className="transition-all duration-200 hover:shadow-md border-slate-200/60 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-start p-6 gap-5">
                  {/* Icon Box */}
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 leading-none mb-1">
                          {item.degreeName}
                        </h3>
                        <p className="text-slate-600 font-medium">{item.universityName}</p>
                      </div>

                      {/* Action Menu (Clean UI Pattern) */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Pencil className="w-4 h-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        Completed in {item.completionYear}
                      </div>

                      {item.score && (
                        <div className="flex items-center gap-1.5">
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 gap-1 px-2 py-0">
                            <Award className="w-3 h-3" />
                            {item.score}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Empty State */}
        {education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-xl border-slate-200">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No education history added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}