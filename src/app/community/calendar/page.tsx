"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Video,
  Rocket,
  Gift,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const events = [
  {
    id: 1,
    title: "API Integration Webinar",
    description:
      "Learn advanced API integration techniques and best practices for FreightFlow",
    date: "2024-12-15",
    time: "2:00 PM - 4:00 PM EST",
    type: "Webinar",
    location: "Virtual",
    attendees: 145,
    maxAttendees: 500,
    color: "bg-blue-500",
    icon: Video,
    joinLink: "https://zoom.us/j/123456789",
    presenter: "Sarah Chen, Lead Developer",
  },
  {
    id: 2,
    title: "FreightFlow Roadshow - New York",
    description: "Meet the team and see live demos of our latest features",
    date: "2024-12-18",
    time: "10:00 AM - 6:00 PM EST",
    type: "Roadshow",
    location: "New York Convention Center, Hall A",
    attendees: 89,
    maxAttendees: 200,
    color: "bg-purple-500",
    icon: MapPin,
    rsvpRequired: true,
    address: "655 W 34th St, New York, NY 10001",
  },
  {
    id: 3,
    title: "Q4 Product Release - v2.4.0",
    description:
      "Major release featuring enhanced analytics and mobile improvements",
    date: "2024-12-20",
    time: "10:00 AM EST",
    type: "Product Release",
    location: "Platform-wide",
    attendees: 0,
    maxAttendees: 0,
    color: "bg-green-500",
    icon: Rocket,
    version: "v2.4.0",
    releaseNotes: "/releases/v2.4.0",
  },
  {
    id: 4,
    title: "Holiday Customer Appreciation Event",
    description: "Virtual celebration with prizes, demos, and networking",
    date: "2024-12-22",
    time: "3:00 PM - 5:00 PM EST",
    type: "Community Event",
    location: "Virtual",
    attendees: 67,
    maxAttendees: 300,
    color: "bg-red-500",
    icon: Gift,
    joinLink: "https://zoom.us/j/987654321",
  },
];

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const currentMonth = "December 2024";

export default function CommunityCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(
    null
  );
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">(
    "month"
  );

  const getEventForDay = (day: number) => {
    return events.filter((event) => {
      const eventDay = new Date(event.date).getDate();
      return eventDay === day;
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "webinar":
        return "bg-blue-100 text-blue-800";
      case "roadshow":
        return "bg-purple-100 text-purple-800";
      case "product release":
        return "bg-green-100 text-green-800";
      case "community event":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleJoinWebinar = (event: (typeof events)[0]) => { };

  const handleRSVP = (event: (typeof events)[0]) => { };

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-between px-6 py-4 ">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Community Calendar</h1>
          <p className="text-sm text-muted-foreground">
            Stay updated with webinars, roadshows, and product releases
          </p>
        </div>
        <Tabs
          value={currentView}
          onValueChange={(value) =>
            setCurrentView(value as "month" | "week" | "day")
          }
        >
          <TabsList className="bg-white p-1 rounded-lg">
            <TabsTrigger
              value="month"
              className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-md"
            >
              Month
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-md"
            >
              Week
            </TabsTrigger>
            <TabsTrigger
              value="day"
              className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 rounded-md"
            >
              Day
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Calendar Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {currentMonth}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Calendar Grid */}
            <Card className="lg:col-span-3">
              <CardContent className="p-6">
                {currentView === "month" && (
                  <>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="p-2 text-center text-sm font-medium text-muted-foreground"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day) => {
                        const dayEvents = getEventForDay(day);
                        return (
                          <div
                            key={day}
                            className="min-h-24 p-2 border rounded-lg hover:bg-muted/50 transition-colors relative"
                          >
                            <span className="text-sm font-medium">{day}</span>
                            <div className="mt-1 space-y-1">
                              {dayEvents.map((event) => (
                                <Dialog key={event.id}>
                                  <DialogTrigger asChild>
                                    <div
                                      className="p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1"
                                      style={{
                                        backgroundColor: event.color
                                          .replace("bg-", "")
                                          .replace("-500", ""),
                                        color: "white",
                                      }}
                                      onClick={() => setSelectedEvent(event)}
                                    >
                                      <event.icon className="h-3 w-3" />
                                      <span className="truncate text-xs">
                                        {event.title}
                                      </span>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2">
                                        {selectedEvent && (
                                          <selectedEvent.icon className="h-5 w-5" />
                                        )}
                                        {selectedEvent && selectedEvent.title}
                                      </DialogTitle>
                                      <DialogDescription>
                                        {selectedEvent &&
                                          selectedEvent.description}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          className={getEventTypeColor(
                                            selectedEvent?.type || ""
                                          )}
                                        >
                                          {selectedEvent && selectedEvent.type}
                                        </Badge>
                                        {selectedEvent &&
                                          selectedEvent.version && (
                                            <Badge variant="outline">
                                              {selectedEvent.version}
                                            </Badge>
                                          )}
                                      </div>

                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                          <Calendar className="h-4 w-4 text-muted-foreground" />
                                          <span>
                                            {selectedEvent &&
                                              selectedEvent.date}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                          <Clock className="h-4 w-4 text-muted-foreground" />
                                          <span>
                                            {selectedEvent &&
                                              selectedEvent.time}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                          <MapPin className="h-4 w-4 text-muted-foreground" />
                                          <span>
                                            {selectedEvent &&
                                              selectedEvent.location}
                                          </span>
                                        </div>
                                        {selectedEvent &&
                                          selectedEvent.address && (
                                            <div className="flex items-center gap-2 text-sm">
                                              <MapPin className="h-4 w-4 text-muted-foreground" />
                                              <span className="text-muted-foreground">
                                                {selectedEvent.address}
                                              </span>
                                            </div>
                                          )}
                                        {selectedEvent &&
                                          selectedEvent.presenter && (
                                            <div className="flex items-center gap-2 text-sm">
                                              <Users className="h-4 w-4 text-muted-foreground" />
                                              <span>
                                                {selectedEvent.presenter}
                                              </span>
                                            </div>
                                          )}
                                        {selectedEvent &&
                                          selectedEvent.maxAttendees &&
                                          selectedEvent.maxAttendees > 0 && (
                                            <div className="flex items-center gap-2 text-sm">
                                              <Users className="h-4 w-4 text-muted-foreground" />
                                              <span>
                                                {selectedEvent.attendees} /{" "}
                                                {selectedEvent.maxAttendees}{" "}
                                                attendees
                                              </span>
                                            </div>
                                          )}
                                      </div>

                                      {/* Action Buttons */}
                                      <div className="flex gap-2">
                                        {selectedEvent &&
                                          selectedEvent.type === "Webinar" &&
                                          selectedEvent.joinLink && (
                                            <Button
                                              className="flex-1"
                                              onClick={() =>
                                                handleJoinWebinar(selectedEvent)
                                              }
                                            >
                                              <Video className="mr-2 h-4 w-4" />
                                              Join Webinar
                                            </Button>
                                          )}
                                        {selectedEvent &&
                                          selectedEvent.type === "Roadshow" &&
                                          selectedEvent.rsvpRequired && (
                                            <Button
                                              className="flex-1"
                                              onClick={() =>
                                                handleRSVP(selectedEvent)
                                              }
                                            >
                                              <MapPin className="mr-2 h-4 w-4" />
                                              RSVP Now
                                            </Button>
                                          )}
                                        {selectedEvent &&
                                          selectedEvent.type ===
                                          "Product Release" &&
                                          selectedEvent.releaseNotes && (
                                            <Button
                                              variant="outline"
                                              className="flex-1 bg-transparent"
                                            >
                                              <Rocket className="mr-2 h-4 w-4" />
                                              View Release Notes
                                            </Button>
                                          )}
                                        {selectedEvent &&
                                          selectedEvent.type ===
                                          "Community Event" &&
                                          selectedEvent.joinLink && (
                                            <Button
                                              className="flex-1"
                                              onClick={() =>
                                                handleJoinWebinar(selectedEvent)
                                              }
                                            >
                                              <Gift className="mr-2 h-4 w-4" />
                                              Join Event
                                            </Button>
                                          )}
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {currentView === "week" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Week View</h3>
                    <div className="grid grid-cols-7 gap-4">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day, index) => (
                          <div key={day} className="space-y-2">
                            <div className="text-center font-medium text-sm">
                              {day}
                            </div>
                            <div className="min-h-32 border rounded-lg p-2">
                              {/* Week view events would go here */}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {currentView === "day" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Today's Events</h3>
                    <div className="space-y-3">
                      {events.slice(0, 2).map((event) => (
                        <div key={event.id} className="p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <event.icon className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {event.time}
                              </p>
                            </div>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events Sidebar */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next events on your calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 4).map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${event.color
                            .replace("bg-", "bg-")
                            .replace("-500", "-100")}`}
                        >
                          <event.icon
                            className={`h-4 w-4 ${event.color
                              .replace("bg-", "text-")
                              .replace("-500", "-600")}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{event.time.split(" - ")[0]}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`${getEventTypeColor(event.type)} mt-2`}
                        variant="outline"
                      >
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
