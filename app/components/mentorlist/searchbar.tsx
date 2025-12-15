"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  const [inputValue, setInputValue] = useState(search);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(inputValue.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-col items-center gap-3 w-full max-w-4xl mx-auto px-4"
    >
      <Input
        type="search"
        placeholder="Search mentors, courses..."
        className="w-full md:flex-1 bg-white text-gray-900 p-2 md:p-2"
        value={inputValue}
        onChange={handleInputChange}
      />

      <Button
        type="submit"
        className="bg-blue-600 w-full px-8 py-4 font-bold hover:bg-blue-700 transition"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
