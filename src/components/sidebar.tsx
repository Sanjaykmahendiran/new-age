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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SubmenuItem = {
  label: string;
  href: string;
};

type MenuGroup = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href?: string;
  submenu?: SubmenuItem[];
};

type SidebarProps = {
  isCollapsed?: boolean;
};

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  const menuGroups: MenuGroup[] = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Ticket,
      label: "Support Center",
      submenu: [
        { label: "Submit a Ticket", href: "/support/submit-ticket" },
        { label: "My Tickets", href: "/support/my-tickets" },
      ],
    },
    {
      icon: BookOpen,
      label: "Knowledge Base",
      href: "/knowledge-base",
    },
    {
      icon: PlusCircle,
      label: "Enhancement Hub",
      submenu: [
        { label: "Submit Enhancement", href: "/enhancement/submit" },
        { label: "Suggestions", href: "/enhancement/suggestions" },
      ],
    },
    {
      icon: FileText,
      label: "Developer Portal",
      submenu: [
        { label: "API Docs", href: "/developer/api-docs" },
        { label: "Authentication & Keys", href: "/developer/auth-keys" },
      ],
    },
    {
      icon: Calendar,
      label: "Community & Events",
      submenu: [
        { label: "Calendar", href: "/community/calendar" },
        { label: "Product Releases", href: "/community/releases" },
      ],
    },
        {
      icon: BookOpen,
      label: "Survey",
      href: "/survey",
    },
    {
      icon: UserCircle,
      label: "My Profile",
      href: "/myprofile",
    },
  ];

  useEffect(() => {
    menuGroups.forEach((item) => {
      if (item.href && pathname.startsWith(item.href)) {
        setOpenMenu(item.label);
      }
      if (item.submenu?.some((sub) => pathname.startsWith(sub.href))) {
        setOpenMenu(item.label);
      }
    });

    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [pathname]);

  const handleMenuClick = (item: MenuGroup) => {
    if (item.submenu) {
      setOpenMenu(openMenu === item.label ? null : item.label);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="w-full mb-8 p-4">
      {menuGroups.map((item) => {
        const isActive =
          (item.href && pathname === item.href) ||
          (item.submenu && item.submenu.some((sub) => pathname === sub.href));

        return (
          <div key={item.label}>
            <Button
              ref={isActive ? activeItemRef : null}
              onClick={() => handleMenuClick(item)}
              variant="ghost"
              className={`w-full text-sm rounded-md justify-start h-10 ${isCollapsed ? "px-3 justify-center" : "px-4"
                } text-[14px] cursor-pointer ${isActive
                  ? "bg-[#00d458] text-white hover:bg-[#00d458] hover:text-white"
                  : "text-gray-500 hover:bg-white hover:text-[#00d458]"
                }`}
            >
              <item.icon
                className={`h-5 w-5 transition-colors ${isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-[#00d458]"
                  } ${isCollapsed ? "" : "mr-3"}`}
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


            {/* Animate submenu */}
            <AnimatePresence initial={false}>
              {!isCollapsed && item.submenu && openMenu === item.label && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pl-8 space-y-1 mt-1 overflow-hidden"
                >
                  {item.submenu.map((subitem) => {
                    const isSubActive = pathname === subitem.href;
                    return (
                      <Link key={subitem.label} href={subitem.href}>
                        <Button
                          ref={isSubActive ? activeItemRef : null}
                          variant="ghost"
                          className={`w-full justify-start h-9 px-4 text-gray-500 rounded-lg flex items-center gap-2 ${isSubActive
                            ? " text-[#00d458] hover:bg-[#00d458] hover:text-white"
                            : "hover:bg-white hover:text-[#00d458]"
                            } cursor-pointer`}
                        >
                          <span className="text-[#00d458] text-lg leading-none">•</span>
                          <span className="text-sm">{subitem.label}</span>
                        </Button>

                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
