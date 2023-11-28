import React, { FC, useEffect, useState } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { FaThumbsUp, FaHeart } from "react-icons/fa";
import { GetSearchType } from "@/types/search/getSearchType";
import { useSession } from "next-auth/react";
import ErrorFunction from "@/app/ErrorFun";
import { ReviewFavoriteCount } from "@/types/serviceList/reviewFavoriteCount";

export interface StayCard2Props {
  className?: string;
  data?: GetSearchType;
  size?: "default" | "small";
}


const StayCard2 = ({ size, className, data }: { size: string | "default", className: string, data: GetSearchType }) => {
  const {
    serviceId,
    name,
    imgUrl,
    description,
    address,
    type,
  } = data;

  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;
  const [reviewFavoriteCount, setReviewFavoriteCount] = useState<ReviewFavoriteCount>();


  useEffect(() => {
    getReviewFavorite()
  }, [usertoken])

  const getReviewFavorite = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/review-bookmark/count/review_bookmark`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
        Email: `${useremail}`,
      },
      body: JSON.stringify([serviceId])
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

  // console.log(reviewFavoriteCount);


  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard2_${serviceId}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={imgUrl}
          imageClass="rounded-lg"
          href={type === "1"
            ? `/house-keeper-detail?storeid=${serviceId}`
            : type === "2"
              ? `/storelist-detail-2?storeid=${serviceId}`
              : type === "3"
                ? `/storelist-detail-2?storeid=${serviceId}`
                : `/house-keeper-detail?storeid=${serviceId}`
          }
        />
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />

        {/* 세일표시 */}
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}>
        <div className="space-y-2">
          {/* <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {listingCategory.name} · {bedrooms} beds
          </span> */}
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"
                }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            <div className="flex gap-3">
              <FaThumbsUp className="fill-sky-500" />
              <span className="">{reviewFavoriteCount?.totalReview}</span>
            </div>

            <div className="flex gap-2">
              <FaHeart className="fill-red-600" />
              <p>{reviewFavoriteCount?.totalBookmark}</p>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          {/* <span className="text-base font-semibold"> */}
          {/* {price} */}
          {/* {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )} */}
          {/* </span> */}
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={type === "1"
        ? `/house-keeper-detail?storeid=${serviceId}`
        : type === "2"
          ? `/storelist-detail-2?storeid=${serviceId}`
          : type === "3"
            ? `/storelist-detail-2?storeid=${serviceId}`
            : `/house-keeper-detail?storeid=${serviceId}`
      }>{renderContent()}</Link>
    </div>
  );
};

export default StayCard2;