"use client";

import React from "react";
import { List } from "antd";
import { Mail } from "lucide-react";

const Section = ({ number, title, children }) => {
  return (
    <section className="py-8 border-b border-slate-100 last:border-none">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl font-semibold text-slate-800">
          {number}. {title}
        </span>
      </div>

      <div>{children}</div>
    </section>
  );
};

const PrivacyPolicy = () => {

  const collectionList = [
    "Full Name",
    "Email address",
    "Phone number",
    "Graduation year",
    "Academic Department",
    "Professional details (e.g., current job title, company, industry)",
    "Profile information and uploaded photographs"
  ];

  const usageList = [
    "Facilitating alumni networking and professional connections",
    "Sending important event notifications and reunion updates",
    "Sharing relevant job opportunities, internships, and career resources",
    "Delivering official communication and announcements from the college",
    "Improving the portal's features, functionality, and overall user experience"
  ];

  const cookieList = [
    { name: "Essential Cookies", desc: "Required for basic portal functionality such as login sessions and security." },
    { name: "Analytics Cookies", desc: "Help us understand how users interact with the portal to improve features." },
    { name: "Preference Cookies", desc: "Remember your settings and preferences for a personalized experience." },
  ];

  const rightsData = [
    { title: "Right to Access", desc: "Request a copy of all personal data we hold about you at any time." },
    { title: "Right to Rectification", desc: "Correct any inaccurate or incomplete information in your profile." },
    { title: "Right to Erasure", desc: "Request deletion of your personal data from our systems." },
    { title: "Right to Restrict Processing", desc: "Ask us to limit how we use your data in specific circumstances." },
    { title: "Right to Data Portability", desc: "Receive your data in a structured, machine-readable format." },
    { title: "Right to Object", desc: "Opt out of certain types of data processing, including marketing." },
  ];

  const thirdParties = [
    { party: "Email Service Provider", purpose: "Sending newsletters, event reminders, and official communications." },
    { party: "Cloud Hosting Provider", purpose: "Secure storage and serving of portal data and media." },
    { party: "Analytics Platform", purpose: "Anonymized usage analytics to improve portal performance." },
    { party: "Payment Gateway (if applicable)", purpose: "Processing event registration fees securely." },
  ];

  const securityItems = [
    "SSL/TLS encryption for all data in transit",
    "Encrypted storage for sensitive information",
    "Role-based access controls for staff",
    "Regular security audits and vulnerability testing",
    "Secure, redundant cloud hosting infrastructure",
    "Automatic session timeouts for inactive users",
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Banner */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative">
          <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">Government Engineering College West Champaran Alumni Portal</p>
          <p className="text-blue-200 text-sm mt-2">Last Updated: October 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Quick Summary */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10">
          <p className="font-semibold text-lg mb-1">Summary</p>
          <p className="text-blue-100 text-sm leading-relaxed">
            We collect only the information necessary to help you connect with fellow alumni and stay updated with GECWC events.
            Your data is never sold to third parties. You have full rights to access, correct, and delete your information at any time.
          </p>
        </div>

        {/* 1. Introduction */}
        <Section number="1" title="Introduction">
          <p className="text-slate-600 leading-relaxed">
            The GECWC Alumni Management Portal ("Portal", "we", "us", or "our") is operated by Government Engineering College
            West Champaran. We are committed to safeguarding the privacy of all registered alumni and visitors. This Privacy
            Policy explains what personal information we collect, why we collect it, how it is used, and the rights you hold
            over your data. By registering or continuing to use the Portal, you consent to the practices described herein.
          </p>
        </Section>

        {/* 2. Information We Collect */}
        <Section number="2" title="Information We Collect">
          <p className="text-slate-600 mb-3">We may collect the following categories of personal information:</p>
          <List
            dataSource={collectionList}
            renderItem={(item, index) => (
              <List.Item className="border-none py-1.5">
                <span className="flex gap-2 text-slate-600">
                  <span className="text-slate-400 font-medium w-5 shrink-0">{index + 1}.</span>{item}
                </span>
              </List.Item>
            )}
          />
          <div className="mt-4 bg-slate-50 rounded-lg p-4 text-sm text-slate-500">
            <strong className="text-slate-700">Automatically Collected Data:</strong> We may also collect technical data
            such as IP addresses, browser type, device information, and pages visited through cookies and server logs
            to maintain portal security and performance.
          </div>
        </Section>

        {/* 3. How We Use Information */}
        <Section number="3" title="How We Use Your Information">
          <p className="text-slate-600 mb-3">The information we collect is used exclusively for the following purposes:</p>
          <List
            dataSource={usageList}
            renderItem={(item, index) => (
              <List.Item className="border-none py-1.5">
                <span className="flex gap-2 text-slate-600">
                  <span className="text-slate-400 font-medium w-5 shrink-0">{index + 1}.</span>{item}
                </span>
              </List.Item>
            )}
          />
          <p className="text-slate-500 text-sm mt-4 italic">
            We will never use your data for purposes beyond those listed above without your explicit consent.
          </p>
        </Section>

        {/* 4. Data Sharing & Third Parties */}
        <Section number="4" title="Data Sharing & Third Parties">
          <p className="text-slate-600 mb-4">
            We do <strong>not</strong> sell, rent, or trade your personal information. We may share limited data with
            trusted third-party service providers solely to operate the portal:
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left p-3 font-semibold border-b border-slate-200">Third Party</th>
                  <th className="text-left p-3 font-semibold border-b border-slate-200">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {thirdParties.map((row, i) => (
                  <tr key={i} className="bg-white border-b border-slate-100 last:border-none">
                    <td className="p-3 text-slate-700 font-medium">{row.party}</td>
                    <td className="p-3 text-slate-500">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm mt-3">
            All third-party providers are contractually obligated to protect your data and may only use it for the
            specified service they provide to us.
          </p>
        </Section>

        {/* 5. Cookies */}
        <Section number="5" title="Cookies & Tracking Technologies">
          <p className="text-slate-600 mb-4">
            We use cookies and similar tracking technologies to enhance your experience on the Portal.
            You can manage your cookie preferences through your browser settings at any time.
          </p>
          <div className="space-y-3">
            {cookieList.map((c, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-slate-100 last:border-none">
                <span className="text-slate-400 font-medium w-5 shrink-0">{i + 1}.</span>
                <div>
                  <p className="font-semibold text-slate-700 text-sm">{c.name}</p>
                  <p className="text-slate-500 text-sm">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. Data Retention */}
        <Section number="6" title="Data Retention">
          <p className="text-slate-600 leading-relaxed">
            We retain your personal data for as long as your account remains active or as needed to provide portal services.
            If you request account deletion, your data will be permanently removed within <strong>30 days</strong>, except
            where we are legally required to retain certain records. Anonymized, aggregated data may be retained indefinitely
            for statistical and research purposes.
          </p>
        </Section>

        {/* 7. Data Security */}
        <Section number="7" title="Data Security">
          <p className="text-slate-600 leading-relaxed mb-4">
            We implement industry-standard security measures to protect your personal data, including:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {securityItems.map((item, i) => (
              <div key={i} className="flex gap-2 items-start text-sm text-slate-600 py-2">
                <span className="text-slate-400 font-medium w-5 shrink-0">{i + 1}.</span>
                {item}
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-4">
            While we strive to protect your data, no method of transmission over the internet is 100% secure.
            We encourage you to use strong passwords and keep your login credentials confidential.
          </p>
        </Section>

        {/* 8. Your Rights */}
        <Section number="8" title="Your Rights">
          <p className="text-slate-600 mb-4">
            As a user of the GECWC Alumni Portal, you have the following rights regarding your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rightsData.map(({ title, desc }, i) => (
              <div key={i} className="flex gap-3 items-start py-2">
                <span className="text-slate-400 font-medium w-5 shrink-0">{i + 1}.</span>
                <div>
                  <p className="font-semibold text-slate-700 text-sm">{title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-4">
            To exercise any of these rights, please contact us at <strong>alumni@gecwc.ac.in</strong>.
            We will respond to all verified requests within <strong>15 business days</strong>.
          </p>
        </Section>

        {/* 9. Children's Privacy */}
        <Section number="9" title="Children's Privacy">
          <p className="text-slate-600 leading-relaxed">
            The GECWC Alumni Portal is intended solely for use by graduates and former students who are 18 years of age
            or older. We do not knowingly collect personal data from individuals under the age of 18. If we become aware
            that a minor has provided personal information, it will be promptly deleted from our records.
          </p>
        </Section>

        {/* 10. Changes to Policy */}
        <Section number="10" title="Changes to This Policy">
          <p className="text-slate-600 leading-relaxed">
            We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our practices
            or for legal, operational, or regulatory reasons. When changes are made, the "Last Updated" date at the top
            of this page will be revised. Significant changes will be communicated to registered users via email or a
            prominent notice on the Portal. Continued use of the Portal after changes constitutes acceptance of the
            revised policy.
          </p>
        </Section>

        {/* Contact */}
        <div className="mt-6 pt-8 border-t border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact Us</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data,
            please reach out to us. We are committed to addressing your concerns promptly and transparently.
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-slate-700">Government Engineering College West Champaran</p>
            <p className="text-slate-500">Data Privacy Officer</p>
            <a href="mailto:alumni@gecwc.ac.in" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Mail size={14} /> alumni@gecwc.ac.in
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;