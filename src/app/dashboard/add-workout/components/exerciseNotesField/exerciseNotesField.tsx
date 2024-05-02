import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import { modifyExercise } from "@/src/app/lib/store/features/newWorkout/newWorkoutSlice";
import { Label, Textarea } from "flowbite-react";
import React from "react";

export default function ExerciseNotesField({
  exerciseId,
  exerciseIndex,
}: {
  exerciseId: string;
  exerciseIndex: number;
}) {
  const dispatch = useAppDispatch();

  const newWorkoutData = useAppSelector((store) => store.newWorkout);
  const { exercises } = newWorkoutData;

  const currExercise = exercises[exerciseIndex];

  const handleExerciseTitle = (
    exerciseId: string,
    options: Record<string, string>
  ) => dispatch(modifyExercise({ exerciseId, options }));

  return (
    <div className="mt-5">
      <div className="mb-2 block">
        <Label htmlFor="comment" value="Additional Details" />
      </div>
      <Textarea
        id="comment"
        placeholder="Leave a comment about your exercise..."
        required
        rows={4}
        maxLength={250}
        value={currExercise.notes}
        onChange={({ target }) => {
          handleExerciseTitle(exerciseId, {
            notes: target.value,
          });
        }}
      />
    </div>
  );
}
