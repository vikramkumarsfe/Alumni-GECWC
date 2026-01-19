'use client'
import ChildrenInterface from '@/Interfaces/children.interface'
import { SessionProvider } from 'next-auth/react'
import React, { FC } from 'react'

const MainLayout : FC<ChildrenInterface> = ({children}) => {
  return (
    <div>
      <SessionProvider>
        {children}
      </SessionProvider>
    </div>
  )
}

export default MainLayout