"use client";
import React from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { classNames } from "@app/utilities/common";
import AuthFramework from "@components/framework/AuthFramework";

const OnBoardingUser = ({ url }) => {
  const params = useSearchParams();

  return (
    <AuthFramework>
      <section
        className={classNames(
          "relative flex flex-col items-center bg-black/80 lg:flex-row h-full w-full overflow-hidden transition-all duration-300 ease-in-out"
        )}
      >
        <h1 className={styles.title}>
          {params.get("success") ? params.get("success") : "Welcome Back"}
        </h1>

        <Link className={styles.link} href="/admin">
          Create new account
        </Link>
      </section>
    </AuthFramework>
  );
};

export default OnBoardingUser;
