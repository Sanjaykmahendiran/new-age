"use client"

import { useState } from "react"
import { Rocket, Calendar, ExternalLink, Download, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const releases = [
  {
    version: "v2.4.0",
    date: "2024-12-20",
    type: "Major Release",
    status: "Upcoming",
    title: "Enhanced Analytics & Mobile Improvements",
    description: "Major update featuring advanced analytics dashboard, mobile app improvements, and new API endpoints.",
    features: [
      "Advanced Analytics Dashboard with custom date ranges",
      "Mobile app performance improvements (40% faster)",
      "New Webhook Events API",
      "Bulk shipment import via CSV",
      "Enhanced notification system",
    ],
    bugFixes: [
      "Fixed rate limiting issues for enterprise customers",
      "Resolved mobile app crash on Android 12+",
      "Fixed timezone display issues in reports",
    ],
    breaking: [
      "Deprecated v1 authentication endpoints (migration guide available)",
      "Changed webhook payload structure for shipment events",
    ],
    docsLink: "/docs/releases/v2.4.0",
    downloadLink: "/downloads/v2.4.0",
  },
  {
    version: "v2.3.2",
    date: "2024-11-15",
    type: "Patch Release",
    status: "Released",
    title: "Security Updates & Bug Fixes",
    description: "Important security updates and critical bug fixes for improved stability.",
    features: ["Enhanced API security with improved rate limiting", "New audit logging for enterprise customers"],
    bugFixes: [
      "Fixed memory leak in real-time tracking",
      "Resolved CSV export formatting issues",
      "Fixed user permission sync delays",
      "Corrected timezone handling in scheduled reports",
    ],
    breaking: [],
    docsLink: "/docs/releases/v2.3.2",
    downloadLink: "/downloads/v2.3.2",
  },
  {
    version: "v2.3.1",
    date: "2024-10-28",
    type: "Minor Release",
    status: "Released",
    title: "UI Improvements & Performance Boost",
    description: "User interface enhancements and significant performance improvements across the platform.",
    features: [
      "Redesigned dashboard with improved loading times",
      "New dark mode support",
      "Enhanced search functionality",
      "Improved mobile responsiveness",
    ],
    bugFixes: [
      "Fixed dashboard loading issues on slower connections",
      "Resolved search result pagination",
      "Fixed mobile menu navigation",
    ],
    breaking: [],
    docsLink: "/docs/releases/v2.3.1",
    downloadLink: "/downloads/v2.3.1",
  },
  {
    version: "v2.3.0",
    date: "2024-09-20",
    type: "Major Release",
    status: "Released",
    title: "API v2 Launch & Enhanced Integrations",
    description: "Launch of API v2 with improved performance, new endpoints, and enhanced third-party integrations.",
    features: [
      "API v2 with 50% faster response times",
      "New carrier integration framework",
      "Enhanced webhook system",
      "Improved documentation portal",
      "New SDK for JavaScript and Python",
    ],
    bugFixes: ["Fixed API timeout issues", "Resolved webhook delivery failures", "Fixed integration sync delays"],
    breaking: ["API v1 deprecation notice (6-month sunset period)", "Changed authentication flow for OAuth"],
    docsLink: "/docs/releases/v2.3.0",
    downloadLink: "/downloads/v2.3.0",
  },
]

export default function ProductReleases() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"timeline" | "table">("timeline")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "released":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "beta":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "major release":
        return "bg-purple-100 text-purple-800"
      case "minor release":
        return "bg-blue-100 text-blue-800"
      case "patch release":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredReleases = releases.filter((release) => {
    const matchesSearch =
      release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || release.type.toLowerCase().replace(" ", "-") === typeFilter
    const matchesStatus = statusFilter === "all" || release.status.toLowerCase() === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 px-6">
       
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Product Releases</h1>
          <p className="text-sm text-muted-foreground">Track new features, improvements, and updates</p>
        </div>
       <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "timeline" | "table")}>
  <TabsList className="bg-muted p-1 rounded-lg">
    <TabsTrigger
      value="timeline"
      className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-md"
    >
      Timeline
    </TabsTrigger>
    <TabsTrigger
      value="table"
      className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-md"
    >
      Table
    </TabsTrigger>
  </TabsList>
</Tabs>

      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Filters */}
          <Card>
            <CardContent >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search releases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="major-release">Major Release</SelectItem>
                    <SelectItem value="minor-release">Minor Release</SelectItem>
                    <SelectItem value="patch-release">Patch Release</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="released">Released</SelectItem>
                    <SelectItem value="beta">Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Release Content */}
          <Tabs value={viewMode} className="w-full">
            <TabsContent value="timeline" className="space-y-6">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                {filteredReleases.map((release, index) => (
                  <div key={release.version} className="relative flex gap-6 pb-8">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 w-16 flex justify-center">
                      <div
                        className={`w-4 h-4 rounded-full border-4 border-background ${
                          release.status === "Released"
                            ? "bg-green-500"
                            : release.status === "Upcoming"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      />
                    </div>

                    {/* Release Card */}
                    <Card className="flex-1 transition-all duration-200 hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono">
                                {release.version}
                              </Badge>
                              <Badge className={getTypeColor(release.type)}>{release.type}</Badge>
                              <Badge className={getStatusColor(release.status)}>{release.status}</Badge>
                            </div>
                            <CardTitle className="flex items-center gap-2">
                              <Rocket className="h-5 w-5" />
                              {release.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {release.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Docs
                            </Button>
                            {release.status === "Released" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                        <CardDescription>{release.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Features */}
                        {release.features.length > 0 && (
                          <div>
                            <h4 className="font-medium text-green-700 mb-2">✨ New Features</h4>
                            <ul className="space-y-1 text-sm">
                              {release.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-green-600 mt-1">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Bug Fixes */}
                        {release.bugFixes.length > 0 && (
                          <div>
                            <h4 className="font-medium text-blue-700 mb-2">🐛 Bug Fixes</h4>
                            <ul className="space-y-1 text-sm">
                              {release.bugFixes.map((fix, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-blue-600 mt-1">•</span>
                                  <span>{fix}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Breaking Changes */}
                        {release.breaking.length > 0 && (
                          <div>
                            <h4 className="font-medium text-red-700 mb-2">⚠️ Breaking Changes</h4>
                            <ul className="space-y-1 text-sm">
                              {release.breaking.map((change, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-red-600 mt-1">•</span>
                                  <span>{change}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr>
                          <th className="text-left p-4 font-medium">Version</th>
                          <th className="text-left p-4 font-medium">Release Date</th>
                          <th className="text-left p-4 font-medium">Type</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Title</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReleases.map((release) => (
                          <tr key={release.version} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <Badge variant="outline" className="font-mono">
                                {release.version}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm">{release.date}</td>
                            <td className="p-4">
                              <Badge className={getTypeColor(release.type)}>{release.type}</Badge>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(release.status)}>{release.status}</Badge>
                            </td>
                            <td className="p-4">
                              <div>
                                <p className="font-medium">{release.title}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-xs">{release.description}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                {release.status === "Released" && (
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
