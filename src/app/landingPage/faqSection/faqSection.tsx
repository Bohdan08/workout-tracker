import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import React from "react";

import styles from "./faqSection.module.scss";

export default function FaqSection() {
  return (
    <section className="py-12 sm:py-20 w-full">
      <h2 className="text-3xl font-medium">Frequently asked questions</h2>
      <Accordion
        className={`
        ${styles.accordion}
        hover:bg-transparent text-gray-900 border-t border-b-0 border-l-0 border-r-0 rounded-none w-full mt-10`}
      >
        {FAQ_DATA.map(({ id, title, description }) => (
          <AccordionPanel
            key={id}
            className={`hover:bg-transparent w-full ${styles.accordionPanel}`}
          >
            <AccordionTitle className="text-gray-900">{title}</AccordionTitle>
            <AccordionContent>
              {description}
              {/* <p className="mb-2 text-gray-500 dark:text-gray-400">
                {description}
              </p> */}
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </section>
  );
}

const FAQ_DATA = [
  {
    id: "description",
    title: "What is Workout Tracker?",
    description: `Workout Tracker is a platform that allows users to easily record and monitor their workouts. Our platform offers a simple and customizable solution to monitor fitness progress efficiently. `,
  },
  {
    id: "free",
    title: "Is Workout Tracker free?",
    description: `Yes, we offer a free membership.`,
  },
  {
    id: "support",
    title: "How do I get support if I face any issues?",
    description: `You can reach out via the contact page on our website in case you face any issues.`,
  },
  {
    id: "suggestions",
    title: "May I offer any suggestions on how to enhance the application?",
    description: `Certainly! Feel free to get in touch through the contact page on our website if you have any new items you'd like us to consider adding or if you want to suggest new features.`,
  },
];
