import Link from "next/link"
import { ChevronRight, Dumbbell, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExercisesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Dumbbell className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">Exercises</h1>
          </div>
          <Button asChild size="sm">
            <Link href="/exercises/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search exercises..." className="pl-8" />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4 space-y-4">
              {defaultExercises.map((exercise) => (
                <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                      <div>
                        <CardTitle className="text-base">{exercise.name}</CardTitle>
                        <CardDescription>{exercise.category}</CardDescription>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </TabsContent>
            <TabsContent value="strength" className="mt-4 space-y-4">
              {defaultExercises
                .filter((exercise) => exercise.category === "Strength")
                .map((exercise) => (
                  <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
                    <Card className="transition-colors hover:bg-muted/50">
                      <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div>
                          <CardTitle className="text-base">{exercise.name}</CardTitle>
                          <CardDescription>{exercise.category}</CardDescription>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </TabsContent>
            <TabsContent value="cardio" className="mt-4 space-y-4">
              {defaultExercises
                .filter((exercise) => exercise.category === "Cardio")
                .map((exercise) => (
                  <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
                    <Card className="transition-colors hover:bg-muted/50">
                      <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div>
                          <CardTitle className="text-base">{exercise.name}</CardTitle>
                          <CardDescription>{exercise.category}</CardDescription>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </TabsContent>
            <TabsContent value="flexibility" className="mt-4 space-y-4">
              {defaultExercises
                .filter((exercise) => exercise.category === "Flexibility")
                .map((exercise) => (
                  <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
                    <Card className="transition-colors hover:bg-muted/50">
                      <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div>
                          <CardTitle className="text-base">{exercise.name}</CardTitle>
                          <CardDescription>{exercise.category}</CardDescription>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
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

