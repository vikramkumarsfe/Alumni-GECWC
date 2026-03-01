import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 transition-all duration-300",
        className
      )}
    >
      {/* Logo Badge */}
      {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-lg shadow-md group-hover:shadow-violet-300/40 group-hover:scale-105 transition-all duration-300">
        G
      </div> */}

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight group-hover:opacity-80 transition">
            GEC-WC
          </span>
          <span className="text-xs font-medium text-slate-500 tracking-wide">
            Alumni Network
          </span>
          
        </div>
      )}
    </Link>
  );
};

export default Logo;