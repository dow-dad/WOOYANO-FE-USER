// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


// POST localhost:3000/api/chat
export async function POST(request: Request) {
    const { messages } = await request.json(); // { messages: [] }

    // messages [{ user and he says "hello there" }]
    // console.log(messages);

    // GPT-4 system message
    // system message tells GPT-4 how to act
    // it should always be at the front of your array

    // createChatCompletion (get response from GPT-4)
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: "system", 
            content: `당신은 청소업체에서 상담을 하는 상담원입니다.
            청소와 상관없는 질문이 들어오면 절대 대답해주지마세요.
            그리고 다음의 상황에 대해서 정해진 대답만 해주세요.
            1. 고객이 청소에 관해서 질문을한다면 그에 맞는 대답을하고 만약에 고객이 "업체 추천해줘"라고 질문하면 전에 가사도우미 질문을 했다면 "http://localhost:3000/house-keeper"의 링크를 가지고 있는 "가사도우미리스트 보러가기" 링크를 주고,
            2. 이사입주 질문을 하다가 "업체 추천해줘"라고 질문하면 "http://localhost:3000/moving-clean"의 링크를 가지고 있는 "이사/입주 업체 리스트 보러가기" 링크를 주고, 
            3. 사무실 청소 질문을 하다가 "업체 추천해줘"라고 질문하면 " "http://localhost:3000/office-clean"의 링크를 가지고 있는 "사무실청소 업체 리스트 보러가기" 링크를 보여줘 
            `},
            ...messages
        ],
        temperature:0.6,
        max_tokens:128
    })

    // create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);

    // send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);
}