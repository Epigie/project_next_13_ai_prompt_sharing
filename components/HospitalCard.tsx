"use client";

import { useState } from "react";
import Image from "next/image";
import SpecialisationTag from "@components/SpecialisationTag";
import Link from "next/link";

interface HospitalCardProps {
  hospital?: any;
}

const HospitalCard = ({ hospital }: HospitalCardProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  const onCopy = () => {
    setCopied(hospital?.name);
    setCopyMsg("Copied to clipboard");
    navigator.clipboard.writeText(hospital?.id);
    setCopied(null);

    setTimeout(() => {
      setCopyMsg(null);
    }, 2000);
  };

  return (
    <section
      className={`group hospital_card flex-col transition-all duration-200 ease-in-out overflow-hidden relative`}
    >
      <Link
        href={`/hospitals/${hospital?.id}`}
        className="relative flex items-center justify-start w-full h-48 overflow-hidden cursor-pointer"
        style={{ position: "relative" }}
      >
        <Image
          src={hospital?.picture}
          alt={`${hospital?.name}-${hospital?.city}-${hospital?.country}`}
          fill={true}
          sizes="(max-width: 1368px) 288px, (max-width: 1280px) 288px, (max-width: 768px) 288px, 100vw"
          className="object-cover transition-all duration-150 ease-in-out group-hover:scale-110"
        />

        {hospital?.featured && (
          <div className="absolute top-0 pl-2 pr-10 bg-gradient-to-r from-white">
            Featured
          </div>
        )}
      </Link>

      <div className="flex flex-col justify-between w-full bg-white">
        <div className="flex items-center justify-between w-full p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 font-satoshi">
              {hospital?.name}
            </h3>

            <p className="text-sm text-gray-800 font-inter">
              {hospital?.contact?.emails[0]?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full p-4">
          <div className="flex flex-col">
            <p
              className="flex w-full p-1.5 text-sm font-semibold text-gray-800 bg-gray-100 rounded-md cursor-pointer font-satoshi"
              onClick={onCopy}
            >
              {hospital?.contact?.phone_numbers[0]?.phone_number}
            </p>

            <p className="text-sm text-gray-800 font-semibold font-inter">
              {hospital?.contact?.address?.number && (
                <span>{hospital?.contact?.address?.number}</span>
              )}{" "}
              {hospital?.contact?.address?.street && (
                <span>{hospital?.contact?.address?.street}</span>
              )}
              {`${hospital?.contact?.address?.city}, ${hospital?.contact?.address?.country}.`}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full p-2 space-y-1">
          <p className="flex w-full text-sm font-bold text-gray-800 font-satoshi">
            Specialisations
          </p>

          <div className="flex flex-wrap flex-1 w-full">
            {hospital?.specialisations?.map((specialisation: any) => (
              <SpecialisationTag
                key={specialisation?.id}
                specialisation={specialisation}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalCard;
