'use client'
import Link from 'next/link'
import Image from "next/image";

import forgotPasswordImage from '@/public/images/forgot.png'
const ForgotPassword = () => {
  return (
    <div className="flex h-screen">
      
       <div className="w-full md:w-[50%] flex items-center justify-center">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Forgot password?
          </h1>

          <p className="text-gray-500 mb-8">
            Please, enter the email associated with your account and we’ll
            send an email with a link, where you can change your password.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Your email
              </label>
              <input
                type="email"
                placeholder="emily.clarke@gmail.com"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none "
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6C63FF] text-white py-3 rounded-md font-medium transition"
            >
              Send
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Or you can{" "}
            <Link href='/login' className='text-blue-600 font-medium underline'>log in</Link>
            .
          </p>
        </div>
      </div>

      
      <div className="w-[50%] flex items-center justify-center ">
        <Image
          src={forgotPasswordImage}
          alt="Forgot Password"
          className="w-3/4 object-contain"
        />
      </div>

    </div>
  );
};

export default ForgotPassword;