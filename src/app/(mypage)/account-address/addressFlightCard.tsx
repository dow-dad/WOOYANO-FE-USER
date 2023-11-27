"use client";
import React from "react";
import { AddressLsitType } from "@/types/addressListType";
import AddressDeleteButton from "./addressDeleteButton";
import { useRouter } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DefaultAddressButton from "./defaultAddressButton";

const AddressFlightCard: React.FC<AddressLsitType> = ({ addressList }) => {
  const router = useRouter();

  //대표주소지 최상위로 표시
  const sortedAddressList = [...addressList].sort((a, b) => {
    if (a.defaultAddress && !b.defaultAddress) {
      return -1; // a가 defaultAddress인 경우
    } else if (!a.defaultAddress && b.defaultAddress) {
      return 1; // b가 defaultAddress인 경우
    } else {
      return a.id - b.id; // 나머지는 id 순으로 정렬
    }
  });

  return (
    <>
      {sortedAddressList.map((address, index) => (
        <div key={index} className="mt-4">
          <div
            className={`nc-FlightCardgroup p-4 md:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6`}
          >
            <div className={`relative`}>
              <div className="absolute right-0 flex justify-end gap-5 md:gap-3 text-slate-400 z-50">
                {/* 주소 삭제 버튼 */}
                <AddressDeleteButton address={address} />
                {/* 주소 수정 버튼 */}
                <button
                  onClick={() => {
                    router.push(`/account-address/edit?id=${address.id}`);
                  }}
                >
                  <PencilSquareIcon className="md:h-4 md:w-4 h-6 w-6" />
                </button>
              </div>
              <div className="flex relative">
                <div className="absolute md:top-3 top-2 md:-left-2 -left-[5px]">
                  <DefaultAddressButton address = {address}/>
                </div>
                <div className="md:pl-6 pl-8">
                  <div className="flex flex-col space-y-6 sm:space-y-0">
                    <div className="font-semibold">
                      <div className="flex justify-between md:mb-2 mb-1">
                        {/* localAddress */}
                        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[220px] md:max-w-full line-clamp-1">
                          <p className="text-sm md:text-lg">
                            {address.localAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="block space-y-1">
                    <div className="text-xs md:text-sm text-neutral-500 font-normal">
                      {/* extraAddress */}
                      <span className="VG3hNb">{address.extraAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddressFlightCard;
