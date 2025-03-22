import Link from "next/link"
import { CalendarDays, Dumbbell, History, ListChecks } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            <h1 className="text-xl font-bold">Texas Rob Training Tracker</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome to Texas Rob Training Tracker</h2>
            <p className="text-muted-foreground">
              Track your workouts, create exercise routines, and monitor your progress over time.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Start Workout</CardTitle>
                <CardDescription>Begin a new workout session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button asChild className="w-full justify-start">
                    <Link href="/workouts/new">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      New Workout
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/routines">
                      <ListChecks className="mr-2 h-4 w-4" />
                      Use Routine
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Manage</CardTitle>
                <CardDescription>Manage your exercises and routines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/exercises">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Exercises
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/routines">
                      <ListChecks className="mr-2 h-4 w-4" />
                      Routines
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">History</CardTitle>
                <CardDescription>View your workout history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/history">
                      <History className="mr-2 h-4 w-4" />
                      Workout History
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/calendar">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Calendar View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">Recent Workouts</h2>
            <div className="rounded-lg border">
              <div className="p-6 text-center text-muted-foreground">Your recent workouts will appear here</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

