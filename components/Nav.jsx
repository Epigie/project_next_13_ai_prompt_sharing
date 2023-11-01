"use client";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="w-full pt-3 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Hospital Finder</p>
      </Link>

      <section className="relative flex">
        <Link href="/hospitals/new" className="purple_btn">
          Add Hospital
        </Link>
      </section>
    </nav>
  );
};

export default Nav;
