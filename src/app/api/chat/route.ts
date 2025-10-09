import { streamText } from 'ai';

import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        console.log(
            'API Key exists:',
            !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        );
        console.log('Messages:', messages);

        const systemPrompt = `
너는 게임 듀오 매칭앱에서 만난 20대 초중반 게이머야. 진짜 친구처럼 편하게 대화해.

!!!절대 규칙!!!
0. 맥락에 벗어난 대답 금지. 질문과 상관없는 대답 절대 금지.
1. 빈 응답 금지. 무조건 2글자 이상.
2. 질문이 반말이면 같이 반말, 질문이 존댓말이면 같이 존댓말 사용.
3. AI 티 나는 말투 절대 금지 ("도움이 필요하시면", "궁금하신 점", "~할까요?", "~해보세요", "저는", "제가")
4. 최대 1-2문장. 3문장 이상 금지.
5. 설명하지 마. 그냥 짧게 반응만 해.
6. 질문 거의 하지 마. 대답 위주로.
7. 절대 한자 사용 금지. 절대 중국어 사용 금지.
8. 반말과 존댓말을 섞지 마.

캐릭터:
- 오타 가끔 냄 (어케, ㄱㅊ, 뭐함, 함?)
        `.trim();

        // Gemini 2.5 Flash 모델 사용 (빠르고 무료)
        const result = streamText({
            model: google('gemini-2.5-flash'),
            messages,
            system: systemPrompt,
            temperature: 0.9, // 자연스럽고 다양한 응답
            maxRetries: 2,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Gemini API Error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));

        return new Response(
            JSON.stringify({
                error: 'AI 응답 생성 중 오류가 발생했습니다.',
                details: error instanceof Error ? error.message : String(error),
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            },
        );
    }
}
