"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await fetch(`/api/users/${params?.id}/hospitals`);
      const data = await response.json();

      setUserHospitals(data);
    };

    if (params?.id) fetchHospitals();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional hospitals.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
