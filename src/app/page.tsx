import Header from "./common/components/header";
import Image, { StaticImageData } from "next/image";
import { LiaDumbbellSolid } from "react-icons/lia";
import { GiBiceps } from "react-icons/gi";
import { GoLightBulb } from "react-icons/go";
import {
  HiOutlineDocumentText,
  HiOutlineArrowTrendingUp,
  HiOutlineInformationCircle,
  HiOutlinePencilSquare,
  HiOutlineAdjustmentsVertical,
  HiOutlineUser,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import BeginJourney from "./landingPage/beginJourney";
import FaqSection from "./landingPage/faqSection/faqSection";
import Footer from "./common/footer";

// images
import totalDashboard from "../../public/landing/overview.gif";
import createWorkout from "../../public/landing/createWorkout.gif";
import workoutsList from "../../public/landing/workoutsHistory.gif";
import preferences from "../../public/landing/preferences.gif";

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="container flex justify-center items-center flex-col">
          {/* HERO */}
          <div className="flex flex-col gap-5 py-20 md:py-36 text-center">
            <h1 className="text-3xl md:text-4xl font-medium leading-widest md:leading-[50px]">
              Effortless Tracking. <br />
              Empowering Progress.
            </h1>
            <p className="text-xl">
              Elevate Your Fitness: Track Your Progress, Reach Your Goals!
            </p>
            <div className="w-fit mx-auto">
              <BeginJourney />
            </div>
          </div>

          {/* Dashboard */}
          <SectionWrapper
            imageSrc={totalDashboard}
            featuresList={DASHBOARD_INFO}
            isReverse={false}
            title="Intuitive Dashboard"
            subTitle="Visual overview of progress"
            description="Check out the overview dashboard that presents your comprehensive progress visually."
          />

          {/* Create Workout */}
          <SectionWrapper
            imageSrc={createWorkout}
            featuresList={CREATE_WORKOUT_INFO}
            isReverse={true}
            title="Workout Generator"
            subTitle="Your Ultimate Workout Generator"
            description="Generate your workout using our user-friendly workout generator tool."
          />

          {/* Workouts List */}
          <SectionWrapper
            imageSrc={workoutsList}
            featuresList={WORKOUTS_HISTORY}
            isReverse={false}
            title="Workout Insights"
            subTitle="Complete record of workout history"
            description="Our history section enables you to visually track your workouts."
          />

          {/* Preferences */}
          <SectionWrapper
            imageSrc={preferences}
            featuresList={PREFERENCES}
            isReverse={true}
            title="Settings"
            subTitle="A simple way to adjust your settings"
            description="Effortlessly adjust your preferences or personal information on the settings page."
          />
          {/* FAQ */}
          <FaqSection />
          {/* Footer */}
          <Footer />
        </div>
      </main>
    </>
  );
}

const SectionWrapper = ({
  imageSrc,
  featuresList,
  isReverse,
  title,
  subTitle,
  description,
}: {
  imageSrc: StaticImageData;
  featuresList: {
    id: string;
    term: string;
    description: string;
    Icon: any;
  }[];
  isReverse: boolean;
  title: string;
  subTitle: string;
  description: string;
}) => {
  return (
    <section className="pb-12 sm:pb-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
        <div
          className={`${
            isReverse ? "xl:order-last" : ""
          } absolute h-[400px] sm:h-full w-screen sm:w-auto left-[-1rem] sm:left-0 px-5 py-5 sm:relative flex items-center md:px-10 md:py-5 border bg-teal-600 sm:rounded-xl relative overflow-hidden`}
        >
          <div
            className="absolute z-10 -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-teal-300 opacity-20 ring-1 ring-inset ring-white"
            aria-hidden="true"
          />
          <div className="z-20 relative m-auto w-full md:w-auto">
            <Image
              src={imageSrc}
              className="rounded md:rounded-xl shadow-lg md:border"
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="text-center md:text-left">
            <h2 className="text-lg text-teal-600 font-semibold">{title}</h2>
            <p className="text-3xl font-medium mt-2">{subTitle}</p>
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
          <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
            {featuresList.map(({ id, term, description, Icon }) => {
              return (
                <div className="relative pl-9" key={id}>
                  <dt className="inline font-medium text-gray-900">
                    <Icon className={ICON_STYLE} />
                    {term}
                  </dt>
                  <dd className="inline"> {description}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
};

const ICON_STYLE = "absolute left-1 top-1 h-5 w-5";

const DASHBOARD_INFO = [
  {
    id: "total",
    term: "Track your overall progress",
    description:
      "The dashboard consolidates and showcases your total workouts and exercises, including sets and reps.",
    Icon: HiOutlineArrowTrendingUp,
  },
  {
    id: "exercises",
    term: "Know your top performed exercises",
    description:
      "We summarize a list of the exercises you perform most frequently.",
    Icon: LiaDumbbellSolid,
  },
  {
    id: "mucles",
    term: "Identify your primary targeted muscles",
    description: "We determine and visualize the most targeted muscle groups.",
    Icon: GiBiceps,
  },
];

const CREATE_WORKOUT_INFO = [
  {
    id: "exercise-name",
    term: "Enter Exercise Name",
    description: "Choose from our library or create your own.",
    Icon: GoLightBulb,
  },
  {
    id: "sets",
    term: "Enter Your Sets",
    description:
      "Specify the number of sets completed, and include reps and weight if applicable, or duration and distance as appropriate.",
    Icon: HiOutlineDocumentText,
  },
  {
    id: "notes",
    term: "Include Extra Workout Details",
    description:
      "Add any additional notes or details if the generator form does not offer this feature or if needed.",
    Icon: HiOutlineInformationCircle,
  },
];

const WORKOUTS_HISTORY = [
  {
    id: "all-workouts",
    term: "Monitor all your workouts",
    description:
      "Our table presents a chronological list of your workouts, including key details such as targeted muscles and the day of the week.",
    Icon: HiOutlineDocumentText,
  },
  {
    id: "choose-workout",
    term: "Choose the desired workout",
    description:
      "Upon clicking on the workout row, you'll be able to view comprehensive details including the list of exercises, sets, reps, and more.",
    Icon: TbListDetails,
  },
  {
    id: "modify-workout",
    term: "An ability to edit or delete workout",
    description:
      "Feel free to modify the workout details or delete it entirely if it was created by mistake.",
    Icon: HiOutlinePencilSquare,
  },
];

const PREFERENCES = [
  {
    id: "metricts",
    term: "Metrics",
    description: "Modify your weight or distance units at any time.",
    Icon: HiOutlineAdjustmentsVertical,
  },
  {
    id: "personal",
    term: "Personal",
    description: "Update or revise your personal information.",
    Icon: HiOutlineUser,
  },
  {
    id: "account",
    term: "Account",
    description: "Adjust your sign-in method or delete your account.",
    Icon: HiOutlineWrenchScrewdriver,
  },
];
