import {
  ArrowUpFromLine,
  CalendarCheck,
  CheckCircle,
  Users,
} from "lucide-react";
import React, { ReactNode } from "react";
import MentoringFlowCard from "./mentoringflowcard";
import SituationCard from "./situationcard";

type situationStep = {
  title: string;
  rate: string;
  icon: ReactNode;
};

const situationstep: situationStep[] = [
  {
    title: "Our Clients",
    rate: "1K+",
    icon: <Users size={32} />,
  },
  {
    title: "Appointments",
    rate: "500+",
    icon: <CalendarCheck size={32} />,
  },
  {
    title: "Completion",
    rate: "900+",
    icon: <CheckCircle size={32} />,
  },
];

const Situation = () => {
  return (
    <div className="bg-blue-700 py-10 mt-20">
      <section className="mt-20 flex flex-col gap-8 items-center px-4 max-w-7xl mx-auto">
        <p className="tracking-widest text-center text-3xl text-white font-semibold">
          SITUATION OF OUR BUSINESS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {situationstep.map((situation, index) => (
            <SituationCard key={index} situation={situation} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Situation;
