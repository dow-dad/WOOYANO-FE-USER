import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta";
import { PostDataType } from "@/data/types";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";

export interface Card3Props {
  className?: string;
  post: PostDataType;
}

const Card3: FC<Card3Props> = ({ className = "h-full", post }) => {
  // const { title, href, featuredImage, desc, postType } = post;

  return (
    <div className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}>
      {/* <div className={`block flex-shrink-0 sm:w-56 sm:ml-6  overflow-hidden mb-5 sm:mb-0`}>
        <div className="block w-40 h-40 overflow-hidden rounded-full">
          <Image
            src={featuredImage}
            alt={title}
            width={200}
            height={200}
          />
        </div>
        <PostTypeFeaturedIcon
          className="absolute left-2 bottom-2"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <div className="flex justify-between mb-3">
            <h3>서비스 상태</h3>
            <Link href={href}> 
              <button className="border border-slate-400 w-[85px] h-[35px] rounded-2xl" >
                예약 상세
              </button>
            </Link>
          </div>
          <h2 className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}>
            <Link href={href} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>
          <div className="hidden sm:block sm:mt-2">
            <div className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
              {desc}
            </div>
          </div>
        </div>
        <PostCardMeta meta={{ ...post }} />
      </div> */}
    </div>
  );
};

export default Card3;
