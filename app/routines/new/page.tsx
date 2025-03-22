"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Dumbbell, Grip, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function NewRoutinePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    exercises: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addExercise = () => {
    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { id: Date.now(), exerciseId: "", sets: 3, reps: 10 }],
    }))
  }

  const removeExercise = (index) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }))
  }

  const updateExercise = (index, field, value) => {
    setFormData((prev) => {
      const updatedExercises = [...prev.exercises]
      updatedExercises[index] = { ...updatedExercises[index], [field]: value }
      return { ...prev, exercises: updatedExercises }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save this to a database
    console.log("Routine created:", formData)
    router.push("/routines")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/routines">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Create New Routine</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Routine Details</CardTitle>
                <CardDescription>Create a new workout routine that you can reuse</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Routine Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Upper Body Strength"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your routine"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exercises</CardTitle>
                <CardDescription>Add exercises to your routine with sets and reps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.exercises.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Dumbbell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-4 text-sm font-medium">No exercises added</h3>
                    <p className="mt-2 text-xs text-muted-foreground">Add exercises to create your routine</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.exercises.map((exercise, index) => (
                      <div key={exercise.id} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Grip className="h-4 w-4" />
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                          <Select
                            value={exercise.exerciseId}
                            onValueChange={(value) => updateExercise(index, "exerciseId", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select exercise" />
                            </SelectTrigger>
                            <SelectContent>
                              {defaultExercises.map((ex) => (
                                <SelectItem key={ex.id} value={ex.id}>
                                  {ex.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor={`sets-${index}`} className="text-sm">
                            Sets
                          </Label>
                          <Input
                            id={`sets-${index}`}
                            type="number"
                            min="1"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(index, "sets", Number.parseInt(e.target.value))}
                            className="w-16"
                            required
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor={`reps-${index}`} className="text-sm">
                            Reps
                          </Label>
                          <Input
                            id={`reps-${index}`}
                            type="number"
                            min="1"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(index, "reps", Number.parseInt(e.target.value))}
                            className="w-16"
                            required
                          />
                        </div>

                        <Button type="button" variant="ghost" size="icon" onClick={() => removeExercise(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Button type="button" variant="outline" onClick={addExercise}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exercise
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" asChild>
                <Link href="/routines">Cancel</Link>
              </Button>
              <Button type="submit">Create Routine</Button>
            </div>
          </form>
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

