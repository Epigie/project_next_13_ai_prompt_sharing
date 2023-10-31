"use client";

import { useState, useEffect } from "react";
import { IoFilter, IoFilterCircleOutline, IoSearch } from "react-icons/io5";
import HospitalCardList from "./HospitalCardList";
import { convertKmToMiles, finderApi, calculateDistance } from "@utils";
import Slider from "react-input-slider";

const LOCATIONS = ["New York", "Washington", "Queens"];

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Feed = () => {
  const [allHospitals, setAllHospitals] = useState([]);
  const [distance, setDistance] = useState(0);
  const distanceInMiles = convertKmToMiles(distance);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [useFilters, setUseFilters] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        if (searchText !== "" && searchText.length > 3) {
          // Fetch hospitals from your backend using the 'fetch' API
          const response = await fetch(
            `${apiUrl}/api/finder?q=${
              selectedLocation
                ? searchText + " " + selectedLocation
                : searchText
            }`
          );
          if (!response.status !== "ok") {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          // Calculate distance for each hospital and filter by distance
          const filteredHospitals = data
            .filter((hospital) => {
              // Use your distance calculation algorithm here
              const hospitalDistance = calculateDistance(
                selectedLocation, // Use selected location here
                hospital.location // Assuming location is an object with latitude and longitude
              );
              return hospitalDistance <= distance;
            })
            .sort((a, b) => b.featured - a.featured); // Prioritize featured hospitals

          setAllHospitals(filteredHospitals);
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [searchText, selectedLocation, distance]);

  const handleSearchClick = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative flex flex-col self-center w-full md:w-4/5 lg:w-1/2 xl:w-1/2">
        <div className="flex w-full space-x-4">
          <div
            className={`mx-2 p-2.5 rounded-md cursor-pointer ${
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
            value={searchText}
            // onChange={handleSearchClick}
            required
            className="search_input peer"
          />

          {/* Search button */}
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <IoSearch className={`text-xl text-purple-500`} />
          </button>

          <div className="flex-shrink-0 hidden h-full overflow-hidden lg:flex">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="flex w-full border-gray-100 rounded-lg shadow-lg outline-0 active:outline-0"
            >
              <option value="">Select location</option>
              {LOCATIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-shrink-0 mt-4 overflow-hidden h-min lg:hidden">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="flex w-full px-2 py-2 border-gray-100 rounded-lg shadow-lg outline-0 active:outline-0"
          >
            <option value="">Select location</option>
            {LOCATIONS.map((location) => (
              <option key={location} value={location} className="">
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center self-center justify-center py-4 space-x-4">
          <p className="flex flex-grow-0 text-2xl font-semibold">{`Distance: ${distanceInMiles} miles (${distance} kM)`}</p>

          <div className="flex flex-1 w-full pt-1">
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
      </form>

      {searchedResults && <HospitalCardList hospitals={searchedResults} />}
    </section>
  );
};

export default Feed;
