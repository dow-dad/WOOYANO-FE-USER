'use client'
import React, { FC, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import ServiceInput from "../ServiceInput";

export interface searchFormType {
  region: string | "";
  service: string | "";
  date: string | "";
  region_code:number | 0;

}
const StaySearchForm: FC<{}> = ({ }) => {
  const [searchForm, setSearchForm] = useState<searchFormType>({
    region: "",
    service: "",
    date: new Date().toLocaleDateString(),
    region_code:0
  });


  // console.log(searchForm);
  
  

  const handleSearchForm = (e: string, type: string, region_code?:number) => {
    if (e !== undefined && e !== null) {
      if (type === '위치') {
        setSearchForm({
          ...searchForm,
          region: e,
          region_code:region_code as number
        })
      } else if (type === "서비스") {
        setSearchForm({
          ...searchForm,
          service: e
        })
      } else if (type === "날짜") {
        setSearchForm({
          ...searchForm,
          date: e
        })
      }
    }
  }



  const renderForm = () => {
    return (
      <form className="w-full grid relative mt-8 md:flex md:rounded-full rounded-lg shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        {/* 검색창 위치 */}
        <LocationInput className="flex-[1.5]" handleSearchForm={handleSearchForm} />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        {/* 검색창 서비스 */}
        <ServiceInput className="flex-[1.5]" handleSearchForm={handleSearchForm} />
        {/* 검색창 날짜 */}
        <StayDatesRangeInput className="flex-[1.5]" handleSearchForm={handleSearchForm} searchForm={searchForm} />

        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput className="flex-1" /> */}
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
