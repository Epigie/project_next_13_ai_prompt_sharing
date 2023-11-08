import { ReactNode } from "react";
import "@styles/globals.css";

import Nav from "@components/Nav";
import AuthProvider from "@auth/AuthProvider";

export const metadata = {
  title: "Hospital Finder",
  description: "Discover Specialised Hospitals worldwide",
};

interface FinderLayoutProps {
  children: ReactNode;
}

const FinderLayout = ({ children }: FinderLayoutProps) => (
  <>
    <section className="main">
      <div className="gradient" />
    </section>

    <main className="app">{children}</main>
  </>
);

export default FinderLayout;
