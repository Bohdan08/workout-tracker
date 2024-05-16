"use client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BeginJourney() {
  const router = useRouter();

  return (
    <Button
      className="rounded-full py-1 px-5"
      size="lg"
      onClick={() => router.push("/register")}
    >
      Begin Your Journey
    </Button>
  );
}
