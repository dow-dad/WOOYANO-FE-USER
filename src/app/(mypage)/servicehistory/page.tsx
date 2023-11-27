import React from "react";
import { DEMO_POSTS } from "@/data/posts";

import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionLatestPosts from "../../blog/SectionLatestPosts";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";
import { PostDataType } from "@/data/types";
import { get } from "lodash";

// DEMO DATA
const POSTS = DEMO_POSTS;

async function getServiceData (token:string, email:string) {
  if(!token){
    console.error("세션이 만료됨")
    return null
  }
  try {
    const response = await fetch(`http://3.35.62.185:8000/api/v1/reservation/list?state=전체&page=0&size=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        email: email
      }
    })
    if(response.ok) {
      const res = await response.json();
      console.log('service data get 성공 : ', res.result.reservationDtoList);
      return res.result.reservationDtoList;
    }
  } catch (error) {
    console.log('service data get 실패 : ', error)
  }
}

async function getServiceDetailData (serviceId: number, workerId: number, token: string) {
  
  console.log("서비스 아이디 : ", serviceId)
  console.log("작업자 아이디 : ", workerId)
  try {
    const response = await fetch(`http://3.35.62.185:8000/api/v1/client/review/detail?serviceId=${serviceId}&workerId=${workerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (response.ok) {
      const result = await response.json();
      console.log('name data 성공 : ', result)
      return result;
    }
  } catch (error) {
    console.log('name data 실패 : ', error)
  }
}

async function getIsReview (reservationNum: string, email: string, token: string) {
  const response = await fetch(`http://3.35.62.185:8000/api/v1/review-bookmark/check/review/available/${reservationNum}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      email: email
    }
  })
  if(response.ok) {
    const res = await response.json();
    console.log('isReview data 성공 : ', res.result.checkResult);
    return res.result.checkResult;
  }
}
const BlogPage = async () => {
  const session = await getServerSession(options);
  console.log('servicehistory',session);
  if(!session){
    Swal.fire({
      text: `로그인이 필요한 페이지입니다.`,
      toast: false,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    redirect("/");
  }


  const postDatas = getServiceData(session?.user.result.token, session?.user.result.email);
  const postData = await Promise.all([postDatas]);
  if(!postData){
    Swal.fire({
      text: `로그인이 필요한 페이지입니다.`,
      toast: false,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    redirect("/");
  }
  let newPostData:PostDataType[] = [];
  for(let i=0; i<postData.length; i++){
    try {
      const workerDataRes = getServiceDetailData(postData[i].serviceId, postData[i].workerId, session?.user.result.token);
      const reviewDataRes = getIsReview(postData[i].reservationNum, session?.user.result.email, session?.user.result.token);
      const [workerData, isReviewRes] = await Promise.all([workerDataRes, reviewDataRes])
      console.log("workerData : ", workerData, isReviewRes)
      newPostData.push({
        ...postData[i],
        workerName: workerData.result.workerName,
        companyName: workerData.result.serviceName,
        logoUrl: workerData.result.logoUrl ? workerData.result.logoUrl : "https://wooyano.s3.ap-northeast-2.amazonaws.com/logo/client_logo.png",
        workerUrl: workerData.result.workerUrl ? workerData.result.workerUrl : "https://wooyano.s3.ap-northeast-2.amazonaws.com/profile/profile.png",
        isReview: isReviewRes
    })
    } catch (error) {
      console.log('error : ', error)
    }
  }

  console.log("newPostData : ", newPostData)

  return (
    <div className="nc-BlogPage relative">
      <BgGlassmorphism />
      <SectionLatestPosts data={session.user.result} newPostData={newPostData}/>
    </div>
  );
};

export default BlogPage;