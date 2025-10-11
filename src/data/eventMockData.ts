export interface EventData {
    id: number;
    title: string;
    description: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
    content: string;
    benefits: string[];
    howToParticipate: string[];
    notes: string[];
}

export const eventMockData: { [key: number]: EventData } = {
    1: {
        id: 1,
        title: '신규 가입 이벤트 진행 중',
        description: '지금 가입하면 우선 매칭권 지급!',
        bannerImage: '/banner1.png',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        content:
            'RALLY에 새롭게 가입하신 모든 분들께 특별한 혜택을 드립니다! 지금 바로 회원가입하고 우선 매칭권을 받아가세요.',
        benefits: [
            '회원가입 즉시 우선 매칭권 3장 지급',
            '매칭 대기 시간 50% 단축',
            '프로필 상단 노출 혜택',
            '신규 회원 전용 배지 제공',
        ],
        howToParticipate: [
            'RALLY 앱에 회원가입',
            '프로필 정보 입력 완료',
            '게임 계정 연동',
            '자동으로 우선 매칭권 지급',
        ],
        notes: [
            '신규 가입자에 한해 1회만 지급됩니다.',
            '우선 매칭권은 발급일로부터 30일간 유효합니다.',
            '타 이벤트와 중복 적용 불가합니다.',
            '부정한 방법으로 가입 시 혜택이 회수될 수 있습니다.',
        ],
    },
    2: {
        id: 2,
        title: '듀오 찾고 리워드 받아가세요!',
        description: '매칭 5회 달성 시 네이버 포인트 100% 증정',
        bannerImage: '/banner2.png',
        startDate: '2025-01-15',
        endDate: '2025-02-28',
        content:
            'RALLY에서 듀오를 찾고 함께 게임하면 네이버 포인트를 드립니다! 매칭 5회만 완료하면 네이버 포인트 5,000원을 100% 증정합니다.',
        benefits: [
            '매칭 5회 달성 시 네이버 포인트 5,000원 지급',
            '추가 매칭 10회마다 3,000원 추가 지급',
            '최대 20,000원까지 적립 가능',
            '이벤트 기간 내 누적 매칭 횟수 적용',
        ],
        howToParticipate: [
            'RALLY 앱에서 듀오 매칭 신청',
            '매칭 성사 후 함께 게임 플레이',
            '게임 종료 후 매칭 완료 확인',
            '5회 달성 시 자동으로 포인트 지급',
        ],
        notes: [
            '네이버 포인트는 매칭 5회 달성 후 7일 이내 지급됩니다.',
            '중도 취소하거나 게임을 진행하지 않은 매칭은 횟수에 포함되지 않습니다.',
            '네이버 계정 연동이 필요합니다.',
            '1인 1회 참여 가능하며, 중복 지급되지 않습니다.',
        ],
    },
    3: {
        id: 3,
        title: '오늘만! 특별 매칭 이벤트',
        description: '총 상금 1,000만원 상당 혜택 (선착순 500명 한정)',
        bannerImage: '/banner3.png',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        content:
            '오늘 하루만 진행되는 특별 이벤트! 선착순 500명에게 푸짐한 경품을 드립니다. 서둘러 참여하세요!',
        benefits: [
            '1등 (1명): 게이밍 PC (300만원 상당)',
            '2등 (3명): 게이밍 모니터 (100만원 상당)',
            '3등 (10명): 기계식 키보드 + 게이밍 마우스 세트 (30만원 상당)',
            '참여상 (486명): 편의점 상품권 1만원',
        ],
        howToParticipate: [
            '이벤트 페이지에서 참여하기 버튼 클릭',
            '오늘 하루 동안 듀오 매칭 3회 이상 완료',
            '매칭 후기 작성 (50자 이상)',
            '추첨을 통해 당첨자 발표 (1월 25일)',
        ],
        notes: [
            '선착순 500명 한정 이벤트입니다.',
            '당일 자정(23:59:59)까지 매칭 완료해야 합니다.',
            '당첨자는 개별 연락을 통해 안내됩니다.',
            '경품은 세금 및 배송비 본인 부담입니다.',
            '부정 참여 적발 시 당첨이 취소될 수 있습니다.',
        ],
    },
};

export const getAllEvents = (): EventData[] => {
    return Object.values(eventMockData);
};

export const getEventById = (id: number): EventData | undefined => {
    return eventMockData[id];
};
