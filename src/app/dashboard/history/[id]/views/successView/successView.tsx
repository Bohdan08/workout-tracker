import useAppSelector from "@/src/app/hooks/useAppSelector";
import getAffectedMuscleGroups from "@/src/app/lib/utils/getAffectedMuscleGroups";
import React, { useState } from "react";
import TotalCard from "../../components/totalCard";
import { Badge, Card, Tooltip } from "flowbite-react";
import { BADGE_COLORS } from "@/src/app/common/constants";
import ExerciseSetDetails from "../../components/exerciseSetDetails";
import { EXERCISE_TYPES } from "@/src/app/common/enums";
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";

enum CARD_ACTION_STATUS {
  VIEW = "view",
  EDIT = "edit",
}

export default function SuccessView() {
  const [cardsActionStatus, setCardsActionStatus] = useState({});

  const { data } = useAppSelector((store) => store.selectedWorkout);
  const { exercises, workoutDate } = data;

  const affectedMuscleGroups = getAffectedMuscleGroups(exercises);

  const totalSets = exercises.reduce((acc, obj) => {
    return acc + (obj.sets?.length || 0);
  }, 0);

  const totalReps = exercises.reduce((acc, obj) => {
    if (obj.sets?.length) {
      obj.sets.forEach((setInfo) => {
        if (setInfo.reps) acc += parseInt(setInfo.reps?.toString() || "");
      });
    }
    return acc;
  }, 0);

  const totalWeight = exercises.reduce((acc, obj) => {
    if (obj.sets?.length) {
      obj.sets.forEach((setInfo) => {
        if (setInfo.weight) acc += parseInt(setInfo.weight?.toString() || "");
      });
    }
    return acc;
  }, 0);

  return (
    <div>
      <h1 className="text-3xl font-medium">
        {" "}
        Workout Summary for {workoutDate as string}
      </h1>
      {data ? (
        <div>
          {/* <div className="mt-5">
            <Datepicker
              value={currWorkout?.workoutDate as string}
              minDate={new Date(2022, 0, 1)}
              maxDate={new Date()}
            />
          </div> */}
          <div className="mt-5 flex space-x-5">
            <TotalCard title="Exercises" total={exercises.length} />
            <TotalCard title="Sets" total={totalSets} />
            <TotalCard title="Reps" total={totalReps} />
            <TotalCard title="Weight (LBS)" total={totalWeight} />
          </div>
          <div className="mt-5">
            <h2 className="text-2xl font-medium">Musle Groups</h2>
            <div className="flex mt-2">
              {affectedMuscleGroups.map((muscle, index) => (
                <Badge
                  key={muscle}
                  color={BADGE_COLORS[index % affectedMuscleGroups.length]}
                  className="w-fit text-xl mb-2 mr-2 px-3 py-2"
                >
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-5">
            {" "}
            <h2 className="text-2xl font-medium">Exercises </h2>{" "}
            <div className="mt-5 flex flex-wrap">
              {exercises.map(
                (
                  {
                    id,
                    muscleGroup,
                    sets = [],
                    notes,
                    title,
                    duration = 0,
                    type: exerciseType,
                  },
                  index
                ) => {
                  return (
                    <Card key={id} className="md:w-[450px] h-fit mr-5 mb-5">
                      <div className="flex h-full flex-col space-y-5 items-start">
                        <div className="flex justify-between w-full">
                          <h3 className="text-xl font-medium">
                            {index + 1}. {title}
                          </h3>
                          <div className="flex space-x-2">
                            <Tooltip
                              content="Edit Exercise"
                              className="w-36 text-center"
                            >
                              <button
                                title="Edit Exercise"
                                onClick={() =>
                                  setCardsActionStatus({
                                    ...cardsActionStatus,
                                    [id]: true,
                                  })
                                }
                              >
                                <HiOutlinePencilAlt color="text-yellow-600" />
                              </button>
                            </Tooltip>
                            <Tooltip content={`Delete this exercise`}>
                              <button
                              // onClick={() => {
                              //   setDeleteViewModal(true);
                              //   setDeleteItemInfo({
                              //     type: ACTION_ITEMS.EXERCISE,
                              //     exerciseId,
                              //   });
                              // }}
                              >
                                <HiTrash color="red" />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                        <Badge
                          color={BADGE_COLORS[index % exercises.length]}
                          className="w-fit mb-2 mr-2"
                          size="sm"
                        >
                          {muscleGroup}
                        </Badge>
                        {sets.length ? (
                          <div className="mt-5">
                            {sets.map(({ id: setId, reps, weight }, index) => {
                              return (
                                <div key={setId} className="mt-5">
                                  <div className="mb-2">
                                    <p className="font-medium text-lg">
                                      Set {index + 1}
                                    </p>
                                  </div>
                                  {exerciseType === EXERCISE_TYPES.STENGTH ? (
                                    <div className="flex flex-row justify-between space-x-10">
                                      <ExerciseSetDetails
                                        title="Reps"
                                        total={reps as number}
                                      />
                                      <ExerciseSetDetails
                                        title="Weight (LBS)"
                                        total={weight as number}
                                      />
                                    </div>
                                  ) : (
                                    // cardio
                                    <ExerciseSetDetails
                                      title="Duration (Minutes)"
                                      total={duration as number}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <p>No sets and reps have been logged...</p>{" "}
                          </div>
                        )}

                        {notes ? (
                          <div className="mt-5">
                            <p className="text-lg font-medium">
                              {" "}
                              Additional Details{" "}
                            </p>
                            <p>{notes}</p>
                          </div>
                        ) : null}
                      </div>
                    </Card>
                  );
                }
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
