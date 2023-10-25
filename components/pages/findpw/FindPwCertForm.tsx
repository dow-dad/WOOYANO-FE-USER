import React from "react";
import Link from 'next/link'

function FindPwCertForm(): React.JSX.Element {
  return (
    <div className="flex flex-col my-[4vh] mx-[4vh]">
      <div className="box-border mt-[2vh]">
        <p className="after:content-['*'] after:ml-0.5 after:text-red-500 text-[13px] leading-[3vh] pl-[4px]">이름</p>
        <input
          type="text"
          className="box-border border-[1px] border-black rounded-[8px] min-h-[35px] w-full pl-2"
          placeholder="이름을 입력해주세요."
        />
      </div>

      <div className="box-border mt-[2vh]">
        <p className="after:content-['*'] after:ml-0.5 after:text-red-500 text-[13px] leading-[3vh] pl-[4px]">
          이메일(ID)
        </p>
        <input
          type="text"
          className="box-border border-[1px] border-black rounded-[8px] min-h-[35px] w-full pl-2"
          placeholder='이메일 형식에 맞게 입력해주세요.'
        />
      </div>
      <div className="flex box-border mt-[1vh] gap-2">
        <input
          type="text"
          className="box-border border-[1px] border-black rounded-[8px] min-h-[35px] w-full pl-2"
          placeholder='이메일 인증번호'
        />
        <button className="box-border border-[1px] border-black rounded-[8px] min-w-[8vh] bg-black text-white text-[12px]
        dark:bg-white dark:text-black">
          인증 확인
        </button>
      </div>
      <p className="pl-[1vh] pt-[1vh] text-[12px] text-red-500 dark:text-blue-700">입력 제한 시간 : {"03:00"}</p>
      <Link href="/chgpw">
        <button
          className="mt-[10vh] box-border rounded-[8px] min-h-[35px] w-full bg-black text-white
      dark:bg-white dark:text-black"
        >
          확인
        </button>
      </Link>
    </div>
  );
}

export default FindPwCertForm;