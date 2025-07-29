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

const languages = {
  en: { label: "English", flag: "🇺🇸" },
  es: { label: "Spanish", flag: "🇪🇸" },
  fr: { label: "French", flag: "🇫🇷" },
  de: { label: "German", flag: "🇩🇪" },
}

interface TopNavbarProps {
  onMenuClick?: () => void
}

export const TopNavbar = ({ onMenuClick }: TopNavbarProps) => {
  const [selectedLang, setSelectedLang] = useState<keyof typeof languages>("en")
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true)

  const handleLanguageChange = (lang: keyof typeof languages) => {
    setSelectedLang(lang)
    // Add i18n change logic if needed
  }

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
            {/* Search */}
            <div className="relative">
              <button onClick={toggleSearch} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
                <Search className="h-5 w-5" />
              </button>

              {/* Animated Search Box */}
              <div
                className={`absolute right-0 top-full mt-4 w-80 z-50 origin-top-right transform transition-all duration-300 ease-in-out ${
                  searchOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search here..."
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      autoFocus={searchOpen}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Language selector with custom language icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 transition-colors">
                  <div className="relative">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-600"
                    >
                      <path
                        d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(languages).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => handleLanguageChange(key as keyof typeof languages)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <span className="mr-2">{value.flag}</span>
                        <span>{value.label}</span>
                      </div>
                      {key === selectedLang && <span className="text-green-500 text-sm">✓</span>}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notification bell with ringing animation */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 relative"
              >
                <Bell className={`h-5 w-5 ${hasNotifications ? "bell-ring" : ""}`} />
                {hasNotifications && (
                  <span className="absolute -top-0 -right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
                )}
                {hasNotifications && <span className="absolute -top-0 -right-0 h-3 w-3 bg-red-500 rounded-full"></span>}
              </button>
            </div>

            {/* Fullscreen toggle */}
            <button onClick={toggleFullscreen} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>

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
