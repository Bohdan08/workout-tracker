"use client";
import React from "react";
import useAppSelector from "../../hooks/useAppSelector";
import TotalCards from "./components/totalCards/totalCards";
import TopExercisesChart from "./components/topExercisesChart";
import TopMusclesChart from "./components/topMusclesChart";

export default function Progress() {
  const { data } = useAppSelector((store) => store.userProfile);
  const { firstName } = data;

  return (
    <div>
      <h1 className="text-3xl font-medium text-left">
        Welcome, <span className="capitalize">{firstName || "User"}</span>
      </h1>
      <TotalCards />
      <div className="mt-10 flex space-x-4 space-between">
        <TopExercisesChart />
        <TopMusclesChart />
      </div>
    </div>
  );
}
