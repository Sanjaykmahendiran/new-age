"use client";

import React from 'react';
// import Image from 'next/image';
// import logo from "@/assets/QulaifitLogo.png";

const Spinner: React.FC = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 z-50">
    {/* <div className="mb-4">
      <Image 
        src={logo}
        alt="Logo"
        width={40}
        height={40}
        className="object-contain"
      />
    </div> */}
    
    <svg className="animate-spin mr-1 h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

export default Spinner;

"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home, Truck, ShoppingCart, Package, ShoppingBag, Send, FileText,
  DollarSign, BarChart2, ChevronDown, ChevronUp, Users, Settings
} from "lucide-react"

type SubmenuItem = {
  label: string
  href: string
}

type MenuItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  href?: string
  submenu?: SubmenuItem[]
}

type SectionType = {
  title: string
  items: MenuItem[]
}

type SidebarProps = {
  isCollapsed?: boolean
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [shouldScrollToActive, setShouldScrollToActive] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const activeItemRef = useRef<HTMLButtonElement | null>(null)

  const sections: SectionType[] = [
    {
      title: "",
      items: [
        { icon: Home, label: "Dashboard", href: "/dashboard" },
        { icon: Users, label: "Customers", href: "/customers" },
        { icon: FileText, label: "Quotations", href: "/quotations" },
        { icon: ShoppingBag, label: "Orders", href: "/orders" },
        { icon: FileText, label: "Invoices", href: "/invoices" },
        { icon: DollarSign, label: "Payments", href: "/payments" },
        { icon: Package, label: "Services", href: "/services" },
        { icon: Truck, label: "Expenses", href: "/expenses" },
        { icon: Users, label: "HRMS", href: "/hrms" },
        { icon: Send, label: "Marketing", href: "/marketing" },
        { icon: Settings, label: "Settings", href: "/settings" },
        {
          icon: BarChart2,
          label: "Reports",
          submenu: [
            { label: "Sales Report", href: "/reports/sales" },
            { label: "Customer Summary", href: "/reports/customers" },
            { label: "Expense Overview", href: "/reports/expenses" },
          ],
        },
      ],
    },
  ]


  useEffect(() => {
    let foundActiveItem = false
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.href && pathname.startsWith(item.href)) {
          if (item.submenu) setOpenMenu(item.label)
          foundActiveItem = true
        }
        if (item.submenu?.some((sub) => pathname.startsWith(sub.href))) {
          setOpenMenu(item.label)
          foundActiveItem = true
        }
      })
    })
    if (foundActiveItem && activeItemRef.current && shouldScrollToActive) {
      activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      setShouldScrollToActive(false)
    }
  }, [pathname, sections, shouldScrollToActive])

  useEffect(() => {
    setShouldScrollToActive(true)
  }, [pathname])

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu) {
      setOpenMenu(openMenu === item.label ? null : item.label)
    } else if (item.href) {
      router.push(item.href)
    }
  }

  const isItemActive = (item: MenuItem) => {
    if (item.href && pathname === item.href) return true
    if (item.submenu?.some((sub) => pathname === sub.href)) return true
    return false
  }

  return (
    <div className="w-full mb-8 p-4 bg-white">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          {section.title && !isCollapsed && (
            <h3 className="text-base font-semibold text-gray-500 mb-2 px-4">{section.title}</h3>
          )}
          <div className="space-y-1">
            {section.items.map((item) => {
              const isActive = isItemActive(item)
              return (
                <div key={item.label}>
                  <Button
                    ref={isActive ? activeItemRef : null}
                    onClick={() => handleMenuClick(item)}
                    variant="ghost"
                    className={`w-full text-base  justify-start h-10 ${isCollapsed ? "px-3" : "px-4"} rounded-lg font-medium
                      ${isActive
                        ? "bg-black text-white font-semibold hover:bg-[#ffd900]"
                        : "text-gray-700  font-semibold hover:bg-[#ffd900]/80 hover:text-black"} cursor-pointer`}
                  >
                    <item.icon
                      className={`${isCollapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-[#ffd900]"}`}
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
                        const isSubActive = pathname === subitem.href
                        return (
                          <Link key={subitem.label} href={subitem.href}>
                            <Button
                              ref={isSubActive ? activeItemRef : null}
                              variant="ghost"
                              className={`w-full justify-start h-9 px-4 rounded-lg text-sm
                                ${isSubActive
                                  ? "bg-[#ffd900] text-white hover:bg-[#ffd900]"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-[#ffd900]"} cursor-pointer`}
                            >
                              {subitem.label}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
