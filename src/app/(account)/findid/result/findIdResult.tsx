'use client'
import React from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/shared/Button";

export default function FindIdResult() {
  const SearchParams = useSearchParams();

  const name = SearchParams.get('name')
  const email = SearchParams.get('email')

  return (
    <div className="container mb-6 lg:mb-12">
      <div className="max-w-md mx-auto space-y-6">
        {/* HEADING */}
        <div className="flex flex-col font-semibold gap-3 mt-16">
          <h2 className="text-3xl mb-6">Find Result</h2>
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col gap-4 mt-8 mb-16 text-xl">
            <div className="flex gap-2">
              <p className="font-bold md:text-2xl text-[26px]">{name}</p>
              <p className="md:leading-[36px] leading-[32px] md:text-xl text-md">님이 가입하신 이메일은</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold md:text-2xl text-[20px]">{email}</p>
              <p className="leading-[28px]">입니다.</p>
            </div>
          </div>
          <Button
           className="rounded-xl ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 "
           href="/login">Sign In</Button>
        </div>
      </div>
    </div>
  );
}
