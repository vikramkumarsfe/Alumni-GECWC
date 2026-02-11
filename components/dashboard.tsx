'use client'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      
      <aside className="w-64 bg-white border-r border-gray-200 px-6 py-6">
        <h2 className="text-lg font-semibold mb-8">Alumni Management</h2>

        <nav className="space-y-6 text-sm text-gray-700">

          <div>
            <p className="text-xs text-gray-400 uppercase mb-2">Home</p>
            <ul className="space-y-2">
              <li className="font-medium text-violet-600">Dashboard</li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase mb-2">Application</p>
            <ul className="space-y-2">
              <li>Registered Alumni</li>
              <li>Verified Alumni</li>
              <li>Rejected Alumni</li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase mb-2">Membership</p>
            <ul className="space-y-2">
              <li>Membership</li>
              <li>Membership Fee</li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase mb-2">Settings</p>
            <ul className="space-y-2">
              <li>Exports</li>
              <li>Settings</li>
            </ul>
          </div>

        </nav>
      </aside>

     
      <main className="flex-1 px-10 py-8">

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-lg border">
            <p className="text-sm text-gray-500">Alumni : Total Count</p>
            <h2 className="text-2xl font-semibold mt-2">229</h2>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <p className="text-sm text-gray-500">Alumni : Accounts Created</p>
            <h2 className="text-2xl font-semibold mt-2">81</h2>
            <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
              View Details
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <p className="text-sm text-gray-500">Alumni : Accounts Creation Pending</p>
            <h2 className="text-2xl font-semibold mt-2">138</h2>
            <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
              View Details
            </button>
          </div>

        </div>

        
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Alumni Data Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-lg border">
              <p className="text-sm text-gray-500">Registered Alumni</p>
              <h2 className="text-2xl font-semibold mt-2">6</h2>
              <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
                View Details
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <p className="text-sm text-gray-500">Verified Alumni</p>
              <h2 className="text-2xl font-semibold mt-2">217</h2>
              <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
                View Details
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <p className="text-sm text-gray-500">Rejected Alumni</p>
              <h2 className="text-2xl font-semibold mt-2">4</h2>
              <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
                View Details
              </button>
            </div>

          </div>
        </div>

        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Alumni Membership Data Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-lg border">
              <p className="text-sm text-gray-500">Total Membership Type</p>
              <h2 className="text-2xl font-semibold mt-2">8</h2>
              <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
                View Details
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <p className="text-sm text-gray-500">
                Total Amount of Membership Fees Collected
              </p>
              <h2 className="text-2xl font-semibold mt-2">₹ 10244.00</h2>
              <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
                View Details
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <p className="text-sm text-gray-500">
                Count of Alumni Who Paid For At Least One Membership Type
              </p>
              <h2 className="text-2xl font-semibold mt-2">13</h2>
              <button className="mt-3 text-xs text-violet-600 border px-3 py-1 rounded">
                View Details
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}
