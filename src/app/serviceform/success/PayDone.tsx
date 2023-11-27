'use client'
import StartRating from "@/components/StartRating";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ErrorFunction from "@/app/ErrorFun";

import imgUrl from "@/images/wooyano_cha.svg"

export interface PayPageProps {}

const PayDone: FC<PayPageProps> = () => {
  const searchParams = useSearchParams()
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;

  const [payDoneData,setPayDoneData]=useState({
      reservation_num: "",
      clientEmail:useremail,
      paymentType:"",
      totalAmount:0,
      approvedAt: "",
      paymentStatus:""
  })
  const [reservationData,setReservationData]=useState<any>({
    reservationDate: "2023-11-26",
    serviceStart: "11:00:00",
    serviceEnd: "13:00:00",
    serviceItemNameList: [
        "goods test"
    ],
    reservationNum: "3u09mqk38i",
    createdAt: "2023-11-26T08:24:15.29729",
    paymentAmount: 30000,
    reservationState: "예약대기",
    address: "부산 수영구 민락동 143-2 일리아나파크빌 501호",
    request: "제발 바껴라",
    cancelDesc: null,
    serviceId: 1,
    workerId: 1
})


  useEffect(()=>{
    setPayDoneData({
      ...payDoneData,
      clientEmail:useremail
    })
    
  },[usertoken])

  useEffect(()=>{
    if(payDoneData.reservation_num && payDoneData.clientEmail && payDoneData.clientEmail && payDoneData.paymentStatus&& payDoneData.paymentType && payDoneData.approvedAt){
      console.log('1212');
      
      payDone()
    }
  },[payDoneData])
  console.log(payDoneData);
  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api.tosspayments.com/v1/payments/confirm",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                `${process.env.TOSS_PAYMENTS_SECRET_KEY}:`
              ).toString("base64")}`,
            },
            body: JSON.stringify({ paymentKey, orderId, amount }),
          }
        );
  
        if (!response.ok) {
          // Handle non-successful responses here
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const payment = await response.json();
        setPayDoneData({
          ...payDoneData,
          reservation_num:payment.orderId,
          paymentType:payment.method==="간편결제"?"1":"0",
          approvedAt:payment.approvedAt,
          paymentStatus:payment.status==="DONE"?"0":"1",
          totalAmount:payment.totalAmount
        })
        // console.log(payment);
  
        return payment
      } catch (err: any) {
        console.error("err", err);
  
        return {
          redirect: {
            destination: `/fail?code=${err.code}&message=${err.message}`,
            permanent: false,
          },
        };
      }
    };
    getData()
  },[])

  const payDone = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/change`;
    try{
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
          Email: `${useremail}`,
        },
        body:JSON.stringify(payDoneData)
      });
      if (res.ok) {
        console.log("바꾸기 완료");
        
        const data = await res.json();
        console.log(data);
        
        return data;
      } else {
        ErrorFunction("결제정보가 보내지지 않았습니다.");
      }
    }catch(error){
      ErrorFunction(error as string)
    }
  };

  const getReservationData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/detail/${payDoneData.reservation_num}`;
    try{
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
          Email: `${useremail}`,
        },
      });
      if (res.ok) {
        console.log("바꾸기 완료");
        
        const data = await res.json();
        console.log(data);
        
        return data;
      } else {
        ErrorFunction("결제정보가 보내지지 않았습니다.");
      }
    }catch(error){
      ErrorFunction(error as string)
    }
  };

  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          {reservationData.reservationState}
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">예약 내역</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <Image
                  alt=""
                  className="object-cover p-8"
                  width={300}
                  height={300}
                  src={"/wooyano.png"}
                />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  서비스
                </span>
              </div>
              <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                {reservationData.serviceItemNameList[0]}
              </span>

            </div>
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">날짜</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {reservationData.reservationDate}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">서비스기사</span>
                <span className="mt-1.5 text-lg font-semibold">임찬섭 가사도우미</span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">예약 상세 내역</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">예약 내역</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {payDoneData.reservation_num}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">날짜</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {reservationData.reservationDate}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">금액</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {reservationData.paymentAmount.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">결제 수단</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {payDoneData.paymentType==="1"?"간편결제":"카드결제"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <ButtonPrimary href="/">홈으로 가기</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PayDone;
