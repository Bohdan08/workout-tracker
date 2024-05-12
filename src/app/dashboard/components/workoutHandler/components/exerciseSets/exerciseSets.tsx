import ActionModal from "@/src/app/common/components/actionModal";
import { MAX_SETS } from "@/src/app/common/constants";
import {
  EXERCISE_MEASURMENT_TYPES,
  EXERCISE_TYPES,
} from "@/src/app/common/enums";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import {
  addExerciseSet,
  deleteExerciseSet,
  modifyExercise,
  modifyExerciseSet,
} from "@/src/app/lib/store/features/workout/workoutSlice";
import { Button, Label, TextInput, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";

export default function ExerciseSets({
  exerciseId,
  exerciseIndex,
}: {
  exerciseId: string;
  exerciseIndex: number;
}) {
  const dispatch = useAppDispatch();

  const [deleteSetModal, setDeleteSetModal] = useState<string | null>(null);

  const workoutData = useAppSelector((store) => store.workout);
  const userData = useAppSelector((store) => store.userProfile);
  console.log(userData, "userData");
  const {
    exercises,
    weightUnit = userData.data.weightUnit,
    distanceUnit = userData.data.distanceUnit,
  } = workoutData;

  const currWorkout = exercises[exerciseIndex];

  const handleCloseSetModal = () => setDeleteSetModal(null);

  const handleModifySet = (
    exerciseId: string,
    setId: string,
    options: Record<string, string>
  ) => dispatch(modifyExerciseSet({ exerciseId, setId, options }));

  const handleAddSet = (exerciseId: string) => {
    dispatch(addExerciseSet(exerciseId));
  };

  const handleDeleteSet = () => {
    dispatch(
      deleteExerciseSet({ exerciseId, setId: deleteSetModal as string })
    );
    // reset delete info
    setDeleteSetModal(null);
  };

  const sets = exercises[exerciseIndex].sets;

  return (
    <>
      <div>
        {/* WEIGHTS SETS */}
        {currWorkout.measurmentType ===
          EXERCISE_MEASURMENT_TYPES.REPS_WEIGHTS && sets?.length
          ? sets.map(({ id: setId, reps, weight }, index) => (
              <div key={setId} className="mt-5">
                <div className="flex justify-between mb-2">
                  <h2>Set {index + 1}</h2>
                  <Tooltip content="Delete this set">
                    <button
                      onClick={() => {
                        setDeleteSetModal(setId);
                      }}
                    >
                      <HiTrash color="red" />
                    </button>
                  </Tooltip>
                </div>
                <div className="flex flex-row justify-between space-x-5">
                  <div className="w-full">
                    <div>
                      <Label htmlFor={`rep-${setId}`}>Reps </Label>
                    </div>
                    <TextInput
                      id={`rep-${setId}`}
                      type="number"
                      value={reps}
                      min={0}
                      required
                      onChange={({ target }) => {
                        handleModifySet(exerciseId, setId, {
                          reps: target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <div>
                      <Label htmlFor={`weight-${setId}`}>
                        Weight ({weightUnit}){" "}
                      </Label>
                    </div>
                    <TextInput
                      id={`weight-${setId}`}
                      type="number"
                      value={weight}
                      min={0}
                      required
                      onChange={({ target }) => {
                        handleModifySet(exerciseId, setId, {
                          weight: target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}

        {/* DURATION SETS */}

        {currWorkout.measurmentType ===
          EXERCISE_MEASURMENT_TYPES.DURATION_DISTANCE && sets?.length
          ? sets.map(({ id: setId, duration, distance }, index) => (
              <div key={setId} className="mt-5">
                <div className="flex justify-between mb-2">
                  <h2>Set {index + 1}</h2>
                  <Tooltip content="Delete this set">
                    <button
                      onClick={() => {
                        setDeleteSetModal(setId);
                      }}
                    >
                      <HiTrash color="red" />
                    </button>
                  </Tooltip>
                </div>
                <div className="flex flex-row justify-between space-x-5">
                  <div className="w-full">
                    <div>
                      <Label htmlFor={`minutes-${setId}`}>
                        Duration (Minutes){" "}
                      </Label>
                    </div>
                    <TextInput
                      id={`minutes-${setId}`}
                      type="number"
                      value={duration}
                      min={0}
                      required
                      onChange={({ target }) => {
                        handleModifySet(exerciseId, setId, {
                          duration: target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <div>
                      <Label htmlFor={`miles-${setId}`}>
                        Distance ({distanceUnit}){" "}
                      </Label>
                    </div>
                    <TextInput
                      id={`${distanceUnit}-${setId}`}
                      type="number"
                      value={distance}
                      min={0}
                      required
                      onChange={({ target }) => {
                        handleModifySet(exerciseId, setId, {
                          distance: target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}

        <Button
          disabled={!currWorkout.measurmentType || sets?.length === MAX_SETS}
          className="mt-5 w-full"
          color="blue"
          onClick={() => handleAddSet(exerciseId)}
        >
          <span> Add set </span>
          <HiPlus className="my-auto ml-1" />
        </Button>
        {sets?.length === MAX_SETS ? (
          <p className="mt-3 text-red-600">
            You reached a maximum of {MAX_SETS} sets per exercise.
          </p>
        ) : null}
        {!currWorkout.measurmentType ? (
          <p className="mt-3 text-red-600">
            Select <span className="font-medium">Measurment Type </span> in
            order to add sets.
          </p>
        ) : null}
      </div>

      <ActionModal
        title="Are you sure you want to delete this set?"
        acceptButtonColor="failure"
        showModal={Boolean(deleteSetModal)}
        closeModal={handleCloseSetModal}
        handleAccept={handleDeleteSet}
      />
    </>
  );
}
