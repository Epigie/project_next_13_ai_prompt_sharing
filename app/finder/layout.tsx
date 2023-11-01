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
  <body className="flex w-screen h-screen">
    {/* <AuthProvider> */}
    <section className="main">
      <div className="gradient" />
    </section>

    <main className="app">
      <Nav />
      {children}
    </main>
    {/* </AuthProvider> */}
  </body>
);

export default FinderLayout;
