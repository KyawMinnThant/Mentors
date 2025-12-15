import { ArrowUpFromLine, LogIn, Users } from "lucide-react";
import React, { ReactNode } from "react";
import MentoringFlowCard from "./mentoringflowcard";
import ReviewCard from "./reviewcard";

type ReviewsType = {
  name: string;
  description: string;
};

const reviewSteps: ReviewsType[] = [
  {
    name: "Harry",
    description:
      "The mentoring sessions were incredibly helpful. My mentor took the time to understand my goals and guided me with actionable steps. I feel much more confident in my skills now compared to when I first started.",
  },
  {
    name: "Wilson",
    description:
      "I really enjoyed the whole experience. The mentor explained each concept clearly and made sure I understood everything before moving on. The consistency and support I received made a huge difference in my progress.",
  },
  {
    name: "Claire",
    description:
      "This program exceeded my expectations. My mentor was patient, knowledgeable, and very encouraging. I noticed significant improvements in my performance almost immediately after applying the advice I received.",
  },
  {
    name: "Sophie",
    description:
      "Working with my mentor has been an amazing journey. She provided insightful feedback, useful resources, and helped me build better habits. I truly appreciate how personalized and thoughtful the whole process was.",
  },
  {
    name: "Daniel",
    description:
      "I never expected to progress this quickly. The mentoring sessions were structured, easy to follow, and always motivating. My mentor helped me see my weaknesses clearly and worked with me to turn them into strengths.",
  },
  {
    name: "Mia",
    description:
      "The professionalism and friendliness of my mentor made every session enjoyable. I learned practical techniques, improved my workflow, and gained a new sense of direction. This was definitely worth my time and effort.",
  },
];

const Review = () => {
  return (
    <section className="mt-20 flex flex-col gap-8 items-center px-4 max-w-7xl mx-auto">
      <p className="tracking-widest text-center text-xl text-blue-700 font-semibold">
        REVIEWS FROM CLIENTS
      </p>

      <header className="flex flex-col gap-2 items-center max-w-xl text-center">
        <h1 className="text-gray-800 font-semibold text-4xl">
          What our client says?
        </h1>
        <p className="text-gray-500">
          What client says about our business states and reviews.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {reviewSteps.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Review;
