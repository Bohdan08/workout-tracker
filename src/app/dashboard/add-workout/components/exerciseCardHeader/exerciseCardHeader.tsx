import ActionModal from "@/src/app/common/components/actionModal";
import useAppDispatch from "@/src/app/hooks/useAppDispatch";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import {
  deleteExercise,
  modifyExercise,
} from "@/src/app/lib/store/features/newWorkout/newWorkoutSlice";
import { Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { HiPlus, HiMinus, HiTrash } from "react-icons/hi";

export default function ExerciseCardHeader({
  exerciseIndex,
}: {
  exerciseIndex: number;
}) {
  const [deleteViewModal, setDeleteViewModal] = useState(false);

  const newWorkoutData = useAppSelector((store) => store.newWorkout);
  const { exercises } = newWorkoutData;

  const { id: exerciseId, title, hidden } = exercises[exerciseIndex] || {};

  const closeDeleteViewModal = () => setDeleteViewModal(false);

  const dispatch = useAppDispatch();

  const handleModifyExercise = (options: Record<string, boolean>) =>
    dispatch(modifyExercise({ exerciseId, options }));

  const handleDeleteExercise = () => {
    dispatch(deleteExercise(exerciseId));

    // reset delete info
    setDeleteViewModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3>{`${exerciseIndex + 1}. ${title || "Exercise Details"}`}</h3>
        <div className="flex space-x-2">
          {hidden ? (
            <Tooltip content="Expand Exercise" className="w-36 text-center">
              <button
                title="Expand Exercise"
                onClick={() =>
                  handleModifyExercise({
                    hidden: false,
                  })
                }
              >
                <HiPlus />
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Hide Exercise" className="w-32 text-center">
              <button
                title="Hide Exercise"
                onClick={() =>
                  handleModifyExercise({
                    hidden: true,
                  })
                }
              >
                <HiMinus />
              </button>
            </Tooltip>
          )}
          <Tooltip content={`Delete this exercise`}>
            <button
              onClick={() => {
                setDeleteViewModal(true);
              }}
            >
              <HiTrash color="red" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* MODAL */}

      <ActionModal
        title="Are you sure you want to delete it?"
        acceptButtonColor="failure"
        showModal={deleteViewModal}
        closeModal={closeDeleteViewModal}
        handleAccept={handleDeleteExercise}
      />
    </>
  );
}
