"use client";
import React, { ChangeEvent, useState } from "react";
import Input from "@/shared/Input";
import { ChgPwType } from "@/types/ChgPwType";
import PasswordViewButton from "@/components/widget/passwordViewButton";

interface newPwform {
  newpassword: string;
  checkPassword: string;
}

export default function ChgPwForm(props: {
  chgPwData: ChgPwType;
  setChgPwData: React.Dispatch<React.SetStateAction<ChgPwType>>;
}) {
  const { chgPwData, setChgPwData } = props;
  const [pwType, setPwType] = useState<boolean>(true);


  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setChgPwData({
      ...chgPwData,
      [id]: value,
    });
  };

  const handleHiddenPw = () => {
    setPwType(!pwType);
  };

  return (
    <div className="container mb-6 lg:mb-12">
      <div className="max-w-md mx-auto space-y-6">
        {/* HEADING */}
        <div className="flex flex-col font-semibold gap-3 mt-16">
          <h2 className="text-3xl">Change Password</h2>
          <p className="text-xl">
            비밀번호 변경을 위해 아래 정보를 입력해주세요.
          </p>
        </div>
        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="grid grid-cols-1 gap-6" >
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              New Password
            </span>
            <div className="relative">
              <Input
                id="newpassword"
                type={pwType ? "password" : "text"}
                placeholder="새 비밀번호를 입력해주세요."
                className="mt-1"
                value={chgPwData.newpassword}
                onChange={handleOnChange}
              />
              <div className="absolute right-3 top-3">
                <PasswordViewButton pwType={pwType} onClick={handleHiddenPw} />
              </div>
            </div>
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password Check
            </span>
            <Input
              id="checkPassword"
              type="password"
              placeholder="한번 더 입력해주세요."
              className="mt-1 mb-6"
              value={chgPwData.checkPassword}
              onChange={handleOnChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
