'use client'
import ModalReview from "@/components/listing-image-gallery/components/ModalReview";
import ServiceHistoryCard from "@/components/servicehistory/ServiceHistoryCard";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Heading from "@/shared/Heading";
import Pagination from "@/shared/Pagination";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";

export interface SectionLatestPostsProps {
  newPostData: PostDataType[];
  className?: string;
  postCardName?: "card3";
  data: any;
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  newPostData,
  postCardName = "card3",
  className = "",
  data
}) => {
  const username = data?.username;

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  console.log(data)

  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
      case "card3":
        return <ServiceHistoryCard key={post.serviceId} className="" post={post} onOpen={onOpen}/>;

      default:
        return null;
    }
  };

  return (
    <>
    <ModalReview 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="mb-8 flex flex-col justify-start items-start ml-4 md:ml-0 md:justify-between md:items-center md:flex-row">
        <h1 className="text-[1.5rem] font-bold mb-3 md:mb-0">{username}님의 서비스 🎈</h1>
        <p className="text-sm text-gray-500 text-right">
          {newPostData.length}개 서비스가 조회되었습니다.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full">
          <div className={`grid gap-6 grid-cols-1 xl:grid-cols-2`}>
            {newPostData.map((post) => renderCard(post))}
          </div>
          <div className="flex justify-center mt-10 ">
            {/* <Pagination /> */}
            <ButtonPrimary loading>더보기</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SectionLatestPosts;
