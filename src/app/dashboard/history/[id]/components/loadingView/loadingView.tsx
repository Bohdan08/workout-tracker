import { Spinner } from "flowbite-react";
import React from "react";

export default function LoadingView() {
  return (
    <div className="max-w-sm w-fit flex flex-col space-y-2 mt-5">
      {" "}
      <p className="font-medium text-xl">Loading Your Workout</p>
      <p className="text-lg">Please wait a moment...</p>
      <div className="text-center">
        <Spinner aria-label="" size="xl" />
      </div>
    </div>
  );
}
