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
const TOP_EXERCISES = 5;

export default function TopExercises() {
  const { workouts } = useAppSelector((store) => store.workoutsHistory);

  let favoriteExercises: any = {};

  if (workouts?.length) {
    workouts.forEach(({ exercises }) => {
      if (exercises?.length) {
        exercises.forEach(({ title }) => {
          if (favoriteExercises[title]) {
            favoriteExercises[title] += 1;
          } else {
            favoriteExercises[title] = 1;
          }
        });
      }
    });
  }

  let chartData = Object.entries(favoriteExercises).map(([key, value]) => {
    return {
      name: `${key.slice(0, XAXIS_LABEL_LENGTH)}${
        key.length > XAXIS_LABEL_LENGTH ? "..." : ""
      }`,
      number: (value as any) * Math.floor(Math.random() * 100)
    };
  }) as { name: string; number: number }[];

  chartData = chartData
    .sort((a, b) => b.number - a.number)
    .slice(0, TOP_EXERCISES);

  return (
    <div>
      <CustomBarChart
        title={`Top ${TOP_EXERCISES} Performed Exercises`}
        data={chartData}
      />
    </div>
  );
}
