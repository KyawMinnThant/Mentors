import React from "react";
import HeroSection from "../components/home/herosection";
import MentoringFlow from "../components/home/mentoringflow";
import MetoringGoal from "../components/home/metoringgoal";
import AllLearning from "../components/home/alllearning";
import Update from "../components/home/update";
import Situation from "../components/home/situation";
import Review from "../components/home/review";

const Home = () => {
  return (
    <div className=" overflow-hidden">
      <HeroSection />
      <MentoringFlow />
      <MetoringGoal />
      <AllLearning />
      <Update />
      <Situation />
      <Review />
    </div>
  );
};

export default Home;
