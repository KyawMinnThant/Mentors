import React from "react";
import { Quote } from "lucide-react";

type ReviewsType = {
  name: string;
  description: string;
};

type ReviewProps = {
  review: ReviewsType;
};

const ReviewCard: React.FC<ReviewProps> = ({ review }) => {
  return (
    <article className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-md mx-auto relative">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-blue-500 absolute top-6 left-6 opacity-20" />

      {/* Review Text */}
      <p className="text-gray-700 italic mb-4 relative z-10 pl-10">
        {review.description}
      </p>

      {/* Reviewer Name */}
      <h3 className="text-gray-900 font-semibold text-lg text-right relative z-10">
        — {review.name}
      </h3>
    </article>
  );
};

export default ReviewCard;
