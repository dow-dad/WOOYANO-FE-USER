import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionGridFilterCard from "../../(review)/SectionGridFilterCard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

export interface newDataType {
  reviewId: number;
  serviceId: number;
  serviceName: string;
  reservationNum: string;
  reuse: boolean;
  createdAt: Date;
  reservationDate: Date;
  workerId: number;
  workerName: string;
}

async function getData (token:string, email:string) {
    if (!token) {
      redirect("/")
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/review-bookmark/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Email: `${email}`,
        },
      });
  
      if (response.ok) {
        const res = await response.json();
        console.log("리뷰 리스트 성공:", res);
        return res.result;
      }
    } catch (error) {
      console.error("리뷰 리스트 실패:", error);
    }
  }

async function getWorkerId (reservationNum:string, token:string) {
  if (!token) {
    console.error("세션이 만료됨")
    return null
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify({
      "reservationNum" : reservationNum,
      })
  })
  if (response.ok) {
    const res = await response.json();
    return res.result[0];
    }
  } catch (error) {
    console.log('worker data', error)
  }
}

async function getWorkNameAndClientName (serviceId:number, token:string, workerId:number) {
  if (!token) {
    console.error("세션이 만료됨")
    return null
  }

  const serId = serviceId.toString();
  const worId = workerId.toString();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/client/review/detail?serviceId=${serId}&workerId=${worId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    if (response.ok) {
      const res = await response.json();
      return res.result;
      }
    } catch (error) {
      console.log('worker data', error)
    }
}

const ListingFlightsPage = async () => {
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

  const res = getData(session.user.result.token, session.user.result.email);
  const data = await Promise.all([res]);
  const userName:string = await session.user.result.username;
  let newData:newDataType[] = []

  if (data[0] !== null) {  
    for (let i = 0; i < data.length; i++) {
      const workerIds = getWorkerId(data[i].reservationNum, session.user.result.token);
      const [workerId] = await Promise.all([workerIds]);
      const workerNames = getWorkNameAndClientName(data[i].serviceId, session.user.result.token, workerId.workerId);
      const [workerName] = await Promise.all([workerNames]);
      console.log("workerName",workerName)
      newData.push({
        reviewId: data[i].reviewId,
        serviceId: data[i].serviceId,
        serviceName: workerName.serviceName,
        reservationNum: data[i].reservationNum,
        reuse: data[i].reuse,
        createdAt: data[i].createdAt,
        workerId: workerId.workerId,
        workerName: workerName.workerName,
        reservationDate: workerId.reservationDate
      })
  }
  }



  console.log("newData",newData)


  return (
    <div className="nc-BlogPage overflow-hidden relative">
      {data===null? 
      <p>
        표시할 항목이 없습니다.
      </p>
      : 
      <>
          <BgGlassmorphism />
          <SectionGridFilterCard data={newData} userName={userName}/>
      </>
      }
    </div>
  );
};


export default ListingFlightsPage;