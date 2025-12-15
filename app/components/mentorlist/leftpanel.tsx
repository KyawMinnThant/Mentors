import React, { useState } from "react";
import SearchBar from "./searchbar";
import Filter from "./filter";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  allMentors: {
    specialization: string;
  }[];
  selectedSpecializations: string[];
  setSelectedSpecializations: React.Dispatch<React.SetStateAction<string[]>>;
};

const LeftPanel: React.FC<Props> = ({
  search,
  setSearch,
  allMentors,
  selectedSpecializations,
  setSelectedSpecializations,
}) => {
  return (
    <div className="p-4 flex flex-col gap-4 shadow-md">
      <SearchBar search={search} setSearch={setSearch} />
      <hr />
      <Filter
        allMentors={allMentors}
        selectedSpecializations={selectedSpecializations}
        setSelectedSpecializations={setSelectedSpecializations}
      />
    </div>
  );
};

export default LeftPanel;
