import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils"; // Common utility for Tailwind classes

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <Link 
      href="/" 
      className={cn(
        "group flex items-center gap-3 transition-all duration-200 active:scale-95",
        className
      )}
    >
      {showText && (
        <span className="flex items-center  text-xl font-bold tracking-tight text-foreground">
            Alumni-
        <span className=" text-violet-600 transition-colors group-hover:text-violet-500">
        GECWC
        </span>
        </span>
      )}
    </Link>
  );
};

export default Logo;