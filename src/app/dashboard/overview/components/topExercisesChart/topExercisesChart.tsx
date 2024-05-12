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
      number: value,
    };
  }) as { name: string; number: number }[];

  chartData = chartData
    .sort((a, b) => b.number - a.number)
    .slice(0, TOP_EXERCISES);

  return (
    <div>
      <Card className="p-4 h-[400px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] max-w-full">
        <h2 className="text-2xl font-medium mb-5">
          Top {TOP_EXERCISES} Exercises
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={800}
            height={300}
            data={chartData}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            {...{
              overflow: "visible",
            }}
          >
            <XAxis dataKey="name" angle={15} tickMargin={10} tick={{ fontSize: 10 }} />

            <Tooltip />
            <Bar dataKey="number" fill="#8884d8" barSize={40}>
              <LabelList dataKey="number" position="top" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
