"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Generate calendar days for the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Create calendar grid
  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null) // Empty cells for days before the 1st of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Navigate to previous/next month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Sample workout data
  const workoutData = {
    "2025-03-21": { id: "1", name: "Upper Body Strength" },
    "2025-03-19": { id: "2", name: "Leg Day" },
    "2025-03-17": { id: "3", name: "Full Body Workout" },
    "2025-03-15": { id: "4", name: "Cardio Session" },
    "2025-03-12": { id: "5", name: "Core Workout" },
  }

  // Check if a day has a workout
  const getWorkoutForDay = (day) => {
    if (!day) return null
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return workoutData[dateStr] || null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Dumbbell className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">Calendar</h1>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/history">List View</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Workout Calendar</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Select
                    value={currentMonth.toString()}
                    onValueChange={(value) => setCurrentMonth(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue>{monthNames[currentMonth]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {monthNames.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={currentYear.toString()}
                    onValueChange={(value) => setCurrentYear(Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue>{currentYear}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>View and manage your workout schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-sm font-medium">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-md p-1 ${
                      day ? "border" : ""
                    } ${getWorkoutForDay(day) ? "border-primary" : ""}`}
                  >
                    {day && (
                      <div className="h-full w-full">
                        <div className="flex h-full flex-col">
                          <div className="text-sm">{day}</div>
                          {getWorkoutForDay(day) && (
                            <Link
                              href={`/history/${getWorkoutForDay(day).id}`}
                              className="mt-1 flex-1 rounded-sm bg-primary/10 p-1 text-xs text-primary hover:bg-primary/20"
                            >
                              {getWorkoutForDay(day).name}
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming Workouts</h2>
            <div className="rounded-lg border p-6 text-center text-muted-foreground">
              No upcoming workouts scheduled
            </div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/workouts/new">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Start New Workout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

