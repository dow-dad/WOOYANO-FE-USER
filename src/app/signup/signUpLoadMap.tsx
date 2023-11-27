'use client'
import Charactor from "@/images/svg_component/charactor";
import LogoSvg from "@/shared/LogoSvg";
import React, { useEffect, useState } from "react";

const signUpSteps = [
  {
    title: "1. 이메일 인증을 위한 정보 입력",
    content: "이름과 이메일을 입력해주세요.",
  },
  {
    title: "2. 이메일 인증번호 입력",
    content: "이메일로 전송된 인증번호를 입력해주세요.",
  },
  {
    title: "3. 회원 정보 입력",
    content: "회원 정보를 입력해주세요.",
  },
  {
    title: "4. 회원가입 완료",
    content: "",
  },
];

function SignUpLoadMap() {
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  useEffect(() => { setShowEmailVerification(true) }, []);

  return (
    <div>
      <div className="md:flex space-y-6 sm:space-y-8">
        <div className={`space-y-6 transition-all duration-500 ease-in-out transform ${showEmailVerification ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-8px]'}`}>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="pt-6 md:px-10 px-4">
              <div className="flex flex-col font-semibold gap-3 mb-6 md:pl-4">
                <h2 className="text-3xl">회원가입</h2>
                <div>
                  <p className="md:text-lg text-md">Wooyano에 오신 것을 환영합니다!</p>
                  <p className="md:text-lg text-md">아래의 과정을 통해 회원가입이 진행됩니다.</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block mt-4 dark:invert">
              <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="240"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex py-6 justify-center mx-auto">
        <div>
        {signUpSteps.map((step, index) => (
            <div key={index} className="text-left">
              <h2 className="text-xl font-bold">{step.title}</h2>
              <p className="pl-5 text-gray-400 dark:text-gray-700 mb-3 dark:font-semibold">{step.content}</p>
            </div>
        ))}
        </div>
      </div>
    </div>

  );
}

export default SignUpLoadMap;
