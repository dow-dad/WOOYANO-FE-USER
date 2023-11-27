"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import NcModal from "@/shared/NcModal";
import ModalSelectDate from "@/components/ModalSelectDate";
import ModalSelectGuests from "@/components/ModalSelectGuests";
import Image from "next/image";
import imageURL from "@/images/avatars/Image-5.png"
import ModalSelectTime from "@/components/ModalSelectTime";
import TossPaymets from "./tossPayment";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ServiceForm } from "@/types/serviceform/serviceform";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const [mounted, setMounted] = useState<boolean>(false); // mounted화면 렌더링 된 후 보여주기

  const [storeData, setStoreData] = useState<any>(); // localstorage 데이터
  const [date, setDate] = useState<Date>(new Date()); // 날짜 데이터
  const [time, setTime] = useState<string>(""); // 시간 데이터
  const [endTime,setEndTime]=useState<string>("");
  const [serviceItem, setServiceItem] = useState<any>([]); // 서비스 아이템
  const [price, setPrice] = useState<number>(0); // 총합 가격
  const [adress,setAdress]=useState<string>(""); // 주소
  const [requestText,setRequestText]=useState<string>(""); // 요청사항

  
  
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;
  const useraddress= session.data?.user.result.address

  const params=useSearchParams();

  const [formData,setFormData]=useState<ServiceForm>({
    reservationGoodsId:serviceItem,
    serviceId:params.get('serviceId')||"",
    workerId:params.get("workerId")||"",
    userEmail:useremail,
    reservationDate:date.toLocaleDateString().slice(0,-1).split(". ").join("-"),
    serviceStart:time,
    serviceEnd:endTime,
    paymentAmount:price,
    request:requestText,
    address:useraddress
  });

  // console.log(serviceItem);
  // console.log(formData);
  
  useEffect(()=>{
    setFormData({
      ...formData,
      address:useraddress,
      userEmail:useremail
    })
  },[usertoken])
  

  useEffect(() => {
    setMounted(true);
  }, [])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("searchData") as string)) {
      setStoreData(JSON.parse(localStorage.getItem("searchData") as string))
    }
  }, [])

  useEffect(() => {
    setPrice(renderTotalSum("price"))
    setEndTime(renderTotalSum("time"))

    setFormData({
      ...formData,
      paymentAmount:renderTotalSum("price"),
      serviceStart:time,
      serviceEnd:renderTotalSum("time"),
      reservationDate:date.toLocaleDateString().slice(0,-1).split(". ").join("-"),
      reservationGoodsId:serviceItem.map((item: { productnum: number }) => Number(item.productnum))
      // reservationGoodsId:serviceItem[0]?.productnum
    })
    
  }, [serviceItem, price,time,date])

  const renderTotalSum = (type: string) => {
    if (type === "price") {
      const price = serviceItem.reduce((sum: number, obj: any) => {
        if (obj.hasOwnProperty('price')) {
          const priceAsInt = parseInt(obj['price'], 10); // 문자열을 정수로 변환
          if (!isNaN(priceAsInt)) { // 정수로 변환된 값이 유효한지 확인
            return sum + priceAsInt;
          }
        }
        return sum;
      }, 0);
      return price     
    } else if (type === "time") {
      const totalTime = serviceItem.reduce((sum: number, obj: any) => {
        if (obj.hasOwnProperty('min_time')) {
          const priceAsInt = parseInt(obj['min_time'], 10); // 문자열을 정수로 변환
          if (!isNaN(priceAsInt)) { // 정수로 변환된 값이 유효한지 확인
            
            
            return sum + priceAsInt;
          }
        }
        return sum;
      }, 0);
      const startTime = parseInt(time[0] + time[1], 10)
      if (!isNaN(startTime)) {
        const sumTime = `${totalTime + startTime}:00`
        return sumTime
      }
      return
    }
  }

  const onChangeAdress=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const value=e.currentTarget.value;
    setAdress(value)
  }
  const onChangeRequset=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const value=e.currentTarget.value;
    setRequestText(value)
    setFormData({
      ...formData,
      request:value
    })
  }



  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex sm:w-40">
            <div className="rounded-2xl overflow-hidden">
              <Image
                alt=""
                width={100}
                height={100}
                src={params.get('workerImg')|| imageURL}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {storeData != null
                  ?
                  `${storeData.service}`
                  :
                  ""}
                {/* 가사도우미 서비스 */}
              </span>
              <span className="text-base font-medium mt-1 block">
                {params.get('name')}
              </span>
            </div>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            {/* <StartRating /> */}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">날짜 및 시간</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>서비스 날짜</span>
            <span>{date.toLocaleDateString("ko-kr", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>서비스 시작 시간</span>
            <span>{time}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>서비스 종료 시간</span>
            <span>{renderTotalSum('time')}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">가격</h3>
          <div className="flex flex-col justify-between text-neutral-6000 dark:text-neutral-300">
            {serviceItem.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between">
                <span>{item.service_name}</span>
                <span>{item.price.toLocaleString()}원</span>
              </div>
            ))}
          </div>
          {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div> */}

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>총합</span>
            <span>{price.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          서비스 신청
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          {/* 주소 확인창 */}
          <div>
            <h3 className="text-2xl font-semibold">주소</h3>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>
            <div className=" mb-6">
              <Input type="text" defaultValue={"대표주소"} maxLength={30} value={useraddress} onChange={onChangeAdress}/>
            </div>
          </div>

          {/* 날짜 및 서비스 */}
          <div>
            <h3 className="text-2xl font-semibold">날짜 및 서비스</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  서비스 내역 상세보기
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="서비스 상세 내역"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
              setDate={setDate}
              date={date}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">날짜 선택</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {date.toLocaleDateString("ko-kr", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />

            <ModalSelectGuests
              serviceItem={serviceItem}
              setServiceItem={setServiceItem}
              renderChildren={({ openModal }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">서비스 선택</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      <span className="line-clamp-1">
                        {serviceItem.length === 0 ?
                          '선택된 서비스 없음'
                          :
                          `${serviceItem.map((obj: { service_name: string; }) => obj.service_name)}`}
                      </span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />

            <ModalSelectTime
              time={time}
              setTime={setTime}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">시간선택</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {time.toString() === "" ?
                        '선택된 시간 없음'
                        :
                        `${time}`}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        {/* 요청사항 입력창 */}
        <div>
          <h3 className="text-2xl font-semibold">요청 사항</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>

          <div className="mt-6">
            <Textarea placeholder="최대 100자까지 작성 가능합니다" maxLength={100} value={requestText} onChange={onChangeRequset}/>
          </div>
        </div>

        {/* 결제 위젯 */}
        <div>
          <h3 className="text-2xl font-semibold">결제</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-3"></div>

          <div className="">
            <TossPaymets price={price} setPrice={setPrice} formData={formData}/>
          </div>
        </div>
      </div>
    );
  };

  if (mounted === false) return null

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;