'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  bio?: string;
}

export default function AlumniAboutSection({ bio }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const CHARACTER_LIMIT = 300;
  const shouldShowToggle = bio && bio.length > CHARACTER_LIMIT;

  return (
    <div className="mt-12 space-y-6">
      {/* Header with an accent icon */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-violet-100 rounded-lg">
            <Quote className="w-4 h-4 text-violet-600 fill-violet-600/10" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            About Me
          </h2>
        </div>
        {bio && (
             <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Alumni Story
             </div>
        )}
      </div>

      <Card className="relative border-muted/60 bg-gradient-to-b from-card to-muted/20 shadow-sm overflow-hidden group">
        <CardContent className="p-8">
          <div 
            className={cn(
              "relative transition-all duration-500 ease-in-out overflow-hidden",
              !isExpanded && shouldShowToggle ? "max-h-[120px]" : "max-h-[2000px]"
            )}
          >
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-medium/40">
              {bio ? bio : (
                <span className="italic text-muted-foreground/50">
                  This alum hasn't shared their story yet. Connect to learn more about their journey.
                </span>
              )}
            </p>

            {/* Gradient Fade Overlay */}
            {!isExpanded && shouldShowToggle && (
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-card to-transparent" />
            )}
          </div>

          {shouldShowToggle && (
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-full border-violet-200 bg-white hover:bg-violet-50 hover:text-violet-700 transition-all px-6 group"
              >
                {isExpanded ? (
                  <span className="flex items-center gap-2">
                    Show less <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Read full story <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  </span>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}