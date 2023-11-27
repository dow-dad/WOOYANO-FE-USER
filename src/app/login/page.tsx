'use client'
import LoginForm from "@/app/login/loginForm";
import React from "react";
import LoginLogo from "@/app/login/loginLogo";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


function Loginpage() {
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const router = useRouter()
  if(usertoken){
    router.push("/");
  }
  return (
    <div className="container mb-24 lg:mb-32">
        <LoginLogo/>
        <LoginForm/>
    </div>
  );
}

export default Loginpage;
