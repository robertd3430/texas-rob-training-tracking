import Link from "next/link"
import { ChevronRight, Dumbbell, ListChecks, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RoutinesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Dumbbell className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">Routines</h1>
          </div>
          <Button asChild size="sm">
            <Link href="/routines/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Routine
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {defaultRoutines.map((routine) => (
              <Link key={routine.id} href={`/routines/${routine.id}`}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <ListChecks className="h-5 w-5" />
                          {routine.name}
                        </CardTitle>
                        <CardDescription>{routine.description}</CardDescription>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {routine.exerciseCount} exercises · {routine.duration}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}

            <Link href="/routines/new">
              <Card className="flex h-full flex-col items-center justify-center p-6 text-center transition-colors hover:bg-muted/50">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">Create New Routine</CardTitle>
                <CardDescription>Design a custom workout routine</CardDescription>
              </Card>
            </Link>
          </div>

          {defaultRoutines.length === 0 && (
            <div className="mt-10 rounded-lg border p-8 text-center">
              <ListChecks className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No routines yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create your first workout routine to get started</p>
              <Button asChild className="mt-4">
                <Link href="/routines/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Routine
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const defaultRoutines = [
  {
    id: "1",
    name: "Upper Body Strength",
    description: "Focus on chest, shoulders, and arms",
    exerciseCount: 5,
    duration: "45-60 min",
  },
  {
    id: "2",
    name: "Lower Body Power",
    description: "Leg day with focus on strength and power",
    exerciseCount: 6,
    duration: "50-65 min",
  },
  {
    id: "3",
    name: "Full Body HIIT",
    description: "High intensity interval training for full body",
    exerciseCount: 8,
    duration: "30-40 min",
  },
]

