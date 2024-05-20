import React from "react";
import Header from "../common/components/header";
import Footer from "../common/footer";

import createWorkout from "../../../public/createWorkout.png";
import overview from "../../../public/overview.png";
import workoutsList from "../../../public/workoutsListv2.png";
import Image from "next/image";

export default async function AboutPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="grow">
        <section>
          <div className="container flex flex-col items-center justify-center gap-8 py-12 md:py-20 max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-medium">About</h1>
            <p>
              <span className="font-semibold"> Workout Tracker</span> is a web
              application committed to providing a seamless tracking experience
              for users who are looking to monitor their workout progress. The
              platform eliminates the hassle of manual tracking by offering an
              intuitive and user-friendly interface that can be easily
              customized to fit individual needs.
            </p>
            <div className="flex space-x-2">
              <div className="rounded shadow-xl border w-full md:w-[600px]">
                <Image src={overview} alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
