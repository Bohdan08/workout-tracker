import React from "react";

interface ExerciseSetDetailsProps {
  title: string;
  total: string | number;
}

export default function ExerciseSetDetails({
  title,
  total,
}: ExerciseSetDetailsProps) {
  return (
    <div className="w-full">
      <p className="mb-2 text-nowrap">{title}</p>
      <p className="font-medium">{total}</p>
    </div>
  );
}
