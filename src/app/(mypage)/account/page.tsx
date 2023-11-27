import React from "react";
import AccountInfo from "./accountInfo";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { BaseResDataType } from "@/types/BaseResDataType";
import ButtonPrimary from "@/shared/ButtonPrimary";

const accountInfo = async (session: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/mypage/info`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.result.token}`,
      Email: `${session?.user.result.email}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    console.error("Failed to fetch data:", res.status, res.statusText);
  }
};

async function AccountPage() {
  const session = await getServerSession(options);
  const data: BaseResDataType = await accountInfo(session);
  return (
    
    <AccountInfo accountInfo={data.result} session={session}/>
  );
}

export default AccountPage;
