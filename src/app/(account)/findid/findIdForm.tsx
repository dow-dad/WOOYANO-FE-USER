"use client";
import Input from "@/shared/Input";
import React, { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Button from "@/shared/Button";

interface findIdForm {
  name: string;
  phoneNumber: string;
}

export default function FindIdForm() {
  const router = useRouter();
  const [findIdForm, setFindIdForm] = useState<findIdForm>({
    name: "",
    phoneNumber: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;
    setFindIdForm({
      ...findIdForm,
      [id]: value,
    });
  };

  const handleFindId = async () => {
    if (!findIdForm.name || !findIdForm.phoneNumber) {
      Swal.fire({
        text: "이름과 전화번호를 모두 입력해주세요.",
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/email/find?username=${findIdForm.name}&phone=${findIdForm.phoneNumber}`
        );
        if (res.ok) {
          res.json().then((data) => {
            const code = data.code;
            if (code === 200) {
              const userEmail = data.result.email;
              router.push(
                `/findid/result?name=${findIdForm.name}&email=${userEmail}`
              );
            } else {
              Swal.fire({
                title: `${data.code}`,
                text: `알 수 없는 에러가 발생하였습니다.`,
                toast: false,
                position: "top",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: false,
                customClass: {
                  container: "my-swal",
                  popup: 'my-swal-position'
                },
              });
            }
          });
        } else if (!res.ok) {
          res.json().then((data) => {
            const code = data.code;
            if (code === 1040) {
              Swal.fire({
                text: "가입된 정보가 없습니다.",
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
              Swal.fire({
                text: "서버통신에 문제가 발생하였습니다.",
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
          });
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    }
  };
  return (
    <div className="container mb-6 lg:mb-12">
      <div className="max-w-md mx-auto space-y-6">
        {/* HEADING */}
        <div className="flex flex-col font-semibold gap-3 mt-16">
          <h2 className="text-3xl">Find Email</h2>
          <p className="text-xl">
            서비스에 가입한 이메일을 찾기 위해 아래 정보를 입력해주세요
          </p>
        </div>
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Name
            </span>
            <Input
              id="name"
              type="text"
              placeholder="서비스에 가입된 이름을 입력해주세요."
              className="mt-1"
              value={findIdForm.name}
              onChange={handleOnChange}
            />
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Phone Number
            </span>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="'-'없이 전부 입력해주세요."
              className="mt-1 mb-6"
              value={findIdForm.phoneNumber}
              onChange={handleOnChange}
            />
          </label>
          <Button
          className="rounded-xl ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 "
          onClick={handleFindId}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
