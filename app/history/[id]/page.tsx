import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock, Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function WorkoutDetailsPage({ params }) {
  // In a real app, you would fetch the workout details from a database
  const workout = {
    id: params.id,
    name: "Upper Body Strength",
    date: "March 21, 2025",
    duration: "45 min",
    notes: "Felt strong today. Increased bench press weight by 5kg.",
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { weight: "80", reps: "8" },
          { weight: "85", reps: "6" },
          { weight: "85", reps: "6" },
        ],
      },
      {
        name: "Pull-up",
        sets: [
          { weight: "0", reps: "10" },
          { weight: "0", reps: "8" },
          { weight: "0", reps: "7" },
        ],
      },
      {
        name: "Shoulder Press",
        sets: [
          { weight: "40", reps: "10" },
          { weight: "45", reps: "8" },
          { weight: "45", reps: "7" },
        ],
      },
      {
        name: "Bicep Curl",
        sets: [
          { weight: "15", reps: "12" },
          { weight: "15", reps: "10" },
          { weight: "15", reps: "10" },
        ],
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/history">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Workout Details</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{workout.name}</CardTitle>
              <CardDescription className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>{workout.date}</span>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{workout.duration}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {workout.notes && (
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-medium">Notes:</p>
                  <p>{workout.notes}</p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold">Exercises</h3>
                {workout.exercises.map((exercise, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{exercise.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2 text-sm font-medium text-muted-foreground">
                          <div>Set</div>
                          <div>Weight (kg)</div>
                          <div>Reps</div>
                        </div>
                        <Separator />
                        {exercise.sets.map((set, setIndex) => (
                          <div key={setIndex} className="grid grid-cols-3 gap-2 text-sm">
                            <div>{setIndex + 1}</div>
                            <div>{set.weight || "-"}</div>
                            <div>{set.reps || "-"}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/history">Back to History</Link>
            </Button>
            <Button asChild>
              <Link href={`/workouts/new?duplicate=${workout.id}`}>
                <Dumbbell className="mr-2 h-4 w-4" />
                Repeat Workout
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

