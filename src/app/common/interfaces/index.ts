import { EXERCISE_TYPES, WEIGHT_METRICS } from "../enums";

export interface ExerciseSet {
  id: string;
  reps?: number | undefined;
  weight?: number | undefined;
  duration?: number;
}

export interface Exercise {
  id: string;
  hidden: boolean;
  // metrics: WEIGHT_METRICS;
  type: EXERCISE_TYPES;
  title: string;
  notes: string;
  muscleGroup: string;
  sets?: ExerciseSet[];
  duration?: number;
}

export interface Workout {
  id: string;
  created: Date;
  metrics: WEIGHT_METRICS;
  exercises: Exercise[];
  allMuscleGroups: string[];
}

export interface WorkoutData {
  id?: string;
  metrics: WEIGHT_METRICS.LBS;
  workoutDate: Date | string;
  exercises: Exercise[];
}
