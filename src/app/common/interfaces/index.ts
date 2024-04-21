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
  metrics: WEIGHT_METRICS;
  type: EXERCISE_TYPES;
  title: string;
  notes: string;
  muscleGroup: string;
  sets?: ExerciseSet[];
}
