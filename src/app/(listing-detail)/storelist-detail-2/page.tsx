"use client";

import React, { FC, useEffect, useState } from "react";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PHOTOS } from "./constant";
import { Route } from "next";
import { FaHeart, FaThumbsUp } from "react-icons/fa";
import { DEMO_MOVING_LISTINGS } from "@/data/listings";
import TapMenu from "@/components/detail/tap/tapMenu";
import DetailTap2 from "./DetailTap2";

const DEMO_DATA = DEMO_MOVING_LISTINGS;

export interface ListingStayDetailPageProps {}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({}) => {

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const thisPathname = usePathname();
  const router = useRouter();
  const params=useSearchParams().get('storeid');
  const [ data, setData ] = useState<any>({} as any);
  // console.log(thisPathname);
  
  useEffect(()=>{
    // console.log(DEMO_DATA)
    const getData = async () => {
      // const data = await fetch('test api uri');
      const res = DEMO_DATA.find( item => item.id === `stayListing_${params}_`)
      // console.log(res)
      setData(res)
    }
    getData();
  },[params])
  

  // console.log(params);
  

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const renderSection1 = () => (
    <div className="listingSection__wrap !space-y-6">
      {/* 1 */}
      <div className="flex justify-between items-center px-5">
        <div className="flex justify-start gap-5">
          <Badge name="추천" />
          <span className="flex justify-start items-center">
            <i className="las la-map-marker-alt text-sm"></i>
            <span className="ml-1 text-xs">부산광역시 해운대구</span>
          </span>
        </div>
        {/* 공유 및 즐겨찾기 버튼 */}
        <LikeSaveBtns />
      </div>

      {/* 2 */}
      <div className="flex flex-col justify-center items-center gap-3 pb-5">
        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold">
          삐까뻔쩍
        </h2>
        <p className="text-sm text-gray-500 md:w-[80%] text-center">청소업체고민NO! 흔적없이 꼼꼼하고 완벽하게 - 부산입주청소, 믿고 맡겨주세요! 부산에어컨청소/입주청소/홈케어시공 꼼꼼하고 깨끗한청소는 에어홈닥터입니다. 공동구매시 추가할인 해드립니다
확실하고 꼼꼼한청소 깔끔한청소 문의주세요</p>
      </div>

      {/* 3 */}
      <div className="flex justify-center gap-5 space-x-4">
        <div className="flex items-center gap-3">
        {/* 좋아요 버튼 */}
        <FaThumbsUp className="fill-sky-500" />
        <p className="text-gray-500">{data && data.reviewCount}</p>
        </div>

        {/* <StartRating /> */}
        
        <div className="flex items-center gap-2">
          <FaHeart className="fill-red-600"/>
          <p className="text-gray-500">{data && data.favorite}</p>
        </div>
      </div>
    </div>
  );

  
  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
          {/* SUBMIT */}
        <ButtonPrimary href={`/serviceform`}>예약하기</ButtonPrimary>
      </div>
    );
  };

  return (

    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              className="object-cover rounded-md sm:rounded-xl"
              src={PHOTOS[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                index >= 3 ? "hidden sm:block" : ""
              }`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <Image
                  fill
                  className="object-cover rounded-md sm:rounded-xl "
                  src={item || ""}
                  alt=""
                  sizes="400px"
                />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>
              
      {/* MAIN */}
      <main className=" relative z-10 mt-10 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-4/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {/* 상세페이지 레이아웃 */}
          {renderSection1()}
          <div className="flex justify-center w-full">
            <DetailTap2 />
          </div>
        </div>
        
        {/* SIDEBAR */}
        
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          {/* 스크롤 시 따라다니는 사이드바 */}
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
        
      </main>

    </div>
  );
};


// const SidebarContent: FC<{ worker: any }> = ({ worker }) => {
//   if (!worker) {
//     return <div>Please select a worker</div>;
//   }

//   return (
//     <div className="listingSectionSidebar__wrap shadow-xl">
//       <p>Name: {worker.name}</p>
//       <p>Service: {worker.service}</p>
//       <p>Time: {worker.time}</p>
//       <p>Description: {worker.desc}</p>
//     </div>
//   );
// };


export default ListingStayDetailPage;
