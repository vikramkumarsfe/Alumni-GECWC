import AlumniPrivateHeader from "@/components/alumni/AlumniPrivateHeader"
import AlumniContactCard from "@/components/alumni/AlumniContactCard"
import AlumniPrivateEducationSection from "@/components/alumni/AlumniPrivateEducationSection"

export default function AlumniPrivateProfile() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <AlumniPrivateHeader/>

        <AlumniContactCard />

        <AlumniPrivateEducationSection />
      </div>
    </div>
  )
}
