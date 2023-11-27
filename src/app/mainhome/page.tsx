import React from "react";
import SectionHero from "@/app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";



function MaintHome() {
  return (
    <main className="relative overflow-hidden">
      {/* 배경 그라데이션 컴포넌트*/}
      <BgGlassmorphism />
      <div className="container relative space-y-24 mt-10 mb-24 md:mt-20 sm:mt-10 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        {/* 상단 search bar */}
        <SectionHero className="absolute top-20" />

        {/* SECTION 1 */}
        {/* 우수 서비스 업체 */}
        <SectionGridFeaturePlaces cardType="card1" />
        
        {/* 우수 서비스 업체 기사목록 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        {/* 최근받은 서비스 */}
        <SectionSliderNewCategories />

        

      </div>
    </main>
  );
}

export default MaintHome;
