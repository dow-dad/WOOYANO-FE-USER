"use client";
import React, { useEffect, useState } from "react";
import AddressAddButton from "./addressAddButton";
import AddressFlightCard from "./addressFlightCard";
import { AddressLsitType } from "@/types/addressListType";

function AccountAddress({ addressList }: { addressList: any }) {
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <>
      <div
        className={`md:space-y-6 space-y-4 transition-all duration-500 ease-in-out transform ${
          showAnimation
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-8px]"
        }`}
      >
        <h2 className="text-3xl font-semibold">Address</h2>
        <div className="flex md:text-sm text-xs text-gray-500">
          <p>주소를 추가하시려면&nbsp;</p>
          <p className="md:hidden block">아래</p>
          <p className="md:block hidden">오른쪽</p>
          <p>&nbsp;버튼을 눌러 추가해주세요.</p>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-6"></div>
        <div className="md:flex gap-6 md:space-y-0">
          <div className="md:order-2 mt-4 md:ml-4 md:w-[680px]">
            <AddressAddButton />
          </div>
          <div className="md:order-1 md:w-full">
            <div className="overflow-y-auto md:max-h-[640px] max-h-[400px] scrollbar-hide">
              <AddressFlightCard addressList={addressList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountAddress;
