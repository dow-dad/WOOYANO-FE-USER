"use client";
import React from 'react'
import KakaoTalksvg from "@/images/KakaoTalk.svg";
import Naversvg from "@/images/Naver.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import { signIn, signOut, useSession } from 'next-auth/react';

const loginSocials = [
  {
    name: "Continue with Kakao",
    rootName :  "kakao",
    redirect : true,
    callbackUrl : "/",
    icon: KakaoTalksvg,
  },
  {
    name: "Continue with Naver",
    rootName :  "naver",
    redirect : true,
    callbackUrl : "/",
    icon: Naversvg,
  },
  {
    name: "Continue with Google",
    rootName :  "google",
    redirect : true,
    callbackUrl : "/",
    icon: googleSvg,
  },
];

function SnsLogin() {
  
  return (
    <div className="max-w-md  mx-auto grid gap-3">
    {loginSocials.map((item, index) => (
      <button
        key={index}
        onClick={()=>signIn( item.rootName , {redirect: item.redirect, callbackUrl : item.callbackUrl})}
        className="w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
      >
        <div className='flex'>
        <Image
          className="flex-shrink-0 dark:invert"
          src={item.icon}
          alt={item.name}
        />
        <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
          {item.name}
        </h3>
        </div>
      </button>
    ))}
    <button onClick ={() => signOut()}>로그아웃</button>
    {/* todo:로그아웃버튼 헤더에서 생성되면 삭제 */}
  </div>
  )
}

export default SnsLogin