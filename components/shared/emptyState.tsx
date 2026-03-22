import { Button } from "antd";
import { Search, UsersRound } from "lucide-react";
import Link from "next/link";

const  EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed border-slate-200 rounded-2xl bg-white">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center"><UsersRound size={32} /></div>
      <div className="text-center">
        <p className="text-[16px] font-semibold text-slate-900">No connections yet</p>
        <p className="text-[13px] text-slate-500 max-w-xs mt-1">Start building your professional network by connecting with alumni.</p>
      </div>
      <Link href="/student/directory">
        <Button className="gap-2 mt-1 cursor-pointer"><Search size={15} />Explore Alumni Directory</Button>
      </Link>
    </div>
  );
}

export default EmptyState

