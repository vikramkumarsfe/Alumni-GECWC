import AlumniPortalPage from '@/components/alumni'
import React from 'react'

export const metadata = {
  title: "About - GECWC Alumni Portal",
  description: "Learn about the GECWC Alumni Management Portal and its mission to connect alumni of Government Engineering College West Champaran.",
  keywords: "about GECWC alumni, GECWC alumni portal, government engineering college west champaran alumni",
  openGraph: {
    title: "About - GECWC Alumni Portal",
    description: "About the GECWC Alumni Management Portal",
    url: `${process.env.SERVER}/about`,
    siteName: "GECWC Alumni",
    images: [
      {
        url: "/images/logo.png"
      }
    ],
    locale: "en_US",
    type: "website"
  }
}
const AlumniInfoRouter = () => {
  return (
    <AlumniPortalPage />
  )
}

export default AlumniInfoRouter