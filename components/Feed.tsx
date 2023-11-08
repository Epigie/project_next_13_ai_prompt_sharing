"use client";

import React from "react";
import HospitalCardList from "./HospitalCardList";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "./Spinner";
import useSWR from "swr";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const findHospitals = async (url: string) => {
  try {
    // Fetch hospitals from the backend using the 'fetch' API
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // Calculate distance for each hospital and filter by distance
    // const filteredHospitals = data
    //   .filter((hospital) => {
    //     // Use your distance calculation algorithm here
    //     const hospitalDistance = calculateDistance(
    //       selectedLocation, // Use selected location here
    //       hospital.location // Assuming location is an object with latitude and longitude
    //     );
    //     return hospitalDistance <= distance;
    //   })
    //   .sort((a, b) => b.featured - a.featured); // Prioritize featured hospitals
    return data;
  } catch (error) {
    console.error("Error fetching hospitals::", error);
  }
};

const Feed = () => {
  const router = useRouter();
  const search = useSearchParams();
  const query = search.get("query");
  const searchQuery = query ? query : "";

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const {
    data: hospitalsData,
    error,
    isLoading,
    isValidating,
  } = useSWR(`${apiUrl}/api/v1/finder?q=${encodedSearchQuery}`, findHospitals, {
    revalidateOnFocus: true,
  });

  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section className="feed">
        <span className="text-xl font-semibold">
          There was an error fetching the hospitals. Please try again later.
        </span>
      </section>
    );
  }

  if (!hospitalsData) {
    return (
      <section className="feed">
        <span className="text-xl font-semibold">
          No results found for:{" "}
          <span className="font-semibold">{searchQuery}</span>
        </span>
      </section>
    );
  }

  return (
    <section className="feed">
      <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>

      <HospitalCardList hospitalsData={hospitalsData?.data} />
    </section>
  );
};

export default Feed;
