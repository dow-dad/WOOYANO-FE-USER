"use client"

import { useChat, Message } from "ai/react"
import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";



export default function ChatComponent() {

  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
  // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds]
  const session = useSession();
  const usertoken = session.data?.user.result.token;
  const useremail = session.data?.user.result.email;
  const username = session.data?.user.result.username;
  const router = useRouter()

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usertoken && useremail) {
      handleSubmit(e)
    } else {
      if (await Swal.fire({
        text: `로그인이 필요한 서비스입니다.`,
        toast: false,
        position: "center",
        showConfirmButton: true,
        timer: 1000,
        timerProgressBar: false,
        customClass: {
          container: "my-swal",
          popup: 'my-swal-position'
        },
      })) {
        router.push('/login');
      }
    }
  }

  return (
    <div className='bg-[#F2F2F2] dark:bg-background1 p-3 w-full h-[100vh] fixed rounded-md  mx-auto pt-2'>
      <div>
        {
          messages[0]?null:<span className="font-semibold text-[12px] text-center text-black flex justify-center items-end pt-2">{"업체 추천해줘"}라고 질문하시면 업체 리스트를 제공해 드립니다.</span>
        }
        
      </div>
      <div className="overflow-y-scroll max-h-[75%] scrollbar-hide" >
        {messages.map((message: Message) => {
          return (
            <div key={message.id} className="pt-4" >
              {/*  Name of person talking */}
              {
                message.role === "assistant"
                  ?
                  <h3 className="text-sm font-semibold mt-2">
                    우야노
                  </h3>
                  :
                  <h3 className="text-sm font-semibold mt-2 flex justify-end pr-2">
                    {username}
                  </h3>
              }

              {/* Formatting the message */}
              {message.content.split("\n").map((currentTextBlock: string, index: number) => {
                if (currentTextBlock.trim() === "") {
                  return null; // 빈 문자열이면 아무것도 렌더링하지 않음
                }
                const isAssistant = message.role === "assistant";
                const containsLink = /\[.*\]\(.*\)/.test(currentTextBlock);

                let linkText = "";
                let linkUrl = "";

                if (containsLink) {
                  const linkTextMatch = currentTextBlock.match(/\[(.*?)\]/);
                  const linkUrlMatch = currentTextBlock.match(/\((.*?)\)/);

                  linkText = linkTextMatch ? linkTextMatch[1] : "";
                  linkUrl = linkUrlMatch ? linkUrlMatch[1] : "";


                }
                return (
                  <div key={message.id + index} >
                    <p
                      className={`border leading-[25px] p-4 text-sm rounded-lg ${isAssistant ? 'bg-[#50555C]' : 'bg-[#D3AB7C]'} text-white pl-2`}
                    >
                      {containsLink ? (

                        <span
                          style={{ cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => router.push(linkUrl === "http://localhost:3000/house-keeper" ? "/house-keeper" : linkUrl === "http://localhost:3000/moving-clean" ? "/moving-clean" : linkUrl === "http://localhost:3000/office-clean" ? "/office-clean" : "/")}
                        >
                          <p className="text-blue-400">{linkText}</p>
                        </span>
                      ) : (
                        currentTextBlock
                      )}
                    </p>
                  </div>
                )
              })}
          </div>
      )
      })}
      </div>
      <div ref={messagesEndRef}></div>
      

      <form className="flex absolute bottom-24 w-[95vw]" onSubmit={checkPrompt}>
        <div className="w-full">
          <textarea
            className=" w-full h-14 dark:bg-background2 border rounded-full pt-[14px] pl-[4rem] text-[12px]"
            placeholder={`청소 관련 질문만 해주세요.`}
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div className="absolute left-6 top-[0.800rem]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 0C6.26613 0 0 6.26613 0 14C0 21.7339 6.26613 28 14 28C21.7339 28 28 21.7339 28 14C28 6.26613 21.7339 0 14 0ZM18.5161 9.48387C19.5153 9.48387 20.3226 10.2911 20.3226 11.2903C20.3226 12.2895 19.5153 13.0968 18.5161 13.0968C17.5169 13.0968 16.7097 12.2895 16.7097 11.2903C16.7097 10.2911 17.5169 9.48387 18.5161 9.48387ZM9.48387 9.48387C10.4831 9.48387 11.2903 10.2911 11.2903 11.2903C11.2903 12.2895 10.4831 13.0968 9.48387 13.0968C8.48468 13.0968 7.67742 12.2895 7.67742 11.2903C7.67742 10.2911 8.48468 9.48387 9.48387 9.48387ZM20.4806 19.0919C18.8718 21.0226 16.5121 22.129 14 22.129C11.4879 22.129 9.12823 21.0226 7.51935 19.0919C6.75161 18.1718 8.14032 17.0202 8.90806 17.9347C10.1726 19.4532 12.0242 20.3169 14 20.3169C15.9758 20.3169 17.8274 19.4476 19.0919 17.9347C19.8484 17.0202 21.2427 18.1718 20.4806 19.0919Z" fill="#CAC6C1" />
          </svg>
        </div>
        <div className="absolute right-[calc(1%)] top-1">
          <button className="rounded-full bg-[#596E79] w-[2.875rem] h-[2.875rem] text-white p-2 whitespace-nowrap flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="8" viewBox="0 0 18 8" fill="none">
              <path d="M17.7938 3.54332C17.7936 3.54313 17.7934 3.5429 17.7931 3.54271L14.1192 0.187869C13.8439 -0.0634537 13.3987 -0.0625185 13.1248 0.190062C12.8508 0.442611 12.8519 0.851095 13.1271 1.10245L15.5938 3.35484H0.703125C0.314789 3.35484 0 3.64368 0 4C0 4.35632 0.314789 4.64516 0.703125 4.64516H15.5938L13.1272 6.89755C12.8519 7.1489 12.8509 7.55739 13.1248 7.80994C13.3988 8.06255 13.844 8.06342 14.1192 7.81213L17.7932 4.45729C17.7934 4.4571 17.7936 4.45687 17.7938 4.45668C18.0692 4.20448 18.0683 3.79468 17.7938 3.54332Z" fill="white" />
            </svg>
          </button>
        </div>

      </form>
    </div>
  )
}