import Home from '@/components/Home'

export const metadata = {
  title: "Home - GECWC Alumni Portal",
  description: "Official Alumni Management Portal of Government Engineering College West Champaran. Connect with alumni, explore events, and grow your professional network.",
  keywords: "GECWC alumni, Government Engineering College West Champaran alumni, alumni portal, alumni network",
  openGraph: {
    title: "GECWC Alumni Management Portal",
    description: "Reconnect. Network. Grow with GECWC Alumni.",
    url: `${process.env.SERVER}/`,
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

const Homepage = () => {
  return <Home />
}

export default Homepage
