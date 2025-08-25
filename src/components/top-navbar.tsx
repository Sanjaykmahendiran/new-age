"use client"
import Link from "next/link"
import { Menu, Search, Bell, Maximize, Minimize, X, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface TopNavbarProps {
  onMenuClick?: () => void
}

export const TopNavbar = ({ onMenuClick }: TopNavbarProps) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true)


  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
    if (onMenuClick) onMenuClick()
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const handleNotificationClick = () => {
    setHasNotifications(false)
  }

  return (
    <>
      <style jsx>{`
        @keyframes ring {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(10deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(8deg); }
          40% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
          60% { transform: rotate(-4deg); }
          70% { transform: rotate(4deg); }
          80% { transform: rotate(-2deg); }
          90% { transform: rotate(2deg); }
          100% { transform: rotate(0deg); }
        }
        
        .bell-ring {
          animation: ring 2s ease-in-out infinite;
          transform-origin: 50% 4px;
        }
        
        .bell-ring:hover {
          animation: ring 0.5s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full">
        <div className="flex items-center justify-between w-full px-6 py-3">
          {/* Left section - Menu */}
          <div className="flex items-center">
            <button onClick={handleMenuClick} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">




            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-500 hover:text-gray-700 transition-colors p-1 relative">
                  <Bell className={`h-5 w-5 ${hasNotifications ? "bell-ring" : ""}`} />
                  {hasNotifications && (
                    <>
                      <span className="absolute -top-0 -right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
                      <span className="absolute -top-0 -right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                    </>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  <DropdownMenuLabel className="text-base font-semibold">
                    Notifications
                  </DropdownMenuLabel>
                  <button
                    onClick={() => setHasNotifications(false)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>

                {/* Ticket Replies */}
                <DropdownMenuLabel className="text-xs text-gray-400 mt-2 px-3">
                  Ticket Replies
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    href="/support/my-tickets"
                    className="w-full cursor-pointer px-3 py-2 hover:bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        Your ticket #123 has a new reply
                      </p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                {/* New Features */}
                <DropdownMenuLabel className="text-xs text-gray-400 mt-2 px-3">
                  New Features
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    href="/features"
                    className="w-full cursor-pointer px-3 py-2 hover:bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium">Dark mode is now available!</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                {/* Event Reminders */}
                <DropdownMenuLabel className="text-xs text-gray-400 mt-2 px-3">
                  Event Reminders
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    href="/community/calendar"
                    className="w-full cursor-pointer px-3 py-2 hover:bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        Webinar: Scaling your product
                      </p>
                      <p className="text-xs text-gray-500">Aug 5, 3 PM</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User profile */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback className="bg-orange-500 text-white text-sm font-medium">MJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">Mr. Jack</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/">
                  <DropdownMenuItem className="cursor-pointer text-red-600">Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <button className="text-gray-500 hover:text-gray-700 transition-colors p-1">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopNavbar
