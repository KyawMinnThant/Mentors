import React from "react";

const MentorCardSkeleton: React.FC = () => {
  return (
    <article
      className="
        flex flex-col sm:flex-row
        items-center 
        bg-white border rounded-md shadow-sm 
        p-4 
        gap-6 
        w-full 
        max-w-full
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl
        mt-10
        xl:max-w-2xl
        mx-auto
        animate-pulse
      "
    >
      {/* Profile Image Skeleton */}
      <div
        className="
          w-20 h-20 
          sm:w-24 sm:h-24 
          md:w-28 md:h-28
          lg:w-24 lg:h-24
          xl:w-28 xl:h-28
          rounded-full bg-gray-300 border
        "
      />

      {/* Middle info Skeleton */}
      <div className="flex flex-col flex-grow text-center sm:text-left space-y-3">
        {/* Name */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto sm:mx-0 sm:w-1/2"></div>

        {/* Stars + Rating */}
        <div className="flex justify-center sm:justify-start items-center gap-2">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>

        {/* Location */}
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto sm:mx-0"></div>

        {/* Subject */}
        <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto sm:mx-0"></div>
      </div>

      {/* Right section Skeleton */}
      <div className="flex flex-row md:flex-col sm:flex-col items-center gap-3 sm:items-end w-full sm:w-auto">
        {/* Availability badge */}
        <div className="h-6 w-20 bg-gray-300 rounded-full"></div>

        {/* Button */}
        <div className="h-10 bg-gray-300 rounded-md w-full sm:w-auto"></div>
      </div>
    </article>
  );
};

export default MentorCardSkeleton;
