"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ThankYou() {
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>(".reveal");
        els.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 150 * i);
        });
    }, []);

    return (
        <div className="relative min-h-dvh w-full overflow-hidden bg-[#ffffff] flex items-center justify-center px-6 py-12 md:px-16">

            {/* Grid */}
            <div className="relative z-10 mx-auto w-full max-w-6xl grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 items-center">

                {/* LEFT */}
                <div className="flex flex-col gap-6">

                    {/*  UPDATED BADGE */}
                    <div
                        className="reveal inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5"
                        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                    >
                        <CheckCircle size={15} className="text-green-600" />
                        <span className="text-xs font-semibold text-slate-800">
                            Application Submitted
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="reveal text-5xl font-extrabold tracking-tight text-slate-800 leading-tight md:text-6xl"
                        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                    >
                        Thank you!
                    </h1>

                    {/* Body */}
                    <div
                        className="reveal flex flex-col gap-3"
                        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                    >
                        <p className="text-[15px] leading-relaxed text-slate-500">
                            Thank you for registering with the{" "}
                            <strong className="text-slate-700">GECWC Alumni Network </strong>
                            Your application has been received and is currently under review by<strong className="text-slate-700"> our admin team.</strong>.
                            You will receive a <strong className="text-slate-700">confirmation email within 1 working day</strong> regarding your account activation.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div
                        className="reveal flex flex-wrap gap-3"
                        style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                    >
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800"
                        >
                            Go to Login <ArrowRight size={16} />
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            Back to Home
                        </Link>
                    </div>

                </div>

                {/* RIGHT (same illustration, no change needed) */}
                <div
                    className="reveal order-first flex items-center justify-center md:order-last"
                    style={{ opacity: 0, transform: "translateY(22px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                >
                    <div
                        className="reveal order-first flex items-center justify-center md:order-last"
                        style={{
                            opacity: 0,
                            transform: "translateY(22px)",
                            transition: "opacity 0.5s ease, transform 0.5s ease"
                        }}
                    >
                        <Image
                            src="/images/thankyou.png"   
                            alt="Thank You Illustration"
                            width={400}
                            height={400}
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
