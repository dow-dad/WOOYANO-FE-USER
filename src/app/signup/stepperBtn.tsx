"use client";
import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpType } from "@/types/SignUpType";
import Swal from "sweetalert2";
import Button from "@/shared/Button";

export default function StepperBtn({
  btnText,
  stepId,
  setStepId,
  signUpData,
  setSignUpData,
}: {
  btnText: string;
  stepId: number;
  setStepId: React.Dispatch<SetStateAction<number>>;
  signUpData: SignUpType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpType>>;
}) {
  const router = useRouter();

  interface ErrorSignUpType {
    message: string;
  }

  const hadnleSignUpFetch = async () => {
    let errorText: ErrorSignUpType = {
      message: "",
    };

    if (stepId == 2) {
      if (!signUpData.username && signUpData.email)
        errorText.message = "이름을 입력해주세요.";
      if (!signUpData.email && signUpData.username)
        errorText.message = "이메일을 입력해주세요.";
      if (!signUpData.email && !signUpData.username)
        errorText.message = "모든 정보를 입력해주세요.";
      if (signUpData.email && signUpData.emailformcheck === false)
        errorText.message = "올바른 이메일 형식으로 입력해주세요.";
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
      }
      // 이상 없을 시 이메일 중복검사 후 인증 요청
      else {
        try {
          //이메일 중복 검사 요청
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/email/check?email=${signUpData.email}`
          );
          //중복결과 분기
          if (res.ok) {
            const data = await res.json();
            const result = data.result.checkResult;
            //중복이 없었을 때,
            if (result === false) {
              //인증번호 요청
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/send/user/join/code?name=${signUpData.username}&email=${signUpData.email}`
              );
              //인증번호 요청 - 응답이 있을 경우
              if (res.ok) {
                const data = await res.json();
                //인증번호 요청 성공
                if (data.success === true) {
                  errorText.message == "";
                  setStepId(stepId + 1);
                }
                // 인증번호 요청 실패
                else {
                  Swal.fire({
                    text: "인증 요청에 실패하였습니다.",
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
                }
              }
              //인증번호 요청 - 응답이 없을 경우
              else {
                Swal.fire({
                  text: "인증 요청에 실패하였습니다.",
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
              }
            }
            // 중복일 경우
            else if (result === true) {
              Swal.fire({
                text: "이미 사용중인 이메일 입니다.",
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
            }
            // 기타 에러
            else {
              Swal.fire({
                text: "인증 요청에 실패하였습니다.",
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
            }
          }
          // 기타 에러
          else {
            throw new Error("서버 응답이 실패했습니다.");
          }
        } catch (error) {
          console.error("에러 발생:", error);
          Swal.fire({
            text: "서버와의 통신 중 문제가 발생했습니다.",
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
        }
      }
    } else if (stepId == 3) {
      if (
        !signUpData.emailCertNumber ||
        signUpData.emailCertNumber.length !== 4
      )
        errorText.message = "메일로 받은 인증번호를 입력해주세요.";
      if (errorText.message) {
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
        try {
          //이메일 인증번호 확인
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/confirm/code?email=${signUpData.email}&code=${signUpData.emailCertNumber}`
          );
          // to-do 이메일 인증 fetch 추가 및 에러처리
          if (res.ok) {
              res.json().then((data) => {
                if (data.success === true) {
                  setStepId(stepId + 1);
                }
              })
            } else if (!res.ok) {
              res.json().then((data) => {
                if (data.code === 9020) {
                  Swal.fire({
                    text: `인증번호가 일치하지 않습니다.`,
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
                }else {
                  Swal.fire({
                    title: `${data.code}`,
                    text: `알 수 없는 에러가 발생하였습니다.`,
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
                }
            
            })
          }
          // 기타 에러
          else {
            throw new Error("서버 응답이 실패했습니다.");
          }
        } catch (error) {
          console.error("에러 발생:", error);
          Swal.fire({
            text: "서버와의 통신 중 문제가 발생했습니다.",
            toast: false,
            position: "center",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: false,
            customClass: {
              container: "my-swal",
            },
          });
        }
      }
    } else if (stepId == 4) {
      if (
        !signUpData.username ||
        !signUpData.email ||
        !signUpData.password ||
        !signUpData.birthday ||
        !signUpData.nickname ||
        !signUpData.phone ||
        !signUpData.localAddress ||
        !signUpData.extraAddress ||
        signUpData.localCode === 0
      ) {
        Swal.fire({
          text: "모든 정보를 입력해주세요",
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
        if (!signUpData.nicknameCheck) {
          Swal.fire({
            text: "닉네임 중복확인을 해주세요.",
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
        }
        if (signUpData.password != signUpData.secondPassword) {
          Swal.fire({
            text: "입력하신 비밀번호가 서로 다릅니다.",
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
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/join`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: `${signUpData.email}`,
                  password: `${signUpData.password}`,
                  username: `${signUpData.username}`,
                  nickname: `${signUpData.nickname}`,
                  birthday: `${signUpData.birthday}`,
                  phone: `${signUpData.phone}`,
                  localAddress: `${signUpData.localAddress}`,
                  extraAddress: `${signUpData.extraAddress}`,
                  localCode: signUpData.localCode,
                }),
              }
            );

            if (res.ok) {
              const data = await res.json();
              if (data.success === true) {
                setStepId(stepId + 1)
              } else {
                Swal.fire({
                  text: "서버와의 통신 중 문제가 발생했습니다.",
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
              }
            }
            // 기타 에러
            else {
              throw new Error("서버 응답에 실패했습니다.");
            }
          } catch (error) {
            console.error("에러 발생:", error);
            Swal.fire({
              text: "서버와의 통신 중 문제가 발생했습니다.",
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
          }
        }
      }
    }
  };

  const hadleEmailCertAgain = async () => {
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
        setStepId(stepId - 2);
        //모든 입력값 초기화
        signUpData.email = "",
          signUpData.password = "",
          signUpData.secondPassword = "",
          signUpData.username = "",
          signUpData.nickname = "",
          signUpData.birthday = "",
          signUpData.phone = "",
          signUpData.localAddress = "",
          signUpData.extraAddress = "",
          signUpData.localCode = 0,
          signUpData.emailCertNumber = "",
          signUpData.passwordCheck = false,
          signUpData.nicknameCheck = false,
          signUpData.emailformcheck = false
      } else {
      }
    });
  };

  return (
    <div className="pt-10 justify-center md:px-10 px-4">
      <div className="flex gap-6 box-border w-full mx-auto">
        <Button
          className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 rounded-xl w-full ${stepId === 1 || stepId === 5 ? "hidden" : " "}`}
          onClick={
            stepId === 0
              ? () => { }
              : stepId === 4
                ? hadleEmailCertAgain
                : () => setStepId(stepId - 1)
          }
        >
          Back
        </Button>
        <Button
          className="ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 rounded-xl w-full"
          onClick={
            stepId === 5
              ? () => router.push("/login")
              : stepId === 2 || stepId === 3 || stepId === 4
                ? hadnleSignUpFetch
                : () => setStepId(stepId + 1)
          }
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
