"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepperBtn from "./stepperBtn";
import { ChgPwType } from "@/types/ChgPwType";
import ChgPwCert from "./chgPwCert";
import ChgPwForm from "./chgPwForm";

export default function ChgPwStepper() {
  const [stepId, setStepId] = useState<number>(1);
  const [chgPwData, setChgPwData] = useState<ChgPwType>({
    email: "",
    emailCertNumber: "",
    newpassword: "",
    checkPassword : "",
    passwordChecked : false,
    emailChecked : false
  });

  const stepperComponent: any = [
    { 1: <ChgPwCert chgPwData={chgPwData} setChgPwData={setChgPwData}/>, btnTxt: "Continue" }, 
    { 2: (<ChgPwForm chgPwData={chgPwData} setChgPwData={setChgPwData} />),btnTxt: "Complete"},
];

  useEffect(() => {}, [chgPwData]);

  return (
    <div>
      {stepperComponent[stepId - 1][stepId]}
        <StepperBtn
          chgPwData={chgPwData}
          setChgPwData={setChgPwData}
          btnText={stepperComponent[stepId - 1]["btnTxt"]}
          stepId={stepId}
          setStepId={setStepId}
        />
    </div>
  );
}
