"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type myRoute = {
  path: Route;
  label: string;
};

export const Nav = () => {
  const pathname = usePathname();

  const listNav: myRoute[] = [
    {
      path: "/account",
      label: "계정정보",
    },
    {
      path: "/favorite",
      label: "나의 찜목록",
    },
    {
      path: "/account-password",
      label: "비밀번호 관리",
    },
    {
      path: "/account-billing",
      label: "결제수단 관리",
    },
    {
      path: "/account-address",
      label: "내 주소 관리",
    },
    {
      path: "/servicehistory",
      label: "서비스이용 이력",
    },
    {
      path: "/review",
      label: "나의 리뷰",
    }
  ];

  return (
    <div className="container">
      <div className="flex justify-center space-x-8 md:space-x-14 overflow-x-auto ">
        {listNav.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={idx}
              href={item.path}
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${
                isActive
                  ? "border-primary-500 font-medium"
                  : "border-transparent"
              }`}
            >
              {item.label.replace("-", " ").replace("/", " ")}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
