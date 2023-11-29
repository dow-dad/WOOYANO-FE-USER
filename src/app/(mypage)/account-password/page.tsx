'use client'
import React from "react";
import AccountPassword from "./accountPassword";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AccountPass = () => {
  const session = useSession();
  if(session.status === "unauthenticated") {
    redirect("/")
  }
  return (
    <div className="space-y-6 sm:space-y-8">
      <AccountPassword/>
    </div>
  );
};

export default AccountPass;
