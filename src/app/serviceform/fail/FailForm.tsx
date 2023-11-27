'use client'
import ButtonPrimary from '@/shared/ButtonPrimary';
import { useSearchParams } from 'next/navigation'
import React from 'react'

function FailForm() {
  const search=useSearchParams();
  let code=search.get("message")
  let orderid=search.get("orderId")
  return (
    <div className='h-[68vh] w-full flex flex-col gap-7 justify-center items-center'>
      <span className='text-[24px] font-semibold font-'>결제실패</span>
      <span>주문번호:{orderid}</span>
      <span>
        {code}
      </span>
      <ButtonPrimary href={"/"}>홈으로 가기</ButtonPrimary>
    </div>
  )
}

export default FailForm