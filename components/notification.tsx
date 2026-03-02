'use client'


const NotificationsPage = () =>{
  return (
    <div className="bg-slate-50 min-h-screen">

      <section className="px-[10%] py-16">
        <h1 className="text-3xl font-semibold text-gray-900">
          Notifications
        </h1>
      </section>

      <section className="px-[10%] pb-24 space-y-8">

        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-6 items-start">
          <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600">
            📢
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              Important Alumni Meeting Announcement
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Posted on April 22, 2024
            </p>

            <p className="text-gray-600 mt-3">
              All alumni are requested to attend an important meeting scheduled
              for next month regarding upcoming initiatives and engagement
              activities of the Alumni Portal.
            </p>
          </div>

          <button className="self-end text-sm text-violet-600 border border-violet-200 px-4 py-1.5 rounded-lg hover:bg-violet-50 transition">
            Read More
          </button>
        </div>

        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-6 items-start">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            📄
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              Semester End Exam Schedule Published
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Posted on April 18, 2024
            </p>

            <p className="text-gray-600 mt-3">
              The detailed schedule for semester end examinations has been
              published. Alumni and students are requested to check the
              official academic calendar.
            </p>
          </div>

          <button className="self-end text-sm text-violet-600 border border-violet-200 px-4 py-1.5 rounded-lg hover:bg-violet-50 transition">
            Read More
          </button>
        </div>

        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-6 items-start">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            🛠️
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Workshop on Career Development
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Posted on April 15, 2024
            </p>

            <p className="text-gray-600 mt-3">
              Join us for an upcoming workshop focusing on career skills,
              industry trends, and job opportunities. Experienced alumni
              will share insights and guidance.
            </p>
          </div>

          <button className="self-end text-sm text-violet-600 border border-violet-200 px-4 py-1.5 rounded-lg hover:bg-violet-50 transition">
            Read More
          </button>
        </div>

        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex gap-6 items-start">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            📡
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              Campus Network Maintenance on April 25th
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Posted on April 10, 2024
            </p>

            <p className="text-gray-600 mt-3">
              Please be informed that scheduled maintenance activities
              will be carried out on the campus network on April 25th.
              Temporary service interruptions may occur.
            </p>
          </div>

          <button className="self-end text-sm text-violet-600 border border-violet-200 px-4 py-1.5 rounded-lg hover:bg-violet-50 transition">
            Read More
          </button>
        </div>

      </section>
    </div>
  );
}
export default NotificationsPage
