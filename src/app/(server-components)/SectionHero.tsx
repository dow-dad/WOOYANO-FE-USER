import React, { FC } from "react";
import imagePng from "@/images/hero-right.png";
import HeroSearchForm from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Charactor from "@/images/svg_component/charactor";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="absolute z-0 xl:bottom-[60px] lg:bottom-[40px] md:bottom-[107px] sm:bottom-[95px] max-sm:hidden"
        style={{left: '50%',  transform: 'translateX(-50%)'}}
      >
        <Charactor />
      </div>
      <div className="z-10 mb-12 lg:mb-0 w-full">
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default SectionHero;
