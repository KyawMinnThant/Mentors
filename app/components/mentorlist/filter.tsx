"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

type FilterProps = {
  allMentors: { specialization: string }[];
  selectedSpecializations: string[];
  setSelectedSpecializations: React.Dispatch<React.SetStateAction<string[]>>;
};

const Filter: React.FC<FilterProps> = ({
  allMentors,
  selectedSpecializations,
  setSelectedSpecializations,
}) => {
  // Extract unique specializations dynamically from allMentors
  const [specializationOptions, setSpecializationOptions] = useState<string[]>(
    []
  );

  useEffect(() => {
    const uniqueSpecs = Array.from(
      new Set(allMentors.map((mentor) => mentor.specialization))
    ).sort();
    setSpecializationOptions(uniqueSpecs);
  }, [allMentors]);

  // Local copy for toggling before apply
  const [localSelection, setLocalSelection] = useState<string[]>(
    selectedSpecializations
  );

  // Sync localSelection when selectedSpecializations change externally
  useEffect(() => {
    setLocalSelection(selectedSpecializations);
  }, [selectedSpecializations]);

  const toggleSpecialization = (spec: string) => {
    if (localSelection.includes(spec)) {
      setLocalSelection(localSelection.filter((s) => s !== spec));
    } else {
      setLocalSelection([...localSelection, spec]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedSpecializations(localSelection);
  };

  return (
    <form
      className="flex flex-col gap-4 mt-5 max-w-sm mx-auto md:max-w-full md:mx-0"
      onSubmit={handleSubmit}
    >
      <h3 className="font-semibold mb-2">Filter by Specialization</h3>
      <div className="flex flex-col gap-2 max-h-48 overflow-auto">
        {specializationOptions.map((spec) => (
          <label
            key={spec}
            className="inline-flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={localSelection.includes(spec)}
              onChange={() => toggleSpecialization(spec)}
              className="cursor-pointer"
            />
            <span>{spec}</span>
          </label>
        ))}
      </div>

      <Button
        type="submit"
        className="bg-blue-600 p-4 md:p-5 w-full md:w-auto font-bold hover:bg-blue-700 transition"
      >
        Apply Filter
      </Button>
    </form>
  );
};

export default Filter;
