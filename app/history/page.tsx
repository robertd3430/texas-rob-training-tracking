import Link from "next/link"
import { CalendarDays, ChevronRight, Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Dumbbell className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">Workout History</h1>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/calendar">
              <CalendarDays className="mr-2 h-4 w-4" />
              Calendar View
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {workoutHistory.length > 0 ? (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Recent Workouts</h2>
                <div className="space-y-4">
                  {workoutHistory.map((workout) => (
                    <Link key={workout.id} href={`/history/${workout.id}`}>
                      <Card className="transition-colors hover:bg-muted/50">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">{workout.name}</CardTitle>
                              <CardDescription>{workout.date}</CardDescription>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm">
                            <div>{workout.exerciseCount} exercises</div>
                            <div className="text-muted-foreground">{workout.duration}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </>
          ) : (
            <div className="mt-10 rounded-lg border p-8 text-center">
              <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No workout history yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Start tracking your workouts to see your history</p>
              <Button asChild className="mt-4">
                <Link href="/workouts/new">Start New Workout</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const workoutHistory = [
  {
    id: "1",
    name: "Upper Body Strength",
    date: "March 21, 2025",
    exerciseCount: 5,
    duration: "45 min",
  },
  {
    id: "2",
    name: "Leg Day",
    date: "March 19, 2025",
    exerciseCount: 6,
    duration: "52 min",
  },
  {
    id: "3",
    name: "Full Body Workout",
    date: "March 17, 2025",
    exerciseCount: 8,
    duration: "65 min",
  },
]

