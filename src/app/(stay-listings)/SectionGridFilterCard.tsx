import React, { FC } from "react";
import { DEMO_MOVING_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";


import DropDownOption from "@/components/button/dropDownoption";
import StayCard2 from "@/components/StayCard2";
import ElectroOption from "@/components/button/electroOption";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_MOVING_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 
      className="mt-10"
      subHeading={
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          n개의 업체가 조회되었습니다.
        </span>
      }
      />

      <div className="flex justify-between mb-8 lg:mb-11">
        <ElectroOption/>
        <DropDownOption />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* {data.map((stay) => (
          <StayCard2 key={stay.id} data={stay} />
        ))} */}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
