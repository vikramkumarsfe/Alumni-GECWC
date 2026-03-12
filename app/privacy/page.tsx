import PrivacyPolicy from '../../components/public/privacyPolicy'

export const metadata = {
  title: "Privacy Policy - GECWC Alumni Portal",
  description: "Read the privacy policy of the GECWC Alumni Management Portal to understand how your data is collected and used.",
  keywords: "GECWC alumni privacy policy, alumni portal privacy",
  openGraph: {
    title: "Privacy Policy - GECWC Alumni Portal",
    description: "Privacy policy of GECWC Alumni Portal",
    url: `${process.env.SERVER}/privacy`,
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
const PrivacyRouter = () => {
  return (
    <PrivacyPolicy />
   )
}

export default PrivacyRouter
