export interface MentorService {
    type: string;
    price: number;
    duration: number;
    description: string;
}

export interface Review {
    id: number;
    reviewerId: number;
    reviewerName: string;
    reviewerImage: string;
    rating: number;
    comment: string;
    createdAt: string;
    helpful?: number;
}

export interface MentorDetail {
    // 기본 정보
    id: number;
    profileImage: string;
    username: string;
    game: string;
    gameImage: string;
    rating: number;
    reviewCount: number;

    // 멘토 전용 정보
    badges: string[];
    bio: string;
    career: string[];
    specialties: string[];
    style: string;

    // 멘토링 서비스 정보
    services: MentorService[];
    curriculum: string[];

    // 통계
    totalSessions: number;
    studentCount: number;
    tier: string;

    // 리뷰
    reviews: Review[];
}

export const mentorDetailMockData: { [key: number]: MentorDetail } = {
    1: {
        id: 1,
        profileImage: '/mentor/profile-mentor-1.png',
        username: '고양이 발바닥',
        game: '리그오브레전드',
        gameImage: '/game1.png',
        rating: 5.0,
        reviewCount: 142,

        badges: ['전직 프로게이머', '챌린저 멘토', '3년차 강사'],
        bio: '안녕하세요! 브론즈부터 차근차근 모든 구간에서 플레이하며 티어를 올려본 경험을 바탕으로, 작은 성취를 쌓아가는 과정의 즐거움과 꾸준함의 가치를 배웠습니다. 이러한 경험은 어떤 도전에서도 흔들리지 않고 성장할 수 있는 저의 강점이 될 것이라 믿습니다.\n\n초보자분들도 쉽게 이해할 수 있도록 기초부터 차근차근 알려드리며, 각 티어별 핵심 포인트를 중심으로 실력 향상을 도와드립니다.',
        career: [
            '前 프로게임단 정글러 (2019-2021)',
            '시즌 9~14 챌린저 달성',
            '롤토체스 마스터 티어 달성',
            '멘토링 누적 수강생 500명+',
        ],
        specialties: [
            '정글 / 미드 포지션 전문',
            '게임 이해도 및 맵 리딩 코칭',
            '초보자 기초 다지기',
            '브론즈~골드 구간 탈출 전문',
        ],
        style: '차근차근 설명하며 학생의 눈높이에 맞춰 진행합니다. 강압적이지 않고 편안한 분위기에서 실력 향상에 집중합니다.',

        services: [
            {
                type: '1:1 개인 레슨',
                price: 30000,
                duration: 60,
                description:
                    '실시간 게임 플레이 코칭 + VOD 분석 + 개인 맞춤 피드백',
            },
            {
                type: '듀오 코칭',
                price: 25000,
                duration: 60,
                description:
                    '함께 게임하며 실시간으로 상황별 판단과 플레이 개선 코칭',
            },
            {
                type: 'VOD 분석',
                price: 20000,
                duration: 30,
                description:
                    '녹화된 게임 영상을 분석하여 개선점과 피드백 제공',
            },
        ],
        curriculum: [
            '1주차: 기초 챔피언 이해 및 CS 연습',
            '2주차: 맵 리딩과 시야 장악 이해',
            '3주차: 라인전 이해 및 교전 타이밍',
            '4주차: 한타 포지셔닝 및 팀플레이',
            '5주차: 멘탈 관리 및 티어 상승 전략',
        ],

        totalSessions: 487,
        studentCount: 523,
        tier: '챌린저',

        reviews: [
            {
                id: 1,
                reviewerId: 1,
                reviewerName: '멋졌으면 핑찍어',
                reviewerImage: '/lol/profile-lol-1.png',
                rating: 5,
                comment:
                    '브론즈에서 실버까지 올라갔습니다! 정말 친절하게 알려주시고 제가 이해할 때까지 설명해주셔서 감사했어요. 특히 시야 장악하는 법이 정말 도움이 됐습니다.',
                createdAt: '2025-01-10T14:30:00Z',
                helpful: 24,
            },
            {
                id: 2,
                reviewerId: 2,
                reviewerName: 'ShadowHunter',
                reviewerImage: '/lol/profile-lol-2.png',
                rating: 5,
                comment:
                    '정글 루트랑 갱킹 타이밍 배우고 나서 확실히 게임이 쉬워졌어요. 3주 만에 골드 달성했습니다!',
                createdAt: '2025-01-08T16:20:00Z',
                helpful: 18,
            },
            {
                id: 3,
                reviewerId: 3,
                reviewerName: '정글의왕',
                reviewerImage: '/lol/profile-lol-3.png',
                rating: 5,
                comment:
                    '차분하게 잘 알려주시고 질문에도 꼼꼼히 답변해주셔서 좋았습니다. 맵 리딩 개념이 확실히 잡혔어요.',
                createdAt: '2025-01-05T10:15:00Z',
                helpful: 15,
            },
        ],
    },
    2: {
        id: 2,
        profileImage: '/mentor/profile-mentor-2.png',
        username: '일타강사 옵자루',
        game: '오버워치2',
        gameImage: '/game4.png',
        rating: 4.8,
        reviewCount: 136,

        badges: ['그랜드마스터', '대회 입상', '2년차 강사'],
        bio: '오버워치라는 게임은 그 여느 FPS 게임보다도 개념적인 영역이 중요합니다. 단순히 에임이나 반사 신경만으로는 한계가 있으며, 팀 조합 이해, 맵 구조 파악, 그리고 상황별 포지셔닝이 승패를 가르는 핵심 요소가 됩니다.\n\n저는 오버워치1부터 꾸준히 그랜드마스터 티어를 유지하며 쌓은 노하우를 바탕으로, 각 영웅의 특성과 시너지를 이해하고 실전에서 활용하는 방법을 알려드립니다.',
        career: [
            '시즌 1~10 그랜드마스터 달성',
            '오버워치 커뮤니티 대회 4강',
            '모든 포지션 다이아 이상',
            '멘토링 누적 수강생 300명+',
        ],
        specialties: [
            '딜러(DPS) 포지션 전문',
            '팀 조합 및 카운터픽 이해',
            '맵별 포지셔닝 전략',
            '궁극기 타이밍 및 연계',
        ],
        style: '이론과 실전을 병행하며 게임에 대한 깊은 이해를 돕습니다. 영상 자료와 실시간 코칭을 통해 체계적으로 진행합니다.',

        services: [
            {
                type: '1:1 개인 코칭',
                price: 35000,
                duration: 60,
                description:
                    '실시간 게임 분석 + 영웅별 운용법 + 포지셔닝 코칭',
            },
            {
                type: '팀 코칭',
                price: 80000,
                duration: 90,
                description:
                    '5인 팀 단위 코칭, 팀 조합 및 전략 수립 (1인당 16,000원)',
            },
            {
                type: 'VOD 리뷰',
                price: 25000,
                duration: 40,
                description: '경기 영상 분석 및 개선점 피드백 문서 제공',
            },
        ],
        curriculum: [
            '1주차: 영웅 특성 이해 및 기본 조작',
            '2주차: 맵별 포지셔닝 및 동선',
            '3주차: 팀 조합 이해 및 카운터픽',
            '4주차: 궁극기 활용 및 연계 플레이',
            '5주차: 실전 경기 분석 및 종합 피드백',
        ],

        totalSessions: 324,
        studentCount: 381,
        tier: '그랜드마스터',

        reviews: [
            {
                id: 4,
                reviewerId: 21,
                reviewerName: '수영하는파이리',
                reviewerImage: '/overwatch/profile-overwatch-1.png',
                rating: 5,
                comment:
                    '트레이서 운용법 배우고 나서 확실히 달라졌어요. 포지셔닝이 얼마나 중요한지 깨달았습니다!',
                createdAt: '2025-01-09T18:45:00Z',
                helpful: 31,
            },
            {
                id: 5,
                reviewerId: 22,
                reviewerName: '겐지장인',
                reviewerImage: '/overwatch/profile-overwatch-2.png',
                rating: 5,
                comment:
                    '궁 타이밍이랑 팀원들이랑 호흡 맞추는 법 배우고 티어 올랐습니다. 강추!',
                createdAt: '2025-01-07T13:20:00Z',
                helpful: 22,
            },
            {
                id: 6,
                reviewerId: 23,
                reviewerName: '지원가유저',
                reviewerImage: '/overwatch/profile-overwatch-3.png',
                rating: 4,
                comment:
                    '딜러 위주 코칭이지만 지원가도 도움 많이 됐어요. 맵 이해도가 높아졌습니다.',
                createdAt: '2025-01-04T09:30:00Z',
                helpful: 12,
            },
        ],
    },
    3: {
        id: 3,
        profileImage: '/mentor/profile-mentor-3.png',
        username: '정호성',
        game: '전략적 팀 전투',
        gameImage: '/game2.png',
        rating: 4.5,
        reviewCount: 128,

        badges: ['마스터 티어', '메타 분석가'],
        bio: '초보자분들께는 기초적인 강의를 중심으로 기본기를 다질 수 있도록 돕고, 다이아~마스터 이상 레벨의 플레이어분들께는 세밀한 디테일과 고급 전략을 위주로 다뤄 실질적인 실력 향상을 이끌어내고자 합니다.\n\nTFT는 운도 중요하지만, 상황 판단과 빠른 의사 결정이 승률을 결정합니다. 메타를 읽고 덱을 구성하는 방법부터 경제 관리, 포지셔닝까지 체계적으로 알려드립니다.',
        career: [
            '시즌 7~12 마스터 달성',
            '하이퍼롤 다이아 이상',
            'TFT 커뮤니티 공략 작성자',
            '멘토링 누적 수강생 250명+',
        ],
        specialties: [
            '메타 덱 분석 및 운용',
            '경제 관리 및 레벨링 전략',
            '아이템 조합 최적화',
            '초보자 입문 과정',
        ],
        style: '이론 설명과 함께 실전 예시를 통해 쉽게 이해할 수 있도록 합니다. 티어별 맞춤 커리큘럼으로 진행합니다.',

        services: [
            {
                type: '1:1 코칭',
                price: 25000,
                duration: 60,
                description:
                    '실시간 게임 관전 + 덱 구성 코칭 + 포지셔닝 가이드',
            },
            {
                type: '메타 분석 강의',
                price: 20000,
                duration: 50,
                description:
                    '현재 메타 덱 분석 및 카운터 전략, 아이템 조합 강의',
            },
            {
                type: '초보자 입문 과정',
                price: 18000,
                duration: 50,
                description:
                    'TFT 기초부터 차근차근, 아이템/시너지 이해 집중 교육',
            },
        ],
        curriculum: [
            '1주차: TFT 기본 개념 및 UI 이해',
            '2주차: 경제 관리 및 레벨링 전략',
            '3주차: 시너지 이해 및 덱 구성',
            '4주차: 아이템 조합 및 최적화',
            '5주차: 포지셔닝 및 상황별 대처법',
        ],

        totalSessions: 267,
        studentCount: 298,
        tier: '마스터',

        reviews: [
            {
                id: 7,
                reviewerId: 21,
                reviewerName: '젠장또대상혁이야',
                reviewerImage: '/lol/profile-lol-4.png',
                rating: 5,
                comment:
                    '아이템 조합 전혀 모르던 제가 이제는 상황에 맞춰 쓸 수 있게 됐어요! 완전 초보 탈출했습니다.',
                createdAt: '2025-01-11T15:10:00Z',
                helpful: 19,
            },
            {
                id: 8,
                reviewerId: 24,
                reviewerName: 'TFT고수',
                reviewerImage: '/lol/profile-lol-5.png',
                rating: 4,
                comment:
                    '메타 분석이 정말 도움 됐어요. 어떤 덱이 강한지 알고 플레이하니 승률이 올랐습니다.',
                createdAt: '2025-01-06T11:40:00Z',
                helpful: 14,
            },
            {
                id: 9,
                reviewerId: 25,
                reviewerName: '롤토체스마스터',
                reviewerImage: '/lol/profile-lol-6.png',
                rating: 4,
                comment:
                    '경제 관리 부분이 특히 좋았습니다. 언제 골드를 써야 하는지 감이 잡혔어요.',
                createdAt: '2025-01-03T14:25:00Z',
                helpful: 11,
            },
        ],
    },
};

export const getMentorDetailById = (
    id: number,
): MentorDetail | undefined => {
    return mentorDetailMockData[id];
};

export const getAllMentors = (): MentorDetail[] => {
    return Object.values(mentorDetailMockData);
};
