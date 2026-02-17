"use client"
import Link from "next/link"
import { Edit2, GraduationCap, Building2, Mail, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import { Skeleton } from "antd"

export default function AlumniPrivateHeader() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Skeleton active />
  }

  const authUser = session?.user

  if(!authUser)
    return <Skeleton active />

  const fullname = authUser?.name || "User"

  const image = authUser?.image || undefined

  const email = authUser?.email
  const role = authUser?.role

  const initials = fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-slate-50/50">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={image} alt={fullname} className="object-cover" />
              <AvatarFallback className="text-2xl bg-slate-100 text-slate-600">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {fullname}
              </h1>

              {/* Email + Role from Session */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">

                {email && (
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm">
                    <Mail className="w-4 h-4" />
                    {email}
                  </div>
                )}

                {role && (
                  <Badge className="flex items-center gap-1.5 px-3 py-1 capitalize">
                    <Shield className="w-4 h-4" />
                    {role}
                  </Badge>
                )}

                {authUser.department && (
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm">
                    <Building2 className="w-4 h-4" />
                    {authUser.department}
                  </div>
                )}

                {authUser.batch && (
                  <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                    <GraduationCap className="w-4 h-4" />
                    Class of {authUser.batch}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild className="shadow-sm gap-2">
              <Link href="/alumni/dashboard/edit">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Link>
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
