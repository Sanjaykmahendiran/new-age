"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/assets/logo.png";
import login_bg from "@/assets/login-bg.png";
import Link from "next/link";
import ParticlesBackground from "@/components/particles-background";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background + Particles */}
      <ParticlesBackground />
      <Image
        src={login_bg}
        alt="Background"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#00d458] opacity-60 z-0"></div>

      {/* Login Box */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg z-50 px-8 py-10 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src={logo} alt="Logo" width={150} height={40} />
        </div>

        {/* Welcome message */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold">Welcome Back !</h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue to Newage.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder=""
              className="bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder=""
              className="bg-white pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-[#00d458] hover:underline">
              Forgot Password?
            </a>
          </div>
<Link href="/dashboard">
  <Button className="w-full text-white transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 bg-[linear-gradient(to_right,_#00b871,_#00c86f,_#00b871)]">
    Login
  </Button>
</Link>

        </form>

        {/* Divider */}
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <hr className="flex-grow border-gray-300" />
          <span>or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Register link */}
        <div className="text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="#" className="text-[#00d458] hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
