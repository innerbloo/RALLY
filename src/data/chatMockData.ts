// 채팅방 정보
export interface ChatRoom {
    id: number;
    matchedUser: {
        userId: number;
        username: string;
        profileImage: string;
        position?: string; // 게임 포지션 (SVG 경로)
        isOnline: boolean; // 온라인 상태
        isMentor?: boolean; // 멘토 여부
    };
    game: {
        name: string; // 게임 이름
        image: string; // 게임 아이콘
    };
    lastMessage: {
        content: string; // 마지막 메시지 내용
        timestamp: string; // ISO 날짜 문자열
        senderId: number; // 발신자 ID (0 = 시스템 or 본인)
    };
    unreadCount: number; // 읽지 않은 메시지 수
    matchedAt: string; // 매칭 날짜
}

// 개별 메시지
export interface Message {
    id: number;
    roomId: number;
    senderId: number; // 발신자 ID (0 = 본인, 다른 숫자 = 상대방 userId)
    content: string;
    timestamp: string;
    isRead: boolean;
    messageType: 'text' | 'system';
}

export const mockChatRooms: ChatRoom[] = [
    {
        id: 1,
        matchedUser: {
            userId: 101,
            username: '멋졌으면 핑찍어',
            profileImage: '/lol/profile-lol-1.png',
            position: '/lol/position-lol-top2.svg',
            isOnline: true,
        },
        game: {
            name: '리그오브레전드',
            image: '/game1.png',
        },
        lastMessage: {
            content: '넵 그럼 8시에 디코 들어갈게요!',
            timestamp: '2025-09-08T18:30:00',
            senderId: 101,
        },
        unreadCount: 2,
        matchedAt: '2025-09-08T10:00:00',
    },
    {
        id: 2,
        matchedUser: {
            userId: 102,
            username: '티 모',
            profileImage: '/lol/profile-lol-2.png',
            isOnline: true,
        },
        game: {
            name: '전략적 팀 전투',
            image: '/game2.png',
        },
        lastMessage: {
            content: '방금 플레 됐어요 ㅋㅋㅋ 감사합니다!',
            timestamp: '2025-09-08T16:45:00',
            senderId: 102,
        },
        unreadCount: 0,
        matchedAt: '2025-09-07T14:20:00',
    },
    {
        id: 3,
        matchedUser: {
            userId: 103,
            username: '닮은 살걀',
            profileImage: '/overwatch/profile-overwatch-1.png',
            position: '/overwatch/position-overwatch-dps2.svg',
            isOnline: false,
        },
        game: {
            name: '오버워치2',
            image: '/game4.png',
        },
        lastMessage: {
            content: '오늘 재밌게 했어요! 내일 또 해요~',
            timestamp: '2025-09-07T23:15:00',
            senderId: 103,
        },
        unreadCount: 0,
        matchedAt: '2025-09-06T19:00:00',
    },
    {
        id: 4,
        matchedUser: {
            userId: 104,
            username: '정글러의품격',
            profileImage: '/lol/profile-lol-3.png',
            position: '/lol/position-lol-jungle2.svg',
            isOnline: true,
        },
        game: {
            name: '리그오브레전드',
            image: '/game1.png',
        },
        lastMessage: {
            content: '혹시 지금 한 판 하실 수 있나요?',
            timestamp: '2025-09-08T17:20:00',
            senderId: 104,
        },
        unreadCount: 3,
        matchedAt: '2025-09-05T11:30:00',
    },
    {
        id: 5,
        matchedUser: {
            userId: 105,
            username: '겐지장인',
            profileImage: '/overwatch/profile-overwatch-2.png',
            isOnline: false,
        },
        game: {
            name: '오버워치2',
            image: '/game4.png',
        },
        lastMessage: {
            content: '오키 그럼 주말에 연락드릴게요',
            timestamp: '2025-09-06T20:10:00',
            senderId: 0, // 본인
        },
        unreadCount: 0,
        matchedAt: '2025-09-05T16:45:00',
    },
    {
        id: 6,
        matchedUser: {
            userId: 106,
            username: '발로고인물',
            profileImage: '/lol/profile-lol-4.png',
            isOnline: true,
        },
        game: {
            name: '발로란트',
            image: '/game3.png',
        },
        lastMessage: {
            content: '실력이 정말 좋으시네요!',
            timestamp: '2025-09-08T15:30:00',
            senderId: 106,
        },
        unreadCount: 1,
        matchedAt: '2025-09-08T13:00:00',
    },
    {
        id: 7,
        matchedUser: {
            userId: 107,
            username: '배그생존왕',
            profileImage: '/lol/profile-lol-1.png',
            isOnline: false,
        },
        game: {
            name: '배틀그라운드',
            image: '/game5.png',
        },
        lastMessage: {
            content: '안녕하세요! 같이 스쿼드 돌아요',
            timestamp: '2025-09-04T10:20:00',
            senderId: 107,
        },
        unreadCount: 0,
        matchedAt: '2025-09-04T10:15:00',
    },
    {
        id: 8,
        matchedUser: {
            userId: 108,
            username: '롤토체스장인',
            profileImage: '/lol/profile-lol-2.png',
            isOnline: false,
        },
        game: {
            name: '전략적 팀 전투',
            image: '/game2.png',
        },
        lastMessage: {
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-03T09:00:00',
            senderId: 0, // 시스템
        },
        unreadCount: 0,
        matchedAt: '2025-09-03T09:00:00',
    },
];

export const mockMessages: { [roomId: number]: Message[] } = {
    // 채팅방 1: 활발한 대화 - 오늘 저녁 약속 잡은 상태
    1: [
        {
            id: 1,
            roomId: 1,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-08T10:00:00',
            isRead: true,
            messageType: 'system',
        },
        {
            id: 2,
            roomId: 1,
            senderId: 0, // 본인
            content: '안녕하세요! 같이 게임하게 되어 반가워요 :)',
            timestamp: '2025-09-08T10:05:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 3,
            roomId: 1,
            senderId: 101,
            content: '안녕하세요~ 저도 반갑습니다!',
            timestamp: '2025-09-08T10:07:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 4,
            roomId: 1,
            senderId: 101,
            content: '프로필 보니까 탑 포지션이시네요. 저도 탑 주로 해요 ㅎㅎ',
            timestamp: '2025-09-08T10:08:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 5,
            roomId: 1,
            senderId: 0,
            content: '오 좋네요! 티어는 어떻게 되세요?',
            timestamp: '2025-09-08T10:10:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 6,
            roomId: 1,
            senderId: 101,
            content: '저는 에메랄드 4입니다. 프로필에 있는 것처럼요',
            timestamp: '2025-09-08T10:11:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 7,
            roomId: 1,
            senderId: 0,
            content: '좋아요! 저도 비슷한 티어라 잘 맞을 것 같네요',
            timestamp: '2025-09-08T10:12:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 8,
            roomId: 1,
            senderId: 0,
            content: '혹시 오늘 저녁에 시간 되시나요?',
            timestamp: '2025-09-08T10:13:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 9,
            roomId: 1,
            senderId: 101,
            content: '네 저는 8시 이후로 괜찮아요!',
            timestamp: '2025-09-08T10:15:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 10,
            roomId: 1,
            senderId: 0,
            content: '완벽하네요 ㅎㅎ 그럼 8시에 디스코드 들어갈게요',
            timestamp: '2025-09-08T10:16:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 11,
            roomId: 1,
            senderId: 0,
            content: '디코 아이디 알려주실 수 있나요?',
            timestamp: '2025-09-08T10:17:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 12,
            roomId: 1,
            senderId: 101,
            content: 'ping_master#1234 입니다',
            timestamp: '2025-09-08T10:20:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 13,
            roomId: 1,
            senderId: 0,
            content: '감사합니다! 8시에 친추 보낼게요~',
            timestamp: '2025-09-08T10:22:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 14,
            roomId: 1,
            senderId: 101,
            content: '넵 그럼 8시에 디코 들어갈게요!',
            timestamp: '2025-09-08T18:30:00',
            isRead: false,
            messageType: 'text',
        },
        {
            id: 15,
            roomId: 1,
            senderId: 101,
            content: '기대되네요 ㅎㅎ',
            timestamp: '2025-09-08T18:31:00',
            isRead: false,
            messageType: 'text',
        },
    ],

    // 채팅방 2: 게임 후 감사 인사
    2: [
        {
            id: 1,
            roomId: 2,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-07T14:20:00',
            isRead: true,
            messageType: 'system',
        },
        {
            id: 2,
            roomId: 2,
            senderId: 102,
            content: '안녕하세요! 롤토체스 같이 하실 분 찾고 있었어요',
            timestamp: '2025-09-07T14:25:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 3,
            roomId: 2,
            senderId: 0,
            content: '오 저도요! 티어가 어떻게 되세요?',
            timestamp: '2025-09-07T14:27:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 4,
            roomId: 2,
            senderId: 102,
            content: '저는 골드 1이에요~ 플레 가고 싶은데 잘 안되네요 ㅠㅠ',
            timestamp: '2025-09-07T14:28:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 5,
            roomId: 2,
            senderId: 0,
            content: '같이 해봐요! 제가 몇 가지 팁 알려드릴 수 있어요',
            timestamp: '2025-09-07T14:30:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 6,
            roomId: 2,
            senderId: 102,
            content: '오 감사합니다!! 지금 바로 하실 수 있나요?',
            timestamp: '2025-09-07T14:32:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 7,
            roomId: 2,
            senderId: 0,
            content: '넵 가능해요~ 게임 접속할게요',
            timestamp: '2025-09-07T14:33:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 8,
            roomId: 2,
            senderId: 102,
            content: '와 덕분에 연승했어요!',
            timestamp: '2025-09-07T16:20:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 9,
            roomId: 2,
            senderId: 102,
            content: '아이템 조합 정말 잘 알려주시네요',
            timestamp: '2025-09-07T16:21:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 10,
            roomId: 2,
            senderId: 0,
            content: 'ㅎㅎ 천만에요! 잘 따라와 주셔서 수월했어요',
            timestamp: '2025-09-07T16:23:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 11,
            roomId: 2,
            senderId: 102,
            content: '방금 플레 됐어요 ㅋㅋㅋ 감사합니다!',
            timestamp: '2025-09-08T16:45:00',
            isRead: true,
            messageType: 'text',
        },
    ],

    // 채팅방 3: 오버워치 - 하루 게임 끝낸 상태
    3: [
        {
            id: 1,
            roomId: 3,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-06T19:00:00',
            isRead: true,
            messageType: 'system',
        },
        {
            id: 2,
            roomId: 3,
            senderId: 0,
            content: '안녕하세요~',
            timestamp: '2025-09-06T19:05:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 3,
            roomId: 3,
            senderId: 103,
            content: '안녕하세요! 오버워치 즐겜하시나요?',
            timestamp: '2025-09-06T19:07:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 4,
            roomId: 3,
            senderId: 0,
            content: '네 즐겜 위주로 하고 있어요',
            timestamp: '2025-09-06T19:08:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 5,
            roomId: 3,
            senderId: 103,
            content: '좋아요! 저도 즐빡겜 좋아해요 ㅋㅋ',
            timestamp: '2025-09-06T19:09:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 6,
            roomId: 3,
            senderId: 103,
            content: '지금 한 판 하실래요?',
            timestamp: '2025-09-06T19:10:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 7,
            roomId: 3,
            senderId: 0,
            content: '좋죠! 바로 들어갈게요',
            timestamp: '2025-09-06T19:11:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 8,
            roomId: 3,
            senderId: 103,
            content: '오늘 재밌게 했어요! 내일 또 해요~',
            timestamp: '2025-09-07T23:15:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 9,
            roomId: 3,
            senderId: 0,
            content: '넵 내일 봬요!',
            timestamp: '2025-09-07T23:16:00',
            isRead: true,
            messageType: 'text',
        },
    ],

    // 채팅방 4: 읽지 않은 메시지 3개 - 지금 플레이 제안
    4: [
        {
            id: 1,
            roomId: 4,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-05T11:30:00',
            isRead: true,
            messageType: 'system',
        },
        {
            id: 2,
            roomId: 4,
            senderId: 104,
            content: '안녕하세요! 정글 듀오 찾고 있었어요',
            timestamp: '2025-09-05T11:35:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 3,
            roomId: 4,
            senderId: 0,
            content: '오 좋네요. 저도 정글 듀오 구하고 있었어요',
            timestamp: '2025-09-05T11:37:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 4,
            roomId: 4,
            senderId: 104,
            content: '같이 몇 판 돌아봐요!',
            timestamp: '2025-09-05T11:40:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 5,
            roomId: 4,
            senderId: 0,
            content: '좋아요~ 언제 시간 되세요?',
            timestamp: '2025-09-05T11:42:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 6,
            roomId: 4,
            senderId: 104,
            content: '평일 저녁이랑 주말 오후 가능해요',
            timestamp: '2025-09-05T11:45:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 7,
            roomId: 4,
            senderId: 0,
            content: '저도 그때 괜찮네요. 연락주세요!',
            timestamp: '2025-09-05T11:47:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 8,
            roomId: 4,
            senderId: 104,
            content: '혹시 지금 한 판 하실 수 있나요?',
            timestamp: '2025-09-08T17:20:00',
            isRead: false,
            messageType: 'text',
        },
        {
            id: 9,
            roomId: 4,
            senderId: 104,
            content: '저 막 접속했어요~',
            timestamp: '2025-09-08T17:21:00',
            isRead: false,
            messageType: 'text',
        },
        {
            id: 10,
            roomId: 4,
            senderId: 104,
            content: '답 주시면 바로 게임 시작할게요!',
            timestamp: '2025-09-08T17:22:00',
            isRead: false,
            messageType: 'text',
        },
    ],

    // 채팅방 5: 주말 약속
    5: [
        {
            id: 1,
            roomId: 5,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-05T16:45:00',
            isRead: true,
            messageType: 'system',
        },
        {
            id: 2,
            roomId: 5,
            senderId: 105,
            content: '안녕하세요~ 겐지 유저시군요!',
            timestamp: '2025-09-05T16:50:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 3,
            roomId: 5,
            senderId: 0,
            content: '네 맞아요 ㅎㅎ 겐지 자주 해요',
            timestamp: '2025-09-05T16:52:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 4,
            roomId: 5,
            senderId: 105,
            content: '저도 DPS 메인인데 궁합 잘 맞을 것 같네요',
            timestamp: '2025-09-05T16:54:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 5,
            roomId: 5,
            senderId: 0,
            content: '언제 시간 되세요?',
            timestamp: '2025-09-05T16:56:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 6,
            roomId: 5,
            senderId: 105,
            content: '이번 주는 좀 바빠서... 주말은 어떠세요?',
            timestamp: '2025-09-05T16:58:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 7,
            roomId: 5,
            senderId: 0,
            content: '오키 그럼 주말에 연락드릴게요',
            timestamp: '2025-09-06T20:10:00',
            isRead: true,
            messageType: 'text',
        },
    ],

    // 채팅방 6: 발로란트 - 읽지 않은 메시지 1개
    6: [
        {
            id: 1,
            roomId: 6,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-08T13:00:00',
            isRead: true,
            messageType: 'system',
        },
        {
            id: 2,
            roomId: 6,
            senderId: 0,
            content: '안녕하세요!',
            timestamp: '2025-09-08T13:05:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 3,
            roomId: 6,
            senderId: 106,
            content: '안녕하세요~ 발로란트 티어가 어떻게 되세요?',
            timestamp: '2025-09-08T13:07:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 4,
            roomId: 6,
            senderId: 0,
            content: '저는 다이아 정도 됩니다',
            timestamp: '2025-09-08T13:10:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 5,
            roomId: 6,
            senderId: 106,
            content: '와 고수시네요! 저 플래티넌데 괜찮을까요?',
            timestamp: '2025-09-08T13:12:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 6,
            roomId: 6,
            senderId: 0,
            content: '전혀 문제없어요! 같이 해봐요',
            timestamp: '2025-09-08T13:15:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 7,
            roomId: 6,
            senderId: 106,
            content: '감사합니다 ㅎㅎ 한 판 돌려봐요',
            timestamp: '2025-09-08T13:18:00',
            isRead: true,
            messageType: 'text',
        },
        {
            id: 8,
            roomId: 6,
            senderId: 106,
            content: '실력이 정말 좋으시네요!',
            timestamp: '2025-09-08T15:30:00',
            isRead: false,
            messageType: 'text',
        },
    ],

    // 채팅방 7: 배그 - 응답 없음
    7: [
        {
            id: 1,
            roomId: 7,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-04T10:15:00',
            isRead: true,
            messageType: 'system',
        },
        {
            id: 2,
            roomId: 7,
            senderId: 107,
            content: '안녕하세요! 같이 스쿼드 돌아요',
            timestamp: '2025-09-04T10:20:00',
            isRead: true,
            messageType: 'text',
        },
    ],

    // 채팅방 8: 매칭만 된 상태 (메시지 없음)
    8: [
        {
            id: 1,
            roomId: 8,
            senderId: 0,
            content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
            timestamp: '2025-09-03T09:00:00',
            isRead: true,
            messageType: 'system',
        },
    ],
};
