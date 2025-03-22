// Types for our application
export type Exercise = {
  id: string
  name: string
  category: "Strength" | "Cardio" | "Flexibility"
  muscleGroup: string
  description?: string
  measurementType: "reps" | "time" | "distance"
}

export type Set = {
  weight?: string
  reps?: string
  time?: string
  distance?: string
}

export type ExerciseInWorkout = {
  exerciseId: string
  name: string
  sets: Set[]
}

export type ExerciseInRoutine = {
  exerciseId: string
  sets: number
  reps: number
}

export type Routine = {
  id: string
  name: string
  description?: string
  exercises: ExerciseInRoutine[]
}

export type Workout = {
  id: string
  name: string
  date: string
  exercises: ExerciseInWorkout[]
  notes?: string
  duration: number
}

// Default data for the application
export const defaultExercises: Exercise[] = [
  { id: "1", name: "Bench Press", category: "Strength", muscleGroup: "Chest", measurementType: "reps" },
  { id: "2", name: "Squat", category: "Strength", muscleGroup: "Legs", measurementType: "reps" },
  { id: "3", name: "Deadlift", category: "Strength", muscleGroup: "Back", measurementType: "reps" },
  { id: "4", name: "Pull-up", category: "Strength", muscleGroup: "Back", measurementType: "reps" },
  { id: "5", name: "Push-up", category: "Strength", muscleGroup: "Chest", measurementType: "reps" },
  { id: "6", name: "Running", category: "Cardio", muscleGroup: "Full Body", measurementType: "time" },
  { id: "7", name: "Cycling", category: "Cardio", muscleGroup: "Legs", measurementType: "distance" },
  { id: "8", name: "Jumping Rope", category: "Cardio", muscleGroup: "Full Body", measurementType: "time" },
  { id: "9", name: "Yoga", category: "Flexibility", muscleGroup: "Full Body", measurementType: "time" },
  { id: "10", name: "Stretching", category: "Flexibility", muscleGroup: "Full Body", measurementType: "time" },
]

export const defaultRoutines: Routine[] = [
  {
    id: "1",
    name: "Upper Body Strength",
    description: "Focus on chest, shoulders, and arms",
    exercises: [
      { exerciseId: "1", sets: 3, reps: 10 },
      { exerciseId: "4", sets: 3, reps: 8 },
      { exerciseId: "5", sets: 3, reps: 15 },
    ],
  },
  {
    id: "2",
    name: "Lower Body Power",
    description: "Leg day with focus on strength and power",
    exercises: [
      { exerciseId: "2", sets: 4, reps: 8 },
      { exerciseId: "3", sets: 3, reps: 6 },
      { exerciseId: "7", sets: 1, reps: 10 },
    ],
  },
  {
    id: "3",
    name: "Full Body HIIT",
    description: "High intensity interval training for full body",
    exercises: [
      { exerciseId: "5", sets: 3, reps: 20 },
      { exerciseId: "8", sets: 3, reps: 60 },
      { exerciseId: "2", sets: 3, reps: 12 },
      { exerciseId: "4", sets: 3, reps: 10 },
    ],
  },
]

export const defaultWorkouts: Workout[] = [
  {
    id: "1",
    name: "Upper Body Strength",
    date: "2025-03-21",
    exercises: [
      {
        exerciseId: "1",
        name: "Bench Press",
        sets: [
          { weight: "80", reps: "8" },
          { weight: "85", reps: "6" },
          { weight: "85", reps: "6" },
        ],
      },
      {
        exerciseId: "4",
        name: "Pull-up",
        sets: [
          { weight: "0", reps: "10" },
          { weight: "0", reps: "8" },
          { weight: "0", reps: "7" },
        ],
      },
    ],
    notes: "Felt strong today. Increased bench press weight by 5kg.",
    duration: 2700, // 45 minutes in seconds
  },
  {
    id: "2",
    name: "Leg Day",
    date: "2025-03-19",
    exercises: [
      {
        exerciseId: "2",
        name: "Squat",
        sets: [
          { weight: "100", reps: "8" },
          { weight: "110", reps: "6" },
          { weight: "110", reps: "6" },
        ],
      },
      {
        exerciseId: "3",
        name: "Deadlift",
        sets: [
          { weight: "120", reps: "6" },
          { weight: "130", reps: "4" },
          { weight: "130", reps: "4" },
        ],
      },
    ],
    duration: 3120, // 52 minutes in seconds
  },
  {
    id: "3",
    name: "Full Body Workout",
    date: "2025-03-17",
    exercises: [
      {
        exerciseId: "5",
        name: "Push-up",
        sets: [{ reps: "20" }, { reps: "15" }, { reps: "15" }],
      },
      {
        exerciseId: "2",
        name: "Squat",
        sets: [
          { weight: "90", reps: "10" },
          { weight: "90", reps: "10" },
          { weight: "90", reps: "8" },
        ],
      },
      {
        exerciseId: "8",
        name: "Jumping Rope",
        sets: [{ time: "3:00" }, { time: "3:00" }, { time: "3:00" }],
      },
    ],
    notes: "Great full body session. Felt energized afterward.",
    duration: 3900, // 65 minutes in seconds
  },
]

