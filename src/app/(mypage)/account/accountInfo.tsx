"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import { AccountInfoType } from "@/types/AccountInfoType";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Button from "@/shared/Button";

export default function AccountInfo({
  accountInfo,
  session,
}: {
  accountInfo: AccountInfoType;
  session: any
}) {
  //세션정보 불러오기
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;

  //기존 정보
  const [defaultInfoData] = useState<AccountInfoType>({
    username: accountInfo.username, //서버에서 받아오는 값으로 변경
    email: accountInfo.email, //서버에서 받아오는 값으로 변경
    birthday: accountInfo.birthday,
    nickname: accountInfo.nickname,
    phone: accountInfo.phone,
  });

  //입력된 정보
  const [accountInfoEditForm, setAccountInfoEditForm] =
    useState<AccountInfoType>({
      username: accountInfo.username,
      email: accountInfo.email,
      birthday: "" || accountInfo.birthday,
      nickname: "" || accountInfo.nickname,
      phone: "" || accountInfo.phone,
    });

  //정보 변경 여부
  const [changeInfo, setChangeInfo] = useState<boolean>(false);

  //입력값 업데이트
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;

    setAccountInfoEditForm({
      ...accountInfoEditForm,
      [id]: value,
    });

    if (defaultInfoData[id as keyof AccountInfoType] !== value) {
      setChangeInfo(true);
      if (id === "nickname") {
        if (defaultInfoData.nickname !== value) {
          setNicknameChecked(false);
        }
      }
    } else {
      setChangeInfo(false);
    }
  };

  //닉네임 중복 검사 여부
  const [nicknameCheked, setNicknameChecked] = useState<boolean>(true);

  //닉네임 중복 검사
  const handleNicknameCheck = async () => {
    if (accountInfo.nickname === accountInfoEditForm.nickname) {
      setNicknameChecked(true);
      Swal.fire({
        text: "닉네임이 변경되지 않았습니다.",
        toast: false,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
        customClass: {
          container: "my-swal",
          popup: "my-swal-position",
        },
      });
    } else if (accountInfo.nickname !== accountInfoEditForm.nickname) {
      setNicknameChecked(false);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/nickname/check?nickname=${accountInfoEditForm.nickname}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.result.checkResult === true) {
            Swal.fire({
              text: "이미 사용중입니다.",
              toast: false,
              position: "center",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: false,
              customClass: {
                container: "my-swal",
                popup: "my-swal-position",
              },
            });
          } else if (data.result.checkResult === false) {
            setNicknameChecked(true);
            Swal.fire({
              text: "사용가능한 닉네임입니다.",
              toast: false,
              position: "center",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: false,
              customClass: {
                container: "my-swal",
                popup: "my-swal-position",
              },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "실패",
              text: "요청에 실패했습니다.",
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
            popup: "my-swal-position",
          },
        });
      }
    }
  };

  //비밀번호 인증 및 수정사항 적용 fetch
  const handleEditAccountInfo = async () => {
    if (!nicknameCheked) {
      Swal.fire({
        text: "닉네임 중복검사를 진행해주세요.",
        toast: false,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
        customClass: {
          container: "my-swal",
          popup: "my-swal-position",
        },
      });
    } else {
      if (accountInfo === accountInfoEditForm) {
        setChangeInfo(false);
        Swal.fire({
          text: "수정사항이 없습니다.",
          toast: false,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          customClass: {
            container: "my-swal",
            popup: "my-swal-position",
          },
        });
      } else {
        if (
          accountInfoEditForm.birthday.length === 8 &&
          accountInfoEditForm.phone.length === 11
        ) {
          //비밀번호 입력
          const { value: password } = await Swal.fire({
            input: "password",
            inputPlaceholder: "비밀번호를 입력해주세요.",
            toast: false,
            position: "center",
            showConfirmButton: true,
            showCancelButton: true,
            customClass: {
              container: "my-swal-input-container",
              confirmButton: "my-swal-input-ConfirmButton",
              cancelButton: "my-swal-input-CancelButton",
              input: "my-swal-input",
              popup: "my-swal-position",
            },
            inputValidator: (value) => {
              if (!value) {
                return "비밀번호 입력은 필수입니다.";
              }
            },
          });
          if (password) {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/mypage/password/check`;
            const res = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${usertoken}`,
                Email: `${useremail}`,
              },
              body: JSON.stringify({
                password: `${password}`,
              }),
            });
            if (res.ok) {
              const data = await res.json();
              if (data.result.checkResult === true) {
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/mypage/info`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${usertoken}`,
                        Email: `${useremail}`,
                      },
                      body: JSON.stringify({
                        username: `${accountInfoEditForm.username}`,
                        birthday: `${accountInfoEditForm.birthday}`,
                        nickname: `${accountInfoEditForm.nickname}`,
                        phone: `${accountInfoEditForm.phone}`,
                      }),
                    }
                  );
                  if (res.ok) {
                    const data = await res.json();
                    if (data.success === true) {
                      setChangeInfo(false);
                      Swal.fire({
                        text: "수정이 완료되었습니다.",
                        toast: false,
                        position: "center",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: false,
                        customClass: {
                          container: "my-swal",
                          popup: "my-swal-position",
                        },
                      }).then(() => {
                        //정보 반영을 위한 새로고침
                        window.location.reload();
                      });
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
                          popup: "my-swal-position",
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
                      popup: "my-swal-position",
                    },
                  });
                }
              } else if (data.result.checkResult === false) {
                Swal.fire({
                  text: "비밀번호가 일치하지않습니다",
                  toast: false,
                  position: "center",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: false,
                  customClass: {
                    container: "my-swal",
                    popup: "my-swal-position",
                  },
                });
              } else {
                Swal.fire({
                  text: "서버와 통신실패하였습니다.",
                  toast: false,
                  position: "center",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: false,
                  customClass: {
                    container: "my-swal",
                    popup: "my-swal-position",
                  },
                });
              }
            } else {
              const data = res.json();
            }
          }
        } else {
          Swal.fire({
            text: "생년월일 8자리, 전화번호 11자리를 모두 입력해주세요.",
            toast: false,
            position: "center",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: false,
            customClass: {
              container: "my-swal",
              popup: "my-swal-position",
            },
          });
        }
      }
    }
  };

  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div
      className={`md:space-y-6 space-y-4 transition-all duration-500 ease-in-out transform ${
        showAnimation
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-[-8px]"
      }`}
    >
      <h2 className="text-3xl font-semibold">Account infomation</h2>
      <div>
        <p className="md:text-sm text-xs text-gray-500">
          아래의 Update Info를 눌러 수정을 완료해주세요.
        </p>
        <p className="md:text-sm text-xs text-gray-500 pt-2">
          이름과 이메일은 수정하실 수 없습니다.
        </p>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mt-1 text-xs">Change Image</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex-grow mt-0 max-w-3xl space-y-6">
          <div>
            <Label>Name</Label>
            <Input
              className="mt-1.5"
              defaultValue={defaultInfoData.username}
              readOnly
              id="username"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              className="mt-1.5"
              defaultValue={defaultInfoData.email}
              readOnly
              id="email"
            />
          </div>
          <div>
            <div>
              <Label>Nickname</Label>
            </div>
            <div className="flex gap-4 items-center">
              <Input
                className="mt-1.5"
                defaultValue={defaultInfoData.nickname}
                id="nickname"
                onChange={handleOnChange}
                maxLength={8}
              />
              <Button
                className="mt-1.5 rounded-2xl max-h-10 ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50"
                onClick={handleNicknameCheck}
              >
                Check
              </Button>
            </div>
          </div>
          <div>
            <Label>Date of birth</Label>
            <Input
              className="mt-1.5"
              defaultValue={defaultInfoData.birthday}
              type="number"
              id="birthday"
              onChange={handleOnChange}
              maxLength={8}
              minLength={8}
            />
          </div>
          <div>
            <Label>Phone number</Label>
            <Input
              className="mt-1.5"
              defaultValue={defaultInfoData.phone}
              id="phone"
              onChange={handleOnChange}
              maxLength={11}
              type="number"
            />
          </div>
          {changeInfo ? (
            <div className="pt-6">
              <button
                className="py-3 px-8 w-full md:w-2xl rounded-3xl ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 w-2xl"
                onClick={handleEditAccountInfo}
              >
                Update info
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
