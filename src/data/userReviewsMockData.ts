// 유저 리뷰 Mock 데이터

interface Review {
    id: number;
    reviewerId: number;
    reviewerName: string;
    reviewerImage: string;
    rating: number;
    comment: string;
    createdAt: string;
    helpful?: number;
}

export const mockUserReviews: { [userId: number]: Review[] } = {
    // 멋졌으면 핑찍어 (LOL 탑 E4)
    1: [
        {
            id: 10001,
            reviewerId: 5,
            reviewerName: '정글러왕',
            reviewerImage: '/lol/profile-lol-2.png',
            rating: 5,
            comment: '탑에서 정말 든든하게 라인 지켜주셨어요! 다음에도 같이 하고 싶습니다 ㅎㅎ',
            createdAt: '2025-01-15T14:30:00',
            helpful: 12,
        },
        {
            id: 10002,
            reviewerId: 12,
            reviewerName: '미드갓',
            reviewerImage: '/lol/profile-lol-3.png',
            rating: 5,
            comment: '탱커 운영 정말 잘하시네요. 팀플 짱입니다!',
            createdAt: '2025-01-14T18:20:00',
            helpful: 8,
        },
        {
            id: 10003,
            reviewerId: 23,
            reviewerName: '원딜마스터',
            reviewerImage: '/lol/profile-lol-5.png',
            rating: 4,
            comment: '조합 맞춰서 픽하시고 소통 잘 되서 좋았습니다!',
            createdAt: '2025-01-13T20:15:00',
            helpful: 5,
        },
        {
            id: 10004,
            reviewerId: 34,
            reviewerName: '서폿러버',
            reviewerImage: '/lol/profile-lol-4.png',
            rating: 5,
            comment: '탑 완전 장악하셔서 게임이 편했어요. 커뮤니케이션도 좋으시고 매너도 최고!',
            createdAt: '2025-01-12T16:45:00',
            helpful: 15,
        },
    ],

    // 젠장또대상혁이야 (TFT S4)
    121: [
        {
            id: 12101,
            reviewerId: 125,
            reviewerName: 'TFT고수',
            reviewerImage: '/lol/profile-lol-2.png',
            rating: 5,
            comment: '초보라고 하셨는데 배우는 속도가 엄청 빠르세요! 같이 하면서 즐거웠습니다',
            createdAt: '2025-01-16T10:30:00',
            helpful: 7,
        },
        {
            id: 12102,
            reviewerId: 130,
            reviewerName: '롤토체스장인',
            reviewerImage: '/lol/profile-lol-3.png',
            rating: 4,
            comment: '궁금한 거 물어보면 친절하게 알려주셔서 좋았어요. 함께 성장하는 느낌!',
            createdAt: '2025-01-15T19:00:00',
            helpful: 4,
        },
        {
            id: 12103,
            reviewerId: 142,
            reviewerName: '전략가',
            reviewerImage: '/mentor/profile-mentor-1.png',
            rating: 5,
            comment: '채팅으로만 소통했는데도 호흡이 잘 맞았습니다. 다음에도 같이 해요~',
            createdAt: '2025-01-14T15:20:00',
            helpful: 9,
        },
    ],

    // 아나할머니 (오버워치2 서포터 M1)
    208: [
        {
            id: 20801,
            reviewerId: 205,
            reviewerName: '겐지프로',
            reviewerImage: '/overwatch/profile-overwatch-2.png',
            rating: 5,
            comment: '힐 타이밍 완벽하시고 적 딜러 재우는 슬립도 환상적이에요! 최고의 아나',
            createdAt: '2025-01-17T20:15:00',
            helpful: 18,
        },
        {
            id: 20802,
            reviewerId: 212,
            reviewerName: '탱커러버',
            reviewerImage: '/overwatch/profile-overwatch-3.png',
            rating: 5,
            comment: '나노 타이밍 정말 좋으시고 위치 선정도 완벽! 아나 장인 맞으시네요',
            createdAt: '2025-01-16T18:30:00',
            helpful: 22,
        },
        {
            id: 20803,
            reviewerId: 220,
            reviewerName: '딜러왕',
            reviewerImage: '/overwatch/profile-overwatch-4.png',
            rating: 5,
            comment: '힐이 끊기지 않아서 안정적으로 딜할 수 있었어요. 감사합니다!',
            createdAt: '2025-01-15T21:45:00',
            helpful: 14,
        },
        {
            id: 20804,
            reviewerId: 227,
            reviewerName: '오버워치마스터',
            reviewerImage: '/overwatch/profile-overwatch-5.png',
            rating: 4,
            comment: '커뮤니케이션 잘 되고 팀플 최고입니다. 또 같이 해요!',
            createdAt: '2025-01-14T17:20:00',
            helpful: 11,
        },
        {
            id: 20805,
            reviewerId: 235,
            reviewerName: '힐러메인',
            reviewerImage: '/overwatch/profile-overwatch-6.png',
            rating: 5,
            comment: '아나 운영 스킬이 정말 대단하세요. 배울 점이 많았습니다!',
            createdAt: '2025-01-13T19:00:00',
            helpful: 16,
        },
    ],
};
