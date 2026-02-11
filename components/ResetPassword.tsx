"use client";
import Link from 'next/link'
const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f7f8f9] to-[#eef1f3] px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Reset Password
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Create a new password for your account.  
          Make sure it is strong and secure.
        </p>

     
        <form className="space-y-5">

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#a83246]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#a83246]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6C63FF] text-white py-3 rounded-md font-medium  transition"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
          <Link href='/login' className='text-blue-600 font-medium underline'>log in</Link>

        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
