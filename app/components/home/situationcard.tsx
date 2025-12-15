import React, { ReactNode } from "react";

type situationStep = {
  title: string;
  rate: string;
  icon: ReactNode;
};

type SituationCardProps = {
  situation: situationStep;
};

const SituationCard: React.FC<SituationCardProps> = ({ situation }) => {
  return (
    <article
      className="
        group bg-white border rounded-lg p-6 
        flex flex-col items-center text-center 
        shadow-sm hover:shadow-lg transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* Icon */}
      <div
        className="
          p-4 rounded-full bg-blue-100 text-blue-700 
          group-hover:bg-blue-700 group-hover:text-white 
          transition-colors duration-300 mb-3
        "
      >
        {situation.icon}
      </div>

      {/* Rate */}
      <h2 className="text-3xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
        {situation.rate}
      </h2>

      {/* Title */}
      <p className="text-gray-600 text-sm mt-1 group-hover:text-blue-700 group-hover:opacity-90 transition-colors duration-300">
        {situation.title}
      </p>
    </article>
  );
};

export default SituationCard;
