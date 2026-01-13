import ChildrenInterface from '@/Interfaces/children.interface'
import React, { FC } from 'react'

const MainLayout : FC<ChildrenInterface> = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default MainLayout