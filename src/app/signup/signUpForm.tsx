"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { DaumAddressType } from "@/types/DaumAddrssType";
import Swal from "sweetalert2";
import PostCodeDaum from "@/components/widget/postCodeDaum";
import { SignUpType } from "@/types/SignUpType";
import PasswordViewButton from "@/components/widget/passwordViewButton";

const SignUpForm = (props: {
  signUpData: SignUpType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpType>>;
}) => {
  const [isView, setIsView] = useState<boolean>(false);
  const [addressInfo, setAddressInfo] = useState<DaumAddressType>();
  const { signUpData, setSignUpData } = props;
  const [pwType, setPwType] = useState<boolean>(true);

  //회원가입 정보 업데이트
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    //비밀번호 체크
    if (signUpData.password === signUpData.secondPassword) {
      setSignUpData({
        ...signUpData,
        passwordCheck: true,
      });
    } else {
      setSignUpData({
        ...signUpData,
        passwordCheck: false,
      });
    }

    if (id === "birthday") {
      // 생년월일 필드인 경우 입력값에서 하이픈을 제거하여 "YYYYMMDD" 형식으로 변환
      const birthdayForm = value.replace(/-/g, "");
      setSignUpData({
        ...signUpData,
        birthday: birthdayForm,
      });
    } else {
      setSignUpData({
        ...signUpData,
        [id]: value,
      });
    }
    if (signUpData.nicknameCheck && id === "nickname") {
      // 닉네임 중복확인 후 변경했을 때
      setSignUpData({
        ...signUpData,
        nicknameCheck: false,
      });
    }
  };

  //모달창 상태
  const handleOpenModal = () => {
    setIsView(!isView);
  };

  const handlePwType = () => {
    setPwType(!pwType);
  };

  //닉네임 중복확인 및 확인여부 업데이트
  const handleNickNameCheck = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/nickname/check?nickname=${signUpData.nickname}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.result.checkResult === true) {
          setSignUpData({
            ...signUpData,
            nicknameCheck: false,
          });
          Swal.fire({
            text: "이미 사용중입니다.",
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
        } else if (data.result.checkResult === false) {
          setSignUpData({
            ...signUpData,
            nicknameCheck: true,
          });
          Swal.fire({
            text: "사용가능한 닉네임입니다.",
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
          Swal.fire({
            icon: "error",
            title: "실패",
            text: "요청에 실패했습니다.",
          });
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  //주소 검색결과 두 값이 모두 있을 경우 지역주소와 시군구 코드 업데이트
  useEffect(() => {
    if (addressInfo?.address && addressInfo?.sigunguCode) {
      const localCodeset: number = parseInt(addressInfo.sigunguCode);
      setSignUpData((prevForm) => ({
        ...prevForm,
        localCode: localCodeset,
        localAddress: addressInfo.address,
      }));
    }
  }, [addressInfo?.address, addressInfo?.sigunguCode, setSignUpData]);

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  useEffect(() => { setShowEmailVerification(true) }, []);

  return (
    <div className="space-y-6 sm:space-y-8 md:px-10 py-6">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex-grow md:mt-0 p-4 md:p-0 max-w-3xl space-y-6 ">
          <div className="flex flex-col md:font-semibold gap-3">
            <div className={`flex transition-all duration-500 ease-in-out transform ${showEmailVerification ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-8px]'}`}>
              <div className="space-y-4 md:pl-6">
                <h2 className="text-3xl font-semibold">회원정보 입력</h2>
                <p className="md:text-xl text-md font-normal pb-6">회원정보를 입력해주세요.</p>
              </div>
              <div className="hidden md:block pl-[200px] dark:invert">
                <svg fill="#000000" height="85px" width="85px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 458.018 458.018" >
                  <g>
                    <g>
                      <g>
                        <path d="M307.631,425.737h0.002c0,1.551-1.262,2.813-2.814,2.813H36.111c-1.552,0-2.814-1.262-2.814-2.813V32.282
				c0-1.552,1.262-2.814,2.814-2.814h268.708c1.552,0,2.814,1.262,2.814,2.814v27.411l29.442-28.412
				C336.543,13.943,322.283,0,304.819,0H36.111C18.311,0,3.829,14.481,3.829,32.282v393.455c0,17.799,14.481,32.281,32.281,32.281
				h268.708c17.8,0,32.281-14.481,32.281-32.281V287.234l-29.468,29.467V425.737z"/>
                        <path d="M55.319,345.509c0,8.137,6.597,14.734,14.734,14.734h51.527c-5.48-8.721-7.756-19.103-6.32-29.467H70.053v-0.001
				C61.916,330.775,55.319,337.372,55.319,345.509z"/>
                        <path d="M131.134,256.828H70.053c-8.137,0-14.734,6.597-14.734,14.734s6.597,14.734,14.734,14.734h54.697L131.134,256.828z" />
                        <path d="M184.444,182.882H70.053c-8.137,0-14.734,6.597-14.734,14.734c0,8.137,6.597,14.734,14.734,14.734h84.923
				L184.444,182.882z"/>
                        <path d="M258.39,108.936H70.053c-8.137,0-14.734,6.597-14.734,14.734c0,8.137,6.597,14.734,14.734,14.734h158.869L258.39,108.936
				z"/>
                        <path d="M436.809,60.304c-24.123-24.836-63.396-24.718-87.457-0.657c-13.58,13.58-174.931,174.931-182.482,182.483
				c-1.947,1.946-3.375,4.5-3.982,7.299l-18.249,84.244c-1.045,4.823,0.389,9.944,3.982,13.538c3.569,3.57,8.682,5.034,13.538,3.982
				l84.244-18.249c2.772-0.601,5.386-2.066,7.299-3.982l182.482-182.483C460.105,122.56,460.065,84.236,436.809,60.304z
				 M178.283,317.548l7.686-35.482l27.796,27.796L178.283,317.548z M415.347,125.642L243.283,297.706l-45.158-45.159L370.188,80.483
				c12.872-12.873,33.93-12.445,46.257,1.154C427.758,94.102,427.506,113.483,415.347,125.642z"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>

            </div>

            <div>
              <Label>Name</Label>
              <Input
                className="mt-1.5 bg-slate-300"
                id="username"
                type="text"
                value={signUpData.username}
                onChange={handleOnChange}
                readOnly
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5 bg-slate-300"
                id="email"
                type="text"
                value={signUpData.email}
                onChange={handleOnChange}
                readOnly
              />
            </div>
            <div className="relative">
              <Label>Password</Label>
              <Input
                className="mt-1.5"
                placeholder="사용하실 비밀번호를 입력해주세요."
                id="password"
                type={pwType ? "password" : "text"}
                value={signUpData.password}
                onChange={handleOnChange}
              />
              <div className="absolute right-3 top-[42.5px]">
                <PasswordViewButton pwType={pwType} onClick={handlePwType} />
              </div>
            </div>
            <div>
              <Label>Check Password</Label>
              <Input
                className="mt-1.5"
                placeholder="비밀번호를 한번 더 입력해주세요."
                id="secondPassword"
                type="password"
                value={signUpData.secondPassword}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <Label>Nickname</Label>
              <div className="flex gap-3">
                <Input
                  className="mt-1.5"
                  placeholder="최대 8자리까지 가능합니다."
                  id="nickname"
                  type="text"
                  value={signUpData.nickname}
                  onChange={handleOnChange}
                  maxLength={8}
                />
                <ButtonPrimary
                  className="mt-1.5 max-h-11"
                  onClick={handleNickNameCheck}
                >
                  Check
                </ButtonPrimary>
              </div>
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                className="mt-1.5"
                placeholder="'-' 빼고 전부 입력해주세요."
                id="phone"
                type="text"
                value={signUpData.phone}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <Label>Date of birth</Label>
              <Input
                className="mt-1.5 w-full"
                type="date"
                id="birthday"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <Label>Addess</Label>
              <div className="w-full mx-auto">
                <PostCodeDaum
                  isView={isView}
                  setIsView={setIsView}
                  setAddressInfo={setAddressInfo}
                />
              </div>

              <div className="flex gap-3">
                <Input
                  className="mt-1.5"
                  placeholder="Find 버튼을 통해 주소를 검색해주세요."
                  id="localAddress"
                  type="text"
                  value={signUpData.localAddress}
                  onChange={handleOnChange}
                  readOnly
                />
                <ButtonPrimary
                  className="mt-1.5 max-h-11"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  Find
                </ButtonPrimary>
              </div>
              <Input
                className="mt-1.5"
                placeholder="상세주소를 입력해주세요."
                id="extraAddress"
                type="text"
                value={signUpData.extraAddress}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
