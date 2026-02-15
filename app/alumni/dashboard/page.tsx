import AlumniPrivateHeader from "@/components/alumni/AlumniPrivateHeader"
import AlumniContactCard from "@/components/alumni/AlumniContactCard"
import AlumniPrivateEducationSection from "@/components/alumni/AlumniPrivateEducationSection"

export default function AlumniPrivateProfile() {
  const user = {
    fullname: "Vikram Kumar",
    image: "https://i.pravatar.cc/300?img=15",
    department: "Computer Science",
    batch: "2022",
    email: "vikram@example.com",
    mobile: "9876543210",
  }

  const education = [
    {
      _id: "1",
      degreeName: "B.Tech Computer Science",
      universityName: "IIT Delhi",
      completionYear: 2022,
      score: "8.9 CGPA",
    },
    {
      _id: "1",
      degreeName: "B.Tech Computer Science",
      universityName: "IIT Delhi",
      completionYear: 2022,
      score: "8.9 CGPA",
    },
    {
      _id: "1",
      degreeName: "B.Tech Computer Science",
      universityName: "IIT Delhi",
      completionYear: 2022,
      score: "8.9 CGPA",
    },
  ]

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <AlumniPrivateHeader user={user} />

        <AlumniContactCard
          email={user.email}
          mobile={user.mobile}
        />

        <AlumniPrivateEducationSection
          education={education}
        />
      </div>
    </div>
  )
}
