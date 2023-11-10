'use client'
import Input from '@/shared/Input';
import { SignUpType } from '@/types/SignUpType';
import React, { useRef, useState, ChangeEvent } from 'react';

export default function SignUpCertNumber(props: {signUpData: SignUpType, setSignUpData: React.Dispatch<React.SetStateAction<SignUpType>>}) {
  const {signUpData,setSignUpData}=props;
  
  const inputRefs = [useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null)];
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const certNumber = values.join('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    console.log(value, index)
    setValues((prevValues) => {
      console.log('prevValues: ' + prevValues);
      const newValues = [...prevValues];
      newValues[index] = value;
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
      if (index === 3) {
        newValues[index] = value;
      }
      return newValues;
    });
      
      setSignUpData((prevSignUpData) => ({
        ...prevSignUpData,
        emailCertNumber: certNumber
      }));
    }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex-grow mt-2 md:mt-0 p-4 md:p-0 max-w-3xl space-y-6">
          <div className="flex flex-col font-semibold gap-3">
            <h2 className="text-3xl">인증번호 입력</h2>
            <div>
              <p className="text-xl">Sign up and</p>
              <p className="text-xl">starting Wooyano</p>
            </div>
          </div>
          <div>
            <p>인증 코드가 {"wooyano@example.com"}으로 발송되었습니다.</p>
            <p>{"01:30"} 이후 인증코드가 만료됩니다.</p>
          </div>
            <div className='flex gap-4 max-w-2xl mx-auto'>
              {inputRefs.map((ref, index) => (
                <Input
                  key={index}
                  ref={ref}
                  type='text'
                  className='bg-gray-200 md:text-6xl text-[36px] text-center rounded-2xl md:h-40 h-20 font-bold'
                  value={values[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  maxLength={1}
                                  />
              ))}
            </div>
          <p>
            By signing up you agree to our Term of <strong>use </strong>and{" "}
            <strong>privacy notice</strong>
            <button
            onClick={()=>{console.log(signUpData.emailCertNumber)}}>
              버튼
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}