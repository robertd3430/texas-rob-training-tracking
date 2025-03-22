"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function NewExercisePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    muscleGroup: "",
    description: "",
    measurementType: "reps",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save this to a database
    console.log("Exercise created:", formData)
    router.push("/exercises")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/exercises">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Add New Exercise</h1>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Details</CardTitle>
              <CardDescription>Create a new exercise to add to your library</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Exercise Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strength">Strength</SelectItem>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="Flexibility">Flexibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="muscleGroup">Primary Muscle Group</Label>
                  <Select
                    value={formData.muscleGroup}
                    onValueChange={(value) => handleSelectChange("muscleGroup", value)}
                    required
                  >
                    <SelectTrigger id="muscleGroup">
                      <SelectValue placeholder="Select muscle group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chest">Chest</SelectItem>
                      <SelectItem value="Back">Back</SelectItem>
                      <SelectItem value="Legs">Legs</SelectItem>
                      <SelectItem value="Shoulders">Shoulders</SelectItem>
                      <SelectItem value="Arms">Arms</SelectItem>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="Full Body">Full Body</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Measurement Type</Label>
                  <RadioGroup
                    value={formData.measurementType}
                    onValueChange={(value) => handleSelectChange("measurementType", value)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reps" id="reps" />
                      <Label htmlFor="reps">Repetitions (Reps)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="time" id="time" />
                      <Label htmlFor="time">Time (Duration)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="distance" id="distance" />
                      <Label htmlFor="distance">Distance</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/exercises">Cancel</Link>
                  </Button>
                  <Button type="submit">Create Exercise</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

