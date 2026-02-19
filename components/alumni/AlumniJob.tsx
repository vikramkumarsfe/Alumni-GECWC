"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Briefcase,
  ArrowUpDown,
  CheckCircle2,
  Building2,
} from "lucide-react";

const  AlumniJob = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">Career Opportunities</h1>
          <p className="text-sm text-muted-foreground">
            Explore job openings shared by alumni and network partners.
          </p>
        </div>

        {/* Applied Banner */}
        <Card className="bg-secondary/40 border border-primary/20">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              You have applied to 5 jobs recently.
            </div>
            <Button variant="link" className="text-primary p-0">
              View My Applications →
            </Button>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or company..."
              className="pl-9"
            />
          </div>

          <Button variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </Button>

          <Button variant="outline" className="gap-2">
            <Briefcase className="w-4 h-4" />
            Job Type
          </Button>

          <Button variant="outline" className="ml-auto gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Sort: Latest
          </Button>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Job Card */}
          <Card className="flex flex-col hover:shadow-md transition">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-md">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">
                    Software Engineer
                  </CardTitle>
                  <CardDescription>
                    TechCorp Solutions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Bangalore, India
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Full-time</Badge>
                <Badge variant="outline">Remote Friendly</Badge>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                We are looking for a skilled Software Engineer to join our backend team. 
                You will work with Node.js, PostgreSQL, and AWS.
              </p>
            </CardContent>

            <CardFooter className="mt-auto flex gap-3">
              <Button className="flex-1">Apply Now</Button>
              <Button variant="outline" className="flex-1">
                Details
              </Button>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default AlumniJob
