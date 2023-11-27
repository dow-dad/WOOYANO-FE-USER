'use client'
import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useAsync } from "react-use";
import { useSession } from "next-auth/react";
import ErrorFunction from "../ErrorFun";
import { ServiceForm } from "@/types/serviceform/serviceform";


const clientKey = process.env.TOSSPAYMENTS_CLIENT_KEY
const customerKey = process.env.TOSSPAYMENTS_CUSTOM_KEY 

export default function TossPaymets({price,setPrice,formData}:{price:number,setPrice:React.Dispatch<React.SetStateAction<number>>,formData:ServiceForm}) {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);

  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;

  const [reservationNum,setReservationNum]=useState<string>("");

  // console.log(reservationNum);
  useEffect(()=>{

  },[reservationNum])
  

  const postCreateReservation = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/create`;
    try{
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
          Email: `${useremail}`,
        },
        body:JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        // console.log("data:", data);
        setReservationNum(data.result)
        return data;
      } else {
        ErrorFunction("예약이 이미 되었습니다.");
      }
    }catch(error){
      ErrorFunction(error as string)
    }
    
  };
  

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(clientKey as string, customerKey as string); // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
    // console.log(paymentWidget);

    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price }
    );

    // ------  이용약관 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement("#agreement");

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);



  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <div className="flex flex-col items-center">
      
      <div id="payment-widget" className="w-full"/>
      <div id="agreement" className="w-full" />
      <button
        className="border mt-2 leading-[48px] bg-sky-300 dark:bg-background3 rounded-lg w-full text-white"
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;
          postCreateReservation()
          if(reservationNum&& reservationNum!==""){
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
              await paymentWidget?.requestPayment({
                // orderId: reservationNum,
                orderId:reservationNum,
                orderName: `${formData.reservationGoodsId}`,
                customerEmail: `${formData.userEmail}`,
                successUrl: `${window.location.origin}/serviceform/success`,
                failUrl: `${window.location.origin}/serviceform/fail`,
              });
            } catch (error) {
              // 에러 처리하기
              ErrorFunction(`${error}` as string);
            }
          }
        }
          }
          
      >
        {`${price.toLocaleString()}원 결제하기`}
      </button>
    </div>
    
  );
}
