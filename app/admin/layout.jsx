import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Hospital Finder",
  description: "Discover Specialised Hospitals worldwide",
};

const AdminRootLayout = ({ children }) => (
  <html lang="en">
    <body className="flex w-screen h-screen">
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default AdminRootLayout;
