interface Education {
  _id: string
  degreeName: string
  universityName: string
  completionYear: number
  score?: string
}

interface Props {
  education: Education[]
}

export default function AlumniEducationSection({
  education,
}: Props) {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold text-gray-900">
        Education
      </h2>

      <div className="mt-6 space-y-6">
        {education.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900">
              {item.degreeName}
            </h3>

            <p className="text-base text-gray-600 mt-1">
              {item.universityName}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {item.completionYear} • {item.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
