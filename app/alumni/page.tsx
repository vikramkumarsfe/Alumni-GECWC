import AlumniGrid from "@/components/alumni/AlumniGrid"

export default function AlumniDirectoryPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="text-3xl font-semibold text-gray-900">
          Alumni Directory
        </h1>

        <p className="text-base text-gray-600 mt-3">
          Connect with graduates across different batches and departments.
        </p>

        <AlumniGrid />
      </div>
    </div>
  )
}
