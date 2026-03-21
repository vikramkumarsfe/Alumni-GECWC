// app/alumni/layout.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

const AlumniLayout = async({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "alumni") {
    redirect("/")
  }

  return <>{children}</>
}

export default AlumniLayout