import LoginForm from "@/app/login/loginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import LoginLogo from "@/app/login/loginLogo";
import SnsLoginForm from "@/app/login/snsLogin";

async function Loginpage() {
  const session = await getServerSession(options);
  console.log("session", session || "no session");

  return (
    <div className="container mb-24 lg:mb-32">
        <LoginLogo />
        <LoginForm email={""} password={""} />
        <SnsLoginForm />
    </div>
  );
}

export default Loginpage;