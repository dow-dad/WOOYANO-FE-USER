import React from "react";
import AccountAddress from "./accountAddress";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { BaseResDataType } from "@/types/BaseResDataType";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { redirect } from "next/navigation";

const addressList = async () => {
  const session = await getServerSession(options);
  if(!session){
    redirect("/")
  }
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/address`;
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
    console.log("data:", data);
    return data;
  } else {
    console.error("Failed to fetch data:", res.status, res.statusText);
  }
};

async function AccountAddresspage() {
  const data: BaseResDataType = await addressList();
  console.log("data:", data);
  return (
    <div>
      {data && data.result ? (
        <AccountAddress addressList={data.result}/>
      ) : (
        <div className="flex flex-col">
          <p className="text-center font-bold py-20">로그인 정보가 없습니다.</p>
          <ButtonPrimary href="/login">Sign In</ButtonPrimary>
        </div>
      )}
    </div>
  );
}
export default AccountAddresspage;
