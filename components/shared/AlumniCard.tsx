import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";


export function AlumniCard({ alumni }: { alumni: any }) {
    return (
        <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden">
            <CardContent className="flex flex-col gap-0">
                {/* Top — Avatar + Name row */}
                <div className="flex items-center gap-4 pb-4">
                    <Avatar className="w-14 h-14 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
                        <AvatarImage src={alumni.image} alt={alumni.name} />
                        <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                            {alumni.fullname
                                .split(" ")
                                .map((n : any) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="font-bold text-[15px] text-slate-900 truncate leading-snug">
                            {alumni.fullname}
                        </p>
                        <p className="text-[13px] text-slate-500 truncate mt-0.5">{alumni.job}</p>
                        <p className="text-[13px] text-blue-600 font-semibold truncate">
                            @ { alumni.profile.company}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-4" />

                {/* Meta Info */}
                <div className="flex flex-col gap-2.5 mb-4">
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <GraduationCap size={13} className="flex-shrink-0 text-slate-400" />
                        <span>{alumni.branch}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <Calendar size={13} className="flex-shrink-0 text-slate-400" />
                        <span>Batch of {alumni.batch}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <MapPin size={13} className="flex-shrink-0 text-slate-400" />
                        <span>{alumni.address.city || "not updated"} { alumni.address.state}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-4" />

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {alumni.profile.skills && alumni.profile.skills.map((item : any, index : number) => (
                        <Badge
                            key={item}
                            variant="secondary"
                            className="text-[12px] font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full px-3 py-0.5 border-0"
                        >
                            {item}
                        </Badge>
                    ))}
                </div>

                {/* Action Buttons */}
               <div className="w-full">
                    <Link href={`/alumni/${alumni._id}`}>
                    <Button
                        variant="outline"
                        className="w-full text-[15px] h-9 border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 cursor-pointer my-2"
                    >
                        View Profile
                    </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}