import { FileText } from "lucide-react";
import Image from "next/image";
import profileimg from "@/assets/dashboard/profile.png";

interface DashboardStatusCardProps {
  dashboardStatusName: string;
  todaysTask: number;
  overdueTask: number;
  stats?: { title: string; value: string | number; color: string; bg: string }[];
}

export default function DashboardStatusCard({
  dashboardStatusName,
  todaysTask,
  overdueTask,
  stats = [], 
}: DashboardStatusCardProps) {
  return (
    <div className=" max-w-full w-full mx-auto">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 w-full rounded-2xl bg-green-300 p-5 text-gray-800 hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out relative overflow-hidden h-40 sm:h-48 md:h-56 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="sm:col-span-2 flex flex-col gap-4">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                Welcome Back <br /> {dashboardStatusName}!
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 h-16 sm:h-20 md:h-24 flex flex-col justify-center">
                  <p className="text-xs sm:text-sm opacity-80">Today&apos;s Task</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{todaysTask}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 h-16 sm:h-20 md:h-24 flex flex-col justify-center">
                  <p className="text-xs sm:text-sm opacity-80">Overdue Task</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{overdueTask}</p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-1 flex justify-center sm:justify-end">
              <Image
                src={profileimg}
                alt="Illustration"
                width={70}
                height={70}
                className="h-auto w-auto max-w-full sm:max-w-[120px]"
              />
            </div>
          </div>
        </div>

        {stats?.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 sm:p-6 w-full shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out"
          >
            <div
              className={`h-10 sm:h-12 w-10 sm:w-12 rounded-full ${stat.bg} flex items-center justify-center mb-3 sm:mb-4`}
            >
              <FileText className="h-5 sm:h-6 w-5 sm:w-6 text-gray-600" />
            </div>
            <h3 className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">{stat.title}</h3>
            <p className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-1 sm:mb-2`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
