"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  
];

const Footer: React.FC = () => {
  const pathname=usePathname();
  
  if (pathname==='/')return null

  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-12 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            
          </div>
          <div className="flex gap-2">
            <div className="text-[17px] font-semibold">github:</div>
            
            <Link className="text-blue-700 underline" href={"https://github.com/Spharos-final-project-WOOYANO"}>깃허브 주소</Link>
          </div>
          <div className="flex gap-2">
            <div className="text-[17px] font-semibold">notion:</div>
            
            <Link className="text-blue-700 underline" href={"https://weak-python-e6b.notion.site/2-Wooyano-1b1eacefcd9d4ca0909ac8297628f0a6?pvs=4"}>노션 주소</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
