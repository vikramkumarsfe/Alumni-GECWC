import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  // Added these to show how you'd handle the state for filters
  department?: string;
  setDepartment?: (value: string) => void;
  batch?: string;
  setBatch?: (value: string) => void;
}

export default function AlumniSearchFilter({
  search,
  setSearch,
  department,
  setDepartment,
  batch,
  setBatch,
}: Props) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
      {/* Search Input with Icon */}
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, company, or role..."
          className="pl-10 h-10"
        />
      </div>

      {/* Department Filter */}
      <Select value={department} onValueChange={setDepartment}>
        <SelectTrigger className="w-full md:w-[200px] h-20">
          <SelectValue placeholder="All Departments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="cs">Computer Science</SelectItem>
          <SelectItem value="eng">Engineering</SelectItem>
          <SelectItem value="biz">Business</SelectItem>
        </SelectContent>
      </Select>

      {/* Batch Filter */}
      <Select value={batch} onValueChange={setBatch}>
        <SelectTrigger className="w-full md:w-[160px] h-20">
          <SelectValue placeholder="All Batches" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Batches</SelectItem>
          <SelectItem value="2024">Class of 2024</SelectItem>
          <SelectItem value="2023">Class of 2023</SelectItem>
          <SelectItem value="2022">Class of 2022</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}