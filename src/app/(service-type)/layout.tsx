import BgGlassmorphism from "@/components/BgGlassmorphism";
import React, { ReactNode } from "react";
import SectionHeroArchivePage from "../(server-components)/SectionHeroArchivePage";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28 md:sticky -top-20 z-[10]">
        <SectionHeroArchivePage currentPage="Stays" currentTab="Stays" />
      </div>

      {children}
     
    </div>
  );
};

export default Layout;
