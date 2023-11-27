"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Input from "@/shared/Input";
import { DaumAddressType } from "@/types/DaumAddrssType";
import PostCodeDaum from "@/components/widget/postCodeDaum";
import Button from "@/shared/Button";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface addressType {
  localAddress: string;
  extraAddress: string;
  localCode: number;
  defaultAddress: boolean;
}

export default function AddressEditButton({addressId}:{addressId : number}) {
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;
  const router = useRouter();

  // 버튼 클릭 여부
  const [isView, setIsView] = useState<boolean>(false);
  const [addressInfo, setAddressInfo] = useState<DaumAddressType>();
  //모달창 상태
  const handleOpenModal = () => {
    setIsView(!isView);
  };
  //주소입력 폼
  const [addressForm, setAddressForm] = useState<addressType>({
    localAddress: "",
    extraAddress: "",
    localCode: 0,
    defaultAddress: false,
  });

  //값입력
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;
    setAddressForm({
      ...addressForm,
      [id]: value,
    });
  };

  //주소 수정 요청
  const handleEditaddress = async () => {
    if (!usertoken) {
      Swal.fire({
        text: "로그인 정보가 없습니다.",
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
      router.push("/login");
    } else {
      if (
        !addressForm.localAddress ||
        !addressForm.extraAddress ||
        !addressForm.localCode
      ) {
        Swal.fire({
          text: `모든 정보를 입력해주세요.`,
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
        try {
          //주소 수정 fetch
          const addAddressURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/address`;
          const res = await fetch(addAddressURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${usertoken}`,
              "Email" : `${useremail}`
            },
            body: JSON.stringify({
              addressId: addressId,
              localAddress: addressForm.localAddress,
              extraAddress: addressForm.extraAddress,
              localCode: addressForm.localCode,
            }),
          });
          //통신 성공
          if (res.ok) {
            const data = await res.json();
            //주소 등록 완료
            if (data.success) {
              Swal.fire({
                text: "주소가 수정되었습니다.",
                toast: false,
                position: "center",
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                  container: "my-swal",
                  popup: "my-swal-position",
                },
              }).then(() => {
                //정보 반영을 위한 새로고침
                router.push("/account-address")
              });
            } else {
            }
          }
        } catch (error) {
          console.error("에러 발생:", error);
          Swal.fire({
            text: "통신에 실패하였습니다.",
            toast: false,
            position: "center",
            showConfirmButton: false,
            customClass: {
              container: "my-swal",
              popup: "my-swal-position",
            },
          });
        }
      }
    }
  };

  //주소 검색결과 두 값이 모두 있을 경우 지역주소와 시군구 코드 업데이트
  useEffect(() => {
    if (addressInfo?.address && addressInfo?.sigunguCode) {
      const localCodeset: number = parseInt(addressInfo.sigunguCode);
      setAddressForm((prevForm) => ({
        ...prevForm,
        localCode: localCodeset,
        localAddress: addressInfo.address,
      }));
    }
  }, [addressInfo]);

  return (
    <div className="bg-white rounded-xl dark:bg-neutral-900 px-2 py-2">
      <div className="">
        <Button
          className="w-full rounded-xl ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50"
          onClick={() => {
            handleOpenModal();
          }}
        >
          Edit Address
        </Button>
      </div>
      <div>
        <Input
          className="mt-1.5"
          placeholder="위의 버튼을 눌러 주소를 검색해주세요."
          id="localAddress"
          type="text"
          value={addressForm.localAddress}
          onChange={handleOnChange}
          readOnly
        />
        <div className="flex gap-2 mt-1.5 ">
          <Input
            className=""
            placeholder="상세 주소를 입력해주세요."
            id="extraAddress"
            type="text"
            value={addressForm.extraAddress}
            onChange={handleOnChange}
          />
          <Button
            className="w-xl rounded-xl ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50"
            sizeClass="px-4 max-h-[42px]"
            onClick={handleEditaddress}
          >
            Edit
          </Button>
        </div>

        <div className="pt-1.5 dark:invert">
          <PostCodeDaum
            isView={isView}
            setIsView={setIsView}
            setAddressInfo={setAddressInfo}
          />
        </div>
      </div>
    </div>
  );
}
