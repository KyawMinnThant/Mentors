import React from "react";
import { Clock } from "lucide-react";

type UpdateType = {
  adminName: string;
  adminProfile: string;
  title: string;
  description: string;
  time: string;
};

type UpdateCardProps = {
  update: UpdateType;
};

const UpdateCard: React.FC<UpdateCardProps> = ({ update }) => {
  return (
    <article className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      {/* Admin Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={update.adminProfile}
          alt={update.adminName}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-gray-800 font-semibold text-sm">
            {update.adminName}
          </h3>
          <p className="text-gray-500 text-xs">Administrator</p>
        </div>
      </div>

      {/* Update Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {update.title}
      </h2>

      {/* Update Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {update.description}
      </p>

      {/* Time */}
      <div className="flex items-center gap-2 text-gray-400 text-xs mt-auto">
        <Clock className="w-4 h-4" />
        <span>{update.time}</span>
      </div>
    </article>
  );
};

export default UpdateCard;
