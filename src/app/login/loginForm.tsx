"use client";
import React, { FC, useState, ChangeEvent } from "react";
import Input from "@/shared/Input";
import Link from "next/link";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import CheckEmailForm from "../../components/widget/checkEmailForm";
import PasswordViewButton from "../../components/widget/passwordViewButton";
import Button from "@/shared/Button";
import { useRouter, useSearchParams} from "next/navigation";

export interface LoginFormProps {
  email: string;
  password: string;
}

function LoginForm() {
  const query = useSearchParams();
  const callBackUrl = query.get("callbackUrl");
  const router = useRouter();

  //로그인 폼 기본 설정
  const [loginForm, setLoginForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  //비밀번호 표시 여부 설정을 위한 타입 선택
  const [pwType, setPwType] = useState<boolean>(true);

  //이메일 유효성 검사 변수
  const [checkEmail, setCheckEmail] = useState<boolean>(false);

  //email, password 값 실시간 적용, 자동로그인 적용, 에러 텍스트 표시
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;
    // 이메일 유효성 검사 정규식
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    //이메일 유효성 검사
    if (id === "email") {
      const checkedEmail = emailRegex.test(value);
      setCheckEmail(checkedEmail);
    }
    setLoginForm({
      ...loginForm,
      [id]: value,
    });
  };

  //로그인 유효성 확인 및 로그인 패칭
  const handleLoginFetch = async () => {

    if (!loginForm.email || !loginForm.password) {
      Swal.fire({
        text: `이메일, 비밀번호를 입력해주세요`,
        toast: false,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
        customClass: {
          container: "my-swal",
          popup: "my-swal-position",
        },
      });
      return;
    }

    if (checkEmail === false) {
      Swal.fire({
        text: `이메일형식을 지켜주세요.`,
        toast: false,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false,
        customClass: {
          container: "my-swal",
          popup: "my-swal-position",
        },
      });
      return;
    } else {
      try {
        const result = await signIn("credentials", {
          email: loginForm.email,
          password: loginForm.password,
          redirect: false,
          callbackUrl: callBackUrl ? callBackUrl : "/",
        });
        if (!result || !result.ok) {
          Swal.fire({
            text: `아이디 비밀번호 확인 후 다시 시도해주세요.`,
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
        } else {
          Swal.fire({
            text: `우야노에 오신걸 환영합니다!`,
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
          router.push("/")
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  //비밀번호 표시 여부
  const handlePwType = () => {
    setPwType(!pwType);
  };

  return (
    <div className={`nc-LoginForm`}>
      <div className="container mb-6 lg:mb-12">
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Email
                <Link
                  href="/findid"
                  className="text-sm underline font-medium text-end"
                >
                  Forgot Email?
                </Link>
              </span>
              <div className="relative">
                <Input
                  id="email"
                  type="text"
                  placeholder="example@example.com"
                  className="mt-1"
                  value={loginForm.email}
                  onChange={handleOnChange}
                />
                <div className="absolute right-3.5 top-1/4">
                  <CheckEmailForm checked={checkEmail} />
                </div>
              </div>
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/chgpw" className="text-sm underline font-medium">
                  Forgot password?
                </Link>
              </span>
              <div className="relative">
                <Input
                  id="password"
                  type={pwType ? "password" : "text"}
                  className="mt-1"
                  value={loginForm.password}
                  onChange={handleOnChange}
                />
                <div className="absolute right-3 top-3">
                  <PasswordViewButton pwType={pwType} onClick={handlePwType} />
                </div>
              </div>
            </label>
            <Button
              className="w-full rounded-xl ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50"
              onClick={handleLoginFetch}
            >
              Sign In
            </Button>
          </div>
          {/* ==== */}
          <div>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              WooYaNo가 처음이신가요? {` `}
              <Link href="/signup" className="font-semibold underline">
                회원가입 하기
              </Link>
            </span>
          </div>

          {/* OR */}
          {/* <div className="relative text-center">
            <button
              className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900"
              onClick={() => setShowSnsLogin(!showSnsLogin)}
            >
              다른 방법으로 로그인하기
            </button>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* <div */}
            {/* className={`transition-all duration-700 ease-in-out ${
              showSnsLogin
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-8px]"
            }`} */}
          {/* > */}
            {/* {showSnsLogin && (
              <div>
                <SnsLogin />
              </div>
            )} */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
