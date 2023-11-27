"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import PasswordViewButton from "@/components/widget/passwordViewButton";
import AccountPasswordButton from "./accountPasswordButton";
import { AccountPasswordType } from "@/types/AccountInfoType";

export default function AccountPassword() {

  const [pwType, setPwType] = useState<boolean>(true);
  const handlePwType = () => {
    setPwType(!pwType);
  };

  const [changePasswordForm, setChangePasswordForm] =
    useState<AccountPasswordType>({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;
    setChangePasswordForm({
      ...changePasswordForm,
      [id]: value,
    });
  };

  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <>
      <div
        className={`md:space-y-6 space-y-4 transition-all duration-500 ease-in-out transform ${
          showAnimation
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-8px]"
        }`}
      >
        <h2 className="text-3xl font-semibold">Update your password</h2>
        <p className="md:text-sm text-xs text-gray-500">
          비밀번호를 변경하시려면 아래 정보를 입력해주세요.
        </p>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className=" max-w-xl space-y-6">
          <div>
            <Label>Current password</Label>
            <Input
              type="password"
              className="mt-1.5"
              id="currentPassword"
              value={changePasswordForm.currentPassword}
              placeholder="현재 비밀번호를 입력해주세요."
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>New password</Label>
            <div className="relative">
              <Input
                type={pwType ? "password" : "text"}
                className="mt-1.5"
                id="newPassword"
                value={changePasswordForm.newPassword}
                placeholder="새 비밀번호를 입력해주세요."
                onChange={handleOnChange}
              />
              <div className="absolute right-3.5 top-1/4">
                <PasswordViewButton pwType={pwType} onClick={handlePwType} />
              </div>
            </div>
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input
              type="password"
              className="mt-1.5"
              id="confirmPassword"
              placeholder="한번 더 입력해주세요."
              onChange={handleOnChange}
            />
          </div>
          <div className="pt-2">
            <AccountPasswordButton changePasswordForm={changePasswordForm} />
          </div>
        </div>
      </div>
    </>
  );
}
