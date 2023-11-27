'use client'
import React, { FC } from "react";
import Image from "next/image";
import { CalendarIcon, GiftIcon, ClockIcon } from '@heroicons/react/24/outline'
import { FaHeart, FaThumbsUp } from "react-icons/fa";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
  const router = useRouter();
  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl lg:text-4xl font-semibold">
            서비스 상세내역
          </h2>
          <p className="text-base">
            서비스 예약 상세내역을 조회합니다.
          </p>
        </div>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">예약 내역</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                {/* 업체 로고 */}
                <Image
                  fill
                  alt=""
                  className="object-cover"
                  src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                업체 이름
                </span> */}
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  업체 이름
                </span>
              </div>
              <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex gap-2">
                  <MapPinIcon className="w-5 h-5"/>
                  <p>부산광역시 해운대구</p>
                </div>
              </span>
            </div>
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">

              <CalendarIcon className="w-7 h-7"/>

              <div className="flex flex-col">
                <span className="text-base text-neutral-400">Date</span>
                <span className="mt-1.5 text-lg font-semibold">
                  2023.10.30
                </span>
              </div>
            </div>

            <div className="flex-1 p-5 flex space-x-4">
              
              <ClockIcon className="w-7 h-7"/>

              <div className="flex flex-col">
                <span className="text-base text-neutral-400">Time</span>
                <div className="flex gap-3">
                  <span className="mt-1.5 text-lg font-semibold">10:00</span>
                  <span className="mt-1.5 text-lg font-semibold">-</span>
                  <span className="mt-1.5 text-lg font-semibold">12:00</span>
                </div>
              </div>
            </div>

            <div className="flex-1 p-5 flex space-x-4">
              <GiftIcon className="w-7 h-7"/>

              <div className="flex flex-col">
                <span className="text-base text-neutral-400">Service</span>
                <span className="mt-1.5 text-lg font-semibold">가사도우미 - 원룸</span>
              </div>
              
            </div>
          </div>
        </div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">예약 상세내용</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">예약번호</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                #222-333-111
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">접수일자</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                2023.10.30
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">주소</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                부산광역시 해운대구 리더스마크 4층 스파로스아카데미
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">기사</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                이하늘
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">요청사항</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                집에 고양이가 있으니 주의해주세요 !
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">금액</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                30,000원
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">상태</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                서비스 완료
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-8 pt-[10px]">
          <button className="w-[150px] h-10 border-none bg-sky-600 rounded-2xl text-white">다른 서비스 예약</button>
          <button className="w-[150px] h-10 border-2 border-sky-600 rounded-2xl" onClick={()=>router.push("/review/reg")}>리뷰 작성</button>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PayPage;