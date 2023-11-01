"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { IoFilter, IoFilterCircleOutline, IoSearch } from "react-icons/io5";
import HospitalCardList from "./HospitalCardList";
import { convertKmToMiles, calculateDistance } from "@utils";
import Slider from "react-input-slider";
import { useRouter, useSearchParams } from "next/navigation";

const LOCATIONS = ["New York", "Washington", "Queens"];

const Finder = () => {
  const router = useRouter();
  const search = useSearchParams();
  const query = search.get("query");
  const [distance, setDistance] = useState(0);
  const [useFilters, setUseFilters] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>(
    query ? (selectedLocation ? query + " " + selectedLocation : query) : ""
  );

  const distanceInMiles = convertKmToMiles(distance);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    if (typeof searchQuery === "string" && searchQuery?.length >= 3) {
      const encodedSearchQuery = encodeURI(searchQuery);
      router.push(`/finder?query=${encodedSearchQuery}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex flex-col self-center w-full md:w-4/5 lg:w-1/2 xl:w-1/2"
    >
      <section className="flex flex-col w-full space-y-4">
        <div className="flex w-full space-x-2 lg:space-x-4">
          <div
            className={`p-2.5 rounded-md cursor-pointer ${
              useFilters ? "bg-purple-500" : " bg-white"
            }`}
            onClick={() => setUseFilters(!useFilters)}
          >
            {useFilters ? (
              <IoFilter className={`text-xl text-white`} />
            ) : (
              <IoFilterCircleOutline className={`text-xl text-purple-500`} />
            )}
          </div>

          <input
            type="text"
            placeholder="Search by hospital name or specialisation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
            className="search_input peer"
          />

          {/* Search button */}
          <button
            title="search hospitals"
            type="submit"
            className="bg-purple-500 text-white py-2 px-3 rounded-lg hover:bg-purple-700 cursor-pointer"
          >
            <IoSearch className={`text-xl text-white`} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 lg:space-x-8 justify-between md:justify-around">
          <select
            title="select location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="flex flex-1 mx-4 md:w-fit border-gray-100 rounded-lg shadow-lg outline-0 active:outline-0 py-2 px-1"
          >
            <option value="">Select location</option>
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <div className="flex w-full h-0 md:hidden" />

          <div className="flex items-center justify-center w-full md:w-fit">
            <Slider
              axis="x"
              xstep={1}
              xmin={0}
              xmax={100}
              x={distance}
              onChange={({ x }) => setDistance(x)}
              styles={{}}
            />
          </div>
        </div>
      </section>

      <div className="flex items-center self-center justify-center py-4 space-x-4">
        <p className="flex flex-grow-0 text-2xl font-semibold">{`Distance: ${distanceInMiles} miles (${distance} kM)${
          selectedLocation && " from " + selectedLocation
        }`}</p>
      </div>
    </form>
  );
};

export default Finder;
