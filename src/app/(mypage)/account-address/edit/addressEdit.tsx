"use client";
import React, { useEffect, useState } from "react";
import AddressEditButton from "./addressEditButton";
import AddressFlightCard from "./addressFlightCard";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";

export default function AddressEdit() {
  const SearchParams = useSearchParams();
  const addressId = Number(SearchParams.get("id"));
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();

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
        <h2 className="text-3xl font-semibold">Address Edit</h2>
        <div className="flex md:text-sm text-xs text-gray-500">
          <p>아래의 주소가 변경됩니다.</p>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-6"></div>
        <div className="gap-6 md:space-y-6">
          <div className="relrative md:order-1 max-w-2xl">
            <AddressFlightCard addressId={addressId} />
          </div>

          <div className="md:order-2 mt-4 max-w-2xl">
            <AddressEditButton addressId={addressId} />
          </div>
          <div className="md:mt-6 mt-4 max-w-2xl px-2">
            <ButtonPrimary
            className="w-full"
              onClick={() => {
                router.push("/account-address");
              }}
            >
              Back
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </>
  );
}
