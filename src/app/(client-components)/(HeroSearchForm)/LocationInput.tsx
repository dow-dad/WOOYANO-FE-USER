"use client";

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC, ReactEventHandler, ReactNode } from "react";
import ClearDataButton from "./ClearDataButton";
import { useSession } from "next-auth/react";
import ErrorFunction from "@/app/ErrorFun";
import { SearchAdress } from "@/types/mainpage/searchAdress";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  handleSearchForm: (e:string,type:string,region_code:number)=>void | null
}


const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "위치",
  desc = "서비스 위치",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  handleSearchForm
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [regionCode,setRegionCode]=useState<number>(0);
  const [showPopover, setShowPopover] = useState(autoFocus);  // Prpover을 true면 열기 false면 닫기
  const [adress,setAdresss]=useState([]);
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    handleSearchForm(value,"위치",regionCode);
  }, [value]);
  
  
  
  
  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const getAdressList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/address/list`;
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
      setAdresss(data.result)
      return data;
    } else {
      ErrorFunction("주소를 불러오지 못했습니다.");
    }
  };

  useEffect(()=>{
    if(usertoken && useremail) {
      getAdressList()
    }
  },[usertoken])
  
  // console.log(adress);
  

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // 마우스 이벤트가 안에 있을때는 그냥 return한다.
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const handleSelectLocation = (item: string,regionCode:number) => {
    setValue(item);
    setRegionCode(regionCode)
    setShowPopover(false);
  };

  

  const renderRecentSearches = () => {
    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          주소
        </h3>
        <div className="mt-2">
          {adress.map((item:SearchAdress,idx) => (
            <span
              onClick={() =>{ handleSelectLocation(item.extraAddress+item.localAddress, item.localCode); }}
              key={idx}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
                {item.localAddress+" "+item.extraAddress}
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            ref={inputRef}
            disabled
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setValue("");
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
