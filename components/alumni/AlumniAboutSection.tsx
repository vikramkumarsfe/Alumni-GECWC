'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  bio?: string;
}

export default function AlumniAboutSection({ bio }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // If the bio is shorter than 300 characters, don't show the "Read More" button
  const shouldShowToggle = bio && bio.length > 300;
  const displayBio = isExpanded || !shouldShowToggle ? bio : `${bio.substring(0, 300)}...`;

  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center gap-2 px-1">
        <Quote className="w-5 h-5 text-violet-600 fill-violet-600/10" />
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          About Me
        </h2>
      </div>

      <Card className="border-muted bg-card shadow-sm overflow-hidden">
        <CardContent className="p-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {bio ? displayBio : (
                <span className="italic text-muted-foreground/60">
                  This alum hasn't shared their story yet.
                </span>
              )}
            </p>
          </div>

          {
            shouldShowToggle && (
                <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-violet-600 hover:text-violet-700 hover:bg-violet-50 p-0 h-auto font-semibold"
                >
                {isExpanded ? (
                    <span className="flex items-center gap-1">Show less <ChevronUp className="w-4 h-4" /></span>
                ) : (
                    <span className="flex items-center gap-1">Read full bio <ChevronDown className="w-4 h-4" /></span>
                )}
                </Button>
            )
          }
        </CardContent>
      </Card>
    </div>
  );
}