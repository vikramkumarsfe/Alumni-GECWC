import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Row, Col, Statistic, ConfigProvider } from 'antd';
import { 
  Users, 
  CalendarDays, 
  Briefcase, 
  Megaphone, 
  UserCircle, 
  HandHeart, 
  Sparkles,
  ArrowRight,
  Bell
} from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1e3a8a',
          borderRadius: 8,
          // Plus Jakarta Sans for Ant Components
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }}
    >
      <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-blue-100 antialiased" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        {/* --- HERO SECTION --- */}
        <section className="py-20 px-10 max-w-7xl mx-auto">
          <Row gutter={[64, 32]} align="middle">
            <Col xs={24} lg={13}>
              <div className="space-y-6">
                <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-blue-900 bg-blue-50/80 border-none flex items-center gap-2 w-fit font-bold tracking-tight">
                  Official GECWC Alumni Platform
                </Badge>
                <h1 className="text-6xl font-extrabold tracking-tighter leading-[1.05] text-slate-900">
                  Reconnect. Grow. <br/>
                  <span className="text-blue-800">Build the GECWC</span> <br/>
                  Alumni Network.
                </h1>
                <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium opacity-90">
                  A modern alumni management system for Government Engineering College West Champaran to connect graduates, faculty, and the institution under one unified platform.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button size="lg" className="bg-blue-900 hover:bg-blue-800 shadow-xl shadow-blue-900/20 px-8 font-bold h-14">
                    Join Alumni Network
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 border-slate-200 font-bold h-14 hover:bg-slate-50">
                    Explore Events
                  </Button>
                </div>
                <div className="flex gap-10 pt-8 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-2xl font-extrabold tracking-tighter">1,000+</span>
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-widest">Registered Alumni</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-extrabold tracking-tighter">Verified</span>
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-widest">Official Portal</span>
                  </div>
                </div>
              </div>
            </Col>
            
              <Col xs={24} lg={11}>
                <div className="relative lg:block hidden">
                  <div className="rounded-[2rem] overflow-hidden border-8 border-slate-50 shadow-2xl">
                    <img 
                      src="https://storage.googleapis.com/banani-generated-images/generated-images/11127a4f-b36a-4bbb-bca7-fb6fa18c4b36.jpg" 
                      alt="Campus" 
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Users className="text-blue-800" size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-800 tracking-tight">GECWC Community</span>
                  </div>
                </div>
              </Col>

          </Row>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="bg-slate-50/50 py-16 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-10">
            <Row gutter={[24, 24]}>
              {[
                { label: 'Alumni', value: 1000, suffix: '+' },
                { label: 'Events', value: 50, suffix: '+' },
                { label: 'Opportunities', value: 200, suffix: '+' },
                { label: 'Departments', value: 10, suffix: '+' },
              ].map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <Card className="text-center hover:shadow-lg transition-all border-none bg-white">
                    <CardContent className="pt-8 pb-6">
                      <Statistic 
                        title={<span className="uppercase tracking-[0.2em] text-[10px] text-slate-400 font-extrabold">{stat.label}</span>} 
                        value={stat.value} 
                        valueStyle={{ fontWeight: 800, color: '#0f172a', fontSize: '2rem', letterSpacing: '-0.05em' }}
                        suffix={stat.suffix}
                      />
                    </CardContent>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-10">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-50 text-blue-900 border-none px-5 py-1 font-bold text-xs uppercase tracking-widest">The Platform</Badge>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Built for a connected ecosystem</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Everything you need to manage alumni relationships, events, and opportunities in one secure dashboard.</p>
          </div>
          
          <Row gutter={[32, 32]} className='grid lg:grid-cols-3 grid-cols-2'>
            {[
              { icon: <Users />, title: "Alumni Directory", text: "Search verified alumni by batch, department, and location." },
              { icon: <CalendarDays />, title: "Events & Reunions", text: "Plan and track attendance for reunions and webinars." },
              { icon: <Briefcase />, title: "Job Portal", text: "Discover internships and jobs posted directly by alumni." },
              { icon: <Bell />, title: "Announcements", text: "Share official updates from the administration." },
              { icon: <UserCircle />, title: "Profile Management", text: "Maintain updated academic and professional details." },
              { icon: <HandHeart />, title: "Mentoring", text: "Enable alumni to mentor students and support projects." }
            ].map((feature, i) => (
              <Col xs={24} md={12} lg={8} key={i}>
                <Card className="h-full border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all group cursor-default ">
                  <CardContent className="p-8 space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                      {React.cloneElement(feature.icon, { size: 28 })}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.text}</p>
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* --- EVENTS PREVIEW --- */}
        <section className="py-24 bg-white max-w-7xl mx-auto px-10 w-full">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">Upcoming Events</h2>
              <p className="text-slate-500 font-medium mt-2">Stay updated with reunions and college activities.</p>
            </div>
            <Link href="/alumni/events">
              <Button variant="link" className="hidden sm:flex items-center gap-2 font-bold text-blue-900">
                View All Events <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <Row gutter={[32, 32]}>
            {[
              { 
                img: "https://storage.googleapis.com/banani-generated-images/generated-images/76b6e032-c92c-427e-956e-7c45cbd40d57.jpg",
                date: "25 March 2024",
                loc: "GECWC Campus",
                title: "Annual Alumni Meet 2024"
              },
              { 
                img: "https://storage.googleapis.com/banani-generated-images/generated-images/4e5456be-b42e-4be7-bbbf-39aac9044bd0.jpg",
                date: "10 April 2024",
                loc: "Online Webinar",
                title: "Industry Trends in Software Engineering"
              },
              { 
                img: "https://storage.googleapis.com/banani-generated-images/generated-images/df2a409a-16c5-41de-a8dd-ecb8a60790cf.jpg",
                date: "5 May 2024",
                loc: "GECWC Auditorium",
                title: "Alumni-Led Career Fair"
              }
            ].map((event, i) => (
              <Col xs={24} md={8} key={i}>
                <div className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden mb-5 aspect-[4/3] shadow-md border border-slate-100">
                    <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-[0.2em]">{event.date} • {event.loc}</span>
                  <h4 className="text-xl font-bold mt-2 group-hover:text-blue-800 transition-colors tracking-tight leading-snug">{event.title}</h4>
                  <div className="mt-4 flex items-center text-blue-900 font-bold text-sm group-hover:gap-2 transition-all">
                    <Link href="/alumni/events" className='flex'>
                      Explore Details <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-20 px-10">
          <Card className="max-w-5xl mx-auto bg-blue-900 border-none shadow-2xl overflow-hidden relative rounded-[2.5rem]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/40 rounded-full -mr-32 -mt-32 blur-3xl" />
            <CardContent className="p-16 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tighter">Ready to strengthen the <br/> GECWC community?</h2>
              <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg opacity-90 font-medium leading-relaxed">
                Register today to join a trusted network of engineers, mentors, and leaders from Government Engineering College West Champaran.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login" className='block cursor-pointer'>
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-12 font-bold h-14 rounded-full cursor-pointer">
                    Join Alumni Network
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className=" border-blue-400 hover:bg-blue-800/50 px-12 font-bold h-14 rounded-full">
                  Talk to Alumni Cell
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </ConfigProvider>
  );
};

export default Home;