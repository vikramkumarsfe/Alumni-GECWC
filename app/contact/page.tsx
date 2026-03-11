import Contactus from "@/components/Contactus"

export const metadata = {
  title: "Contact - GECWC Alumni Portal",
  description: "Contact the GECWC Alumni team for support, queries, or alumni related information.",
  keywords: "contact GECWC alumni, alumni support, GECWC alumni portal contact",
  openGraph: {
    title: "Contact - GECWC Alumni Portal",
    description: "Get in touch with the GECWC Alumni team",
    url: `${process.env.SERVER}/contact`,
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
const ContactUsRoute = () => {
  return (
    < Contactus/>
  )
}

export default ContactUsRoute
