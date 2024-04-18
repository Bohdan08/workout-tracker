"use client";
import {
  Dropdown,
  Label,
  Select,
  TextInput,
  Card,
  Button,
  Textarea,
  Tooltip,
  Modal,
} from "flowbite-react";
import React, { useState } from "react";
import {
  HiPlus,
  HiMinus,
  HiTrash,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import exercisesData from "../../../../exercisesData.json";

export enum WEIGHT_METRICS {
  LBS = "LBS",
  KG = "KG",
}

export enum ACTION_ITEMS {
  SET = "SET",
  EXERCISE = "EXERCISE",
}

const createSetTemplate = () => ({
  id: Math.random(),
  reps: undefined,
  weight: undefined,
});

const createExerciseTemplate = () => ({
  id: Math.random(),
  hidden: false,
  metrics: WEIGHT_METRICS.LBS,
  title: "",
  sets: [createSetTemplate()],
  notes: "",
});

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [deleteItemInfo, setDeleteItemInfo] = useState<{
    type?: string;
    exerciseId?: number;
    setId?: number;
  }>({});

  const [exercises, setExercises] = useState([createExerciseTemplate()]);

  const addExercise = () => {
    setExercises([...exercises, createExerciseTemplate()]);
  };

  const deleteExercise = (exerciseId: number) => {
    setExercises(exercises.filter((obj) => obj.id !== exerciseId));
  };

  const addSet = (exerciseId: number) => {
    setExercises(
      exercises.map((obj) =>
        obj.id !== exerciseId
          ? obj
          : { ...obj, sets: [...obj.sets, createSetTemplate()] }
      )
    );
  };

  // const findExerciseById = (reqId: number) => {
  //   const currIndex = exercises.findIndex((obj) => obj.id === reqId);

  //   if (currIndex !== -1) {
  //     return exercises[currIndex];
  //   }
  // };

  const deleteSet = (exerciseId: number, setId: number) => {
    setExercises(
      exercises.map((obj) =>
        obj.id !== exerciseId
          ? obj
          : { ...obj, sets: obj.sets?.filter((setObj) => setObj.id !== setId) }
      )
    );
    // const currExercise = findExerciseById(exerciseId);
    // if (currExercise?.sets) {
    //   let modifeidExercise = currExercise.sets.filter(
    //     (obj) => obj.id === setId
    //   );

    // }
  };

  const handleDeleteItem = () => {
    if (
      deleteItemInfo.type === ACTION_ITEMS.SET &&
      deleteItemInfo.setId &&
      deleteItemInfo.exerciseId
    ) {
      deleteSet(deleteItemInfo.exerciseId, deleteItemInfo.setId);
    } else {
      deleteExercise(deleteItemInfo.exerciseId as number);
    }

    // reset delete info
    setOpenModal(false);
    setDeleteItemInfo({});
  };

  const toogleView = (exerciseId: number) => {
    setExercises(
      exercises.map((obj) =>
        obj.id !== exerciseId ? obj : { ...obj, hidden: !obj.hidden }
      )
    );
  };

  const changeExerciseField = (
    exerciseId: number,
    key: string,
    value: string | number
  ) => {
    setExercises(
      exercises.map((obj) =>
        obj.id !== exerciseId ? obj : { ...obj, [key]: value }
      )
    );
  };

  // console.log(exercises, "exercises");

  const DeleteExerciseButton = ({ exerciseId }: { exerciseId: number }) => (
    <Tooltip content="Delete this exercise">
      <button
        onClick={() => {
          setOpenModal(true);
          setDeleteItemInfo({
            type: ACTION_ITEMS.EXERCISE,
            exerciseId,
          });
        }}
      >
        <HiTrash color="red" />
      </button>
    </Tooltip>
  );
  return (
    <>
      <div>
        <h1>New Workout</h1>
        <div className="max-w-md">
          {exercises.map(({ hidden, title, sets, id: exerciseId }) => {
            return (
              <div className="mt-5" key={exerciseId}>
                <Card className={`${hidden ? "h-12" : ""}`}>
                  <div>
                    {hidden ? (
                      <div className="flex items-center justify-between">
                        <h3>{title}</h3>
                        <div className="flex space-x-2">
                          <Tooltip
                            content="Expand Exercise"
                            className="w-36 text-center"
                          >
                            <button
                              title="Expand Exercise"
                              className="relative top-[2px]"
                              onClick={() => toogleView(exerciseId)}
                            >
                              <HiPlus />
                            </button>
                          </Tooltip>
                          <DeleteExerciseButton exerciseId={exerciseId} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end space-x-2">
                        <Tooltip
                          content="Hide Exercise"
                          className="w-32 text-center"
                        >
                          <button
                            title="Hide Exercise"
                            onClick={() => toogleView(exerciseId)}
                          >
                            <HiMinus />
                          </button>
                        </Tooltip>
                        <DeleteExerciseButton exerciseId={exerciseId} />
                      </div>
                    )}
                  </div>
                  {!hidden && (
                    <form className="flex max-w-md flex-col gap-4">
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="exercise">
                            Exercise {exercises.length}
                          </Label>
                        </div>

                        <TextInput
                          id="exercise"
                          type="text"
                          placeholder="Type your exercise"
                          required
                          list="exercises"
                          value={title}
                          onChange={({ target }) =>
                            changeExerciseField(
                              exerciseId,
                              "title",
                              target.value
                            )
                          }
                        />
                        <datalist id="exercises">
                          {exercisesData.map(({ name }) => (
                            <option key={name}>{name}</option>
                          ))}
                        </datalist>
                      </div>
                      <div>
                        {sets.map(({ id: setId, reps, weight }, index) => (
                          <div key={setId} className="mt-5">
                            <div className="flex justify-between">
                              <h2>Set {index + 1}</h2>
                              <Tooltip content="Delete this set">
                                <button
                                  onClick={() => {
                                    setOpenModal(true);
                                    setDeleteItemInfo({
                                      type: ACTION_ITEMS.SET,
                                      setId,
                                      exerciseId,
                                    });
                                  }}
                                >
                                  <HiTrash color="red" />
                                </button>
                              </Tooltip>
                            </div>
                            <div className="mt-2 flex flex-row justify-between space-x-5">
                              <div className="w-full">
                                <div>
                                  <Label htmlFor="rep1">Reps </Label>
                                </div>
                                <TextInput
                                  id="rep1"
                                  type="number"
                                  value={reps}
                                  required
                                />
                              </div>

                              <div className="w-full">
                                <div>
                                  <Label htmlFor="weight1">Weight (LBS) </Label>
                                </div>
                                <TextInput
                                  id="weight1"
                                  type="number"
                                  value={weight}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          className="mt-5 w-full"
                          color="blue"
                          onClick={() => addSet(exerciseId)}
                        >
                          <span> Add set </span>
                          <HiPlus className="my-auto ml-1" />
                        </Button>
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="comment" value="Optional Details" />
                        </div>
                        <Textarea
                          id="comment"
                          placeholder="Leave a comment..."
                          required
                          rows={4}
                        />
                      </div>
                    </form>
                  )}
                </Card>
              </div>
            );
          })}
          <Button className="w-full mt-5" onClick={addExercise}>
            <span> Add exercise </span>
            <HiPlus className="my-auto ml-1" />
          </Button>
        </div>
      </div>
      {/* <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        itemName="item"
      /> */}
      {/* MODAL */}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete it?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteItem}>
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

// const DeleteModal = ({
//   itemName,
//   openModal,
//   setOpenModal,
// }: {
//   itemName: string;
//   openModal: boolean;
//   setOpenModal: (val: boolean) => void;
// }) => (
//   <>
//     <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
//       <Modal.Header />
//       <Modal.Body>
//         <div className="text-center">
//           <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
//           <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
//             Are you sure you want to delete this {itemName}?
//           </h3>
//           <div className="flex justify-center gap-4">
//             <Button color="failure" onClick={() => setOpenModal(false)}>
//               {"Yes, I'm sure"}
//             </Button>
//             <Button
//               color="gray"
//               onClick={() => {
//                 setOpenModal(false);
//               }}
//             >
//               No, cancel
//             </Button>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   </>
// );
