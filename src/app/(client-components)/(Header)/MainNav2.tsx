'use client'
import React, { FC } from "react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import DropdownHeaderMenu from "./DropdownHeaderMenu";
import MainGptLink from "./MainGptLink";
import Link from "next/link";
import { useSession } from "next-auth/react";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const {data, status} = useSession();


  return (
    <div className={`MainNav2 relative z-10 ${className}`}>
      <div className="px-4 h-20 md:container flex justify-between items-center">
        <div className="flex justify-start flex-1">
          <Logo className="hidden md:block w-24 self-center pr-3" />
          <div className="hidden lg:block self-center h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
          <div className="flex gap-3 md:pl-3 pl-0 ">
            <MainGptLink/>
            <DropdownHeaderMenu />
          </div>
        </div>
        <div className="flex justify-end text-neutral-700 dark:text-neutral-100">
          <div className="hidden lg:flex sm:sp">
            {
              status === 'authenticated' ? <AvatarDropdown user = {data?.user}/> : <LoginIcon />
            }
            
          </div>
          <div className="flex lg:hidden">
            {
              status === 'authenticated' ? <AvatarDropdown user = {data?.user}/> : <LoginIcon />
            }
            {/* <MenuBar /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;


export const LoginIcon = () => {
  return (
    <Link
      href={"/login"}
      className="flex items-center transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      // onClick={() => close()}
    >
      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="ml-2">
        <p className="text-sm font-bold">로그인</p>
      </div>
    </Link>
  )
}