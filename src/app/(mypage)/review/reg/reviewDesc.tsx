'use client'
import React, { ChangeEvent, FC, useState } from "react";
import Textarea from "@/shared/Textarea";
import { ReviewType } from "@/types/ReviewType";

export interface PageAddListing6Props {
  setReviewData: React.Dispatch<React.SetStateAction<ReviewType>>;
  reviewData:ReviewType;
}


const ReviewDesc: FC<PageAddListing6Props> = ({reviewData,setReviewData}) => {

  const handleRadioChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({
      ...reviewData,
      content: e.target.value
    });
  };
  

  

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          서비스에 대해 솔직한 후기를 남겨주세요.
        </h2>
      </div>

      <Textarea placeholder="솔직하게 작성한 리뷰는 서비스 이용을 고민하는 분들께 큰 도움이 됩니다." onChange={handleRadioChange} rows={14}>
        {reviewData.content}
      </Textarea>

      <div>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          1. 작성한 리뷰는 닉네임, 프로필 이미지와 함께 누구나 볼 수 있도록 공개됩니다. <br/>
          2. 허위 리뷰나 명예훼손, 욕설, 타인비방 등 선량한 업주나 제3자의 권리를 침해하는 게시물은
          서비스 이용약관이나 관련 법률에 따라 제재를 받을 수 있습니다. <br/>
          3. 우야노는 위와 내부 규정에 따라 게시물 작성자에게 경고, 주의 등의 조치를 취할 수 있고,
          해당 게시물을 삭제하거나 보이지 않게 할 수 있습니다. 게시에 따른 책임은 작성자에게
          있으며, 우야노는 이에 대한 법적 책임을 지지 않습니다.
        </span>
      </div>
    </>
  );
};

export default ReviewDesc;
