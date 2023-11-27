'use client'
import ModalReview from "@/components/listing-image-gallery/components/ModalReview";
import React from "react";


const Page = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return  (
    <>
      <ModalReview 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* <ReviewDetail/> */}
      <button onClick={() => setIsOpen(true)}>리뷰 작성</button>

    </>
  );
};

export default Page;