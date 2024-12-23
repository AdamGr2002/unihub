"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: Date
  description: string
}

export function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Club Meeting",
      date: new Date(2024, 0, 15),
      description: "Monthly club meeting to discuss upcoming events",
    },
    {
      id: "2",
      title: "Workshop",
      date: new Date(2024, 0, 20),
      description: "Technical workshop for members",
    },
  ])

  const dateHasEvent = (date: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    )
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Event Calendar</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event for the selected date: {selectedDate?.toDateString()}
              </DialogDescription>
            </DialogHeader>
            {/* Add your event form here */}
          </DialogContent>
        </Dialog>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        modifiers={{
          hasEvent: (date) => dateHasEvent(date),
        }}
        modifiersStyles={{
          hasEvent: { backgroundColor: "rgba(147, 51, 234, 0.1)" },
        }}
      />
      <div className="mt-4">
        <h3 className="font-medium mb-2">Events for {selectedDate?.toDateString()}</h3>
        <div className="space-y-2">
          {events
            .filter(
              (event) =>
                event.date.getDate() === selectedDate?.getDate() &&
                event.date.getMonth() === selectedDate?.getMonth() &&
                event.date.getFullYear() === selectedDate?.getFullYear()
            )
            .map((event) => (
              <div
                key={event.id}
                className="p-3 border rounded-lg"
              >
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

