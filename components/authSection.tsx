'use client'

import { Button, Dropdown, Space } from "antd"
import { LogoutOutlined, DashboardOutlined, UserOutlined } from "@ant-design/icons"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const AuthSection = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Space className="space-x-3">
        <Link href="/login">
          <Button className="bg-slate-500 hover:bg-slate-700 text-white shadow-md">
            Login
          </Button>
        </Link>

        <Link href="/signup">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white shadow-md">
            Signup
          </Button>
        </Link>
      </Space>
    )
  }

  const role = session.user?.role
  const dashboardRoute =
    role === "admin"
      ? "/admin"
      : role === "alumni"
      ? "/alumni"
      : "/"

  const items = [
    {
      key: "profile",
      label: (
        <div className="px-2 py-1">
          <div className="font-semibold">{session.user?.name}</div>
          <div className="text-xs text-gray-500">{session.user?.email}</div>
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
  )
}

export default AuthSection