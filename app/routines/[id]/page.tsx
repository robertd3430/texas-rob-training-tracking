"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Dumbbell, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { defaultExercises, defaultRoutines } from "@/lib/data"

export default function RoutineDetailsPage({ params }) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Find the routine by ID
  const routine = defaultRoutines.find((r) => r.id === params.id) || {
    id: params.id,
    name: "Upper Body Strength",
    description: "Focus on chest, shoulders, and arms",
    exercises: [
      { exerciseId: "1", sets: 3, reps: 10 },
      { exerciseId: "4", sets: 3, reps: 8 },
      { exerciseId: "5", sets: 3, reps: 15 },
    ],
  }

  // Get exercise details for each exercise in the routine
  const exercisesWithDetails = routine.exercises.map((exercise) => {
    const exerciseDetails = defaultExercises.find((e) => e.id === exercise.exerciseId)
    return {
      ...exercise,
      name: exerciseDetails?.name || "Unknown Exercise",
      category: exerciseDetails?.category || "Unknown",
      muscleGroup: exerciseDetails?.muscleGroup || "Unknown",
    }
  })

  // Handle starting a workout from this routine
  const startWorkout = () => {
    // In a real app, you would create a new workout based on this routine
    router.push(`/workouts/new?routine=${routine.id}`)
  }

  // Handle deleting the routine
  const deleteRoutine = () => {
    // In a real app, you would delete the routine from the database
    console.log("Deleting routine:", routine.id)
    router.push("/routines")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/routines">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Routine Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/routines/edit/${routine.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Routine</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this routine? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={deleteRoutine}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{routine.name}</CardTitle>
              {routine.description && <CardDescription>{routine.description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>{routine.exercises.length} exercises</div>
                <div className="text-muted-foreground">
                  Estimated time: {routine.exercises.length * 5 + 10}-{routine.exercises.length * 5 + 25} min
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Exercises</h3>
                {exercisesWithDetails.map((exercise, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{exercise.name}</CardTitle>
                      <CardDescription>
                        {exercise.category} • {exercise.muscleGroup}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        {exercise.sets} sets × {exercise.reps} reps
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/routines">Back to Routines</Link>
            </Button>
            <Button onClick={startWorkout}>
              <Dumbbell className="mr-2 h-4 w-4" />
              Start Workout
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

