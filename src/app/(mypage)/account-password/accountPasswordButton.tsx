"use client";
import React from "react";
import { AccountPasswordType } from "@/types/AccountInfoType";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AccountPasswordButton({
  changePasswordForm,
}: {
  changePasswordForm: AccountPasswordType;
}) {
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;

  const router = useRouter();

  const handleChangePassword = async () => {
    if ( changePasswordForm.confirmPassword === "" || changePasswordForm.currentPassword === "" ||changePasswordForm.newPassword === "") {
        Swal.fire({
            text: "모두 입력해주세요.",
            toast: false,
            position: "center",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: false,
            customClass: {
              container: "my-swal",
              popup: 'my-swal-position'
            },
          })
    } else {
      if (!useremail || !usertoken) {
        Swal.fire({
          text: "로그인 정보가 없습니다.",
          toast: false,
          position: "center",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: false,
          customClass: {
            container: "my-swal",
            popup: 'my-swal-position'
          },
        });
        router.push("/login");
      } else {
        if (
          changePasswordForm.newPassword !== changePasswordForm.confirmPassword
        ) {
          Swal.fire({
            text: "입력하신 비밀번호가 서로 다릅니다.",
            toast: false,
            position: "center",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: false,
            customClass: {
              container: "my-swal",
              popup: 'my-swal-position'
            },
          });
        } else {
          const checkPasswordURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/mypage/password/check`;
          const changePasswordURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/mypage/password`;
          //1-a. 현재 비밀번호 확인 fetch
          const res = await fetch(checkPasswordURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${usertoken}`,
              Email: `${useremail}`,
            },
            body: JSON.stringify({
              password: `${changePasswordForm.currentPassword}`,
            }),
          });
          //1-b. 현재 비밀번호 fetch 성공 확인 결과
          if (res.ok) {
            const data = await res.json();
            //1-b-a. 현재 비밀번호와 입력값 일치.
            if (data.success == true && data.result.checkResult === true) {
              //2-a.비밀번호 변경 적용 fetch
              const res = await fetch(changePasswordURL, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${usertoken}`,
                  Email: `${useremail}`,
                },
                body: JSON.stringify({
                  password: `${changePasswordForm.newPassword}`,
                }),
              });
              //2-a-a. fetch 성공
              if (res.ok) {
                const data = await res.json();
                Swal.fire({
                  text: "수정이 완료되었습니다.",
                  toast: false,
                  position: "center",
                  showConfirmButton: false,
                  timer: 1000,
                  timerProgressBar: false,
                  customClass: {
                    container: "my-swal",
                    popup: 'my-swal-position'
                  },
                }).then(() => {
                  //정보 반영을 위한 새로고침
                  window.location.reload();
                });
              }
              //2-a-b. fetch 실패
              else {
                throw new Error("서버 응답에 실패했습니다.");
              }
            }
            //1-b-b. 현재 비밀번호와 입력값 미일치 또는 기타에러
            else {
              Swal.fire({
                text: "비밀번호가 일치하지 않습니다.",
                toast: false,
                position: "center",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: false,
                customClass: {
                  container: "my-swal",
                  popup: 'my-swal-position'
                },
              });
            }
          }
          //1-c. 현재 비밀번호 확인 fetch 실패
          else {
            throw new Error("서버 응답에 실패했습니다.");
          }
        }
      }
    }
  };

  return (
    <button
      className="py-3 px-8 w-full md:w-2xl rounded-3xl ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 w-2xl"
      onClick={handleChangePassword}
    >
      Update password
    </button>
  );
}
