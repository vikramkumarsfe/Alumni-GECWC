import ErrorState from "@/components/shared/Errorstate"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetcher } from "@/utils/fetcher"
import { Skeleton } from "antd"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"

const RecommendedAlumni = () => {

    const { data, error, isLoading } = useSWR("/api/alumni/recomendation", fetcher)
    const [alumnis, setAlumnis ] = useState<any | null>(null)

    useEffect(() => {
        if (data) {
            setAlumnis(data.data)
        }
    }, [data])

    if(isLoading)
        return <Skeleton active />

    if(error)
        return <ErrorState />

    console.log(data.data)
  return (
    <Card className="border border-slate-200 shadow-none">
      <CardHeader className="px-6 py-4 flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold text-slate-800">Recommended Alumni</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm" asChild>
          <Link href="/student/directory">View Directory </Link>
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {alumnis && alumnis.map((alumni : any) => (
            <div
            key={alumni._id}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/30 transition-all group"
            >
            <div className="flex items-center gap-4 min-w-0">
                <Avatar className="w-12 h-12 rounded-full border border-slate-200 shadow-sm flex-shrink-0">
                <AvatarImage src={alumni.image || "/images/alumni.png"} alt={alumni.fullname} />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                    {alumni.fullname?.split(" ").map((n : any) => n[0]).join("")}
                </AvatarFallback>
                </Avatar>
                
                <div className="min-w-0">
                <p className="font-bold text-sm text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                    {alumni.fullname || "N/A"}
                </p>
                <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {alumni.profile?.company || "Not Specified"}
                </p>
                </div>
            </div>

            {/* Right Side Button */}
            <Link href={`/student/alumni-profile/${alumni._id}`}>
                <Button 
                variant="outline" 
                size="lg" 
                className="cursor-pointer h-8 px-4 text-xs border-slate-200  hover:bg-slate-600 hover:text-white rounded-full transition-all"
                >
                View Profile
                </Button>
            </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecommendedAlumni
