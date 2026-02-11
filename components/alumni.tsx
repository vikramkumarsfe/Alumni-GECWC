'use client'

const AlumniPortalPage = ()=> {
  return (
    <div className="bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto bg-white px-10 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          
          <div className="lg:col-span-2 text-sm text-gray-800 leading-relaxed space-y-8">

            <div>
              <h1 className="text-xl font-semibold mb-3">About Alumni Portal</h1>
              <p>
                The Alumni Portal of Government Engineering College West Champaran
                is a dedicated platform created to maintain a lifelong connection
                between the institution and its alumni. The portal aims to bring
                together alumni, students, and the institute to foster professional
                engagement, mentorship, and institutional development.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-2">Our Mission</h2>
              <p>
                Our mission is to foster strong bonds between alumni, students,
                and the institution, to keep alumni informed, and to create a
                network enabling them to remain engaged with their alma mater
                and contribute to its growth.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-2">Our Objectives</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>Promote interaction among alumni members.</li>
                <li>Encourage mentorship and career guidance.</li>
                <li>Support academic, research, and institutional development.</li>
                <li>Facilitate alumni contribution and engagement.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-2">Alumni Outreach</h2>
              <p>
                Alumni Outreach focuses on building bridges between past and
                present students by encouraging alumni participation in reunions,
                mentoring programs, workshops, and knowledge-sharing initiatives.
                Joining the alumni association provides alumni with an opportunity
                to reconnect, give back to the institution, and serve as role
                models for current students.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-2">
                Initiatives and Services
              </h2>
              <p>
                Developing an active and engaged alumni network empowers both
                the institution and its graduates. Alumni participate in events,
                contribute to academic initiatives, support students, and assist
                in institutional growth through various programs and services.
              </p>
            </div>

          </div>

         
          <div className="text-sm text-gray-800 space-y-8">

            <div>
              <h2 className="text-base font-semibold mb-2">
                Advisory Board
              </h2>
              <ul className="space-y-1">
                <li>Prof. A. Kumar – Patron</li>
                <li>Dr. S. Singh – President</li>
                <li>Mr. R. Verma – Secretary</li>
                <li>Ms. P. Sharma – Treasurer</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-2">
                Reports & Archives
              </h2>
              <ul className="space-y-1 mb-3">
                <li>Annual Reports</li>
                <li>Articles of Association</li>
                <li>Newsletters</li>
              </ul>

              <button className="w-full bg-blue-600 text-white py-2 text-xs">
                Download Archive
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
export default AlumniPortalPage
