"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/mentorlist/breadcrumb";
import LeftPanel from "../../components/mentorlist/leftpanel";
import Rightpanel from "../../components/mentorlist/rightpanel";

import { collection, getDocs, Timestamp } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { BreadcrumbItem, Mentor } from "@/lib/types/type";

const MentorList = () => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Mentorlist" },
  ];

  const [searchText, setSearchText] = useState("");
  const [allMentors, setAllMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);

  // For filtering by multiple specializations (e.g. ["Mathematics", "Physics"])
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);

  // Fetch all mentors once on mount
  useEffect(() => {
    const fetchAllMentors = async () => {
      setLoading(true);
      try {
        const mentorsRef = collection(database, "mentors");
        const snapshot = await getDocs(mentorsRef);
        const mentorsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Mentor, "id">),
        }));
        setAllMentors(mentorsData);
        setFilteredMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
      setLoading(false);
    };
    fetchAllMentors();
  }, []);

  // Filtering logic: triggered when searchText, selectedSpecializations, or allMentors change
  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();

    const filtered = allMentors.filter((mentor) => {
      // Check search text in name or specialization
      const matchesSearch =
        mentor.name.toLowerCase().includes(lowerSearch) ||
        mentor.specialization.toLowerCase().includes(lowerSearch);

      // Check specialization filter (if none selected, accept all)
      const matchesSpecialization =
        selectedSpecializations.length === 0 ||
        selectedSpecializations.includes(mentor.specialization);

      return matchesSearch && matchesSpecialization;
    });

    setFilteredMentors(filtered);
  }, [searchText, selectedSpecializations, allMentors]);

  return (
    <main className="font-dmsans px-4 md:px-10 lg:px-[125px] mt-[120px] mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <p className="font-semibold xl:text-3xl lg:text-3xl md:text-xl text-xl border-b-4 border-blue-700">
          All Mentorlist
        </p>
        <Breadcrumb items={items} />
      </div>

      {/* main content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-5">
        {/* left panel */}
        <div className="w-full lg:w-1/4 flex flex-col gap-3">
          <LeftPanel
            search={searchText}
            setSearch={setSearchText}
            selectedSpecializations={selectedSpecializations}
            setSelectedSpecializations={setSelectedSpecializations}
            allMentors={allMentors} // pass this to LeftPanel to extract specialization options dynamically
          />
        </div>

        {/* right panel */}
        <div className="w-full lg:w-3/4 flex flex-col gap-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Rightpanel filteredMentors={filteredMentors} />
          )}
        </div>
      </div>
    </main>
  );
};

export default MentorList;
