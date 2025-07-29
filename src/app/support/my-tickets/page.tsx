"use client"

import { useState } from "react"
import { Search, Download, Eye, MessageSquare } from "lucide-react"

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

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter
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

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2  px-6">
       
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">My Tickets</h1>
          <p className="text-sm text-muted-foreground">Track and manage your support requests</p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>View and manage your support requests</CardDescription>
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
                <SelectContent>
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono">{ticket.id}</TableCell>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>{ticket.updated}</TableCell>
                      <TableCell>
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
