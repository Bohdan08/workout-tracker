import { Alert } from "flowbite-react";
import React from "react";

export default function ErrorView({ message }: { message: string | null }) {
  return (
    <Alert
      color="failure"
      className="text-center flex flex-col justify-center items-center mb-5"
    >
      <p className="font-semibold text-xl">Error!</p>
      <div className="text-lg mt-3">
        <p> Sorry, we couldn&apos;t retrieve your workouts... </p>
        {message && <p> Reason: {message} </p>}
        <p>Please try again later.</p>
      </div>
    </Alert>
  );
}
