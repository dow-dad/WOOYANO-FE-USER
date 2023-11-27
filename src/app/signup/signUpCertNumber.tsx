"use client";
import { SignUpType } from "@/types/SignUpType";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";

export default function SignUpCertNumber(props: {
  signUpData: SignUpType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpType>>;
}) {
  const { signUpData, setSignUpData } = props;
  const [certNumbers, setCertNumbers] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([
    null,
    null,
    null,
    null,
  ]);

  const handleInputChange = (index: number, value: string) => {
    const newCertNumbers = [...certNumbers];
    newCertNumbers[index] = value;
    setCertNumbers(newCertNumbers);

    if (index < 3 && value !== "") {
      inputRefs.current[index + 1]?.focus();
    }

    const certNumber = newCertNumbers.join("");
    setSignUpData((prevData) => ({ ...prevData, emailCertNumber: certNumber }));
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && certNumbers[index] === "") {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  useEffect(() => { setShowEmailVerification(true) }, []);

  //제한시간 관련
  const [countdown, setCountdown] = useState(180);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [formTime, setFormTime] = useState("3:00");
  const router = useRouter();

  const startCountdown = () => {
    setTimer(
      setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === -1) {
            clearInterval(timer!);
            return 0;
          }
  
          // 0:00 형식으로 시각화
          const minutes = Math.floor(prevCountdown / 60);
          const seconds = prevCountdown % 60 > 0 ? prevCountdown % 60 : 0;
          const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds == 0 ? "00" : String(seconds);
          setFormTime(`${minutes}:${formattedSeconds}`);
          return prevCountdown - 1;
        });
      }, 1000)
    );
  };
  
  useEffect(() => {
    setShowEmailVerification(true);

    startCountdown()

  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 md:px-10 py-6">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex-grow md:mt-0 p-4 md:p-0 max-w-3xl space-y-6 ">
          <div className="flex flex-col md:font-semibold gap-3">
            <div className={`flex transition-all duration-500 ease-in-out transform ${showEmailVerification ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-8px]'}`}>
              <div className="space-y-6 md:pl-2 mb-6">
                <h2 className="text-3xl font-semibold">인증번호 입력</h2>
                <div>
                  <p className="md:text-xl text-md font-normal">이메일로 받으신 인증코드를</p>
                  <p className="md:text-xl text-md font-normal">입력해주세요.</p>
                </div>
              </div>
              <div className="hidden md:block pl-[200px] dark:invert">
                <svg width="85px" height="85px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="layer1">
                    <path d="M 3 0 L 3 4.5585938 L 0 6.8183594 L 0 20 L 20 20 L 20 6.8183594 L 17 4.5585938 L 17 0 L 3 0 z M 4 1 L 16 1 L 16 9.7617188 L 11.990234 12.783203 L 10.951172 12 L 9.0488281 12 L 8.0097656 12.783203 L 4 9.7617188 L 4 1 z M 13.507812 3.9960938 C 13.378054 3.9996938 13.254782 4.0536348 13.164062 4.1464844 L 8.5175781 8.7929688 L 6.8710938 7.1464844 C 6.3998386 6.6556784 5.6732557 7.3822616 6.1640625 7.8535156 L 8.1640625 9.8535156 C 8.3593275 10.0487 8.6758286 10.0487 8.8710938 9.8535156 L 13.871094 4.8535156 C 14.196364 4.5355126 13.962534 3.9836228 13.507812 3.9960938 z M 3 5.9921875 L 3 9.0078125 L 0.99804688 7.5 L 3 5.9921875 z M 17 5.9921875 L 19.001953 7.5 L 17 9.0078125 L 17 5.9921875 z M 1 8.7539062 L 7.1796875 13.410156 L 1 18.066406 L 1 8.7539062 z M 19 8.7539062 L 19 18.066406 L 12.820312 13.410156 L 19 8.7539062 z M 9.6230469 13 L 10.376953 13 L 18.337891 19 L 1.6621094 19 L 9.6230469 13 z " />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center space-y-6">
            <p><strong>{signUpData.email}</strong> 로 발송되었습니다.</p>
            <p className={countdown <= 59 ? 'text-red-500 animate-blink' : ''}>
              {formTime} 이후 인증코드가 만료됩니다.
            </p>
          </div>
          <div className="flex md:gap-6 gap-4 max-w-2xl mx-auto md:px-16 md:py-4 px-6 py-4 ">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                id={`certInput_${index}`}
                type="text"
                value={certNumbers[index]}
                className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 text-[40px] bg-gray-200 md:text-6xl text-center rounded-2xl md:h-36 h-20 md:font-bold font-semibold"
                maxLength={1}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <p className="flex justify-center text-left text-xs">
            회원가입 시 Wooyano의 이용약관 및 개인정보 처리방침에 동의합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
