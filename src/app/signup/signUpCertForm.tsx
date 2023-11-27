"use client";
import Label from "@/components/Label";
import CheckEmailForm from "@/components/widget/checkEmailForm";
import Input from "@/shared/Input";
import { SignUpType } from "@/types/SignUpType";
import React, { ChangeEvent, useEffect, useState } from "react";

interface signUpCertForm {
  name: string;
  email: string;
}

export default function SignUpCertForm(props: {
  signUpData: SignUpType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpType>>;
}) {
  const { signUpData, setSignUpData } = props;

  //이메일 유효성 검사 변수
  const [checkEmail, setCheckEmail] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;
    // 이메일 유효성 검사 정규식
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //이메일 유효성 검사
    if (id === "email") {
      const checkedEmail = emailRegex.test(value);
      setCheckEmail(checkedEmail);
      if (checkedEmail) {
        setSignUpData((prevData) => ({
          ...prevData,
          emailformcheck: true,
          [id]: value,
        }));
      } else {
        setSignUpData((prevData) => ({
          ...prevData,
          emailformcheck: false,
          [id]: value,
        }));
      }

    } else {
      setSignUpData({
        ...signUpData,
        [id]: value,
      });
    }

  };


  const [showEmailVerification, setShowEmailVerification] = useState(false);
  useEffect(() => { setShowEmailVerification(true) }, []);

  return (
    <div className="space-y-6 sm:space-y-8 md:px-10 py-6">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex-grow md:mt-0 p-4 md:p-0 max-w-3xl space-y-6 ">
          <div className="flex flex-col md:font-semibold gap-3">
            <div className={`flex space-y-6 transition-all duration-500 ease-in-out transform ${showEmailVerification ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-8px]'}`}>
              <div className="space-y-6 pl-1">
                <h2 className="text-3xl font-semibold">이메일 인증</h2>
                <div>
                  <p className="md:text-xl text-md font-normal">이메일 인증을 진행하기 위해</p>
                  <p className="md:text-xl text-md font-normal">아래의 정보를 입력해주세요.</p>
                </div>
              </div>
              <div className="hidden md:block pl-[200px] dark:invert">
                <svg width="85px" height="85px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="layer1">
                    <path d="M 3 0 L 3 4.5585938 L 0 6.8183594 L 0 20 L 20 20 L 20 6.8183594 L 17 4.5585938 L 17 0 L 3 0 z M 4 1 L 16 1 L 16 9.7617188 L 11.990234 12.783203 L 10.951172 12 L 9.0488281 12 L 8.0097656 12.783203 L 4 9.7617188 L 4 1 z M 10 2 C 8.9013528 2 8 2.9013528 8 4 L 8 5 L 7 5 L 7 5.5 L 7 10 L 13 10 L 13 5 L 12 5 L 12 4.0351562 C 12.000412 4.0234412 12.000412 4.0117151 12 4 C 12 2.9013528 11.098647 2 10 2 z M 10 3 C 10.558207 3 11 3.441793 11 4 L 11 5 L 9 5 L 9 4.0351562 C 9.0004121 4.0234412 9.0004121 4.0117151 9 4 C 9 3.441793 9.441793 3 10 3 z M 3 5.9921875 L 3 9.0078125 L 0.99804688 7.5 L 3 5.9921875 z M 17 5.9921875 L 19.001953 7.5 L 17 9.0078125 L 17 5.9921875 z M 8 6 L 12 6 L 12 9 L 8 9 L 8 6 z M 1 8.7539062 L 7.1796875 13.410156 L 1 18.066406 L 1 8.7539062 z M 19 8.7539062 L 19 18.066406 L 12.820312 13.410156 L 19 8.7539062 z M 9.6230469 13 L 10.376953 13 L 18.337891 19 L 1.6621094 19 L 9.6230469 13 z " />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Label>Name</Label>
            <Input
              className="mt-1.5"
              id="username"
              type="text"
              placeholder="이름을 입력해주세요."
              value={signUpData.username}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Input
                className="mt-1.5"
                id="email"
                type="text"
                placeholder="ex) wooyano@example.com"
                value={signUpData.email}
                onChange={handleOnChange}
              />
              <div className="absolute top-1/4 right-3">
                <CheckEmailForm checked={checkEmail} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
