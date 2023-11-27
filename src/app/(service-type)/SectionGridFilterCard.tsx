"use client"
import React, { FC, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";
import DropDownOption from "@/components/button/dropDownoption";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ElectroOption from "@/components/button/electroOption";
import { useSession } from "next-auth/react";
import ErrorFunction from "../ErrorFun";
import { GetSearchType } from "@/types/search/getSearchType";


export interface SectionGridFilterCardProps {
  className?: string;

}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",

}) => {

  const pathname = usePathname()

  const params = useSearchParams();
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;
  const regionCode = params.get("region");
  const serviceType = params.get("type");
  const date = params.get("date");
  const dateFormat = date?.replace(/\./g, '-');

  const [fetchData, setFetchData] = useState<GetSearchType[]>()

  const typeOfService =
    pathname === "/house-keeper" ? 1 :
    pathname === "/moving-clean" ? 2 :
    pathname === "/office-clean" ? 3 :
    pathname === "/electronics-clean" ? 4 : 0;

  useEffect(() => {
    if (serviceType && date && dateFormat) {
      getSearchFetch()
    } else if(typeOfService!==0) {
      getNormalSearchFetch(typeOfService)
    }

  }, [date])

  const getNormalSearchFetch = async (type: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/client/service?type=${type}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
        Email: `${useremail}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log("data:", data);
      setFetchData(data.result)
      return data;
    } else {
      ErrorFunction("검색 실패");
    }
  };

  const getSearchFetch = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/client/search?region=${regionCode}&type=${serviceType}&date=${dateFormat}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
        Email: `${useremail}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log("data:", data);
      setFetchData(data.result)
      return data;
    } else {
      ErrorFunction("검색 실패");
    }
  };

  // console.log(fetchData);


  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        className="mt-10"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            {fetchData?.length}개의 업체가 조회되었습니다.
          </span>
        }
      />

      <div className={`flex ${pathname === '/electronics-clean' ? "justify-between" : "justify-end"} relative mb-8 lg:mb-11`}>
        {pathname === '/electronics-clean' ?
          <>
            <TabFilters />
            <DropDownOption />
          </>
          :
          <DropDownOption />
        }
      </div>

      {/* <div className = "flex justify-end relative mb-8 lg:mb-11">
        <DropDownOption/>
      </div> */}

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {fetchData?.map((item) => (
          <StayCard2 key={item.serviceId} data={item} size={"default"} className={""} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
