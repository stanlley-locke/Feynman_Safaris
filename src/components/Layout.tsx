"use client";

import Header from "./Header";
import Footer from "./Footer";
import FloatingSocialIcons from "./FloatingSocialIcons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingSocialIcons />
    </div>
  );
};

export default Layout;
