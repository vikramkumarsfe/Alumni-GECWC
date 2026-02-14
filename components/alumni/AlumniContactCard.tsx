'use client'
import { Mail, Phone, Smartphone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface Props {
  email: string;
  mobile?: string;
}

export default function AlumniContactCard({ email, mobile }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12">
      <Card className="border-none shadow-sm bg-slate-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Mail className="w-5 h-5 text-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Section */}
          <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm transition-hover hover:shadow-md">
            <div className="p-2 bg-blue-50 rounded-md">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Email Address
              </p>
              <p className="text-sm font-medium text-slate-900 truncate">
                {email}
              </p>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => copyToClipboard(email)}
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Email</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Mobile Section */}
          <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm transition-hover hover:shadow-md">
            <div className="p-2 bg-emerald-50 rounded-md">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Phone Number
              </p>
              <p className={`text-sm font-medium ${mobile ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                {mobile || "Not provided"}
              </p>
            </div>
            {mobile && (
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href={`tel:${mobile}`}>
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}