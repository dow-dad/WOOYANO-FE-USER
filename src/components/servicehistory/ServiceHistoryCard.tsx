import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import Image from "next/image";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";

export interface ServiceHistoryCardProps {
  className?: string;
  post: PostDataType;
}

const ServiceHistoryCard: FC<ServiceHistoryCardProps> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage, desc, postType, isReview, reservationDate } = post;

  // local Date
  const nowDate = new Date();
  const reserveDate = reservationDate ? new Date(reservationDate) : nowDate;
  const diff = reserveDate.getTime() - nowDate.getTime();
  const diffDays = Math.abs(Math.ceil(diff / (1000 * 3600 * 24)));
  console.log(diffDays);
  console.log(nowDate);


  return (
    <div className={`relative flex flex-col sm:flex-row items-start rounded-[10px] group ${className} border p-6 bg-white`}>
      <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 mr-0 sm:mr-5">
        <div className="w-[100%] h-[200px] rounded-md object-contain overflow-hidden md:w-45 md:h-48 lg:h-[200px] mb-5 md:mb-0 bg-slate-400">
          <Image
            src={featuredImage}
            alt={title}
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-4/5 mb-2 md:mb-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <h3 
              className="rounded-[0.6rem] text-[0.8rem] flex items-center px-3 h-[30px]"
              style={{
                backgroundColor: postType === "대기" ? "#F87171" : postType === "완료" ? "#333333AA" : "#047857",
                color: "white",
                opacity: 0.9
              }}
            >{postType}</h3>
            <h3 
              className="rounded-[0.6rem] text-[0.8rem] flex items-center px-3 h-[30px] border border-slate-400"
            >{href.slice(0,5)}</h3>
          </div>
          <div className="flex justify-end items-center gap-2">
            {
              !isReview && diffDays <= 3 && (
              <>
                <p className="text-[0.7rem] text-red-400">리뷰마감 {3-diffDays}일</p>
                <Link href={href}> 
                  <button className="w-[30px] h-[30px] rounded-[20px] text-[0.75rem] bg-red-300 text-white flex justify-center items-center gap-1" >
                    <PencilIcon className="w-3 h-3" />
                  </button>
                </Link>
              </>
              )
            }
            <Link href={href}> 
              <button className="w-[30px] h-[30px] rounded-[20px] text-[0.75rem] bg-sky-600 text-white flex justify-center items-center gap-1" >
                <DocumentTextIcon className="w-3 h-3" />
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[97%] h-[0.01rem] bg-slate-300 opacity-50 my-6 relative m-auto">
        <p className="w-2 h-2 rounded-full bg-sky-600 absolute -top-[3px] left-[-3px]"></p>
        <p className="w-2 h-2 rounded-full bg-sky-600 absolute -top-[3px] right-[-3px]"></p>
        </div>
        <h2 className={`font-semibold text-neutral-900 dark:text-neutral-100 text-lg px-2`}>
          <Link href={href} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <div className="hidden sm:block sm:mt-2">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-1 px-2">
            {desc}
          </div>
        </div>
        <PostCardMeta meta={{ ...post }} />
      </div>
    </div>
  );
};

export default ServiceHistoryCard;