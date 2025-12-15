import { ArrowUpFromLine, LogIn, Users } from "lucide-react";
import React, { ReactNode } from "react";
import MentoringFlowCard from "./mentoringflowcard";

type MentoringStep = {
  title: string;
  description: string;
  icon: ReactNode;
};

const mentoringSteps: MentoringStep[] = [
  {
    title: "Sign Up",
    description: "Create an account to get started with our mentoring program.",
    icon: <LogIn size={32} />,
  },
  {
    title: "Collaborate",
    description:
      "Browse through our list of experienced mentors, collaborate and select one that fits your needs.",
    icon: <Users size={32} />,
  },
  {
    title: "Improvement",
    description:
      "Engage in sessions and track your progress over time with your mentor's guidance.",
    icon: <ArrowUpFromLine size={32} />,
  },
];

const MentoringFlow = () => {
  return (
    <section className="mt-20 flex flex-col gap-8 items-center px-4 max-w-7xl mx-auto">
      <p className="tracking-widest text-center text-xl text-blue-700 font-semibold">
        MENTORING FLOW
      </p>

      <header className="flex flex-col gap-2 items-center max-w-xl text-center">
        <h1 className="text-gray-800 font-semibold text-4xl">
          How Does It Work?
        </h1>
        <p className="text-gray-500">
          Are you looking to join online institutions? Now it’s very simple,
          sign up with mentoring.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {mentoringSteps.map((step, index) => (
          <MentoringFlowCard key={index} step={step} />
        ))}
      </div>
    </section>
  );
};

export default MentoringFlow;
