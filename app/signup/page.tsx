import Signup from '@/components/Signup'

export const metadata = {
  title: "Register - GECWC Alumni Portal",
  description: "Create a new alumni account and join the GECWC Alumni network.",
  keywords: "GECWC alumni signup, alumni register, create alumni account",
  openGraph: {
    title: "Register - GECWC Alumni Portal",
    description: "Register your alumni account",
    url: `${process.env.SERVER}/signup`,
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

const SignupRoute = () => {
  return <Signup />
}

export default SignupRoute