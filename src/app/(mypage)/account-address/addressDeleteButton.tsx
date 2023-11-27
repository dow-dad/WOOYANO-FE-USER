"use client";
import { Address } from "@/types/addressListType";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React from "react";
import Swal from "sweetalert2";

export default function AddressDeleteButton({ address }: { address: Address }) {
  //세션정보 불러오기
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;

  const handleDeleteAddress = () => {
    if (address.defaultAddress) {
      Swal.fire({
        text: `대표 주소지 입니다. 대표 주소지 변경 후 삭제해주세요.`,
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
        text: `정말로 삭제하시겠습니까?`,
        toast: false,
        position: "center",
        showConfirmButton: true,
        showCancelButton: true,
        timerProgressBar: false,
        customClass: {
          container: "my-swal",
          popup: "my-swal-position",
          confirmButton: "my-swal-input-ConfirmButton",
          cancelButton: "my-swal-input-CancelButton",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
            const addressDeleteURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/address/${address.id}`;
            try {
              const res = await fetch(addressDeleteURL, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${usertoken}`,
                  Email: `${useremail}`,
                },
              });
              if (res.ok) {
                const data = await res.json();
                if (data.code === 200) {
                  Swal.fire({
                    text: `삭제가 되었습니다.`,
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
                    text: `알 수 없는 오류로 삭제에 실패하였습니다.`,
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
            } catch (error) {
              console.error("에러 발생:", error);
            }
        } else {
        }
      });
    }
  };

  return (
    <button onClick={handleDeleteAddress}>
      <TrashIcon className="md:h-4 md:w-4 h-6 w-6" />
    </button>
  );
}
