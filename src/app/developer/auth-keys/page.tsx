"use client"

import { useState } from "react"
import { Eye, EyeOff, Copy, RefreshCw, Plus, Trash2, Calendar, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const apiKeys = [
  {
    id: "key_1",
    name: "Production API Key",
    key: "ff_live_1234567890abcdef1234567890abcdef",
    environment: "Production",
    created: "2024-10-15",
    lastUsed: "2024-12-10",
    permissions: ["read", "write", "delete"],
    rateLimit: "5000/hour",
    status: "Active",
  },
  {
    id: "key_2",
    name: "Development API Key",
    key: "ff_test_abcdef1234567890abcdef1234567890",
    environment: "Development",
    created: "2024-11-01",
    lastUsed: "2024-12-09",
    permissions: ["read", "write"],
    rateLimit: "1000/hour",
    status: "Active",
  },
  {
    id: "key_3",
    name: "Webhook Integration",
    key: "ff_live_9876543210fedcba9876543210fedcba",
    environment: "Production",
    created: "2024-09-20",
    lastUsed: "2024-12-08",
    permissions: ["read"],
    rateLimit: "2500/hour",
    status: "Inactive",
  },
]

export default function AuthenticationKeys() {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyEnvironment, setNewKeyEnvironment] = useState("")
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([])


  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleKeys(newVisible)
  }

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)

  }

  const regenerateApiKey = (keyId: string) => {

  }

  const deleteApiKey = (keyId: string) => {

  }

  const createApiKey = () => {

    setNewKeyName("")
    setNewKeyEnvironment("")
    setNewKeyPermissions([])
  }

  const getEnvironmentColor = (environment: string) => {
    return environment === "Production" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-between px-6 py-4 ">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Authentication & Keys</h1>
          <p className="text-sm text-muted-foreground">Manage your API keys and authentication settings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>Generate a new API key for your application</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Production Integration"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select value={newKeyEnvironment} onValueChange={setNewKeyEnvironment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Permissions</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="read" className="text-sm font-normal">
                      Read Access
                    </Label>
                    <Switch id="read" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="write" className="text-sm font-normal">
                      Write Access
                    </Label>
                    <Switch id="write" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="delete" className="text-sm font-normal">
                      Delete Access
                    </Label>
                    <Switch id="delete" />
                  </div>
                </div>
              </div>
              <Button onClick={createApiKey} className="w-full">
                Create API Key
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* API Keys List */}
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for different environments and applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <Card key={apiKey.id} className="transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{apiKey.name}</h3>
                            <Badge className={getEnvironmentColor(apiKey.environment)}>{apiKey.environment}</Badge>
                            <Badge className={getStatusColor(apiKey.status)}>{apiKey.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Created {apiKey.created}
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {apiKey.rateLimit}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => toggleKeyVisibility(apiKey.id)}>
                            {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => copyApiKey(apiKey.key)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => regenerateApiKey(apiKey.id)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteApiKey(apiKey.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">API Key</Label>
                          <div className="font-mono text-sm p-3 bg-muted rounded-lg mt-1">
                            {visibleKeys.has(apiKey.id)
                              ? apiKey.key
                              : apiKey.key.substring(0, 12) + "••••••••••••••••••••••••"}
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label className="text-sm font-medium">Permissions</Label>
                            <div className="flex gap-1 mt-1">
                              {apiKey.permissions.map((permission) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Last Used</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(apiKey.lastUsed).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Best Practices
              </CardTitle>
              <CardDescription>Keep your API keys secure and follow these guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium text-green-600">✓ Do</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Store API keys in environment variables
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Use different keys for different environments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Rotate keys regularly (every 90 days)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Monitor API key usage and activity
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Use minimum required permissions
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-red-600">✗ Don't</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      Commit API keys to version control
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      Share keys via email or messaging
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      Use production keys in development
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      Log API keys in application logs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      Expose keys in client-side code
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Webhook Configuration */}
          {/* Webhook Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Configure webhook endpoints for real-time notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-app.com/webhooks/freightflow"
                  defaultValue="https://api.acmelogistics.com/webhooks/freightflow"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="webhookSecret">Webhook Secret</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="webhookSecret"
                    type="password"
                    placeholder="Your webhook secret"
                    defaultValue="whsec_1234567890abcdef"
                  />
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium mb-1.5">Webhook Security</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Always verify webhook signatures using the provided secret to ensure requests are from FreightFlow.
                  Check our documentation for signature verification examples.
                </p>
              </div>
              <div className="flex justify-end">
                <Button size="sm" className="px-4">Update Webhook Settings</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
