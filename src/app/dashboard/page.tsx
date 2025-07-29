"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ChevronDown,
  Search,
  BarChart,
  FileText,
  ThumbsUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import cartoon from "@/assets/new-dashboard/cartoon.svg";
import Illustration from "@/assets/new-dashboard/purchase1.png";
import profile from "@/assets/new-dashboard/profile.png";
import bg1 from "@/assets/new-dashboard/bg-1.png";
import bg2 from "@/assets/new-dashboard/bg-2.png";
import bg3 from "@/assets/new-dashboard/bg-3.png";
import SalesChart from "./_components/saleschart";
import SalesReportChart from "./_components/salesreport";

// Mock data
const customers = [
  {
    id: 1,
    name: "Devin Jake",
    code: "#562778",
    purchases: 12,
    amount: "$500.00",
    avatar: profile,
  },
  {
    id: 2,
    name: "Guy Hawkins",
    code: "#321489",
    purchases: 38,
    amount: "$900.00",
    avatar: profile,
  },
  {
    id: 3,
    name: "Jacob Jones",
    code: "#589356",
    purchases: 10,
    amount: "$420.00",
    avatar: profile,
  },
  {
    id: 4,
    name: "Jake Spy",
    code: "#954687",
    purchases: 23,
    amount: "$300.00",
    avatar: profile,
  },
];

const recentOrders = [
  {
    id: 1,
    product: "Bag",
    code: "#452140",
    customer: "Jenny Wilson",
    qty: "2 PCS",
    price: "$2,854",
    date: "16 Jan,2025",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-700",
    productIcon: "👜",
  },
  {
    id: 2,
    product: "Football",
    code: "#896748",
    customer: "Darrell Steward",
    qty: "2 PCS",
    price: "$7,580",
    date: "14 Apr,2025",
    status: "Canceled",
    statusColor: "bg-red-100 text-red-700",
    productIcon: "⚽",
  },
  {
    id: 3,
    product: "Lamp",
    code: "#321489",
    customer: "Darrell Steward",
    qty: "1 PCS",
    price: "$8,195",
    date: "09 Mar,2025",
    status: "Pending",
    statusColor: "bg-blue-100 text-blue-700",
    productIcon: "💡",
  },
  {
    id: 4,
    product: "Shoes",
    code: "#844967",
    customer: "Esther Howard",
    qty: "1 PCS",
    price: "$9,943",
    date: "21 Feb,2025",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-700",
    productIcon: "👟",
  },
];

const activities = [
  {
    id: 1,
    user: "Brooklyn Simmons",
    action: "Commented: NFT App",
    time: "7:00 AM",
    date: "22 Feb 2025",
    description: "This smithe design looks great...",
    type: "primary",
    color: "bg-purple-500",
  },
  {
    id: 2,
    user: "Leslie Alexander",
    action: "Shared images: Barkha",
    time: "5:12 AM",
    date: "15 Feb 2025",
    description: "Food Delivery App figma & Ai...",
    type: "secondary",
    color: "bg-gray-500",
    images: [bg1, bg2, bg3],
  },
  {
    id: 3,
    user: "Kristin Watson",
    action: "Add new screen: Cuba Admin",
    time: "7:00 AM",
    date: "10 Jan 2025",
    description: "Make sure your AI file is cloud storage...",
    type: "success",
    color: "bg-green-500",
  },
];

const stats = [
  {
    label: "Revenue",
    value: "$45,195",
    icon: <BarChart className="w-5 h-5 text-gray-600" />,
    color: "gray",
    trend: "+50%",
    trendType: "up",
  },
  {
    label: "Customers",
    value: "845+",
    icon: <Users className="w-5 h-5 text-green-600" />,
    color: "green",
    trend: "-40%",
    trendType: "down",
  },
  {
    label: "Profit",
    value: "80%",
    icon: <ThumbsUp className="w-5 h-5 text-yellow-600" />,
    color: "yellow",
    trend: "-20%",
    trendType: "down",
  },
  {
    label: "Invoices",
    value: "10,905",
    icon: <FileText className="w-5 h-5 text-purple-600" />,
    color: "purple",
    trend: "+50%",
    trendType: "up",
  },
];

const data = [
  { name: "0", value: 24 },
  { name: "10k", value: 38 },
  { name: "20k", value: 30 },
  { name: "30k", value: 43 },
  { name: "40k", value: 35 },
  { name: "50k", value: 25 },
  { name: "60k", value: 29 },
];

const appointments = [
  {
    id: 1,
    time: "12:30",
    title: "Participating Meeting",
    description: "There are many variations of passages available",
    duration: "2:00 PM - 4:30 PM",
    type: "General",
    color: "bg-purple-500",
  },
  {
    id: 2,
    time: "11:30",
    title: "Customer Support issues",
    color: "bg-yellow-500",
  },
  { id: 3, time: "10:25", title: "Read the report", color: "bg-gray-500" },
  {
    id: 4,
    time: "09:00",
    title: "Development issue #26",
    color: "bg-green-500",
  },
];

// Enhanced Animated Clock Component
function AnimatedClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getRotation = (value: number, max: number) => (value / max) * 360;

  return (
    <motion.div
      className="relative "
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
                12
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
              transform: `translateX(-50%) translateY(-100%) rotate(${getRotation(
                time.getMinutes(),
                60
              )}deg)`,
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
              transform: `translateX(-50%) translateY(-100%) rotate(${getRotation(
                time.getSeconds(),
                60
              )}deg)`,
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
        <span className="text-xs text-white/90 bg-white/20 px-2 py-0.5 rounded text-[10px]">
          {formatTime(time)}
        </span>
      </motion.div>
    </motion.div>
  );
}

// Enhanced Monthly Target Component
function MonthlyTarget() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const percentage = 89;
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 800);
    return () => clearInterval(timer);
  }, []);

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
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="progressGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="rgb(229,231,235)"
          strokeWidth="6"
          fill="none"
          className="opacity-30"
        />

        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#progressGradient)"
          strokeWidth={isHovered ? "8" : "6"}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={isAnimated ? strokeDashoffset : circumference}
          strokeLinecap="round"
          filter="url(#progressGlow)"
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
          className="text-sm text-purple-600 font-medium"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          +60%
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
            <div className="text-xs text-gray-600">Target: $25,000</div>
            <div className="text-xs text-purple-600">Achieved: $22,250</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
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
            <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white border-0 overflow-hidden h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <motion.h2
                      className="text-2xl font-bold mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Welcome Emay Walter!
                    </motion.h2>
                    <motion.p
                      className="text-white mb-4 text-xs font-semibold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {"Here's what's happening in your account today"}
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
                        View Profile
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
                  <Image
                    src={cartoon}
                    alt="Character Illustration"
                    width={160}
                    height={140}
                    className="object-contain"
                  />
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
              {stats.map((stat, idx) => (
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
                <h5 className="font-semibold text-gray-800">Visitors</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:scale-110 transition-transform"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
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
                  <h6 className="text-2xl font-bold text-gray-800">98.73K</h6>
                  <span className="text-xs text-gray-500">
                    (+0.4% Than last week)
                  </span>
                </motion.div>

                <motion.div
                  className="w-full h-32"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                        formatter={(value: any) => [`Growth: ${value}`, ""]}
                        cursor={{ stroke: "#c7d2fe", strokeWidth: 1 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#6366f1" }}
                        activeDot={{ r: 8, stroke: "#6366f1", strokeWidth: 2 }}
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
          {/* Top Customers */}
          <motion.div
            className="col-span-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Top Customers</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:scale-110 transition-transform"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          <Checkbox />
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          Customers
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          Total Purchase
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, index) => (
                        <motion.tr
                          key={customer.id}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
                        >
                          <td className="p-3">
                            <Checkbox />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Image
                                src={customer.avatar}
                                alt={customer.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <div className="font-medium text-sm text-gray-800">
                                  {customer.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {customer.code}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-gray-600">
                              {customer.purchases} Purchases
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center p-3 gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      className="w-8 h-8 p-0"
                    >
                      «
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled
                      className="w-8 h-8 p-0"
                    >
                      ‹
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
                    >
                      1
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      2
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      ›
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      »
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="col-span-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="h-full transition-all duration-300  hover:shadow-xl rounded-2xl border border-gray-100 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <h5 className="font-semibold text-gray-800 text-base">
                  Sales Statistical Overview
                </h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:scale-105 transition-transform"
                    >
                      Year <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 rounded-md shadow-md bg-white border border-gray-100">
                    <DropdownMenuItem className="px-4 py-2 text-sm">
                      Day
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-4 py-2 text-sm">
                      Month
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-4 py-2 text-sm">
                      Year
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent className="pt-0">
                <motion.div
                  className="grid grid-cols-2 gap-6 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div>
                    <h5 className="text-2xl font-bold text-gray-800">19,897</h5>
                    <span className="text-sm text-gray-500">Total Cost</span>
                  </div>
                  <div>
                    <h5 className="text-2xl font-bold text-gray-800">
                      $8,49,058
                    </h5>
                    <span className="text-sm text-gray-500">Total Revenue</span>
                  </div>
                </motion.div>

                <div className="overflow-x-auto">
                  <SalesChart />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Target */}
          <motion.div
            className="col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Monthly Target</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:scale-110 transition-transform"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <MonthlyTarget />
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Revenue Surges! {"Today's"} earnings soar to $3653, marking
                    an impressive uptick from last month. Keep the momentum
                    going!
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        label: "Revenue",
                        value: "$20k",
                        type: "up",
                        color: "green",
                      },
                      {
                        label: "Target",
                        value: "$16k",
                        type: "down",
                        color: "red",
                      },
                      {
                        label: "Today",
                        value: "$1.6k",
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
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
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

        {/* Third Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Activity Log */}
          <motion.div
            className="col-span-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Activity Log</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:scale-110 transition-transform"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.2 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full mt-2 ${activity.color}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm text-gray-800">
                            {activity.user}
                            <span className="font-normal text-gray-600">
                              {" "}
                              ({activity.action})
                            </span>
                          </p>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {activity.description}
                        </p>
                        {activity.images && (
                          <div className="flex gap-2 mb-2">
                            {activity.images.map((img, idx) => (
                              <Image
                                key={idx}
                                src={img}
                                alt=""
                                className="w-8 h-8 rounded object-cover"
                              />
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            className="col-span-7"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">Recent Orders</h5>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      className="pl-8 h-8 w-32 text-sm focus:w-40 transition-all duration-300"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:scale-110 transition-transform"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Today</DropdownMenuItem>
                      <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                      <DropdownMenuItem>Yesterday</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          <Checkbox />
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          Product Name
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          Customers
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          Total Price
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-gray-600">
                          Order Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <motion.tr
                          key={order.id}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
                        >
                          <td className="p-3">
                            <Checkbox />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-sm"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              >
                                {order.productIcon}
                              </motion.div>
                              <div>
                                <div className="font-medium text-sm text-gray-800">
                                  {order.product}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.code}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-sm text-gray-600">
                            {order.customer}
                          </td>
                          <td className="p-3 text-sm font-medium text-gray-800">
                            {order.price}
                          </td>
                          <td className="p-3 text-sm text-gray-600">
                            {order.date}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center p-3 text-sm text-gray-600">
                    <span>Showing 1 to 4 of 8 entries</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="w-8 h-8 p-0"
                      >
                        «
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="w-8 h-8 p-0"
                      >
                        ‹
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
                      >
                        1
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        2
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        ›
                      </Button>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        »
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Fourth Row */}
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            className="col-span-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01] text-center">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <motion.div
                  className="mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={Illustration}
                    alt="Buy Pro Account Illustration"
                    width={188}
                    height={190}
                    className="h-auto mx-auto"
                  />
                </motion.div>
                <motion.h6
                  className="text-sm font-medium text-gray-800 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  Buy <span className="text-blue-600">Pro Account</span> to
                  Explore Premium Features
                </motion.h6>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                >
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-6 hover:scale-105 transition-all duration-300">
                    Buy Now
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sales Report */}
          <div className="col-span-5 overflow-hidden">
            <SalesReportChart />
          </div>

          {/* Manage Appointments */}
          <motion.div
            className="col-span-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h5 className="font-semibold text-gray-800">
                  Manage Appointments
                </h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:scale-110 transition-transform"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>Tomorrow</DropdownMenuItem>
                    <DropdownMenuItem>Yesterday</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <span className="text-sm font-medium text-gray-600 w-12">
                        {appointment.time}
                      </span>
                      <motion.div
                        className={`w-3 h-3 rounded-full mt-1 ${appointment.color}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.3,
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">
                          {appointment.title}
                        </div>
                        {appointment.description && (
                          <p className="text-xs text-gray-600 mt-1">
                            {appointment.description}
                          </p>
                        )}
                        {appointment.duration && (
                          <p className="text-xs text-purple-600 mt-1">
                            {appointment.duration}
                          </p>
                        )}
                        {appointment.type && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.7 + index * 0.1 }}
                          >
                            <Button
                              size="sm"
                              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 h-6 hover:scale-105 transition-all duration-300"
                            >
                              {appointment.type}
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
