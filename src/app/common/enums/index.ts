export enum WEIGHT_METRICS {
  LBS = "LBS",
  KG = "KG",
}

export enum DISTANCE_METRICS {
  KM = "KM",
  MI = "MI",
}

export enum ACTION_ITEMS {
  SET = "SET",
  EXERCISE = "EXERCISE",
}

export enum EXERCISE_TYPES {
  STRENGTH = "STRENGTH",
  CARDIO = "CARDIO",
}

export enum API_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "failed",
  SUCCESS = "succeeded",
}

export enum CARD_ACTION_STATUS {
  READ = "READ",
  EDIT = "EDIT",
}

export enum EXERCISE_MEASURMENT_TYPES {
  REPS = "REPS",
  WEIGHT = "WEIGHT",
  DURATION = "DURATION",
  DISTANCE = "DISTANCE",
  // REPS_WEIGHTS = "Reps/Weights",
  // DURATION_DISTANCE = "Duration/Distance",
}

export enum WORKOUT_TYPE {
  NEW = "NEW",
  EXISTING = "EXISTING",
}
