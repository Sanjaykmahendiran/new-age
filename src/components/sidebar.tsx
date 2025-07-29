"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ChevronUp,
  ChevronDown,
  FileText,
  Megaphone,
  UserCircle,
  PlusCircle,
  ShieldCheck,
  BookOpen,
  Calendar,
  Ticket,
  Files,
  Bell,
} from "lucide-react";

type SubmenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href?: string;
  submenu?: SubmenuItem[];
};

type SectionType = {
  title: string;
  items: MenuItem[];
};

type SidebarProps = {
  isCollapsed?: boolean;
};

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  const sections: SectionType[] = [
    {
      title: "",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Support Center",
      items: [
        {
          icon: Ticket,
          label: "Submit a Ticket",
          href: "/support/submit-ticket",
        },
        { icon: Files, label: "My Tickets", href: "/support/my-tickets" },
      ],
    },
    {
      title: "",
      items: [
        { icon: BookOpen, label: "Knowledge Base", href: "/knowledge-base" },
      ],
    },
    {
      title: "Enhancement Hub",
      items: [
        {
          icon: PlusCircle,
          label: "Submit Enhancement",
          href: "/enhancement/submit",
        },
        { icon: Users, label: "Suggestions", href: "/enhancement/suggestions" },
      ],
    },
    {
      title: "Developer Portal",
      items: [
        { icon: FileText, label: "API Docs", href: "/developer/api-docs" },
        {
          icon: ShieldCheck,
          label: "Authentication & Keys",
          href: "/developer/auth-keys",
        },
      ],
    },
    {
      title: "Community & Events",
      items: [
        { icon: Calendar, label: "Calendar", href: "/community/calendar" },
        {
          icon: Megaphone,
          label: "Product Releases",
          href: "/community/releases",
        },
      ],
    },
    {
      title: "",
      items: [{ icon: UserCircle, label: "My Profile", href: "/myprofile" }],
    },
  ];

  useEffect(() => {
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.href && pathname.startsWith(item.href)) {
          setOpenMenu(item.label);
        }
        if (item.submenu?.some((sub) => pathname.startsWith(sub.href))) {
          setOpenMenu(item.label);
        }
      });
    });

    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [pathname]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu) {
      setOpenMenu(openMenu === item.label ? null : item.label);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="w-full mb-8 p-4 ">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          {section.title && !isCollapsed && (
            <h3 className="text-base font-semibold text-gray-600 mb-2 px-4">
              {section.title}
            </h3>
          )}
          <div className="space-y-1">
            {section.items.map((item) => {
              const isActive = item.href ? pathname === item.href : false;

              return (
                <div key={item.label}>
                  <Button
                    ref={isActive ? activeItemRef : null}
                    onClick={() => handleMenuClick(item)}
                    variant="ghost"
                    className={`w-full text-base rounded-md  justify-start h-10 ${
                      isCollapsed ? "px-3" : "px-4"
                    } text-gray-400 rounded-lg 
  ${
    isActive
      ? "bg-[#00d458] text-white hover:bg-[#00d458] hover:text-white font-semibold"
      : "hover:bg-white hover:text-[#00d458] text-[14px] font-semibold"
  } cursor-pointer`}
                  >
                    <item.icon
                      className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${
                        isActive
                          ? "text-white hover:text-white"
                          : "hover:text-[#00d458]"
                      }`}
                    />
                    {!isCollapsed && (
                      <>
                        {item.label}
                        {item.submenu &&
                          (openMenu === item.label ? (
                            <ChevronUp className="h-4 w-4 ml-auto" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          ))}
                      </>
                    )}
                  </Button>

                  {!isCollapsed && item.submenu && openMenu === item.label && (
                    <div className="pl-8 space-y-1 mt-1">
                      {item.submenu.map((subitem) => {
                        const isSubActive = pathname === subitem.href;
                        return (
                          <Link key={subitem.label} href={subitem.href}>
                            <Button
                              ref={isSubActive ? activeItemRef : null}
                              variant="ghost"
                              className={`w-full justify-start h-9 px-4 text-gray-400 rounded-lg ${
                                isSubActive
                                  ? "bg-[#fce9e6] text-[#00d458] hover:bg-[#fce9e6] hover:text-[#00d458]"
                                  : "hover:bg-white hover:text-[#00d458]"
                              } cursor-pointer`} // <-- Add cursor-pointer here
                            >
                              {subitem.label}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
