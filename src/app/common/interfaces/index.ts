import { DISTANCE_METRICS, EXERCISE_TYPES, WEIGHT_METRICS } from "../enums";

export interface ExerciseSet {
  id: string;
  reps?: number | undefined;
  weight?: number | undefined;
  duration?: number;
  distance?: number | undefined;
}

export interface WeightsRepsSet {
  id: string;
  reps: number | undefined;
  weight: number | undefined;
}

export interface DurationDistanceSet {
  id: string;
  duration: number | undefined;
  distance: number | undefined;
}

export interface Exercise {
  id: string;
  hidden: boolean;
  // metrics: WEIGHT_METRICS;
  type: EXERCISE_TYPES | null;
  measurmentType: string | null;
  title: string;
  notes: string;
  muscleGroups: string[];
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
  // metrics: WEIGHT_METRICS.LBS;
  workoutDate: Date | string;
  exercises: Exercise[];
  weightUnit: WEIGHT_METRICS | null;
  distanceUnit: DISTANCE_METRICS | null;
  edited?: string[];
}
