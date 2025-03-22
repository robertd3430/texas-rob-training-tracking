"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Dumbbell, Plus, Save, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewWorkoutPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("new")
  const [workout, setWorkout] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    exercises: [],
    notes: "",
    duration: 0,
  })
  const [timer, setTimer] = useState({
    isRunning: false,
    startTime: null,
    elapsed: 0,
  })
  const [currentExercise, setCurrentExercise] = useState({
    exerciseId: "",
    sets: [],
  })

  // Start the workout timer
  const startTimer = () => {
    if (!timer.isRunning) {
      setTimer({
        isRunning: true,
        startTime: Date.now() - timer.elapsed,
        elapsed: timer.elapsed,
      })
    }
  }

  // Pause the workout timer
  const pauseTimer = () => {
    if (timer.isRunning) {
      setTimer({
        ...timer,
        isRunning: false,
        elapsed: Date.now() - timer.startTime,
      })
    }
  }

  // Format time for display
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Update timer every second
  useState(() => {
    let interval
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          elapsed: Date.now() - prev.startTime,
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer.isRunning])

  // Add a new set to the current exercise
  const addSet = () => {
    setCurrentExercise((prev) => ({
      ...prev,
      sets: [...prev.sets, { weight: "", reps: "" }],
    }))
  }

  // Update set data
  const updateSet = (index, field, value) => {
    setCurrentExercise((prev) => {
      const updatedSets = [...prev.sets]
      updatedSets[index] = { ...updatedSets[index], [field]: value }
      return { ...prev, sets: updatedSets }
    })
  }

  // Remove a set
  const removeSet = (index) => {
    setCurrentExercise((prev) => ({
      ...prev,
      sets: prev.sets.filter((_, i) => i !== index),
    }))
  }

  // Add the current exercise to the workout
  const addExerciseToWorkout = () => {
    if (currentExercise.exerciseId && currentExercise.sets.length > 0) {
      const exercise = defaultExercises.find((ex) => ex.id === currentExercise.exerciseId)
      setWorkout((prev) => ({
        ...prev,
        exercises: [
          ...prev.exercises,
          {
            ...currentExercise,
            name: exercise.name,
          },
        ],
      }))
      setCurrentExercise({
        exerciseId: "",
        sets: [],
      })
    }
  }

  // Remove an exercise from the workout
  const removeExerciseFromWorkout = (index) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }))
  }

  // Save the completed workout
  const saveWorkout = () => {
    const finalWorkout = {
      ...workout,
      duration: Math.floor(timer.elapsed / 1000),
    }
    // In a real app, you would save this to a database
    console.log("Workout saved:", finalWorkout)
    router.push("/history")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold">New Workout</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-muted px-3 py-1">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timer.elapsed)}</span>
            </div>
            {timer.isRunning ? (
              <Button size="sm" variant="outline" onClick={pauseTimer}>
                Pause
              </Button>
            ) : (
              <Button size="sm" onClick={startTimer}>
                {timer.elapsed > 0 ? "Resume" : "Start"}
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workout Details</CardTitle>
              <CardDescription>Track your workout progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Workout Name</Label>
                  <Input
                    id="name"
                    value={workout.name}
                    onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
                    placeholder="e.g., Morning Strength Training"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={workout.date}
                    onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">Add Exercise</TabsTrigger>
              <TabsTrigger value="log">Workout Log</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Exercise</CardTitle>
                  <CardDescription>Select an exercise and log your sets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="exercise">Exercise</Label>
                    <Select
                      value={currentExercise.exerciseId}
                      onValueChange={(value) => setCurrentExercise({ ...currentExercise, exerciseId: value })}
                    >
                      <SelectTrigger id="exercise">
                        <SelectValue placeholder="Select an exercise" />
                      </SelectTrigger>
                      <SelectContent>
                        {defaultExercises.map((exercise) => (
                          <SelectItem key={exercise.id} value={exercise.id}>
                            {exercise.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {currentExercise.exerciseId && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Sets</Label>
                          <Button type="button" variant="outline" size="sm" onClick={addSet}>
                            <Plus className="mr-1 h-3 w-3" />
                            Add Set
                          </Button>
                        </div>

                        {currentExercise.sets.length === 0 ? (
                          <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                            Add sets to track your progress
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {currentExercise.sets.map((set, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-sm font-medium">
                                  {index + 1}
                                </div>
                                <Input
                                  type="number"
                                  placeholder="Weight"
                                  value={set.weight}
                                  onChange={(e) => updateSet(index, "weight", e.target.value)}
                                  className="w-24"
                                />
                                <Input
                                  type="number"
                                  placeholder="Reps"
                                  value={set.reps}
                                  onChange={(e) => updateSet(index, "reps", e.target.value)}
                                  className="w-24"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeSet(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button
                        type="button"
                        onClick={addExerciseToWorkout}
                        disabled={currentExercise.sets.length === 0}
                        className="w-full"
                      >
                        Add to Workout
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="log" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Log</CardTitle>
                  <CardDescription>Review and complete your workout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workout.exercises.length === 0 ? (
                    <div className="rounded-md border border-dashed p-8 text-center">
                      <Dumbbell className="mx-auto h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-4 text-sm font-medium">No exercises added yet</h3>
                      <p className="mt-2 text-xs text-muted-foreground">Add exercises to your workout</p>
                      <Button type="button" variant="outline" className="mt-4" onClick={() => setActiveTab("new")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Exercise
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{exercise.name}</h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExerciseFromWorkout(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Separator className="my-2" />
                          <div className="space-y-2">
                            {exercise.sets.map((set, setIndex) => (
                              <div key={setIndex} className="flex items-center gap-2 text-sm">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-medium">
                                  {setIndex + 1}
                                </div>
                                <span>
                                  {set.weight ? `${set.weight} kg` : "-"} × {set.reps || "-"} reps
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Input
                          id="notes"
                          value={workout.notes}
                          onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
                          placeholder="How was your workout?"
                        />
                      </div>

                      <Button type="button" onClick={saveWorkout} className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Complete Workout
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

const defaultExercises = [
  { id: "1", name: "Bench Press", category: "Strength", muscleGroup: "Chest" },
  { id: "2", name: "Squat", category: "Strength", muscleGroup: "Legs" },
  { id: "3", name: "Deadlift", category: "Strength", muscleGroup: "Back" },
  { id: "4", name: "Pull-up", category: "Strength", muscleGroup: "Back" },
  { id: "5", name: "Push-up", category: "Strength", muscleGroup: "Chest" },
  { id: "6", name: "Running", category: "Cardio", muscleGroup: "Full Body" },
  { id: "7", name: "Cycling", category: "Cardio", muscleGroup: "Legs" },
  { id: "8", name: "Jumping Rope", category: "Cardio", muscleGroup: "Full Body" },
  { id: "9", name: "Yoga", category: "Flexibility", muscleGroup: "Full Body" },
  { id: "10", name: "Stretching", category: "Flexibility", muscleGroup: "Full Body" },
]

