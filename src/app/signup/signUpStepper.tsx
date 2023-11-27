"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SignUpType } from "@/types/SignUpType";

import SignUpLoadMap from "./signUpLoadMap";
import SignUpCertNumber from "./signUpCertNumber";
import SignUpForm from "./signUpForm";
import SignUpResult from "./signUpResult";
import { StepperNumber } from "./stepperNumber";
import StepperBtn from "./stepperBtn";
import { StepperNumberData } from "@/data/StepperData/StepperNumberData";
import SignUpCertForm from "./signUpCertForm";

export default function SignUpStepper() {
  const router = useRouter();
  const [stepId, setStepId] = useState<number>(1);

  const [signUpData, setSignUpData] = useState<SignUpType>({
    email: "",
    password: "",
    secondPassword: "",
    username: "",
    nickname: "",
    birthday: "",
    phone: "",
    localAddress: "",
    extraAddress: "",
    localCode: 0,
    emailCertNumber: "",
    passwordCheck : false,
    nicknameCheck : false,
    emailformcheck : false,
  });

  const stepperComponent: any = [
    { 1: <SignUpLoadMap />, btnTxt: "Sign Up" }, 
    { 2: (<SignUpCertForm signUpData={signUpData} setSignUpData={setSignUpData} />),btnTxt: "Continue"},
    { 3: (<SignUpCertNumber signUpData={signUpData} setSignUpData={setSignUpData}/>),btnTxt: "Continue"},
    { 4: <SignUpForm signUpData={signUpData} setSignUpData={setSignUpData} />, btnTxt: "Continue"},
    { 5: <SignUpResult signUpData={signUpData} setSignUpData={setSignUpData} />, btnTxt: "Wooyano Login"}];

  useEffect(() => {}, [signUpData]);

  return (
    <div>
      {stepId >= 1 ? (
          <StepperNumber
            stepId={stepId - 1}
            StepperNumberData={StepperNumberData}
          />
      ) : null}
      {stepperComponent[stepId - 1][stepId]}
        <StepperBtn
          signUpData={signUpData}
          setSignUpData={setSignUpData}
          btnText={stepperComponent[stepId - 1]["btnTxt"]}
          stepId={stepId}
          setStepId={setStepId}
        />
    </div>
  );
}
