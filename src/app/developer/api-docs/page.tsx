"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Copy, ExternalLink, Code, Book, Key, Search, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const codeExamples = {
  auth: `// Authentication Example
const response = await fetch('https://api.freightflow.com/v2/shipments', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`,

  createShipment: `// Create Shipment
const shipment = await fetch('https://api.freightflow.com/v2/shipments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    origin: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "US"
    },
    destination: {
      address: "456 Oak Ave", 
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      country: "US"
    },
    packages: [{
      weight: 10.5,
      weight_unit: "lbs",
      dimensions: {
        length: 12,
        width: 8,
        height: 6,
        unit: "in"
      }
    }],
    service_type: "standard",
    insurance_value: 100.00
  })
});

const result = await shipment.json();
console.log('Shipment created:', result.shipment_id);`,

  webhook: `// Webhook Payload Structure
{
  "event": "shipment.status_changed",
  "timestamp": "2024-12-10T15:30:00Z",
  "data": {
    "shipment_id": "shp_1234567890",
    "status": "in_transit",
    "status_details": "Package is on the way to destination",
    "tracking_number": "1Z999AA1234567890",
    "carrier": "UPS",
    "estimated_delivery": "2024-12-12T17:00:00Z",
    "location": {
      "city": "Chicago",
      "state": "IL",
      "country": "US"
    },
    "updated_at": "2024-12-10T15:30:00Z"
  },
  "signature": "sha256=abc123..."
}`,

  errorHandling: `// Error Handling
try {
  const response = await fetch('https://api.freightflow.com/v2/shipments', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shipmentData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(\`API Error: \${error.message}\`);
  }

  const result = await response.json();
  return result;
} catch (error) {
  console.error('Shipment creation failed:', error.message);
  // Handle specific error codes
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Implement retry logic
  }
}`,
}

const endpoints = [
  {
    method: "GET",
    path: "/v2/shipments",
    description: "List all shipments with pagination and filtering",
    status: "Active",
    category: "Shipments",
  },
  {
    method: "POST",
    path: "/v2/shipments",
    description: "Create a new shipment",
    status: "Active",
    category: "Shipments",
  },
  {
    method: "GET",
    path: "/v2/shipments/{id}",
    description: "Get detailed shipment information",
    status: "Active",
    category: "Shipments",
  },
  {
    method: "PUT",
    path: "/v2/shipments/{id}",
    description: "Update shipment details",
    status: "Active",
    category: "Shipments",
  },
  {
    method: "GET",
    path: "/v2/tracking/{number}",
    description: "Track shipment by tracking number",
    status: "Active",
    category: "Tracking",
  },
  {
    method: "POST",
    path: "/v2/webhooks",
    description: "Create webhook endpoint",
    status: "Active",
    category: "Webhooks",
  },
  {
    method: "GET",
    path: "/v2/rates",
    description: "Get shipping rates for routes",
    status: "Active",
    category: "Rates",
  },
  {
    method: "POST",
    path: "/v2/labels",
    description: "Generate shipping labels",
    status: "Beta",
    category: "Labels",
  },
]

const sdks = [
  {
    name: "JavaScript SDK",
    description: "Official JavaScript/Node.js SDK with TypeScript support",
    version: "v2.1.0",
    language: "JavaScript",
    installCommand: "npm install @freightflow/sdk",
    docsLink: "/docs/sdks/javascript",
  },
  {
    name: "Python SDK",
    description: "Official Python SDK with async support",
    version: "v2.0.3",
    language: "Python",
    installCommand: "pip install freightflow-sdk",
    docsLink: "/docs/sdks/python",
  },
  {
    name: "PHP SDK",
    description: "Official PHP SDK with Laravel integration",
    version: "v1.8.2",
    language: "PHP",
    installCommand: "composer require freightflow/sdk",
    docsLink: "/docs/sdks/php",
  },
  {
    name: "Go SDK",
    description: "Official Go SDK with context support",
    version: "v1.5.1",
    language: "Go",
    installCommand: "go get github.com/freightflow/go-sdk",
    docsLink: "/docs/sdks/go",
  },
]

export default function DeveloperAPIDocs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800"
      case "POST":
        return "bg-blue-100 text-blue-800"
      case "PUT":
        return "bg-yellow-100 text-yellow-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredEndpoints = endpoints.filter((endpoint) => {
    const matchesSearch =
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || endpoint.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(endpoints.map((e) => e.category))]

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 px-6">

        <div className="flex-1">
          <h1 className="text-2xl font-semibold">API Documentation</h1>
          <p className="text-sm text-muted-foreground">Complete technical reference for FreightFlow APIs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-primary text-white">
            <ExternalLink className="h-4 w-4" />
            Postman Collection
          </Button>
          <Button variant="outline" className="gap-2 ">
            <Download className="h-4 w-4" />
            OpenAPI Spec
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Search Bar */}
          <div className="bg-white shadow rounded-xl p-4">
            <CardContent >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search endpoints, methods, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-base h-12"
                />
              </div>
            </CardContent>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="sdks">SDKs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Getting Started
                    </CardTitle>
                    <CardDescription>Quick start guide for FreightFlow API v2</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Base URL</h4>
                      <code className="text-sm bg-white px-2 py-1 rounded">https://api.freightflow.com/v2</code>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium mb-2">Rate Limits</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Standard: 1,000 requests/hour</li>
                        <li>• Premium: 5,000 requests/hour</li>
                        <li>• Enterprise: 25,000 requests/hour</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5" />
                      API Features
                    </CardTitle>
                    <CardDescription>What you can build with our API</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Create and manage shipments
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        Real-time tracking and updates
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full" />
                        Webhook notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                        Rate calculation and comparison
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Label generation and printing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Authentication
                  </CardTitle>
                  <CardDescription>Secure your API requests with proper authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Authentication Method</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      FreightFlow API uses Bearer token authentication. Include your API key in the Authorization
                      header.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Example Request</h4>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(codeExamples.auth)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{codeExamples.auth}</pre>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-green-600 mb-2">✓ Best Practices</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Store API keys securely in environment variables</li>
                        <li>• Use HTTPS for all API requests</li>
                        <li>• Implement proper error handling</li>
                        <li>• Rotate keys regularly</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-red-600 mb-2">✗ Security Warnings</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Never expose keys in client-side code</li>
                        <li>• Don't commit keys to version control</li>
                        <li>• Avoid logging API keys</li>
                        <li>• Don't share keys via email or chat</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        API Endpoints
                      </CardTitle>
                      <CardDescription>Complete list of available API endpoints</CardDescription>
                    </div>
<div className="flex flex-wrap items-center gap-2">
  {[
    { label: "All", value: "all" },
    ...categories.map((c) => ({ label: c, value: c.toLowerCase() })),
  ].map(({ label, value }) => (
    <Button
      key={value}
      size="sm"
      variant={selectedCategory === value ? "default" : "outline"}
      onClick={() => setSelectedCategory(value)}
      className="hover:bg-gray-100 hover:text-black transition-colors"
    >
      {label}
    </Button>
  ))}
</div>

             </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredEndpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg  transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                          <div className="flex-1">
                            <code className="font-mono text-sm font-medium">{endpoint.path}</code>
                            <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{endpoint.category}</Badge>
                          <Badge variant={endpoint.status === "Beta" ? "secondary" : "default"}>
                            {endpoint.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Create Shipment</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(codeExamples.createShipment)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Complete example of creating a new shipment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{codeExamples.createShipment}</pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Webhook Payload</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(codeExamples.webhook)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Example webhook payload for shipment status changes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{codeExamples.webhook}</pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Error Handling</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(codeExamples.errorHandling)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Proper error handling and retry logic</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{codeExamples.errorHandling}</pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sdks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Official SDKs</CardTitle>
                  <CardDescription>
                    Use our official SDKs to integrate faster with your preferred language
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {sdks.map((sdk) => (
                      <Card key={sdk.name} className="transition-all duration-200 hover:shadow-md">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold">{sdk.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{sdk.description}</p>
                            </div>
                            <Badge variant="outline">{sdk.version}</Badge>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">INSTALL</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <code className="flex-1 text-sm bg-muted px-2 py-1 rounded">{sdk.installCommand}</code>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(sdk.installCommand)}>
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <Button variant="outline" className="w-full bg-transparent" size="sm">
                              <Book className="h-4 w-4 mr-2" />
                              View Documentation
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
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
