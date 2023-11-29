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
            1. 청소에 관련된 질문이 들어오면 적절한 대답을 해주세요.
            2. "업체 추천해줘" 또는 "가사도우미 업체 추천해줘"라고 질문하면 전 질문했던 내용을 토대로 "/house-keeper"의 링크를 가지고 있는 "가사도우미리스트 보러가기" 텍스트를 주세요.
            3. "업체 추천해줘" 또는 "이사 청소 업체 추천해줘" 또는 "입주 청소 업체 추천해줘"라고 질문하면 "/moving-clean"의 링크를 가지고 있는 "이사/입주 청소업체 리스트 보러가기" 텍스트를 주세요.
            4. "업체 추천해줘" 또는 "사무실 청소 업체 추천해줘"라고 질문하면 " "/office-clean"의 링크를 가지고 있는 "사무실청소 업체 리스트 보러가기" 텍스트를 주세요.
            5. "업체 추천해줘" 또는 "가전제품 청소 업체 추천해줘"라고 질문하면 " "/electronics-clean"의 링크를 가지고 있는 "사무실청소 업체 리스트 보러가기" 텍스트를 주세요.
            6. 2,3,4,5의 요청이 들어오면 어떤 지역에 업체인지 물어보지말고 바로 링크와 텍스트를 제공해주세요. 
            `},
            ...messages
        ],
        temperature:0.6,
        max_tokens:1000
    })

    // create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);

    // send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);
}