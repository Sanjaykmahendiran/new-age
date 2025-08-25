"use client"

import { useState } from "react"
import {
  Ship,
  Calendar,
  ExternalLink,
  Download,
  Search,
  BookOpen,
  Play,
  Users,
  BarChart3,
  Settings,
  Zap,
  ChevronRight,
  ChevronLeft,
  Check,
  Truck,
  Plane,
  Globe,
  Package,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const productGuides = [
  {
    id: 1,
    title: "Getting Started with NewageNXT",
    description: "Set up your freight forwarding operations and configure your first shipment in the NewageNXT platform.",
    icon: Play,
    duration: "8 min",
    category: "Basics",
    steps: [
      "Create your NewageNXT account and workspace",
      "Configure your company profile and preferences", 
      "Set up your first shipment",
      "Connect with carriers and partners"
    ],
  },
  {
    id: 2,
    title: "Sales & Customer Management",
    description: "Learn to manage leads, customers, and sales processes using the integrated CRM system.",
    icon: Users,
    duration: "12 min",
    category: "Collaboration",
    steps: [
      "Import and manage customer database",
      "Create and track sales opportunities",
      "Generate quotes and rate requests", 
      "Set up automated follow-ups"
    ],
  },
  {
    id: 3,
    title: "Ocean Freight Operations",
    description: "Master ocean freight operations including booking, documentation, and tracking.",
    icon: Ship,
    duration: "15 min",
    category: "Analytics",
    steps: [
      "Create ocean freight bookings",
      "Generate shipping documentation",
      "Track container movements",
      "Manage customs clearance"
    ],
  },
  {
    id: 4,
    title: "Air Freight Management", 
    description: "Handle air freight shipments from booking to delivery with complete visibility.",
    icon: Plane,
    duration: "12 min",
    category: "Advanced",
    steps: [
      "Create air freight bookings",
      "Manage MAWB and HAWB documentation",
      "Track flight schedules and cargo",
      "Handle dangerous goods compliance"
    ],
  },
  {
    id: 5,
    title: "Finance & Accounting",
    description: "Streamline financial operations with automated invoicing and expense tracking.",
    icon: BarChart3,
    duration: "18 min",
    category: "Optimization",
    steps: [
      "Set up accounting configurations",
      "Generate automated invoices",
      "Track costs and profitability",
      "Reconcile vendor payments"
    ],
  },
  {
    id: 6,
    title: "BPO Services Integration",
    description: "Leverage Newage's Business Process Outsourcing services for enhanced efficiency.",
    icon: Settings,
    duration: "10 min",
    category: "Development",
    steps: [
      "Connect with BPO documentation team",
      "Set up customer service workflows",
      "Configure accounting process automation",
      "Establish compliance monitoring"
    ],
  },
]

const releases = [
  {
    version: "NewageNXT v8.4.0",
    date: "2024-12-15",
    type: "Major Release",
    status: "Upcoming",
    title: "Enhanced Ocean Freight & AI-Powered Analytics",
    description: "Major update featuring enhanced ocean freight management, AI-powered rate optimization, and improved mobile experience for freight forwarders.",
    features: [
      "AI-powered rate optimization and carrier selection",
      "Enhanced ocean freight booking with real-time slot availability",
      "Advanced container tracking with predictive ETAs",
      "Mobile app improvements for on-the-go operations",
      "Automated compliance documentation generation",
      "Enhanced Power BI integration for deeper insights"
    ],
    bugFixes: [
      "Fixed rate calculation issues for complex routing",
      "Resolved mobile app synchronization delays", 
      "Improved API response times for high-volume operations",
      "Fixed customs documentation export formatting"
    ],
    breaking: [
      "Updated API endpoints for container tracking (v7 deprecated)",
      "Changed webhook structure for shipment status updates"
    ],
    docsLink: "/docs/releases/v8.4.0",
    downloadLink: "/downloads/v8.4.0",
  },
  {
    version: "NewageNXT v8.3.5",
    date: "2024-11-28",
    type: "Patch Release",
    status: "Released",
    title: "Security Updates & Performance Improvements",
    description: "Critical security updates and performance improvements for enhanced system stability and data protection.",
    features: [
      "Enhanced multi-factor authentication for user accounts",
      "Improved audit logging for compliance tracking",
      "Advanced encryption for sensitive shipment data"
    ],
    bugFixes: [
      "Fixed memory leak in real-time tracking module",
      "Resolved CSV export issues for large datasets",
      "Fixed user permission synchronization delays",
      "Corrected currency conversion calculations"
    ],
    breaking: [],
    docsLink: "/docs/releases/v8.3.5",
    downloadLink: "/downloads/v8.3.5",
  },
  {
    version: "NewageNXT v8.3.0",
    date: "2024-10-20",
    type: "Minor Release", 
    status: "Released",
    title: "Enhanced Documentation & Carrier Integration",
    description: "Streamlined documentation processes and expanded carrier network integration for global freight operations.",
    features: [
      "New carrier integration framework with 50+ global carriers",
      "Automated Bill of Lading generation and distribution",
      "Enhanced customs documentation with country-specific templates",
      "Improved warehouse management integration",
      "Advanced reporting with customizable dashboards"
    ],
    bugFixes: [
      "Fixed rate sheet upload issues for bulk operations",
      "Resolved email notification delays",
      "Improved search performance in shipment database"
    ],
    breaking: [],
    docsLink: "/docs/releases/v8.3.0",
    downloadLink: "/downloads/v8.3.0",
  },
  {
    version: "NewageNXT v8.2.0",
    date: "2024-09-15",
    type: "Major Release",
    status: "Released", 
    title: "Cloud Migration & BPO Services Integration",
    description: "Complete cloud migration with enhanced BPO services integration for comprehensive freight forwarding solutions.",
    features: [
      "Full cloud-based deployment with 99.9% uptime guarantee",
      "Integrated BPO services for documentation and customer service",
      "Enhanced API v2 with faster response times",
      "Advanced analytics with machine learning insights",
      "Multi-timezone support for global operations"
    ],
    bugFixes: [
      "Fixed data synchronization issues between modules",
      "Resolved mobile app login problems", 
      "Improved system performance during peak hours"
    ],
    breaking: [
      "Legacy desktop application discontinued",
      "API v1 deprecated (6-month migration period)"
    ],
    docsLink: "/docs/releases/v8.2.0",
    downloadLink: "/downloads/v8.2.0",
  },
]

export default function NewageProductReleases() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"timeline" | "table">("timeline")
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<(typeof productGuides)[0] | null>(null)
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const startGuide = (guide: (typeof productGuides)[0]) => {
    setSelectedGuide(guide)
    setIsGuideActive(true)
    setCurrentStep(0)
    setCompletedSteps([])
  }

  const nextStep = () => {
    if (selectedGuide && currentStep < selectedGuide.steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCompletedSteps(completedSteps.filter((step) => step !== currentStep - 1))
    }
  }

  const completeGuide = () => {
    if (selectedGuide) {
      setCompletedSteps([...completedSteps, currentStep])
      setTimeout(() => {
        setIsGuideActive(false)
        setSelectedGuide(null)
        setCurrentStep(0)
        setCompletedSteps([])
      }, 1500)
    }
  }

  const exitGuide = () => {
    setIsGuideActive(false)
    setSelectedGuide(null)
    setCurrentStep(0)
    setCompletedSteps([])
  }

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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "basics":
        return "bg-green-100 text-green-800"
      case "collaboration":
        return "bg-blue-100 text-blue-800"
      case "analytics":
        return "bg-purple-100 text-purple-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      case "optimization":
        return "bg-yellow-100 text-yellow-800"
      case "development":
        return "bg-indigo-100 text-indigo-800"
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
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-between px-6 py-4 ">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">NewageNXT Releases</h1>
          <p className="text-sm text-muted-foreground">Track updates to the world's best freight forwarding software</p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={isGuideOpen} onOpenChange={setIsGuideOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <BookOpen className="h-4 w-4" />
                NewageNXT Guide Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  NewageNXT Guide Tour
                </DialogTitle>
              </DialogHeader>

              {!selectedGuide ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {productGuides.map((guide) => {
                    const IconComponent = guide.icon
                    return (
                      <Card
                        key={guide.id}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                        onClick={() => setSelectedGuide(guide)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <IconComponent className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{guide.title}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={getCategoryColor(guide.category)}>{guide.category}</Badge>
                                  <span className="text-sm text-muted-foreground">{guide.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="mt-2">{guide.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{guide.steps.length} steps</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                startGuide(guide)
                              }}
                            >
                              Start Guide →
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : !isGuideActive ? (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedGuide(null)}>
                      ← Back to Guides
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {selectedGuide.icon && <selectedGuide.icon className="h-8 w-8 text-primary" />}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{selectedGuide.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getCategoryColor(selectedGuide.category)}>{selectedGuide.category}</Badge>
                            <span className="text-sm text-muted-foreground">{selectedGuide.duration}</span>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-3">{selectedGuide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-3">Guide Steps:</h4>
                      <div className="space-y-3">
                        {selectedGuide.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <p className="text-sm">{step}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-6">
                        <Button className="flex-1" onClick={() => startGuide(selectedGuide)}>
                          Start This Guide
                        </Button>
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Docs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="sm" onClick={exitGuide}>
                      ← Exit Guide
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Step {currentStep + 1} of {selectedGuide.steps.length}
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {selectedGuide.icon && <selectedGuide.icon className="h-8 w-8 text-primary" />}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{selectedGuide.title}</CardTitle>
                          <Badge className={getCategoryColor(selectedGuide.category)}>{selectedGuide.category}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {Math.round(
                              ((completedSteps.length +
                                (currentStep === selectedGuide.steps.length - 1 && completedSteps.includes(currentStep)
                                  ? 1
                                  : 0)) /
                                selectedGuide.steps.length) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            ((completedSteps.length +
                              (currentStep === selectedGuide.steps.length - 1 && completedSteps.includes(currentStep)
                                ? 1
                                : 0)) /
                              selectedGuide.steps.length) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="mb-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              completedSteps.includes(currentStep)
                                ? "bg-green-500 text-white"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {completedSteps.includes(currentStep) ? <Check className="h-4 w-4" /> : currentStep + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-lg mb-2">{selectedGuide.steps[currentStep]}</h3>
                            <p className="text-muted-foreground text-sm">
                              Follow this step to continue with the {selectedGuide.title.toLowerCase()} guide.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>

                        <div className="flex items-center gap-2">
                          {selectedGuide.steps.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentStep
                                  ? "bg-primary"
                                  : completedSteps.includes(index)
                                    ? "bg-green-500"
                                    : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>

                        {currentStep === selectedGuide.steps.length - 1 ? (
                          <Button onClick={completeGuide}>
                            {completedSteps.includes(currentStep) ? "Guide Complete!" : "Complete Guide"}
                            <Check className="h-4 w-4 ml-1" />
                          </Button>
                        ) : (
                          <Button onClick={nextStep}>
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "timeline" | "table")}>
            <TabsList className="bg-white p-1 rounded-lg">
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
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <Card>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search NewageNXT releases..."
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

          <Tabs value={viewMode} className="w-full">
            <TabsContent value="timeline" className="space-y-6">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                {filteredReleases.map((release, index) => (
                  <div key={release.version} className="relative flex gap-6 pb-8">
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
                              <Ship className="h-5 w-5" />
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
