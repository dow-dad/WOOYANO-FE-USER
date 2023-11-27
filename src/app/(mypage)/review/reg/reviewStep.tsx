'use client'
import React, { useEffect, useState } from "react";
import ReviewRes from "./reviewRes";
import { useRouter } from "next/navigation";
import ReviewDesc from "./reviewDesc";
import ReviewImg from "./reviewImg";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { ReviewType } from "@/types/ReviewType";
import Swal from "sweetalert2";

const ReviewStep = () => {

  const router = useRouter();

  const [reviewData,setReviewData]=useState<ReviewType>({
    reservationNum : "",
    serviceId : 1,
    content : "",
    reuse : true,
    imageUrlList : []
})
  console.log(reviewData);


  const [stepId,setStepId]=useState<number>(0);

  const stepperComponent: any = [
    <ReviewRes key={1}
    reviewData={reviewData} 
    setReviewData={setReviewData} />,
    <ReviewDesc key={2}
    reviewData={reviewData}
    setReviewData={setReviewData} 
    />,
    <ReviewImg key={3}
    reviewData={reviewData}
    setReviewData={setReviewData} />
  ];


  // Fetch 함수 선언
  const jwt="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiY2QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTcwMDEyMzExNywiZXhwIjoxNzAwMTI2NzE3fQ.T86ZcvgzcL4kfzjnDAXD1p4yJsNPknb9JBOBAbvQBlQ"
  async function getJSON(data:ReviewType) {
    // && and 연산자 => 둘다 true이면 if문을 처리
    // || or 연산자 => 둘중에 하나라도 true면 true
      try {
        const response = await fetch(`http://3.35.62.185:8000/api/v1/review-bookmark`, {
          method: "POST", // 또는 'PUT'
          headers: {
            "Content-Type": "application/json",
            "email":"abcd1234@gmail.com",
            "Authorization": `Bearer ${jwt}`
          },
          body:JSON.stringify(data),
        });
        
        if(response.ok){
          const result = await response.json();
          console.log("성공:", result);
          return true
        }
      } catch (error) {
        console.error("실패:", error);
        return false
      }
    
  }

  // Fetch 및 이후에 결과 처리
  async function submitReview() {
    try {
      const result = await getJSON(reviewData);
      
      if (result) {
        // 리뷰 등록 성공 시 실행되는 로직
        Swal.fire({
          text: `리뷰 등록이 완료 되었습니다.`,
          toast: false,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          customClass: {
            container: "my-swal",
          }
        });
  
        // 페이지 이동
        router.push("/review");
      } else {
        // 리뷰 등록 실패 시 실행되는 로직
        Swal.fire({
          text: `리뷰 등록에 실패했습니다.`,
          toast: false,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          customClass: {
            container: "my-swal",
          }
        });
      }
    } catch (error) {
      // 네트워크 에러 또는 파싱 에러 등 예외 처리
      console.error("에러 발생:", error);
    }
  }

  // stepId 감소
  const goToPreviousStep=()=>{
    setStepId(stepId-1)
  }
  // stepId 증가
  const goToNextStep=()=>{
    if(stepId==2){
      // fetch
      submitReview()
    }else{
      setStepId(stepId+1)
    }
    
  }

  return (
    <div
      className={`nc-PageAddListing1 z-[99999] relative`}
    >
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold"></span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            {stepId+1}/ 3
          </span>
        </div>
        {stepperComponent[stepId]}
        <div className="flex justify-end space-x-5">
          {stepId==0?
          <>
            <ButtonPrimary onClick={goToNextStep}>
              {"Continue"}
            </ButtonPrimary>
          </> :
          <>
            <ButtonSecondary onClick={goToPreviousStep}>Go back</ButtonSecondary>
            <ButtonPrimary onClick={goToNextStep}>
              {stepId==2?"Publish":"Continue"}
            </ButtonPrimary> 
          </>
          }
          
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;