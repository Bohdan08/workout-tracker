import React from "react";
import OverallProgress from "./components/overallProgress";
import TotalCard from "../history/[id]/components/totalCard";
// import Menu from "./components/menu";

export default function Progress() {
  return (
    <div>
      <div>
        <div className="mb-5 flex space-x-5">
          <TotalCard title="Exercises" total={10} />
          <TotalCard title="Sets" total={10} />
          <TotalCard title="Reps" total={10} />
          <TotalCard title="Weight (LBS)" total={10} />
        </div>
      </div>
      <OverallProgress />
    </div>
  );
}
