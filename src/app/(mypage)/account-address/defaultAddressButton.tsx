'use client'
import { Address } from '@/types/addressListType'
import { HomeIcon } from "@heroicons/react/24/solid";
import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2';

interface DefaultAddressButtonProps {
    address: Address;
}


const DefaultAddressButton: React.FC<DefaultAddressButtonProps> = ({ address }) => {
    const [defaultAddress, setDefaultAddress] = useState<boolean>(address.defaultAddress);

    const session = useSession();
    const usertoken = session.data?.user.result.token;
    const useremail = session.data?.user.result.email;

    const handleChangeDefault = () => {
        if (!defaultAddress) {
            Swal.fire({
                text: `대표 주소로 설정하시겠습니까?`,
                toast: false,
                position: "center",
                showConfirmButton: true,
                showCancelButton: true,
                timerProgressBar: false,
                customClass: {
                    popup: 'my-swal-position',
                    container: "my-swal-input-container", // 팝업 컨테이너
                    confirmButton: "my-swal-input-ConfirmButton", //확인 버튼 css
                    cancelButton: "my-swal-input-CancelButton",   //취소 버튼 css 
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const setDefaultURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/address/default/${address.id}`
                    try {
                        const res = await fetch(setDefaultURL, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': `Bearer ${usertoken}`,
                                'Email': `${useremail}`,
                            }
                        }); if (res.ok) {
                            Swal.fire({
                                text: "대표주소로 설정되었습니다.",
                                toast: false,
                                position: "center",
                                showConfirmButton: false,
                                timer: 1000,
                                customClass: {
                                    container: "my-swal",
                                    popup: "my-swal-position",
                                },
                            }).then((result) => {
                                if (result) {
                                    window.location.reload();
                                }
                            });
                        } else {
                        }
                    } catch (error) {
                        console.error("에러 발생:", error);
                    }
                }
            });
        }
    }
    return (
        <div>
            <button
                onClick={handleChangeDefault}>
                <HomeIcon
                    className={`${address.defaultAddress
                        ? "text-primary-6000"
                        : "text-slate-400"
                        } md:w-6 md:h-6 w-6 h-6`}
                />
            </button>
        </div>
    );
};

export default DefaultAddressButton;