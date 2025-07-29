"use client"

import { useState } from "react"
import { Search, BookOpen, Video, FileText, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const topArticles = [
  {
    title: "Getting Started with FreightFlow API",
    description: "Complete guide to integrating with our logistics API",
    category: "API",
    type: "article",
    views: 1250,
    rating: 4.8,
  },
  {
    title: "Webhook Configuration Tutorial",
    description: "Step-by-step video guide for setting up webhooks",
    category: "API",
    type: "video",
    views: 890,
    rating: 4.9,
  },
  {
    title: "Platform Overview & Features",
    description: "Understanding the FreightFlow platform capabilities",
    category: "Platform",
    type: "article",
    views: 2100,
    rating: 4.7,
  },
  {
    title: "Troubleshooting Common Issues",
    description: "Solutions to frequently encountered problems",
    category: "Operations",
    type: "article",
    views: 1680,
    rating: 4.6,
  },
]

const apiArticles = [
  {
    title: "Authentication & API Keys",
    description: "How to authenticate API requests",
    views: 980,
    rating: 4.8,
  },
  {
    title: "Rate Limiting Best Practices",
    description: "Understanding and working with API limits",
    views: 750,
    rating: 4.7,
  },
  {
    title: "Webhook Events Reference",
    description: "Complete list of available webhook events",
    views: 650,
    rating: 4.9,
  },
  {
    title: "Error Codes & Troubleshooting",
    description: "Common API errors and their solutions",
    views: 820,
    rating: 4.6,
  },
]

const platformArticles = [
  {
    title: "Dashboard Navigation Guide",
    description: "Getting familiar with the platform interface",
    views: 1200,
    rating: 4.5,
  },
  {
    title: "User Management & Permissions",
    description: "Managing team access and roles",
    views: 890,
    rating: 4.7,
  },
  {
    title: "Notification Settings",
    description: "Configuring alerts and notifications",
    views: 670,
    rating: 4.4,
  },
  {
    title: "Data Export & Reporting",
    description: "Generating reports and exporting data",
    views: 1100,
    rating: 4.8,
  },
]

const operationsArticles = [
  {
    title: "Shipment Tracking Setup",
    description: "Configuring real-time shipment tracking",
    views: 1500,
    rating: 4.9,
  },
  {
    title: "Customs Documentation",
    description: "Managing customs forms and compliance",
    views: 1200,
    rating: 4.6,
  },
  {
    title: "Carrier Integration Guide",
    description: "Connecting with shipping carriers",
    views: 980,
    rating: 4.7,
  },
  {
    title: "Inventory Management",
    description: "Tracking and managing inventory levels",
    views: 850,
    rating: 4.5,
  },
]

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2  px-6">
    
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground">Find answers and learn about our platform</p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Search Bar */}
          <div className="bg-white shadow-md rounded-xl px-4 py-4">
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles, videos, and guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-lg h-12"
                />
              </div>
            </CardContent>
          </div>

          {/* Top Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Articles & Videos</CardTitle>
              <CardDescription>Most viewed content from our knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {topArticles.map((article, index) => (
                  <Card
                    key={index}
                    className="transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {article.type === "video" ? (
                            <Video className="h-4 w-4 text-blue-600" />
                          ) : (
                            <FileText className="h-4 w-4 text-green-600" />
                          )}
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {article.rating}
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                      <p className="text-xs text-muted-foreground">{article.views} views</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categorized Content */}
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="api">API Documentation</TabsTrigger>
              <TabsTrigger value="platform">Platform Guides</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>

            <TabsContent value="api" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    API Documentation
                  </CardTitle>
                  <CardDescription>Technical guides for integrating with FreightFlow APIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {apiArticles.map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-sm text-muted-foreground">{article.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {article.rating}
                          <span>•</span>
                          {article.views} views
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="platform" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Platform Guides
                  </CardTitle>
                  <CardDescription>Learn how to use FreightFlow platform features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {platformArticles.map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-sm text-muted-foreground">{article.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {article.rating}
                          <span>•</span>
                          {article.views} views
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Operations Guides
                  </CardTitle>
                  <CardDescription>Best practices for freight forwarding operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {operationsArticles.map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-sm text-muted-foreground">{article.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {article.rating}
                          <span>•</span>
                          {article.views} views
                        </div>
                      </div>
                    ))}
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
