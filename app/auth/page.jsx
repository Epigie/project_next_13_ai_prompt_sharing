"use client";
import Link from "next/link";
import { IoEllipse } from "react-icons/io5";

// resources
import AppImage from "@components/AppImage";
import Button from "@components/Button";
import Logo from "public/images/logo.png";
import { classNames } from "@app/utilities/common";
import AuthFramework from "@components/framework/AuthFramework";

export default function WelcomePage() {
  return (
    <AuthFramework>
      <section className="flex flex-col justify-end w-full h-full py-4 space-y-4 transition-all duration-300 ease-in-out bg-white/90 lg:bg-white/90 md:w-3/5 lg:w-2/5 lg:px-6 lg:items-center lg:space-x-16 lg:space-y-0 lg:justify-center lg:flex-row">
        <section className="flex flex-col items-start self-center px-4 py-0 text-blue-500 lg:py-4 lg:w-fit lg:space-x-0 lg:space-y-0 lg:items-start">
          <section className="flex self-center py-4 text-blue-500 lg:w-fit lg:space-x-0 lg:space-y-0 lg:items-start">
            <AppImage
              src={Logo}
              className={`object-cover`}
              alt={"HospitalFinder logo"}
              height="h-16 md:h-24 2xl:h-28"
              width="w-16 md:w-24 2xl:28"
              linkTo={`/`}
              sizes="(max-width: 768px) 112px, (max-width: 1280px) 112px, (max-width: 1536px) 112px, 64px"
            />

            <section className="relative flex flex-col items-center self-center w-auto space-y-4 text-blue-500 lg:items-start lg:mt-0">
              <h1 className="self-center text-5xl md:text-8xl">{`HospitalFinder`}</h1>
            </section>
          </section>
          <h2 className="flex self-center text-base font-medium text-center w-fit text-gray-950 lg:text-xl">
            {`Discover Specialised Hospitals.`}
          </h2>
        </section>
      </section>

      <section className="flex flex-col justify-start h-full px-4 space-y-4 transition-all duration-300 ease-in-out lg:py-4 lg:pb-20 lg:justify-between md:w-3/5 bg-gradient-to-b from-white/90 to-white/50 lg:bg-gradient-to-bl lg:from-white/90 lg:to-white/70">
        <section className="flex flex-col-reverse items-center justify-center flex-1 w-full lg:justify-center h-fit lg:self-center lg:space-y-4 lg:flex-col lg:w-fit">
          <h1 className="flex self-center pt-4 text-base font-medium lg:text-xl">{`Discover Specialised Hospitals.`}</h1>
          <section className="flex items-center justify-center w-full space-x-6 lg:space-x-0 lg:justify-center h-fit lg:self-center lg:space-y-4 lg:flex-col lg:w-fit">
            <Link
              href={"/auth/register"}
              className="flex items-center self-center mt-1"
            >
              <Button
                bgColor={"bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}
                padding={`py-1.5 lg:py-2.5 px-2.5 lg:px-3.5`}
              >
                Register Now
              </Button>
            </Link>
            <Link
              href={"/auth/login"}
              className="flex items-center self-center mt-1"
            >
              <Button
                bgColor={"bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}
                padding={`py-1.5 lg:py-2.5 px-2.5 lg:px-3.5`}
              >
                Login Now
              </Button>
            </Link>
          </section>
        </section>

        <section className="flex flex-col self-center w-full pb-4 space-x-4 text-center text-gray-950">
          <section className="flex flex-wrap items-center self-center py-4 space-x-4 text-justify lg:text-center w-fit">
            <IoEllipse className={`hidden lg:flex w-1 h-1`} />
            <Link href="https://link.co.zm" className={`flex `}>
              Link Pharmacy
            </Link>
            <IoEllipse className={`flex w-1 h-1`} />
            <Link href="/docs/about" className={`flex `}>
              About
            </Link>
            <IoEllipse className={`flex w-1 h-1`} />
          </section>

          <Link
            href="/docs/about"
            className="flex flex-col self-center px-6 space-4"
          >
            &copy; Hospital Finder 2023
          </Link>
        </section>
      </section>
    </AuthFramework>
  );
}
