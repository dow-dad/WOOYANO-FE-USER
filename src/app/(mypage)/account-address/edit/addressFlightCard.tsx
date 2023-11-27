"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AddressEditGetType } from "@/types/addressListType";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";


export default function AddressFlightCard({addressId}: {addressId: number;}) {
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const [addressData, setAddressData] = useState<AddressEditGetType>({
    id: 0,
    localAddress: "",
    extraAddress: ""
  })

  const fetchData = async () => {
    try {
      const addressURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/address/${addressId}`;
      const res = await fetch(addressURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
      }); if (res.ok) {
        const data = await res.json();
        setAddressData(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    fetchData();
  },[addressId,usertoken])

  return (
    <>
      <div className="mt-4">
        <div
          className={`nc-FlightCardgroup p-4 md:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6`}
        >
          <div className={`relative`}>
            <div className="flex relative">
              <div className="absolute md:top-3 top-2 md:-left-2 -left-[5px]"></div>
              <div className="md:pl-6 pl-4">
                <div className="flex flex-col space-y-6 sm:space-y-0">
                  <div className="font-semibold">
                    <div className="flex justify-between md:mb-2 mb-1">
                      {/* localAddress */}
                      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis md:max-w-full line-clamp-1">
                        <p className="relative text-sm md:text-lg">
                          {addressData.localAddress}
                        </p>
                        <PencilSquareIcon className="absolute md:w-7 md:-right-2 md:-top-2 w-6 -right-1 -top-1"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block space-y-1">
                  <div className="text-xs md:text-sm text-neutral-500 font-normal">
                    {/* extraAddress */}
                    <span className="VG3hNb">
                      {addressData.extraAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

