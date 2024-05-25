"use client";
import React from "react";
import useAppSelector from "../../hooks/useAppSelector";
import TotalCards from "./components/totalCards/totalCards";
import TopExercisesChart from "./components/topExercisesChart";
import TopMusclesChart from "./components/topMusclesChart";
import { DASHBOARD_MENU_HEADER } from "../../common/styles";

export default function Progress() {
  const { data } = useAppSelector((store) => store.userProfile);
  const { firstName } = data;

  return (
    <div>
      <h1 className={`${DASHBOARD_MENU_HEADER}`}>
        Welcome {firstName ? "," : ""}{" "}
        <span className="capitalize"> {firstName} </span>
      </h1>
      <TotalCards />
      <div className="mt-10 flex flex-col lg:flex-row lg:space-x-10 lg:space-between">
        <div>
          <TopExercisesChart />
        </div>
        <div className="mt-10 lg:mt-0">
          <TopMusclesChart />
        </div>
      </div>
    </div>
  );
}
