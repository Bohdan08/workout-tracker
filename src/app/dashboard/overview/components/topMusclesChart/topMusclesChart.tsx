"use client";
import useAppSelector from "@/src/app/hooks/useAppSelector";
import { Card } from "flowbite-react";
import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CustomBarChart from "../customBarChart";

const XAXIS_LABEL_LENGTH = 20;
const TOP_MUSCLES = 5;

export default function TopMusclesChart() {
  const { workouts } = useAppSelector((store) => store.workoutsHistory);

  let favoriteMuscles: any = {};

  if (workouts?.length) {
    workouts.forEach(({ exercises }) => {
      if (exercises?.length) {
        exercises.forEach(({ muscleGroups }) => {
          if (muscleGroups?.length) {
            muscleGroups.forEach((muscle) => {
              if (favoriteMuscles[muscle]) {
                favoriteMuscles[muscle] += 1;
              } else {
                favoriteMuscles[muscle] = 1;
              }
            });
          }
        });
      }
    });
  }

  let chartData = Object.entries(favoriteMuscles).map(([key, value]) => {
    return {
      name: `${key.slice(0, XAXIS_LABEL_LENGTH)}${
        key.length > XAXIS_LABEL_LENGTH ? "..." : ""
      }`,
      number: value,
    };
  }) as { name: string; number: number }[];

  chartData = chartData
    .sort((a, b) => b.number - a.number)
    .slice(0, TOP_MUSCLES);

  return (
    <div>
      <CustomBarChart
        title={`Top ${TOP_MUSCLES} Targeted Muscles`}
        data={chartData}
      />
    </div>
  );
}
