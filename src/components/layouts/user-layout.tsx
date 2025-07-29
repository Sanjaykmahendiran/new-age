"use client"
import { useState } from "react";
import Image from "next/image";
import { Sidebar } from "@/components/sidebar";
import logo from "@/assets/logo.png"
import iconLogo from "@/assets/icon-logo.png";
import { TopNavbar } from "@/components/top-navbar";
import { ReactNode } from "react";
import Link from "next/link";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
   
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
 
  return (
    <div className="flex bg-gray-100 relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col ${
          isSidebarCollapsed ? "w-20" : "w-60"
        } bg-white border-r border-gray-200 z-50 print:hidden transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : ""}`}>
            <Link href={"/dashboard"}>
              {isSidebarCollapsed ? (
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold">
                <Image src={iconLogo} width={85} height={85} alt="Logo" />
                </div>
              ) : (
                <Image src={logo} width={180} height={40} alt="Logo" />
              )}
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-1 relative scroll-container thin-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>
      </div>
 
      {/* Main content */}
      <div className={`flex flex-col flex-1 h-screen ${isSidebarCollapsed ? "ml-20" : "ml-60"} transition-all duration-300 ease-in-out`}>
        {/* TopNavbar */}
        <div className={`fixed top-0 ${isSidebarCollapsed ? "left-20" : "left-60"} right-0 flex items-center justify-between h-16 px-4 bg-white z-50 print:hidden transition-all duration-300 border-b border-gray-200 ease-in-out`}>
          <TopNavbar onMenuClick={toggleSidebar} />
        </div>
 
        {/* Content */}
        <div className="flex-1 pt-16">
          {children}
        </div>
      </div>
    </div>
  );
}