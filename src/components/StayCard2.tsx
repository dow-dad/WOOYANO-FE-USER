import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import Image from "next/image";
import Good from "@/images/ui/good";

export interface StayCard2Props {
  className?: string;
  data?: StayDataType;
  size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard2: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    galleryImgs,
    // listingCategory,
    // address,
    title,
    // bedrooms,
    href,
    like,
    // saleOff,
    // isAds,
    // price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        {/* 스와이퍼 */}
        <GallerySlider
          uniqueID={`StayCard2_${id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={galleryImgs}
          imageClass="rounded-lg"
          href={href}
        />
        <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />

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
            {/* {isAds && <Badge name={"ADS"} color="green" />} */}
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"
                }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            <div>
            <Good/>
            </div>
            <span className="">{reviewCount}</span>
        </div>
      </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <div>
            찜 수
          </div>
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
      <Link href={href}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard2;
