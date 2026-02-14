import AlumniProfileHeader from "@/components/alumni/AlumniProfileHeader"
import AlumniAboutSection from "@/components/alumni/AlumniAboutSection"
import AlumniEducationSection from "@/components/alumni/AlumniEducationSection"

export default function AlumniPublicProfile() {
  const user = {
    fullname: "Vikram Kumar",
    image: "https://i.pravatar.cc/300?img=12",
    department: "Computer Science",
    batch: "2022",
    company: "Google",
    position: "Software Engineer",
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
      _id: "2",
      degreeName: "M.Tech Artificial Intelligence",
      universityName: "IISc Bangalore",
      completionYear: 2024,
      score: "9.2 CGPA",
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <AlumniProfileHeader user={user} />

        <AlumniAboutSection bio="Passionate about scalable systems and distributed architecture. Currently building cloud-native applications.Passionate about scalable systems and distributed architecture. Currently building cloud-native applicatioPassionate about scalable systems and distributed architecture. Currently building cloud-native applicatioPassionate about scalable systems and distributed architecture. Currently building cloud-native applicatio" />

        <AlumniEducationSection education={education} />
      </div>
    </div>
  )
}
