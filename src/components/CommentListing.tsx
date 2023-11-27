import React, { FC } from "react";
import Avatar from "@/shared/Avatar";

import Image from "next/image";

import { ReviewDataType } from "@/types/house-keeper-detail/reviewDataType";



export interface CommentListingProps {
  className?: string;
  reviewData: ReviewDataType
}


const CommentListing: FC<CommentListingProps> = ({
  className = "",
  reviewData
}) => {
  

  return (
    <>
      <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
        {reviewData.imageUrlList.map((item, index) => (
          <div key={index}>
            <Image
              className="object-cover rounded-md sm:rounded-xl "
              src={item || ""}
              alt=""
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
      <div
        className={`nc-CommentListing flex justify-center space-x-4 ${className}`}
        data-nc-id="CommentListing"
      >

        <div className="p-0.5">
          <Avatar
            // sizeClass="h-10 w-10 text-lg"
            // radius="rounded-full"
            userName={"이훙훙"}
          // imgUrl={data.avatar}
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between space-x-3">
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                {/* 작성자명 */}
                <span>{reviewData.userEmail}</span>
                
              </div>
              {/* 작성일자 */}
              <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                {new Date(reviewData.createAt).toLocaleDateString().slice(0, -1)}
              </span>
            </div>
            {/* 평가 */}
            <div className="text-xl font-semibold text-secondary-6000">
              {reviewData.reuse === true ? "다음에도 이용할게요:)" : "이번만 이용할게요:("}
            </div>
          </div>
          <div className="flex justify-center items-center my-4">
            <div className="w-[500px]">
              {/* <ImgSwiper/> */}
            </div>
          </div>

          {/* 작업자 및 서비스 */}
          
          {/* <div className="flex justify-end text-xs text-gray-500 mt-5 mb-2 gap-3">
            <div className="border border-dotted border-slate-400 rounded-2xl leading-8 px-3" style={{ borderWidth: '3px' }}>
              
              기사님
            </div>
          </div> */}

          <div className="border border-white rounded-2xl relative px-4 mt-5 bg-slate-100">
            {/* 리뷰 내용 */}
            <span className="text-slate-100 text-[36px] absolute top-[-19px] left-[3px]">
              ▲
            </span>
            <span className="block text-black dark:text-neutral-300 leading-10">
              {reviewData.content}
            </span>
          </div>


          {/* 리뷰 답글 */}
          <div className="bg-blue-100 rounded-2xl relative leading-10 px-5 mt-8 break-all">
            <span className="text-blue-100 text-[36px] absolute bottom-[-29px] right-[3px]">
              ▼
            </span>
            {reviewData.answerContent}
          </div>

        </div>
      </div>
    </>
  );
};

export default CommentListing;
