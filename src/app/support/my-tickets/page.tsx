"use client"

import { useState } from "react"
import { Search, Download, Eye, MessageSquare, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const tickets = [
  {
    id: "TK-001",
    subject: "API Rate Limiting Issue",
    status: "In Progress",
    priority: "High",
    category: "API Integration",
    created: "2024-12-10",
    updated: "2 hours ago",
    assignee: "Sarah Chen",
  },
  {
    id: "TK-002",
    subject: "Shipment Tracking Not Updating",
    status: "Open",
    priority: "Medium",
    category: "Platform Issues",
    created: "2024-12-09",
    updated: "4 hours ago",
    assignee: "Mike Johnson",
  },
  {
    id: "TK-003",
    subject: "Documentation Request",
    status: "Resolved",
    priority: "Low",
    category: "Documentation",
    created: "2024-12-08",
    updated: "1 day ago",
    assignee: "Lisa Wang",
  },
  {
    id: "TK-004",
    subject: "Webhook Configuration Help",
    status: "Pending",
    priority: "Medium",
    category: "Technical Support",
    created: "2024-12-07",
    updated: "2 days ago",
    assignee: "David Kim",
  },
]

export default function MyTickets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<(typeof tickets)[0] | null>(null)
  const [reply, setReply] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "open" | "closed">("all")

  // CSAT Feedback state
  const [feedbackTicket, setFeedbackTicket] = useState<(typeof tickets)[0] | null>(null)
  const [satisfaction, setSatisfaction] = useState("")
  const [feedbackComments, setFeedbackComments] = useState("")

  const statusCounts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status.toLowerCase() === "open").length,
    closed: tickets.filter((t) => t.status.toLowerCase() === "resolved").length,
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      (statusFilter === "all" && activeTab === "all") ||
      ticket.status.toLowerCase() === (activeTab === "closed" ? "resolved" : activeTab)

    const matchesPriority = priorityFilter === "all" || ticket.priority.toLowerCase() === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "default"
      case "in progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "destructive"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 font-semibold"
      case "in progress":
        return "bg-yellow-100 text-yellow-800 font-semibold"
      case "pending":
        return "bg-blue-100 text-blue-800 font-semibold"
      case "open":
        return "bg-red-100 text-red-800 font-semibold"
      default:
        return "bg-gray-100 text-gray-800 font-semibold"
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 font-semibold"
      case "medium":
        return "bg-yellow-100 text-yellow-800 font-semibold"
      case "low":
        return "bg-green-100 text-green-800 font-semibold"
      default:
        return "bg-gray-100 text-gray-800 font-semibold"
    }
  }

  const handleFeedbackSubmit = () => {
    // Handle feedback submission here
    console.log("Feedback submitted:", {
      ticketId: feedbackTicket?.id,
      satisfaction,
      comments: feedbackComments
    })

    // Reset form and close dialog
    setSatisfaction("")
    setFeedbackComments("")
    setFeedbackTicket(null)

    // You can add success message or API call here
    alert("Thank you for your feedback!")
  }

  const getSatisfactionEmoji = (value: string) => {
    switch (value) {
      case "very-satisfied": return "😊"
      case "satisfied": return "🙂"
      case "neutral": return "😐"
      case "dissatisfied": return "🙁"
      case "very-dissatisfied": return "😞"
      default: return ""
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Tickets</h1>
          <p className="text-sm text-muted-foreground">Track and manage your support requests</p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              {/* Tab Buttons */}
              <div className="flex items-center gap-2">
                {(["all", "open", "closed"] as const).map((statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => {
                      setActiveTab(statusKey)
                      setStatusFilter(statusKey)
                    }}
                    className={`relative px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === statusKey
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-primary hover:text-white"
                      }`}
                  >
                    {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
                    <span
                      className={`absolute -top-2 -right-2 text-[10px] px-2 py-[1px] rounded-full ${activeTab === statusKey ? "bg-white text-primary" : "bg-primary text-white"
                        }`}
                    >
                      {statusCounts[statusKey]}
                    </span>
                  </button>
                ))}
              </div>

              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Filters */}
            <div className="flex flex-col gap-4 mb-6 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="hover:text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tickets Table */}
            <div className="rounded-md border-b">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="text-black text-[13px]">Ticket ID</TableHead>
                    <TableHead className="text-black text-[13px]">Subject</TableHead>
                    <TableHead className="text-black text-[13px]">Status</TableHead>
                    <TableHead className="text-black text-[13px]">Priority</TableHead>
                    <TableHead className="text-black text-[13px]">Category</TableHead>
                    <TableHead className="text-black text-[13px]">Updated</TableHead>
                    <TableHead className="text-black text-[13px] w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-muted/50 text-gray-500">
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadgeClass(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>{ticket.updated}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 ">
                          {/* View Ticket Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(ticket)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  {selectedTicket?.id} - {selectedTicket?.subject}
                                </DialogTitle>
                                <DialogDescription>
                                  Created on {selectedTicket?.created} • Assigned to {selectedTicket?.assignee}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex gap-2">
                                  <Badge variant={getStatusColor(selectedTicket?.status || "")}>
                                    {selectedTicket?.status}
                                  </Badge>
                                  <Badge variant={getPriorityColor(selectedTicket?.priority || "")}>
                                    {selectedTicket?.priority}
                                  </Badge>
                                  <Badge variant="outline">{selectedTicket?.category}</Badge>
                                </div>

                                <div className="space-y-4 max-h-60 overflow-y-auto">
                                  <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm font-medium mb-2">Original Message</p>
                                    <p className="text-sm">
                                      I'm experiencing issues with API rate limiting. The requests are being throttled
                                      even though I'm well within the documented limits. This is affecting our production
                                      shipment tracking system.
                                    </p>
                                  </div>

                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm font-medium mb-2">Support Response - Sarah Chen</p>
                                    <p className="text-sm">
                                      Thank you for reaching out. I've reviewed your API usage and can see the issue. It
                                      appears there's a configuration problem with your rate limiting settings. I'm
                                      working on a fix and will update you shortly.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="reply">Add Reply</Label>
                                  <Textarea
                                    id="reply"
                                    placeholder="Type your reply..."
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                  />
                                  <Button className="w-full">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Send Reply
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Feedback Button - Only show for resolved tickets */}
                          {ticket.status.toLowerCase() === "resolved" && (
                            <Dialog open={feedbackTicket?.id === ticket.id} onOpenChange={(open) => {
                              if (!open) {
                                setFeedbackTicket(null)
                                setSatisfaction("")
                                setFeedbackComments("")
                              }
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => setFeedbackTicket(ticket)}
                                  className=""
                                >
                                  Submit Feedback<ThumbsUp className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    Feedback
                                  </DialogTitle>
                                  <DialogDescription>
                                    Please rate your satisfaction with ticket {feedbackTicket?.id}
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6">
                                  {/* Satisfaction Rating */}
                                  <div className="space-y-3">
                                    <Label className="text-sm font-medium">How satisfied are you with the resolution?</Label>
                                    <RadioGroup value={satisfaction} onValueChange={setSatisfaction} className="space-y-2">
                                      {[
                                        { value: "very-satisfied", label: "Very Satisfied", emoji: "😊" },
                                        { value: "satisfied", label: "Satisfied", emoji: "🙂" },
                                        { value: "neutral", label: "Neutral", emoji: "😐" },
                                        { value: "dissatisfied", label: "Dissatisfied", emoji: "🙁" },
                                        { value: "very-dissatisfied", label: "Very Dissatisfied", emoji: "😞" }
                                      ].map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2">
                                          <RadioGroupItem value={option.value} id={option.value} />
                                          <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                                            <span className="text-lg">{option.emoji}</span>
                                            {option.label}
                                          </Label>
                                        </div>
                                      ))}
                                    </RadioGroup>
                                  </div>

                                  {/* Additional Comments */}
                                  <div className="space-y-2">
                                    <Label htmlFor="feedback-comments">Additional Comments (Optional)</Label>
                                    <Textarea
                                      id="feedback-comments"
                                      placeholder="Tell us more about your experience..."
                                      value={feedbackComments}
                                      onChange={(e) => setFeedbackComments(e.target.value)}
                                      rows={3}
                                    />
                                  </div>

                                  {/* Submit Button */}
                                  <div className="flex gap-2">
                                    <Button
                                      onClick={handleFeedbackSubmit}
                                      disabled={!satisfaction}
                                      className="flex-1"
                                    >
                                      Submit Feedback
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setFeedbackTicket(null)
                                        setSatisfaction("")
                                        setFeedbackComments("")
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
