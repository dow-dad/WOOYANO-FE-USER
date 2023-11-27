'use client'
import Label from "@/components/Label";
import Input from "@/shared/Input";
import React, { useEffect, useState } from "react";
import { SignUpType } from "@/types/SignUpType";
import Charactor from "@/images/svg_component/charactor";

export default function SignUpResult(props: { signUpData: SignUpType, setSignUpData: React.Dispatch<React.SetStateAction<SignUpType>> }) {
  const { signUpData } = props;

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  useEffect(() => { setShowEmailVerification(true) }, []);

  return (
    <div className="space-y-6 sm:space-y-8 md:px-10 py-6">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex-grow md:mt-0 p-4 md:p-0 max-w-3xl space-y-6 ">
          <div className="flex flex-col md:font-semibold gap-3">
            <div className={`relative flex transition-all duration-500 ease-in-out transform ${showEmailVerification ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-8px]'}`}>
              <div className="md:pl-6 space-y-4">
                <h2 className="text-3xl font-semibold">회원가입 완료</h2>
                <div>
                  <p className="md:text-xl text-md font-normal">아래의 내용으로 회원가입이</p>
                  <p className="md:text-xl text-md font-normal">완료되었습니다.</p>
                </div>
              </div>
              <div className="hidden md:block pl-40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" height="100px" width="100px">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                </svg>

              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            <div className="flex gap-6">
              <div>
                <Label>Name</Label>
                <Input
                  className="mt-1.5"
                  value={`${signUpData.username}`}
                  readOnly
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  className="mt-1.5 "
                  defaultValue={`${signUpData.phone}`}
                  readOnly
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5 "
                defaultValue={`${signUpData.email}`}
                readOnly
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                className="mt-1.5 "
                defaultValue={`${signUpData.localAddress}`}
                readOnly
              />
              <Input
                className="mt-1.5 "
                defaultValue={`${signUpData.extraAddress}`}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
