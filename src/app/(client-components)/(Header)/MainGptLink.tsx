'use client'
import Link from 'next/link'
import { Route } from "@/routers/types";
import React from 'react'
import { usePathname } from 'next/navigation';

function MainGptLink() {
  const pathname = usePathname();

  const renderLink = () => {
    if (pathname === '/') {
      return <Link
        href={"/mainhome" as Route<string>}
        className="self-center text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        MAINPAGE
      </Link>
    } else {
      return <Link
        href={"/" as Route<string>}
        className="self-center text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        CHATGPT
      </Link>
    }
  }


  return (
    <>
      {renderLink()}
    </>
  )
}

export default MainGptLink