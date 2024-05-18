import {
  DISTANCE_METRICS,
  EXERCISE_MEASURMENT_TYPES,
  EXERCISE_TYPES,
  WEIGHT_METRICS,
} from "../enums";

export interface ExerciseSet {
  id: string;
  reps?: number | undefined;
  weight?: number | undefined;
  duration?: number;
  distance?: number | undefined;
};

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
  type: EXERCISE_TYPES | null;
  measurementTypes: EXERCISE_MEASURMENT_TYPES[] | null;
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
  workoutDate: Date | string;
  exercises: Exercise[];
  weightUnit: WEIGHT_METRICS | null;
  distanceUnit: DISTANCE_METRICS | null;
  edited?: string[];
}
