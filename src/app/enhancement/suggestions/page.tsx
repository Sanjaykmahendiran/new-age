"use client";

import { useState } from "react";
import {
  ThumbsUp,
  MessageSquare,
  Plus,
  TrendingUp,
  Clock,
  Search,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const enhancements = [
  {
    id: 1,
    title: "Real-time Shipment Notifications",
    summary:
      "Push notifications for shipment status changes directly to mobile devices and desktop",
    description:
      "Currently, users have to manually refresh to see shipment updates. This enhancement would provide real-time push notifications whenever a shipment status changes, improving user experience and reducing the need for constant checking.",
    author: "Sarah Chen",
    authorRole: "Operations Manager",
    votes: 42,
    comments: 18,
    status: "Under Review",
    category: "Mobile Experience",
    priority: "High",
    created: "2024-12-01",
    trending: true,
  },
  {
    id: 2,
    title: "Bulk Shipment Import via CSV",
    summary:
      "Allow importing multiple shipments via CSV/Excel files for batch processing",
    description:
      "For customers with high volume shipments, manually entering each shipment is time-consuming. This feature would allow bulk import via CSV files with validation and error reporting.",
    author: "Mike Johnson",
    authorRole: "Logistics Coordinator",
    votes: 38,
    comments: 22,
    status: "In Progress",
    category: "Operations Management",
    priority: "Medium",
    created: "2024-11-28",
    trending: false,
  },
  {
    id: 3,
    title: "Advanced Analytics Dashboard",
    summary:
      "More detailed analytics with custom date ranges, KPIs, and export options",
    description:
      "Current analytics are basic. Users need more detailed insights including custom date ranges, performance KPIs, cost analysis, and the ability to export reports in various formats.",
    author: "Lisa Wang",
    authorRole: "Business Analyst",
    votes: 56,
    comments: 31,
    status: "Planned",
    category: "Reporting & Analytics",
    priority: "High",
    created: "2024-11-25",
    trending: true,
  },
  {
    id: 4,
    title: "API Rate Limit Increase",
    summary:
      "Higher rate limits for enterprise customers with high volume API usage needs",
    description:
      "Enterprise customers with high-volume integrations are hitting rate limits frequently. Need tiered rate limiting based on subscription level.",
    author: "David Kim",
    authorRole: "Integration Developer",
    votes: 29,
    comments: 12,
    status: "Under Review",
    category: "API & Integrations",
    priority: "Medium",
    created: "2024-11-20",
    trending: false,
  },
  {
    id: 5,
    title: "Dark Mode Support",
    summary:
      "Add dark theme option for better user experience during extended usage",
    description:
      "Many users work long hours and would benefit from a dark mode option to reduce eye strain, especially during night shifts.",
    author: "Emma Wilson",
    authorRole: "Night Shift Supervisor",
    votes: 67,
    comments: 8,
    status: "Released",
    category: "UI/UX Improvements",
    priority: "Low",
    created: "2024-11-15",
    trending: false,
  },
];

const comments = [
  {
    author: "John Doe",
    role: "Operations Manager",
    content:
      "This would be incredibly useful for our operations team. We currently have to manually check for updates every few minutes.",
    timestamp: "2 days ago",
    votes: 5,
  },
  {
    author: "Emma Wilson",
    role: "Customer Success",
    content:
      "Great idea! Would love to see this integrated with Slack notifications as well. Our customers ask about this frequently.",
    timestamp: "1 day ago",
    votes: 3,
  },
  {
    author: "Alex Rodriguez",
    role: "Logistics Coordinator",
    content:
      "We've been waiting for this feature. Our customers ask about it frequently. Would save us so much time!",
    timestamp: "12 hours ago",
    votes: 7,
  },
];

export default function CommunityEnhancements() {
  const [selectedEnhancement, setSelectedEnhancement] = useState<
    (typeof enhancements)[0] | null
  >(null);
  const [sortBy, setSortBy] = useState("most-voted");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newComment, setNewComment] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "released":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-purple-100 text-purple-800";
      case "under review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const sortedAndFilteredEnhancements = enhancements
    .filter((enhancement) => {
      const matchesSearch =
        enhancement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enhancement.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        enhancement.status.toLowerCase().replace(" ", "-") === statusFilter;
      const matchesCategory =
        categoryFilter === "all" ||
        enhancement.category.toLowerCase().replace(/[^a-z0-9]/g, "-") ===
          categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "most-voted":
          return b.votes - a.votes;
        case "recent":
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case "trending":
          return (
            (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.votes - a.votes
          );
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2  px-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Community Suggestions</h1>
          <p className="text-sm text-muted-foreground">
            Vote and discuss enhancement ideas from the community
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/enhancement/submit">
            <Plus className="h-4 w-4" />
            Submit Enhancement
          </Link>
        </Button>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-4">
          {/* Filters and Search */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <CardContent>
              <div className="flex flex-col gap-4">
                {/* Search Input with Icon */}
                <div className="relative w-full">
                  <Input
                    placeholder="Search enhancements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>

                {/* Filters + View Mode Tabs */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Dropdown Filters */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    {/* Sort By */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="most-voted">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            Most Voted
                          </div>
                        </SelectItem>
                        <SelectItem value="recent">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Most Recent
                          </div>
                        </SelectItem>
                        <SelectItem value="trending">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Trending
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="under-review">
                          Under Review
                        </SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="released">Released</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Category Filter */}
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="ui-ux-improvements">
                          UI/UX Improvements
                        </SelectItem>
                        <SelectItem value="reporting-analytics">
                          Reporting & Analytics
                        </SelectItem>
                        <SelectItem value="operations-management">
                          Operations Management
                        </SelectItem>
                        <SelectItem value="api-integrations">
                          API & Integrations
                        </SelectItem>
                        <SelectItem value="mobile-experience">
                          Mobile Experience
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* View Mode Tabs */}
                  <Tabs
                    value={viewMode}
                    onValueChange={(val) =>
                      setViewMode(val as "cards" | "list")
                    }
                  >
                    <TabsList>
                      <TabsTrigger value="cards">Cards</TabsTrigger>
                      <TabsTrigger value="list">List</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </div>

          {/* Enhancement Ideas */}
          <div
            className={
              viewMode === "cards" ? "grid gap-4 md:grid-cols-2" : "space-y-4"
            }
          >
            {sortedAndFilteredEnhancements.map((enhancement) => (
              <div
                key={enhancement.id}
                className={`transition-all duration-200 bg-white shadow-md rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                  viewMode === "list" ? "p-0" : ""
                }`}
              >
                <CardContent className={viewMode === "cards" ? "p-6" : "p-4"}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {enhancement.trending && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        <Badge variant="outline">{enhancement.category}</Badge>
                        <Badge className={getStatusColor(enhancement.status)}>
                          {enhancement.status}
                        </Badge>
                        <Badge
                          className={getPriorityColor(enhancement.priority)}
                        >
                          {enhancement.priority}
                        </Badge>
                      </div>

                      <h3
                        className={`font-semibold mb-2 ${
                          viewMode === "cards" ? "text-lg" : "text-base"
                        }`}
                      >
                        {enhancement.title}
                      </h3>

                      <p
                        className={`text-muted-foreground mb-3 ${
                          viewMode === "cards" ? "text-sm" : "text-sm"
                        }`}
                      >
                        {enhancement.summary}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {enhancement.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">
                              {enhancement.author}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              • {enhancement.authorRole}
                            </span>
                          </div>
                        </div>
                        <span>•</span>
                        <span>{enhancement.created}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 hover:bg-blue-50"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {enhancement.votes}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 hover:bg-blue-50"
                            onClick={() => setSelectedEnhancement(enhancement)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            {enhancement.comments}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <DialogTitle className="text-xl mb-2">
                                  {selectedEnhancement?.title}
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                  {selectedEnhancement?.description}
                                </DialogDescription>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-2"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  {selectedEnhancement?.votes}
                                </Button>
                              </div>
                            </div>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline">
                                {selectedEnhancement?.category}
                              </Badge>
                              <Badge
                                className={getStatusColor(
                                  selectedEnhancement?.status || ""
                                )}
                              >
                                {selectedEnhancement?.status}
                              </Badge>
                              <Badge
                                className={getPriorityColor(
                                  selectedEnhancement?.priority || ""
                                )}
                              >
                                {selectedEnhancement?.priority}
                              </Badge>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {selectedEnhancement?.author
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>
                                  {selectedEnhancement?.author} •{" "}
                                  {selectedEnhancement?.authorRole}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-4 max-h-60 overflow-y-auto">
                              <h4 className="font-medium flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Comments ({comments.length})
                              </h4>
                              {comments.map((comment, index) => (
                                <div
                                  key={index}
                                  className="flex gap-3 p-4 bg-muted rounded-lg"
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {comment.author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-sm">
                                        {comment.author}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        • {comment.role}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        • {comment.timestamp}
                                      </span>
                                    </div>
                                    <p className="text-sm mb-2">
                                      {comment.content}
                                    </p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="gap-1 h-6 px-2"
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                      {comment.votes}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="space-y-3 border-t pt-4">
                              <Label htmlFor="comment">Add Comment</Label>
                              <Textarea
                                id="comment"
                                placeholder="Share your thoughts on this enhancement..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-20"
                              />
                              <Button className="w-full">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Post Comment
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>

          {sortedAndFilteredEnhancements.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No enhancements found matching your criteria.
                </p>
                <Button asChild>
                  <Link href="/enhancement/submit">
                    Submit the first enhancement
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
