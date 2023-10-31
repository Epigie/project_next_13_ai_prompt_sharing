"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { hospitalsData } from "@utils";
import SpecialisationTag from "@components/SpecialisationTag";
import HospitalCardList from "@components/HospitalCardList";

const HospitalPage = ({ params }) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const userName = searchParams.get("name");

  const [hospital, setHospital] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getHospitalDetails = async () => {
      // const response = await fetch(`/api/hospitals/${hospitalId}`);
      // const data = await response.json();

      const hospital = hospitalsData?.filter(
        (hospital) => hospital?.id === params?.id
      );

      setHospital(hospital[0]);
    };

    if (params?.id) getHospitalDetails();
  }, [params?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!params?.id) return alert("Missing hospital Id!");

    try {
      const response = await fetch(`/api/hospitals/${params?.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          hospital: hospital,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex-col w-full max-w-full flex-start">
      <div className="flex flex-col space-y-4 xl:pl-24 2xl:max-w-2xl">
        <h1 className="text-left head_text">
          <span className="purple_gradient">{hospital?.name}</span>
        </h1>

        <p className="flex items-center justify-between w-full lg:max-w-md desc">
          {hospital?.city}
          <span className="text-base">{` 5.2km from your search point`}</span>
        </p>
      </div>

      <div className="flex flex-col self-center w-full mt-5 space-y-4 lg:space-y-0 lg:max-w-5xl lg:space-x-8 lg:flex-row">
        <div className="flex flex-col w-full p-2 bg-white shadow-md md:flex-row lg:w-2/5 rounded-xl">
          <div className="flex flex-col w-full space-y-2 rounded-lg md:w-1/2 h-min bg-gray-50">
            <Image
              alt={hospital?.name + "-" + hospital?.id}
              width={300}
              height={300}
              // sizes="(max-width: 1368px) 288px, (max-width: 1280px) 288px, (max-width: 768px) 20vw, 100vw"
              src={hospital?.picture}
              priority={true}
              className="self-center object-cover rounded-lg"
            />

            <div className="flex w-full space-y-2 justify-evenly">
              <Link href="/" className="text-sm text-gray-500">
                <button className="px-5 py-1.5 text-sm bg-gray-500 hover:bg-gray-400 active:bg-gray-600 rounded-full text-white">
                  {"Back"}
                </button>
              </Link>

              <button className="px-5 py-1.5 text-sm bg-purple-500 hover:bg-purple-400 active:bg-purple-600 rounded-full text-white">
                {"Full map"}
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1 w-full pl-2 space-y-3 rounded-lg">
            <div className="flex flex-col p-2 space-y-2 rounded-lg bg-gray-50">
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Phone number
              </span>

              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                {hospital?.phone_numbers[0]}
              </span>
            </div>

            <div className="flex flex-col p-2 space-y-2 rounded-lg bg-gray-50">
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Email Address
              </span>

              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                {hospital?.emails[0]}
              </span>
            </div>

            <div className="flex flex-col p-2 space-y-2 rounded-lg bg-gray-50">
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Specialisations
              </span>

              <div className="flex flex-wrap rounded-lg bg-gray-50">
                {hospital?.specialisations.map((specialisation, index) => (
                  <SpecialisationTag
                    key={index}
                    specialisation={specialisation}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full bg-white shadow-md lg:w-3/5 min-h-[320px] rounded-xl">
          MAP GOES HERE
        </div>
      </div>

      <p className="self-center max-w-md mt-16 text-3xl font-bold text-gray-700">
        {"Other Hospitals near you"}
      </p>

      <div className="feed">
        <HospitalCardList hospitals={hospitalsData} />
      </div>
    </section>
  );
};

export default HospitalPage;
