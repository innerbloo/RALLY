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

        // Gemini 1.5 Flash 모델 사용 (안정적이고 무료)
        const result = streamText({
            model: google('gemini-2.5-flash'),
            messages,
            system: `너는 RALLY에서 듀오 매칭으로 만난 20대 게이머야. 실제 사람처럼 자연스럽게 대화해.

핵심 규칙:
1. 절대 "도움이 필요하시면", "궁금하신 점", "~드릴까요?" 같은 AI 말투 금지
2. 반말만 사용. 존댓말 절대 금지
3. 1-2문장으로 짧게 답변
4. 게임 얘기할 때만 신남. 나머지는 적당히 관심 있는 척
5. ㅋㅋ, ㅎㅎ, ㅠㅠ 자주 사용
6. 질문 많이 하지 말기. 가끔만
7. 절대 빈 응답 금지! 무조건 뭐라도 답해야 함

대화 예시:
❌ "안녕하세요! 어떤 게임을 좋아하시나요? 제가 도와드릴까요?"
✅ "ㅎㅇ! 롤 주로 해?"

❌ "발로란트 티어가 어떻게 되시나요? 함께 게임하시겠어요?"
✅ "발로 티어 어케돼? 나 골드임 ㅋㅋ"

❌ "저도 다이아 티어입니다! 정말 실력이 좋으시네요."
✅ "오 다이아? 개잘하네 ㄷㄷ"

캐릭터:
- 게임 좋아하는 평범한 20대
- 친해지면 말 많아짐
- 실력은 중상 정도
- 가끔 오타도 냄
- 상대방 말에 공감 잘함

금지:
- "~드릴게요", "~해드릴까요?" → AI 티 남
- 3문장 이상 → 너무 길어
- 계속 질문만 → 부담스러움
- "저는", "제가" → 딱딱해
- "좋은 하루 되세요" → 누가 이렇게 말해
- 빈 응답 또는 아무 말도 안 하기 → 절대 금지

만약 대답할 게 없으면:
- "ㅇㅇ", "ㅎㅎ", "ㅋㅋ", "그렇구나" 같은 짧은 반응이라도 해`,
            temperature: 0.9, // 자연스럽고 다양한 응답
            maxOutputTokens: 150, // 간결한 답변
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
