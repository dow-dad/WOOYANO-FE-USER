import Link from 'next/link'
import React from 'react'

function Findinfo() {
  return (
    <div className='flex space-x-2 font-Omyu_pretty box-border justify-center'>
        <Link href="/member/findid">아이디 찾기</Link>
        <a>|</a>
        <Link href="/member/chgpw">비밀번호 찾기</Link>
    </div>
  )
}

export default Findinfo