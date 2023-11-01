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

    console.log("response::", response);

    const data = await response.json();

    console.log("data::", data);
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

  const { data: hospitals, isLoading } = useSWR(
    `${apiUrl}/api/v1/finder?q=${encodedSearchQuery}`,
    findHospitals,
    { revalidateOnFocus: true }
  );

  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!hospitals) {
    return null;
  }

  if (typeof searchQuery === "string" && searchQuery?.length >= 3) {
  }

  return (
    <section className="feed">
      <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>

      <HospitalCardList hospitals={hospitals} />
    </section>
  );
};

export default Feed;
