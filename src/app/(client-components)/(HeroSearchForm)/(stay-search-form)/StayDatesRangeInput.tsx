"use client";

import React, { Fragment, useState, FC, useEffect, SetStateAction } from "react";
import { PathName } from "@/routers/types";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import ButtonSubmit from "../ButtonSubmit";
import ClearDataButton from "../ClearDataButton";
import Calendar from 'react-calendar';
import moment from 'moment';
import './serviceCalenderModule.css';
import { searchFormType } from "./StaySearchForm";


export interface StayDatesRangeInputProps {
  className?: string;
  fieldClassName?: string;
  hasButtonSubmit?: boolean;
  handleSearchForm: (e:string,type:string)=>void;
  searchForm:searchFormType;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ nc-hero-field-padding ]",
  hasButtonSubmit = true,
  handleSearchForm,
  searchForm,
}) => {


  const [date, setDate] = useState<Date>(new Date());
  const [url,setUrl]=useState<PathName>();

  const onChangeDate = (dates:Date) => {
    const date = dates;
    setDate(date)
  };
  
  useEffect(()=>{
    handleSearchForm(date.toLocaleDateString().replace(/\s/g,"").slice(0,-1),'날짜')
    
  },[date])

  useEffect(()=>{
    makeUrlParam()
  },[searchForm])

  const saveLocalStorage=()=>{
    const searchData={
      service:searchForm.service,
      region:searchForm.region,
      date:searchForm.date
    }
    localStorage.setItem('searchData',JSON.stringify(searchData));
  }

  const makeUrlParam =()=>{
    if (searchForm.service==="가사도우미 청소"){
      setUrl(`/house-keeper/?region=${searchForm.region_code}&type=1&date=${searchForm.date}` as SetStateAction<PathName | undefined>);
    }
    if (searchForm.service==="이사/입주 청소"){
      setUrl(`/moving-clean/?region=${searchForm.region_code}&type=2&date=${searchForm.date}` as SetStateAction<PathName | undefined>);
    }
    if (searchForm.service==="사무실 청소"){
      setUrl(`/office-clean/?region=${searchForm.region_code}&type=3&date=${searchForm.date}` as SetStateAction<PathName | undefined>);
    }
    if (searchForm.service==="가전제품 청소"){
      setUrl(`/house-keeper/?region=${searchForm.region_code}&type=4&date=${searchForm.date}` as SetStateAction<PathName | undefined>);
    }
  }

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {date?.toLocaleDateString("ko-kr", {
              month: "short",
              day: "2-digit",
            }) || "날짜 선택"}

          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"서비스 날짜"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${open ? "nc-hero-field-focused" : ""
              }`}
          >
            <Popover.Button
              className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${open ? "nc-hero-field-focused" : ""
                }`}
            >
              {renderInput()}
              {date && open && (
                <ClearDataButton onClick={() => onChangeDate(new Date())} />
              )}
            </Popover.Button>
            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4" onClick={saveLocalStorage}>
                <ButtonSubmit href={url} />
              </div>
            )}
          </div>
          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute xl:left-1/2 z-10 mt-3 top-full min-w-[350px] -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-6">
                <div className='w-full'>
                  <Calendar
                    onChange={onChangeDate as any}
                    formatMonthYear={(locale, date) => moment(date).format('YYYY.MM')}
                    value={date}
                    calendarType='gregory'
                    formatDay={(locale, date) => moment(date).format('D')}
                  />

                </div>
                {/* <div className='mt-[40px]'>{date?.toLocaleString()}</div> */}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;
