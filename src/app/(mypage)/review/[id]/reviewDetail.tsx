'use client'
import ImgSwiper from '@/components/function/imgSwiper';
import { NameDataType, ReserveDataType, ReviewDetailType } from '@/types/ReviewType';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'

export interface ReviewDetailProps {
  className?: string;
  // data를 함수로 변경
  data?: () => Promise<ReviewDetailType>;
}

// 리뷰 상세페이지 fetch reviewDetail = (답글, 리뷰 내용, 작성일, 이미지 리스트, 반응)
async function getReviewData(reviewId: number, session: Session) {
  if (!session) {
    console.error("세션이 만료됨")
    return null
  }
  try {
    const response = await fetch(`http://3.35.62.185:8000/api/v1/review-bookmark/${reviewId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.result.token}`,
      }
    })
    if(response.ok) {
      const result = await response.json();
      console.log('review data 성공 : ', result);
      return result;
    }
  } catch (error) {
    console.log('review data 실패 : ', error)
  }
}

// 작업자 아이디 위한 fetch (서비스명, 예약 날짜, 작업자 아이디)
async function getWorkId(reservationNum: string, session: Session) {
  console.log("예약번호 : ", reservationNum)
  try {
    const response = await fetch(`http://3.35.62.185:8000/api/v1/reservation/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.result.token}`
      },
      body:JSON.stringify({
        "reservationNum" : reservationNum,
      })
    })
    if (response.ok) {
      const result = await response.json();
      console.log('worker data 성공 : ', result)
      return result;
    }
  } catch (error) {
    console.log('worker data : ', error)
  }
}

// 업체명과 작업자 이름을 위한 fetch 
async function getWorkerName(serviceId: number, workerId: number, session: Session) {
  console.log("서비스 아이디 : ", serviceId)
  console.log("작업자 아이디 : ", workerId)
  try {
    const response = await fetch(`http://3.35.62.185:8000/api/v1/client/review/detail?serviceId=${serviceId}&workerId=${workerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.result.token}`
      },
    });
    if (response.ok) {
      const result = await response.json();
      console.log('name data 성공 : ', result)
      return result;
    }
  } catch (error) {
    console.log('name data 실패 : ', error)
  }
}

const ReviewDetail: FC<ReviewDetailProps> = ({ data }) => {
  
  const { data: session } = useSession();
  // 리뷰 상세페이지
  const [reviewDetail, setReviewDetail] = useState<ReviewDetailType>();
  // 작업자 아이디
  const [reserveDetail, setReserveDetail] = useState<ReserveDataType[]>([]);
  // 작업자 아이디가 들어있는 데이터가 배열이기 때문에 0번째 행만 사용하기 위해
  const [reserveDetailBasic, setReserveDetailBasic] = useState<ReserveDataType>();
  // 업체명 작업자 이름
  const [nameDetail, setNameDetail] = useState<NameDataType>();
  const router = useRouter();
  const pathname = usePathname();
  const reviewId = pathname.split("/")[2];
  const [date,setDate] = useState<Date>();
  const [serviceDate, setServiceDate] = useState<Date>()
  const reservationNum = useSearchParams().get('reservationNum')
  const serviceId = useSearchParams().get('serviceId')

  useEffect(() => {
    const reviewDetailfetch = async () => {
      try {
        if (reviewId && session) {
          // 리뷰 아이디
          const parsedReviewId = parseInt(reviewId as string, 10)
          const res = await getReviewData(parsedReviewId, session);
          console.log("날짜 : ", res.result.createdAt)
          if (res) {
            setDate(new Date(res.result.createdAt));
            // reviewDetail에 리뷰 상세 내용을 저장
            setReviewDetail(res.result)

            if (res.result && reservationNum) {
              const reserveRes = await getWorkId(reservationNum, session);
              if (reserveRes && reserveRes.result && reserveRes.result.length >0) {
                // 데이터가 배열로 있을 때 0번째 행의 데이터를 저장
                const reserveResBasic = reserveRes.result[0]
                console.log("!!!!!!", reserveResBasic)
                setReserveDetailBasic(reserveDetailBasic)
                setReserveDetail(reserveRes.result)
                setServiceDate(new Date(reserveResBasic.reservationDate))
                const workerId = reserveResBasic?.workerId
                console.log("작업자 아이디 : ", workerId)

                if (reserveRes.result && serviceId) {
                  const parseWorkerId = parseInt(workerId as string, 10)
                  const parseServiceId = parseInt(serviceId as string, 10)
                  const nameRes = await getWorkerName(parseWorkerId, parseServiceId, session);
                  console.log(nameRes)
                  if (nameRes) {
                    setNameDetail(nameRes.result)
                  }
                }
                
                
              }
            }
          }
        }
      } catch (error) {
        console.log("loading error", error)
      }
    }
    reviewDetailfetch();
  }, [reviewId, session, reservationNum, serviceId])

  console.log("이미지 url", reviewDetail?.imageUrlList)

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
          <h2 className="mt-5 text-3xl lg:text-4xl font-semibold">
            리뷰 상세내역
          </h2>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="">
            <div className="flex flex-wrap gap-10">
              {/* 서비스 상세 내용 */}
              <div>
                <h3 className="text-2xl font-semibold">업체명</h3>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>
                <div className=" mb-6">
                  {nameDetail?.serviceName}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">작성일자</h3>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>
                <div className=" mb-6">
                  {date?.toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">날짜</h3>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>
                  <p>
                    {serviceDate?.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit"
                    })}
                  </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">기사명</h3>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>
                  <p>
                  {nameDetail?.workerName}
                  </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">서비스</h3>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>
                  <div className="flex flex-col">
                    {reserveDetail.map((item, index)=>(
                      <div key = {index}>
                      <div>{item.serviceItemName}</div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-2xl font-semibold">평가</h3>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>
              <span className="text-xl font-semibold text-secondary-6000">
                {reviewDetail?.reuse ?"다음에도 이용할게요:)" : "이번에만 이용할게요:("}
              </span>
            </div>
          </div>

          <div>
            <ImgSwiper reviewimg = {reviewDetail?.imageUrlList || []}/>
          </div>
      

          {/* 리뷰 내용 */}
          <div>
            <h3 className="text-2xl font-semibold">작성 내용</h3>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>

            <div className="mt-6">
              <span>
                {reviewDetail?.content}
              </span>
            </div>
          </div>
        </div>
      );
  };

  const renderAnswer = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h3 className="text-2xl font-semibold">사장님</h3>
        <div className="mt-6">
          <span className="leading-10">
            {reviewDetail?.answerContent}
          </span>
        </div>
      </div>
    )
  }
  

  return (
    <div>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="mt-5 w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderAnswer()}</div>
      </main>
    </div>
  )
}
export default ReviewDetail;