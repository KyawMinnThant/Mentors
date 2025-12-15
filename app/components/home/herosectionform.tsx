"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CoursesType = string[];
const HeroSectionForm = () => {
  const Courses: CoursesType = ["Languages", "Maths", "Science", "Technology"];
  return (
    <form className="flex overflow-hidden gap-4 w-full flex-wrap justify-center">
      <Select>
        <SelectTrigger className="lg:w-[20%] md:w-[20%] w-full p-[25px] bg-white text-gray-900">
          <SelectValue
            placeholder="Select Courses"
            defaultValue={"Select Courses"}
            className=" text-black"
          />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {Courses.map((course, index) => (
              <SelectItem key={index} value={course.toLowerCase()}>
                {course}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="search"
        placeholder="Search mentors, courses..."
        className=" lg:w-[30%] md:w-[30%] w-full bg-white text-gray-900 p-[25px]"
      />

      <Button
        type="submit"
        className="bg-blue-600 p-[25px] lg:w-fit md:w-fit w-full font-bold hover:bg-blue-700"
      >
        Search
      </Button>
    </form>
  );
};

export default HeroSectionForm;
