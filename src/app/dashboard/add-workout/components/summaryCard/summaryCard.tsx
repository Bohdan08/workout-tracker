import useAppSelector from "@/src/app/hooks/useAppSelector";
import { Badge, Card } from "flowbite-react";
import React from "react";

const BADGE_COLORS = ["info", "success", "warning", "indigo", "purple", "pink"];

export default function WorkoutSummary({
  affectedMuscleGroups,
}: {
  affectedMuscleGroups: string[];
}) {
  const { exercises } = useAppSelector((store) => store.newWorkout);

  return (
    <Card className="bg-gray-100">
      <ul className="flex flex-col space-y-4">
        <li>
          Total Exercises:{" "}
          <span className="font-medium"> {exercises.length} </span>
        </li>
        <li className="block">
          <div>
            <div>
              <p className="mb-2 font-medium">Muscle Groups</p>
              <div className="flex flex-wrap">
                {affectedMuscleGroups.map((muscle, index) => (
                  <Badge
                    key={muscle}
                    color={BADGE_COLORS[index % affectedMuscleGroups.length]}
                    className="w-fit mb-2 mr-2"
                    size="sm"
                  >
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </Card>
  );
}
