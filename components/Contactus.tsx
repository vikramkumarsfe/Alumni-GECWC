'use client'
import Image from "next/image";
import logoImage from '@/public/images/logo.jpeg'

const ContactPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">

      
      <section className="text-center px-[10%] py-20">
        <h1 className="text-3xl font-semibold text-gray-900">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? Reach out to us and we&apos;ll get back to you shortly.
        </p>
      </section>

      
      <section className="px-[10%] pb-24 space-y-16">

        
        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Contact Information
          </h2>

          <div className="flex items-start gap-6">
            
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              
              <Image
                  src={logoImage}
                  alt="logoImage"
                />
            </div>

            
            <div className="space-y-3 text-gray-700">
              <h3 className="text-lg font-semibold text-gray-900">
                Government Engineering College West Champaran
              </h3>

              <p className="text-sm">
                Post-Chandradei, Lauria, Bettiah,<br />
                West Champaran, Bihar 845453
              </p>

              <p className="text-sm">
                📞 +91 XXXXX XXXXX
              </p>

              <p className="text-sm">
                ✉️ alumni@gecwc.ac.in
              </p>
            </div>
          </div>
        </div>

        
        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Send Us a Message
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            Fill out the form below and our team will respond as soon as possible.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            
            <div>
              <label className="text-sm text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            
            <div>
              <label className="text-sm text-gray-700">Subject</label>
              <select
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option>Select Subject</option>
                <option>General Query</option>
                <option>Alumni Registration</option>
                <option>Mentorship</option>
                <option>Jobs & Internships</option>
              </select>
            </div>

            
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            
            <div>
              <label className="text-sm text-gray-700">Role</label>
              <select
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option>Select Your Role</option>
                <option>Student</option>
                <option>Alumni</option>
                <option>Faculty</option>
                <option>Other</option>
              </select>
            </div>

            
            <div className="md:col-span-2">
              <label className="text-sm text-gray-700">
                Message (Student Queries)
              </label>
              <textarea
                rows={5}
                placeholder="Write your message here..."
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
              ></textarea>
            </div>

            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="mt-4 bg-violet-600 hover:bg-violet-700 transition text-white px-10 py-3 rounded-lg font-medium"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>

      </section>
    </div>
  );
}
export default ContactPage
