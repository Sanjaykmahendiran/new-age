"use client"
import { useState, useEffect } from "react"
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Search,
  TicketIcon,
  Users,
  MessageSquare,
  BookOpen,
  ExternalLink,
  Plus,
  Clock,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import cartoon from '@/assets/dashboard/profile.png'
import Link from "next/link"

// Mock data for customer support dashboard
const recentTickets = [
  {
    id: 1,
    ticketId: "#TK-2024-001",
    customer: "Sarah Johnson",
    subject: "Login Issues with Mobile App",
    priority: "High",
    status: "Open",
    created: "2 hours ago",
    statusColor: "bg-red-100 text-red-700",
    priorityColor: "bg-red-100 text-red-800",
  },
  {
    id: 2,
    ticketId: "#TK-2024-002",
    customer: "Mike Chen",
    subject: "API Rate Limit Questions",
    priority: "Medium",
    status: "In Progress",
    created: "4 hours ago",
    statusColor: "bg-blue-100 text-blue-700",
    priorityColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 3,
    ticketId: "#TK-2024-003",
    customer: "Emma Davis",
    subject: "Billing Inquiry - Subscription",
    priority: "Low",
    status: "Resolved",
    created: "1 day ago",
    statusColor: "bg-green-100 text-green-700",
    priorityColor: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    ticketId: "#TK-2024-004",
    customer: "Alex Rodriguez",
    subject: "Feature Request - Dashboard",
    priority: "Medium",
    status: "Open",
    created: "2 days ago",
    statusColor: "bg-red-100 text-red-700",
    priorityColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 5,
    ticketId: "#TK-2024-005",
    customer: "Lisa Wang",
    subject: "Integration Support Needed",
    priority: "High",
    status: "In Progress",
    created: "3 days ago",
    statusColor: "bg-blue-100 text-blue-700",
    priorityColor: "bg-red-100 text-red-800",
  },
]

const topHelpArticles = [
  {
    id: 1,
    title: "Getting Started Guide",
    category: "Setup",
    views: 1250,
    rating: 4.8,
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "API Authentication Methods",
    category: "Development",
    views: 980,
    rating: 4.6,
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Troubleshooting Common Issues",
    category: "Support",
    views: 750,
    rating: 4.7,
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    title: "Billing and Subscription FAQ",
    category: "Billing",
    views: 650,
    rating: 4.5,
    lastUpdated: "5 days ago",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Product Webinar: New Features",
    date: "Jan 25, 2025",
    time: "2:00 PM EST",
    type: "Webinar",
    attendees: 45,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Maintenance Window",
    date: "Jan 28, 2025",
    time: "11:00 PM EST",
    type: "Maintenance",
    duration: "2 hours",
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Customer Success Workshop",
    date: "Feb 2, 2025",
    time: "10:00 AM EST",
    type: "Workshop",
    attendees: 25,
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "API Updates Release",
    date: "Feb 5, 2025",
    time: "9:00 AM EST",
    type: "Release",
    version: "v2.1.0",
    color: "bg-purple-500",
  },
]

const recentUpdates = [
  {
    id: 1,
    title: "Enhanced Security Features",
    description: "New two-factor authentication and SSO improvements",
    date: "Jan 20, 2025",
    type: "Security",
    version: "v2.0.8",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Dashboard Performance Boost",
    description: "50% faster loading times and improved responsiveness",
    date: "Jan 15, 2025",
    type: "Performance",
    version: "v2.0.7",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "New API Endpoints",
    description: "Added webhook support and batch operations",
    date: "Jan 10, 2025",
    type: "API",
    version: "v2.0.6",
    color: "bg-purple-500",
  },
]

const supportStats = [
  {
    label: "Open Tickets",
    value: "24",
    icon: <TicketIcon className="w-5 h-5 text-red-600" />,
    color: "red",
    trend: "+12%",
    trendType: "up",
  },
  {
    label: "Resolved Today",
    value: "18",
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    color: "green",
    trend: "+25%",
    trendType: "up",
  },
  {
    label: "Avg Response Time",
    value: "2.4h",
    icon: <Clock className="w-5 h-5 text-blue-600" />,
    color: "blue",
    trend: "-15%",
    trendType: "down",
  },
  {
    label: "Customer Satisfaction",
    value: "94%",
    icon: <Users className="w-5 h-5 text-purple-600" />,
    color: "purple",
    trend: "+3%",
    trendType: "up",
  },
]

const ticketVolumeData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 22 },
  { name: "Fri", value: 18 },
  { name: "Sat", value: 8 },
  { name: "Sun", value: 6 },
]

// Enhanced Animated Clock Component
function AnimatedClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getRotation = (value: number, max: number) => (value / max) * 360

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring", bounce: 0.3 }}
    >
      <div className="w-16 h-16 rounded-full border-2 border-white/30 relative bg-white/40 backdrop-blur-sm shadow-lg">
        <div className="absolute inset-1 rounded-full">
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-1.5 bg-white/70"
              style={{
                top: "2px",
                left: "50%",
                transformOrigin: "50% 26px",
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
          {/* Hour hand */}
          <motion.div
            className="absolute w-0.5 h-4 bg-white rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "50% 100%",
              transform: `translateX(-50%) translateY(-100%) rotate(${getRotation(
                (time.getHours() % 12) + time.getMinutes() / 60,
                12,
              )}deg)`,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          {/* Minute hand */}
          <motion.div
            className="absolute w-0.5 h-5 bg-white rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "50% 100%",
              transform: `translateX(-50%) translateY(-100%) rotate(${getRotation(time.getMinutes(), 60)}deg)`,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          {/* Second hand */}
          <motion.div
            className="absolute w-px h-5 bg-yellow-300 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "50% 100%",
              transform: `translateX(-50%) translateY(-100%) rotate(${getRotation(time.getSeconds(), 60)}deg)`,
            }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute w-1.5 h-1.5 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>
      <motion.div
        className="text-center mt-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs text-white/90 bg-white/20 px-2 py-0.5 rounded text-[10px]">{formatTime(time)}</span>
      </motion.div>
    </motion.div>
  )
}

// Customer Satisfaction Component
function CustomerSatisfaction() {
  const [isAnimated, setIsAnimated] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const percentage = 94
  const circumference = 2 * Math.PI * 40
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="relative w-32 h-32 mx-auto cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="satisfactionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <filter id="satisfactionGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background circle */}
        <circle cx="50" cy="50" r="40" stroke="rgb(229,231,235)" strokeWidth="6" fill="none" className="opacity-30" />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#satisfactionGradient)"
          strokeWidth={isHovered ? "8" : "6"}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={isAnimated ? strokeDashoffset : circumference}
          strokeLinecap="round"
          filter="url(#satisfactionGlow)"
          className="transition-all duration-2000 ease-out"
          animate={{
            strokeWidth: isHovered ? 8 : 6,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-gray-800"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          {percentage}%
        </motion.span>
        <motion.span
          className="text-sm text-green-600 font-medium"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          +3%
        </motion.span>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border px-3 py-1"
          >
            <div className="text-xs text-gray-600">This Month: 94%</div>
            <div className="text-xs text-green-600">Last Month: 91%</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CustomerSupportDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-2">
  {/* Primary Button */}
  <Link href="/support/submit-ticket">
    <Button className="bg-primary hover:bg-gray-500 text-white">
      <Plus className="w-4 h-4 mr-2" />
      Submit Ticket
    </Button>
  </Link>

  {/* Secondary Button with #4dc9ff */}
  <Link href="/developer/api-docs">
    <Button className="border border-[#4dc9ff] text-[#4dc9ff] hover:bg-[#e6faff] bg-transparent">
      <ExternalLink className="w-4 h-4 mr-2" />
      API Docs
    </Button>
  </Link>
</div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* First Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
      <motion.div
  className="col-span-4"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <Card style={{
    background: "linear-gradient(to bottom right, #233645, #4dc9ff)",
  }}
  className="text-white border-0 overflow-hidden h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardContent className="p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <motion.h2
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to Newage Hub!
          </motion.h2>
          <motion.p
            className="text-white mb-4 text-xs font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {"Here's your support overview for today"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white hover:text-blue-600 text-sm px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
            >
              View All Tickets
            </Button>
          </motion.div>
        </div>
        <AnimatedClock />
      </div>

      <motion.div
        className="relative flex justify-end"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="w-40 h-32 flex items-center justify-center">
          <Image
            src={cartoon}
            alt="Character Illustration"
            width={100}
            height={140}
            className="object-contain"
          />
        </div>
      </motion.div>
    </CardContent>
  </Card>
</motion.div>


         <motion.div
  className="col-span-5"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <div className="grid grid-cols-2 gap-4 h-full">
    {supportStats.map((stat, idx) => (
      <motion.div
        key={stat.label}
        className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + idx * 0.1 }}
        whileHover={{ y: -2 }}
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center bg-${stat.color}-100 relative group`}
        >
          <motion.div
            className={`w-10 h-10 rounded-full bg-${stat.color}-200 flex items-center justify-center`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {stat.icon}
          </motion.div>

          {/* Remove rotating ring for the first item only */}
          {idx !== 0 && (
            <motion.div
              className={`absolute w-14 h-14 border-4 border-${stat.color}-500 opacity-30 rounded-full`}
              style={{ borderRightColor: "transparent" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          )}
        </div>

        <div className="flex-1">
          <motion.h4
            className="text-xl font-semibold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
          >
            {stat.value}
          </motion.h4>
          <p className="text-sm text-gray-500">{stat.label}</p>
          <div className="flex items-center gap-1 mt-1">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {stat.trendType === "up" ? (
                <TrendingUp className="w-3 h-3 text-green-600" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-600" />
              )}
            </motion.div>
            <span
              className={`text-xs font-medium ${
                stat.trendType === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.trend}
            </span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>


          <motion.div
            className="col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="h-full rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h5 className="font-semibold text-gray-800">Ticket Volume</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>This Week</DropdownMenuItem>
                    <DropdownMenuItem>Last Week</DropdownMenuItem>
                    <DropdownMenuItem>This Month</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h6 className="text-2xl font-bold text-gray-800">142</h6>
                  <span className="text-xs text-gray-500">(+8% from last week)</span>
                </motion.div>
                <motion.div
                  className="w-full h-32"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ticketVolumeData}>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "0.5rem",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                        labelStyle={{ display: "none" }}
                        formatter={(value: any) => [`Tickets: ${value}`, ""]}
                        cursor={{ stroke: "#c7d2fe", strokeWidth: 1 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4dc9ff"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#4dc9ff" }}
                        activeDot={{ r: 8, stroke: "#4dc9ff", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Recent Tickets */}
          <motion.div
            className="col-span-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Recent Tickets</h5>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search tickets..."
                      className="pl-8 h-8 w-32 text-sm focus:w-40 transition-all duration-300"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>All Tickets</DropdownMenuItem>
                      <DropdownMenuItem>Open Only</DropdownMenuItem>
                      <DropdownMenuItem>High Priority</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left p-3 text-sm font-medium text-gray-600">Ticket ID</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">Customer</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">Subject</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">Priority</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTickets.map((ticket, index) => (
                        <motion.tr
                          key={ticket.id}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
                        >
                          <td className="p-3 font-medium text-sm text-blue-600">{ticket.ticketId}</td>
                          <td className="p-3 text-sm text-gray-800">{ticket.customer}</td>
                          <td className="p-3 text-sm text-gray-600 max-w-xs truncate">{ticket.subject}</td>
                          <td className="p-3">
                            <Badge variant="secondary" className={ticket.priorityColor}>
                              {ticket.priority}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary" className={ticket.statusColor}>
                              {ticket.status}
                            </Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Help Articles */}
          <motion.div
            className="col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Top Help Articles</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Most Viewed</DropdownMenuItem>
                    <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                    <DropdownMenuItem>Recently Updated</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {topHelpArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-sm text-gray-800 mb-1">{article.title}</h6>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <span>{article.views} views</span>
                          <span>★ {article.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Upcoming Events */}
          <motion.div
            className="col-span-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Upcoming Events</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>This Week</DropdownMenuItem>
                    <DropdownMenuItem>This Month</DropdownMenuItem>
                    <DropdownMenuItem>All Events</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full mt-2 ${event.color}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm text-gray-800">{event.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {event.date} at {event.time}
                        </p>
                        {event.attendees && <p className="text-xs text-blue-600">{event.attendees} attendees</p>}
                        {event.duration && <p className="text-xs text-orange-600">Duration: {event.duration}</p>}
                        {event.version && <p className="text-xs text-purple-600">Version: {event.version}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Product Updates */}
          <motion.div
            className="col-span-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Recent Product Updates</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Updates</DropdownMenuItem>
                    <DropdownMenuItem>Security</DropdownMenuItem>
                    <DropdownMenuItem>Features</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {recentUpdates.map((update, index) => (
                    <motion.div
                      key={update.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-all duration-200"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.2 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full mt-2 ${update.color}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm text-gray-800">{update.title}</p>
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">
                              {update.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {update.version}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{update.description}</p>
                        <p className="text-xs text-gray-500">{update.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customer Satisfaction */}
          <motion.div
            className="col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Customer Satisfaction</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>This Month</DropdownMenuItem>
                    <DropdownMenuItem>Last Month</DropdownMenuItem>
                    <DropdownMenuItem>This Year</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <CustomerSatisfaction />
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Customer satisfaction has improved by 3% this month. Keep up the excellent support work!
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        label: "Response Time",
                        value: "2.4h",
                        type: "down",
                        color: "green",
                      },
                      {
                        label: "Resolution Rate",
                        value: "89%",
                        type: "up",
                        color: "green",
                      },
                      {
                        label: "First Contact",
                        value: "76%",
                        type: "up",
                        color: "green",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="flex justify-between items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <Badge
                          variant="secondary"
                          className={`bg-${item.color}-100 text-${item.color}-700 text-xs hover:scale-105 transition-transform`}
                        >
                          {item.type === "up" ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {item.value}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
