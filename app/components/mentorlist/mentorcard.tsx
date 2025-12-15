import { Mentor } from "@/lib/types/type";
import Link from "next/link";
import React from "react";

type MentorCardProps = {
  mentor: Mentor;
};

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  // Function to render stars based on rating (unchanged)
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={"full" + i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.034 9.378c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
        </svg>
      );
    }

    if (halfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.034 9.378c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z"
          />
        </svg>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={"empty" + i}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.034 9.378c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
        </svg>
      );
    }

    return stars;
  };

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
        xl:max-w-2xl
        mx-auto
      "
    >
      {/* Profile Image */}
      <img
        src={mentor.img}
        alt={mentor.name}
        className="
          w-20 h-20 
          sm:w-24 sm:h-24 
          md:w-28 md:h-28
          lg:w-24 lg:h-24
          xl:w-28 xl:h-28
          rounded-full object-cover border
        "
      />

      {/* Middle info */}
      <div className="flex flex-col flex-grow text-center sm:text-left">
        <h3
          className="
            text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 
            font-semibold text-gray-900
            truncate
          "
          title={mentor.name}
        >
          {mentor.name}
        </h3>

        <div
          className="
            flex justify-center sm:justify-start items-center gap-1 mt-1
            text-sm sm:text-base
          "
          aria-label={`Rating: ${5} out of 5 stars`}
        >
          {renderStars(5)}
          <span className="ml-2 text-gray-600 font-medium">{5}</span>
        </div>

        <p
          className="
            text-gray-600 
            text-xs sm:text-sm md:text-base 
            mt-2 sm:mt-1
            truncate
          "
          title={mentor.location}
        >
          {mentor.location}
        </p>

        <p
          className="
            text-gray-600 
            text-xs sm:text-sm md:text-base
            truncate
          "
          title={mentor.specialization}
        >
          {mentor.specialization}
        </p>
      </div>

      {/* Right section */}
      <div className="flex flex-row md:flex-col sm:flex-col items-center gap-3 sm:items-end">
        {mentor.isAvailable ? (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
            Available
          </span>
        ) : (
          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
            Unavailable
          </span>
        )}

        <Link
          href={`mentor/${mentor.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto text-sm sm:text-base"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
};

export default MentorCard;
