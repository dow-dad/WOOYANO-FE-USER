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
      label: "계정 정보",
    },
    {
      path: "/account-address",
      label: "주소 관리",
    },
    {
      path: "/account-password",
      label: "비밀번호 변경",
    },
    {
      path: "/favorite",
      label: "찜 목록",
    },
    {
      path: "/servicehistory",
      label: "서비스이용 이력",
    },
    {
      path: "/review",
      label: "리뷰 관리",
    },
  ];

  return (
    <div className="container">
      <div className="flex justify-start md:justify-center space-x-8 md:space-x-14 overflow-x-auto scrollbar-hide">
        {listNav.map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={idx}
              href={item.path}
              className={` py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${
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
