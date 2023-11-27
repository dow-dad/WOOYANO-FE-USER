"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChgPwType } from "@/types/ChgPwType";
import Swal from "sweetalert2";
import Button from "@/shared/Button";

export default function StepperBtn({
  btnText,
  stepId,
  setStepId,
  chgPwData,
  setChgPwData,
}: {
  btnText: string;
  stepId: number;
  setStepId: React.Dispatch<SetStateAction<number>>;
  chgPwData: ChgPwType;
  setChgPwData: React.Dispatch<React.SetStateAction<ChgPwType>>;
}) {
  const router = useRouter();

  interface ErrorSignUpType {
    message: string;
  }

  const handleChgPwFetch = async () => {
    let errorText: ErrorSignUpType = {
      message: "",
    };

    if (stepId == 1) {
      if (!chgPwData.emailChecked) {
        errorText.message = "이메일 인증을 진행해주세요";
      }
      if (errorText.message != "") {
        Swal.fire({
          text: errorText.message,
          toast: false,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          customClass: {
            container: "my-swal",
            popup: 'my-swal-position'
          },
        });
      } else {
        setStepId(stepId + 1);
      }
    } else if (stepId == 2) {
      if (!chgPwData.newpassword || !chgPwData.checkPassword) {
        errorText.message = "새 비밀번호를 입력해주세요.";
      }
      if (!chgPwData.checkPassword && chgPwData.newpassword) {
        errorText.message = "새 비밀번호를 한번 더 입력해주세요.";
      }
      if (chgPwData.newpassword !== chgPwData.checkPassword) {
        errorText.message = "입력하신 비밀번호가 서로 일치하지 않습니다.";
      }
      if (errorText.message != "") {
        Swal.fire({
          text: errorText.message,
          toast: false,
          position: "center",
          showConfirmButton: false,
          customClass: {
            container: "my-swal",
            popup: 'my-swal-position'
          },
        });
      } else {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/password`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: chgPwData.email,
                password: chgPwData.newpassword,
              }),
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              Swal.fire({
                text: "변경이 완료되었습니다.",
                toast: false,
                position: "center",
                showConfirmButton: true,
                showCancelButton: false,
                customClass: {
                  container: "my-swal",
                  popup: 'my-swal-position'
                },
              }).then((result) => {
                if (result) {
                  router.push("/login");
                }
              });
            }
          }
        } catch (error) {
          console.error("에러 발생:", error);
        }
      }
    }
  };

  const hadleReCertEmail = () => {
    Swal.fire({
      text: "현재 단계에서 벗어나시면, 이메일 재인증이 필요합니다.",
      toast: false,
      position: "center",
      showConfirmButton: true,
      showCancelButton: true,
      customClass: {
        container: "my-swal",
        popup: 'my-swal-position'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setStepId(stepId - 1);
        //모든 입력값 초기화
        chgPwData.emailCertNumber = "";
        chgPwData.newpassword = "";
        chgPwData.emailChecked = false;
        chgPwData.passwordChecked = false;
      } else {
      }
    });
  };

  return (
    <div className="pt-10 justify-center md:px-10 px-4">
      <div className="flex gap-6 box-border w-full mx-auto">
        <Button
          className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 rounded-xl w-full`}
          onClick={
            stepId === 1
              ? () => router.push("/login")
              : stepId === 2
              ? hadleReCertEmail
              : () => {}
          }
        >
          Back
        </Button>
        <Button
          className="ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 rounded-xl w-full"
          onClick={
            stepId === 1
              ? handleChgPwFetch
              : stepId === 2
              ? handleChgPwFetch
              : () => {}
          }
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
