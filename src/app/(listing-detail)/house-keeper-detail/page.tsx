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
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import TapMenu from "@/components/detail/tap/tapMenu";
import { useSession } from "next-auth/react";
import ErrorFunction from "@/app/ErrorFun";
import { WorkerDataType } from "@/types/house-keeper-detail/workerData";
import MobileFooterSticky from "../(components)/MobileFooterSticky";
import { StoreInfoType } from "@/types/house-keeper-detail/storeInfoType";
import { ReviewFavoriteCount } from "@/types/serviceList/reviewFavoriteCount";
import { ReviewDataType } from "@/types/house-keeper-detail/reviewDataType";


export interface ListingStayDetailPageProps { }

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ }) => {
  // 클릭했을때 어떤 기사를 선택했는지 확인
  const [onClickData, setOnClickData] = useState<any>({
    workername: "",
    desc: "",
    workerImg:"",
    workerId:-1,
  });
  //fetch를 위한 session데이터 가져오기
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;


  //path가져오기
  const thisPathname = usePathname();
  const router = useRouter();
  const params = useSearchParams().get('storeid');

  //데이터 저장 변수들
  const [workerData, setWorkerDate] = useState<WorkerDataType[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfoType>({
      clientAddress: "",
      description: "",
      name: "",
      registrationNumber: "",
      serviceAreaList:[],
      serviceId:0,
      serviceImgUrlList:[]
    })
  const [reviewData,setReviewData]=useState<ReviewDataType[]>([]);
  const [reviewFavoriteCount, setReviewFavoriteCount] = useState<ReviewFavoriteCount>();

  useEffect(() => {
    getStoreWorkerList()
    getStoreInfo()
    getReviewFavorite()
    getStoreReview()
  }, [usertoken])
  // console.log(onClickData);

  const getStoreWorkerList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/client/worker/list?serviceId=${params}`;
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
      setWorkerDate(data.result)
      return data;
    } else {
      ErrorFunction("기사를 불러올 수 없습니다.");
    }
  };

  const getStoreInfo = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/client/service-detail?serviceId=${params}`;
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
      setStoreInfo(data.result)
      return data;
    } else {
      ErrorFunction("업체 정보를 불러올 수 없습니다.");
    }
  };

  const getReviewFavorite = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/review-bookmark/count/review_bookmark`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
        Email: `${useremail}`,
      },
      body: JSON.stringify([params])
    });
    if (res.ok) {
      const data = await res.json();
      // console.log("data:", data);
      setReviewFavoriteCount(data.result[0])
      return data;
    } else {
      ErrorFunction("검색결과가 없습니다.");
    }
  };

  const getStoreReview = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/review-bookmark/review/list?serviceId=${params}`;
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
      setReviewData(data.result)
      return data;
    } else {
      ErrorFunction("리뷰 정보를 불러올 수 없습니다.");
    }
  };
  

  

  const renderSection1 = () => (
    <div className="listingSection__wrap !space-y-6">
      {/* 1 */}
      <div className="flex justify-between items-center px-5">
        <div className="flex justify-start gap-5">
          <Badge name="추천" />
          <span className="flex justify-start items-center">
            <i className="las la-map-marker-alt text-sm"></i>
            <span className="ml-1 text-xs">{storeInfo?.clientAddress}</span>
          </span>
        </div>
        {/* 공유 및 즐겨찾기 버튼 */}
        <LikeSaveBtns />
      </div>

      {/* 2 */}
      <div className="flex flex-col justify-center items-center gap-3 pb-5">
        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {storeInfo?.name}
        </h2>
        <p className="text-sm text-gray-500 md:w-[80%] text-center">{storeInfo?.description}</p>
      </div>

      {/* 3 */}
      <div className="flex justify-center gap-5 space-x-4">
        <div className="flex items-center gap-3">
          {/* 좋아요 버튼 */}
          <FaThumbsUp className="fill-sky-500" />
          <p className="text-gray-500">{reviewFavoriteCount?.totalReview}</p>
        </div>

        {/* <StartRating /> */}

        <div className="flex items-center gap-2">
          <FaHeart className="fill-red-600" />
          <p className="text-gray-500">{reviewFavoriteCount?.totalBookmark}</p>
        </div>
      </div>
    </div>
  );


  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {onClickData.workername === "" ?
          <div>
            <h2>기사를 선택해 주세요.</h2>
          </div>
          :
          <>
            {/* PRICE */}
            <div className="flex justify-between">
              <span className="text-3xl font-semibold">
                {onClickData.workername}
                <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                  기사
                </span>
              </span>
            </div>

            {/* SUM */}
            <div className="flex flex-col space-y-4">
              {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>투룸, 쓰리룸 <br />
                  전문 {onClickData.service}</span>
              </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>최소 이용시간</span>
                <span>2시간</span>
              </div> */}
              <div>
                {onClickData.desc}
              </div>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              {/* <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$199</span>
            </div> */}
            </div>

            {/* SUBMIT */}
            <ButtonPrimary href={`/serviceform?name=${onClickData.workername}&workerId=${onClickData.workerId}&workerImg=${onClickData.workerImg}&serviceId=${storeInfo.serviceId}`}>예약하기</ButtonPrimary>
          </>
        }

        {/* 이름, 서비스명, 사진(기사 선택 시에만), 업체명 */}

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
          {storeInfo.serviceImgUrlList.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""
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

              
            </div>
          ))}

          
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-10 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-4/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {/* 상세페이지 레이아웃 */}
          {renderSection1()}
          <div className="flex justify-center w-full">
            <TapMenu setOnClickData={setOnClickData} workerData={workerData} storeInfo={storeInfo} reviewData={reviewData} />
          </div>
        </div>

        {/* SIDEBAR */}

        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          {/* 스크롤 시 따라다니는 사이드바 */}
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>

        <MobileFooterSticky onClickData={onClickData} />
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
