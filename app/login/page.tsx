import Login from '@/components/Login'

export const metadata = {
  title: "Login - GECWC Alumni Portal",
  description: "Login to your GECWC Alumni account to connect with alumni and access the alumni network.",
  keywords: "GECWC alumni login, alumni portal login, GECWC alumni account",
  openGraph: {
    title: "Login - GECWC Alumni Portal",
    description: "Login to your alumni account",
    url: `${process.env.SERVER}/login`,
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
const LoginRoute = () => {
  return <Login />
}

export default LoginRoute 
