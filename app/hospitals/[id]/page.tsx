"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import SpecialisationTag from "@components/SpecialisationTag";
import HospitalCardList from "@components/HospitalCardList";
import Spinner from "@components/Spinner";
import useSWR from "swr";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getHospitalDetails = async (url: string) => {
  try {
    // Fetch hospital from the backend using the 'fetch' API
    const response = await fetch(url);

    if (!response?.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting hospital::", error);
  }
};

const HospitalPage = ({ params }: any) => {
  const router = useRouter();
  const id = params?.id;
  const searchParams = useSearchParams();
  const query = searchParams.get("id");
  const searchQuery = query ? query : "";

  const [submitting, setIsSubmitting] = useState(false);

  const {
    data: hospitalData,
    error,
    isLoading,
    isValidating,
  } = useSWR(`${apiUrl}/api/v1/hospitals/${id}`, getHospitalDetails, {
    revalidateOnFocus: true,
  });

  const hospital = hospitalData?.data;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   if (!params?.id) return alert("Missing hospital Id!");

  //   try {
  //     const response = await fetch(`/api/hospitals/${params?.id}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({
  //         hospital: hospital,
  //       }),
  //     });

  //     if (response.ok) {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section className="feed">
        <span className="text-xl font-semibold">
          There was an error fetching the hospital. Please try again later.
        </span>
      </section>
    );
  }

  if (!hospital) {
    return (
      <section className="feed">
        <span className="text-xl font-semibold">Hospital not found</span>
      </section>
    );
  }

  return (
    <section className="flex-col w-full max-w-full flex-start">
      <div className="flex flex-col space-y-4 xl:pl-24 w-full">
        <h1 className="text-left head_text">
          <span className="purple_gradient">{hospital?.name}</span>
        </h1>

        <p className="flex font-semibold flex-col lg:flex-row lg:items-center justify-between w-full desc">
          <span>
            {hospital?.contact?.address?.number && (
              <span>{hospital?.contact?.address?.number}</span>
            )}{" "}
            {hospital?.contact?.address?.street && (
              <span>{hospital?.contact?.address?.street}</span>
            )}
            {`${hospital?.contact?.address?.city}, ${hospital?.contact?.address?.country}.`}
          </span>
          <span className="text-lg">{` 5.2km from your search point`}</span>
        </p>
      </div>

      <div className="flex flex-col self-center w-full mt-5 space-y-4 lg:space-y-0 lg:max-w-5xl lg:space-x-8 lg:flex-row">
        <div className="flex flex-col w-full space-y-3 p-2 bg-white shadow-md lg:w-2/5 rounded-xl">
          <div className="flex flex-col w-full rounded-lg md:w-full h-fit bg-gray-50">
            <div className="flex w-full h-64 rounded-t-lg max-h-fit p-2 overflow-hidden relative lg:h-80">
              <Image
                alt={hospital?.name + "-" + hospital?.id}
                fill
                // width={300}
                // height={300}
                // sizes="(max-width: 1368px) 288px, (max-width: 1280px) 288px, (max-width: 768px) 20vw, 100vw"
                src={hospital?.picture}
                priority={true}
                className="self-center object-cover rounded-t-lg"
              />
            </div>

            <div className="flex w-full lg:space-y-2 justify-evenly p-2">
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

          <div className="flex flex-col flex-1 w-full space-y-3 rounded-lg">
            <div className="flex flex-col p-2 space-y-2 rounded-lg bg-gray-50">
              <span className="text-sm font-semibold text-gray-700 font-satoshi">
                Specialisations
              </span>

              <div className="flex flex-wrap rounded-lg bg-gray-50">
                {hospital?.specialisations?.map((specialisation: any) => (
                  <SpecialisationTag
                    key={specialisation?.id}
                    specialisation={specialisation}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1 rounded-lg bg-gray-50">
              <span className="text-sm p-2 font-semibold text-gray-700 font-satoshi">
                Main Phone number:{" "}
                {hospital?.contact?.phone_numbers[0]?.phone_number}
              </span>

              <div className="flex flex-col space-y-1 rounded-lg bg-gray-50">
                <span className="text-sm px-2 font-normal text-gray-700 font-satoshi">
                  More
                </span>

                <div className="flex flex-wrap rounded-lg bg-gray-50">
                  {hospital?.contact?.phone_numbers
                    ?.slice(1)
                    ?.map((item: any, index: number) => (
                      <span
                        key={item?.id}
                        className="text-sm font-medium m-1 text-gray-700 bg-white w-fit h-fit p-1 rounded-md font-satoshi"
                      >
                        {index + 2}: {item.phone_number}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1 rounded-lg bg-gray-50">
              <span className="text-sm p-2 font-semibold text-gray-700 font-satoshi">
                Main Email: {hospital?.contact?.emails[0]?.email}
              </span>

              <div className="flex flex-col space-y-1 rounded-lg bg-gray-50">
                <span className="text-sm px-2 font-normal text-gray-700 font-satoshi">
                  More
                </span>

                <div className="flex flex-wrap rounded-lg bg-gray-50">
                  {hospital?.contact?.emails
                    ?.slice(1)
                    ?.map((item: any, index: number) => (
                      <span
                        key={item?.id}
                        className="text-sm font-medium m-1 text-gray-700 bg-white w-fit h-fit p-1 rounded-md font-satoshi"
                      >
                        {index + 2}: {item.email}
                      </span>
                    ))}
                </div>
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
        <HospitalCardList hospitalsData={[]} />
      </div>
    </section>
  );
};

export default HospitalPage;
