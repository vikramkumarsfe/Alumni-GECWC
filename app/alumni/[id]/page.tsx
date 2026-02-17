import AlumniProfileHeader from "@/components/alumni/AlumniProfileHeader"
import AlumniAboutSection from "@/components/alumni/AlumniAboutSection"
import AlumniEducationSection from "@/components/alumni/AlumniEducationSection"
import { cookies } from "next/headers"

interface PageProps {
  params: {
    id: string
  }
}

export default async function AlumniPublicProfile({ params }: PageProps) {

  const { id } = await params

  const cookieStore = await cookies()

  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ")

    const resUser = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${id}`,
      {
        headers: {
          Cookie: cookieString,
        },
        cache: "no-store",
      }
    )

  const data = await resUser.json();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <AlumniProfileHeader user={data.user} />

        <AlumniAboutSection bio={data.user.bio} />

        <AlumniEducationSection education={data.education} />
      </div>
    </div>
  )
}
