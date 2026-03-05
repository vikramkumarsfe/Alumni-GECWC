'use client'

import { Button, Dropdown, Space } from "antd"
import type { MenuProps } from "antd"
import { LogoutOutlined, DashboardOutlined } from "@ant-design/icons"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"



export const MobileAuthSection = () => {
    const { data: session } = useSession()
    if (!session) {
        return null
    }

  const role = session.user?.role

  const dashboardRoute =
    role === "admin"
      ? "/admin"
      : role === "alumni"
      ? "/alumni"
      : "/"

  // ✅ Proper typing here
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div className="px-2 py-1">
          <div className="font-semibold">{session.user?.name}</div>
          <div className="text-xs text-gray-500">
            {session.user?.email}
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href={dashboardRoute}>Dashboard</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => signOut(),
    },
  ]

  return (
    <Link href={dashboardRoute}>
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <div className="cursor-pointer">
          <Avatar>
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback>
              {session.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </Dropdown>
    </Link>
  )
}

export const MobileLoginSignup = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        
        <Link
          href="/login"
          className="text-base font-medium text-slate-700 hover:text-violet-600 transition-colors"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="text-base font-medium text-slate-700 hover:text-violet-700 transition-colors"
        >
          Signup
        </Link>

      </div>
    )
  }

  return null
}
