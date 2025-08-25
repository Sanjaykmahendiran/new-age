"use client"

import { useState } from "react"
import { Eye, EyeOff, Copy, RefreshCw, Check, Lock, User, Key } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("ff_live_1234567890abcdef1234567890abcdef")
  const [copied, setCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [hasApiPermission] = useState(true)

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@acmelogistics.com",
    company: "Acme Logistics"
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const regenerateApiKey = () => {
    setIsRegenerating(true)
    setTimeout(() => {
      const newKey = "ff_live_" + Math.random().toString(36).substring(2, 34)
      setApiKey(newKey)
      setIsRegenerating(false)
    }, 1500)
  }

  const handleProfileSave = () => {
    console.log("Saving profile:", profileData)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    console.log("Changing password")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-between px-6 py-4 ">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-8">

          {/* Profile Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <CardTitle>Edit Name, Email, Company</CardTitle>
              </div>
              <CardDescription>Update your personal and business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Photo</Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button size="sm" onClick={handleProfileSave}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                <CardTitle>Change Password</CardTitle>
              </div>
              <CardDescription>Update your account password for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: "currentPassword", label: "Current Password *", state: showCurrentPassword, toggle: setShowCurrentPassword, value: passwordData.currentPassword, key: "currentPassword" },
                { id: "newPassword", label: "New Password *", state: showNewPassword, toggle: setShowNewPassword, value: passwordData.newPassword, key: "newPassword" },
                { id: "confirmPassword", label: "Confirm New Password *", state: showConfirmPassword, toggle: setShowConfirmPassword, value: passwordData.confirmPassword, key: "confirmPassword" }
              ].map(({ id, label, state, toggle, value, key }, index) => (
                <div className="space-y-2" key={id}>
                  <Label htmlFor={id}>{label}</Label>
                  <div className="relative">
                    <Input
                      id={id}
                      type={state ? "text" : "password"}
                      value={value}
                      onChange={(e) => setPasswordData({ ...passwordData, [key]: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => toggle(!state)}
                    >
                      {state ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {index === 1 && (
                    <p className="text-sm text-muted-foreground">
                      Minimum 8 characters with uppercase, lowercase, number and special character
                    </p>
                  )}
                </div>
              ))}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-800">Password Security Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use a unique password for this account</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and special characters</li>
                  <li>• Avoid common words or personal information</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handlePasswordChange}
                  disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Key Section */}
          {hasApiPermission && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  <CardTitle>API Key</CardTitle>
                </div>
                <CardDescription>Manage your API key for system integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Your API Key</Label>
                      <p className="text-sm text-muted-foreground">Use this key to authenticate API requests</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={copyApiKey}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="font-mono text-sm p-3 bg-gray-100 rounded-lg border break-all">
                    {showApiKey ? apiKey : "ff_live_••••••••••••••••••••••••••••••••"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={regenerateApiKey}
                      disabled={isRegenerating}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                      {isRegenerating ? 'Regenerating...' : 'Regenerate Key'}
                    </Button>
                    <p className="text-sm text-muted-foreground">This will invalidate your current key</p>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium mb-2 text-red-800">⚠️ Security Warning</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Never share your API key publicly or in code repositories</li>
                    <li>• Store keys securely using environment variables</li>
                    <li>• Regenerate immediately if compromised</li>
                    <li>• Monitor API usage for unauthorized access</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
