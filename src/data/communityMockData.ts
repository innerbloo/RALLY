// 커뮤니티 관련 인터페이스 및 Mock 데이터

// 어제 날짜 + 지정된 시간을 반환하는 유틸리티 함수
export function getYesterdayDate(time: string): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day} ${time}`;
}

export interface CommunityData {
    id: number;
    image: string;
    username: string;
    title: string;
    createAt: string;
    comment: number;
    game: string;
    category: string;
    likes: number;
    views: number;
}

export interface Comment {
    id: number;
    userId: number;
    username: string;
    profileImage: string;
    content: string;
    createAt: string;
    likes: number;
}

export interface PostDetail {
    id: number;
    userId: number;
    image: string;
    username: string;
    profileImage: string;
    title: string;
    content: string;
    createAt: string;
    comment: number;
    game: string;
    category: string;
    likes: number;
    views: number;
    isLiked: boolean;
    comments: Comment[];
}

export const mockPosts: CommunityData[] = [
    {
        id: 1,
        image: '/community/community1.jpg',
        username: '눈팅하러오는사람',
        title: '롤 첨할 때 생각한 거',
        createAt: getYesterdayDate('08:00:00'),
        comment: 3,
        game: '리그오브레전드',
        category: '자유',
        likes: 450,
        views: 2800,
    },
    {
        id: 2,
        image: '/community/community2.jpg',
        username: '허나거절한다',
        title: '남탓을 할 순 있다고 생각함',
        createAt: getYesterdayDate('06:21:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '자유',
        likes: 380,
        views: 2400,
    },
    {
        id: 3,
        image: '/community/community3.jpg',
        username: '천둥군주의호령',
        title: '유미 전설 스킨 내놓는게 이해안감',
        createAt: getYesterdayDate('05:20:30'),
        comment: 2,
        game: '리그오브레전드',
        category: '자유',
        likes: 320,
        views: 2100,
    },
    {
        id: 4,
        image: '/community/community4.jpg',
        username: '수영하는파이리',
        title: '옵치 망했네',
        createAt: getYesterdayDate('19:20:30'),
        comment: 2,
        game: '오버워치2',
        category: '자유',
        likes: 240,
        views: 1800,
    },
    {
        id: 5,
        image: '/community/community5.jpg',
        username: '젠장또대상혁이야',
        title: '롤체 아이템 질문',
        createAt: getYesterdayDate('21:53:12'),
        comment: 2,
        game: '전략적 팀 전투',
        category: '질문',
        likes: 190,
        views: 1500,
    },
    {
        id: 6,
        image: '/community/community6.jpg',
        username: '정글러의품격',
        title: '정글 초보 탈출 꿀팁',
        createAt: getYesterdayDate('18:30:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '공략',
        likes: 560,
        views: 3200,
    },
    {
        id: 7,
        image: '/community/community7.jpg',
        username: '오버워치마스터',
        title: '탱커 포지셔닝 완벽 가이드',
        createAt: getYesterdayDate('15:45:00'),
        comment: 3,
        game: '오버워치2',
        category: '공략',
        likes: 780,
        views: 4500,
    },
    {
        id: 8,
        image: '/community/community8.jpg',
        username: '발로란트고수',
        title: '에임 연습 루틴 공유',
        createAt: getYesterdayDate('12:10:00'),
        comment: 2,
        game: '발로란트',
        category: '팁',
        likes: 420,
        views: 2900,
    },
    {
        id: 9,
        image: '/community/community9.jpg',
        username: '배그킹',
        title: '에란겔 드랍존 추천',
        createAt: getYesterdayDate('09:20:00'),
        comment: 2,
        game: '배틀그라운드',
        category: '팁',
        likes: 310,
        views: 2200,
    },
    {
        id: 10,
        image: '/community/community10.jpg',
        username: '롤토체스장인',
        title: '시즌2 메타 덱 정리',
        createAt: getYesterdayDate('22:15:00'),
        comment: 3,
        game: '전략적 팀 전투',
        category: '공략',
        likes: 890,
        views: 5100,
    },
    {
        id: 11,
        image: '/community/community11.jpg',
        username: '브론즈탈출기',
        title: '드디어 실버 됐다ㅠㅠ',
        createAt: getYesterdayDate('19:40:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '자유',
        likes: 280,
        views: 1600,
    },
    {
        id: 12,
        image: '/community/community12.jpg',
        username: '겐지장인',
        title: '겐지 칼질 타이밍 질문',
        createAt: getYesterdayDate('16:25:00'),
        comment: 2,
        game: '오버워치2',
        category: '질문',
        likes: 190,
        views: 1400,
    },
    {
        id: 13,
        image: '/community/community13.jpg',
        username: '발로초보',
        title: '스킬 사용 타이밍 모르겠어요',
        createAt: getYesterdayDate('13:50:00'),
        comment: 2,
        game: '발로란트',
        category: '질문',
        likes: 150,
        views: 1200,
    },
    {
        id: 14,
        image: '/community/community14.jpg',
        username: '배그생존왕',
        title: '최종 안전지대 생존 팁',
        createAt: getYesterdayDate('10:30:00'),
        comment: 2,
        game: '배틀그라운드',
        category: '공략',
        likes: 520,
        views: 3400,
    },
    {
        id: 15,
        image: '/community/community15.jpg',
        username: '롤체매니아',
        title: '롤토체스 재밌네요',
        createAt: getYesterdayDate('21:00:00'),
        comment: 2,
        game: '전략적 팀 전투',
        category: '자유',
        likes: 210,
        views: 1300,
    },
    {
        id: 16,
        image: '/community/community16.jpg',
        username: '미드라이너',
        title: '미드 라인전 꿀팁 정리',
        createAt: getYesterdayDate('18:20:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '공략',
        likes: 650,
        views: 3800,
    },
    {
        id: 17,
        image: '/community/community17.jpg',
        username: '힐러의길',
        title: '서포터 포지션 어떻게 잡나요?',
        createAt: getYesterdayDate('15:10:00'),
        comment: 2,
        game: '오버워치2',
        category: '질문',
        likes: 270,
        views: 1900,
    },
    {
        id: 18,
        image: '/community/community18.jpg',
        username: '발로고인물',
        title: '랭크 올리는 법',
        createAt: getYesterdayDate('12:00:00'),
        comment: 2,
        game: '발로란트',
        category: '팁',
        likes: 480,
        views: 2700,
    },
    {
        id: 19,
        image: '/community/community19.jpg',
        username: '배그프로',
        title: '근접전 이기는 방법',
        createAt: getYesterdayDate('20:45:00'),
        comment: 2,
        game: '배틀그라운드',
        category: '팁',
        likes: 390,
        views: 2300,
    },
    {
        id: 20,
        image: '/community/community20.jpg',
        username: '전략가',
        title: '롤토체스 초보 가이드',
        createAt: getYesterdayDate('17:30:00'),
        comment: 3,
        game: '전략적 팀 전투',
        category: '공략',
        likes: 720,
        views: 4200,
    },
];

export const mockPostDetails: { [key: number]: PostDetail } = {
    1: {
        id: 1,
        userId: 51,
        image: '/community/community1.jpg',
        username: '눈팅하러오는사람',
        profileImage: '/lol/profile-lol-1.png',
        title: '롤 첨할 때 생각한 거',
        content: `처음 롤 시작했을 때는 진짜 아무것도 몰랐는데요.

지금 생각해보면 그때가 제일 재밌었던 것 같아요.

모든 게 신기하고 새로웠고, 친구들이랑 같이 하면서 이것저것 시도해보는 게 정말 즐거웠어요.

지금은 너무 많이 알게 돼서 오히려 스트레스 받을 때가 많은 것 같네요 ㅋㅋ

여러분은 롤 처음 시작했을 때 어떠셨나요?`,
        createAt: getYesterdayDate('08:00:00'),
        comment: 3,
        game: '리그오브레전드',
        category: '자유',
        likes: 450,
        views: 2800,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 1,
                username: '정글러의품격',
                profileImage: '/lol/profile-lol-2.png',
                content: '저도 처음엔 그랬어요 ㅋㅋ 지금은 랭크 스트레스가...',
                createAt: getYesterdayDate('09:30:00'),
                likes: 12,
            },
            {
                id: 2,
                userId: 2,
                username: '미드라이너',
                profileImage: '/lol/profile-lol-3.png',
                content: '공감합니다. 초심을 잃지 말아야죠!',
                createAt: getYesterdayDate('10:15:00'),
                likes: 8,
            },
            {
                id: 3,
                userId: 3,
                username: '티 모',
                profileImage: '/lol/profile-lol-4.png',
                content: '저는 아직도 재밌어요 ㅎㅎ 즐겜러라서 그런가',
                createAt: getYesterdayDate('11:45:00'),
                likes: 5,
            },
        ],
    },
    2: {
        id: 2,
        userId: 52,
        image: '/community/community2.jpg',
        username: '허나거절한다',
        profileImage: '/lol/profile-lol-2.png',
        title: '남탓을 할 순 있다고 생각함',
        content: `물론 내 실수도 있지만, 솔직히 팀원 탓도 할 수 있다고 봅니다.

게임은 혼자 하는 게 아니잖아요. 5명이 함께 하는 건데 한 명이 망치면 다 같이 망하는 거죠.

그렇다고 욕하거나 그러는 건 아니고, 그냥 속으로 '아 저 사람 때문에 졌네' 정도는 생각할 수 있다는 거예요.

어떻게 생각하세요?`,
        createAt: getYesterdayDate('06:21:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '자유',
        likes: 380,
        views: 2400,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 4,
                username: '브론즈탈출기',
                profileImage: '/lol/profile-lol-3.png',
                content: '맞아요 ㅋㅋ 그래도 말은 안 하는 게 낫죠',
                createAt: getYesterdayDate('07:00:00'),
                likes: 15,
            },
            {
                id: 2,
                userId: 5,
                username: '정글러의품격',
                profileImage: '/lol/profile-lol-4.png',
                content:
                    '내 실수도 있을 수 있으니까 서로 이해하는 게 중요한 듯',
                createAt: getYesterdayDate('08:30:00'),
                likes: 22,
            },
        ],
    },
    3: {
        id: 3,
        userId: 53,
        image: '/community/community3.jpg',
        username: '천둥군주의호령',
        profileImage: '/lol/profile-lol-3.png',
        title: '유미 전설 스킨 내놓는게 이해안감',
        content: `라이엇이 또 유미 전설 스킨을 낸다고 하네요.

유미는 벌써 스킨이 몇 개인데 또 주는 건지 이해가 안 됩니다.

다른 챔피언들은 몇 년씩 스킨 안 나오는데 말이죠.

라이엇 제발 좀... 형평성 있게 해주세요 ㅠㅠ`,
        createAt: getYesterdayDate('05:20:30'),
        comment: 2,
        game: '리그오브레전드',
        category: '자유',
        likes: 320,
        views: 2100,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 6,
                username: '미드라이너',
                profileImage: '/lol/profile-lol-4.png',
                content: '돈이 되니까 주는 거겠죠...',
                createAt: getYesterdayDate('06:10:00'),
                likes: 18,
            },
            {
                id: 2,
                userId: 7,
                username: '티 모',
                profileImage: '/lol/profile-lol-1.png',
                content: '유미 유저인데 미안합니다 ㅋㅋㅋ',
                createAt: getYesterdayDate('07:20:00'),
                likes: 9,
            },
        ],
    },
    4: {
        id: 4,
        userId: 21,
        image: '/community/community4.jpg',
        username: '수영하는파이리',
        profileImage: '/overwatch/profile-overwatch-1.png',
        title: '옵치 망했네',
        content: `요즘 오버워치2 유저 수 진짜 많이 줄었다고 느껴집니다.

매칭도 예전만큼 빠르지 않고, 같은 사람 계속 만나고...

블리자드가 뭘 잘못한 건지 모르겠지만 확실히 예전보다 재미가 없어진 것 같아요.

여러분 생각은 어떠신가요?`,
        createAt: getYesterdayDate('19:20:30'),
        comment: 2,
        game: '오버워치2',
        category: '자유',
        likes: 240,
        views: 1800,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 8,
                username: '오버워치마스터',
                profileImage: '/overwatch/profile-overwatch-2.png',
                content: '저는 아직도 재밌게 하고 있는데...',
                createAt: getYesterdayDate('20:00:00'),
                likes: 7,
            },
            {
                id: 2,
                userId: 9,
                username: '겐지장인',
                profileImage: '/lol/profile-lol-1.png',
                content: '밸런스 패치가 문제인 것 같아요',
                createAt: getYesterdayDate('21:15:00'),
                likes: 11,
            },
        ],
    },
    5: {
        id: 5,
        userId: 21,
        image: '/community/community5.jpg',
        username: '젠장또대상혁이야',
        profileImage: '/lol/profile-lol-4.png',
        title: '롤체 아이템 질문',
        content: `롤토체스 시즌2에서 아이템 조합 어떻게 하시나요?

저는 항상 뭘 줘야 할지 모르겠어서 그냥 대충 주는데, 그래서 계속 지는 것 같아요.

아이템 조합 팁 좀 알려주세요!`,
        createAt: getYesterdayDate('21:53:12'),
        comment: 2,
        game: '전략적 팀 전투',
        category: '질문',
        likes: 190,
        views: 1500,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 10,
                username: '롤토체스장인',
                profileImage: '/lol/profile-lol-2.png',
                content: '메타 덱마다 필수 아이템이 있어요. 검색해보세요!',
                createAt: getYesterdayDate('22:30:00'),
                likes: 14,
            },
            {
                id: 2,
                userId: 11,
                username: '전략가',
                profileImage: '/lol/profile-lol-3.png',
                content: '제 가이드 글 참고하시면 도움될 거예요',
                createAt: getYesterdayDate('23:00:00'),
                likes: 8,
            },
        ],
    },
    6: {
        id: 6,
        userId: 54,
        image: '/community/community6.jpg',
        username: '정글러의품격',
        profileImage: '/lol/profile-lol-2.png',
        title: '정글 초보 탈출 꿀팁',
        content: `정글 처음 시작하시는 분들을 위한 꿀팁 몇 가지 공유합니다.

1. 초반 정글링 루트를 외우세요 (레드-늑대-블루 or 블루-그룹-레드)
2. 갱킹 타이밍은 상대 라이너가 라인을 밀 때
3. 시야 장악이 생각보다 중요합니다
4. CS보다 객관적인 판단력이 더 중요

이것만 지켜도 브론즈는 쉽게 탈출하실 수 있습니다!`,
        createAt: getYesterdayDate('18:30:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '공략',
        likes: 560,
        views: 3200,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 12,
                username: '브론즈탈출기',
                profileImage: '/lol/profile-lol-1.png',
                content: '감사합니다! 도움 많이 됐어요',
                createAt: getYesterdayDate('19:00:00'),
                likes: 20,
            },
            {
                id: 2,
                userId: 13,
                username: '눈팅하러오는사람',
                profileImage: '/lol/profile-lol-3.png',
                content: '정글 연습해봐야겠네요 ㅎㅎ',
                createAt: getYesterdayDate('20:15:00'),
                likes: 12,
            },
        ],
    },
    7: {
        id: 7,
        userId: 55,
        image: '/community/community7.jpg',
        username: '오버워치마스터',
        profileImage: '/overwatch/profile-overwatch-2.png',
        title: '탱커 포지셔닝 완벽 가이드',
        content: `탱커를 하시는 분들이 가장 많이 하는 실수가 포지셔닝입니다.

탱커는 무조건 앞에 있어야 한다고 생각하시는데, 상황에 따라 달라야 합니다.

**공격 시**: 팀보다 약간 앞에서 공간 확보
**수비 시**: 팀과 함께 움직이며 힐러 보호
**후퇴 시**: 팀 뒤에서 엄호

포지셔닝만 잘해도 생존률이 2배는 올라갑니다!`,
        createAt: getYesterdayDate('15:45:00'),
        comment: 3,
        game: '오버워치2',
        category: '공략',
        likes: 780,
        views: 4500,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 14,
                username: '겐지장인',
                profileImage: '/lol/profile-lol-1.png',
                content: '탱커 유저는 아니지만 도움됐어요',
                createAt: getYesterdayDate('16:20:00'),
                likes: 15,
            },
            {
                id: 2,
                userId: 15,
                username: '힐러의길',
                profileImage: '/overwatch/profile-overwatch-1.png',
                content: '탱커분들 이것좀 읽어주세요 제발 ㅠㅠ',
                createAt: getYesterdayDate('17:00:00'),
                likes: 28,
            },
            {
                id: 3,
                userId: 16,
                username: '수영하는파이리',
                profileImage: '/lol/profile-lol-2.png',
                content: '유익한 글 감사합니다!',
                createAt: getYesterdayDate('18:30:00'),
                likes: 10,
            },
        ],
    },
    8: {
        id: 8,
        userId: 56,
        image: '/community/community8.jpg',
        username: '발로란트고수',
        profileImage: '/lol/profile-lol-3.png',
        title: '에임 연습 루틴 공유',
        content: `매일 하는 제 에임 연습 루틴 공유합니다.

1. 사격장 봇 30분 (난이도 중)
2. 데스매치 3판
3. 실전 랭크 전 사격장 5분 웜업

이 루틴을 3개월 지속하니까 확실히 에임이 좋아졌어요.

꾸준함이 중요합니다!`,
        createAt: getYesterdayDate('12:10:00'),
        comment: 2,
        game: '발로란트',
        category: '팁',
        likes: 420,
        views: 2900,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 17,
                username: '발로초보',
                profileImage: '/lol/profile-lol-4.png',
                content: '저도 해봐야겠네요!',
                createAt: getYesterdayDate('13:00:00'),
                likes: 8,
            },
            {
                id: 2,
                userId: 18,
                username: '발로고인물',
                profileImage: '/lol/profile-lol-1.png',
                content: '데스매치 3판이 핵심인 것 같아요',
                createAt: getYesterdayDate('14:30:00'),
                likes: 12,
            },
        ],
    },
    9: {
        id: 9,
        userId: 57,
        image: '/community/community9.jpg',
        username: '배그킹',
        profileImage: '/lol/profile-lol-4.png',
        title: '에란겔 드랍존 추천',
        content: `에란겔 맵에서 제가 자주 가는 드랍존 추천합니다.

**학교**: 초반 교전 원하시면 여기로
**포친키**: 중간 정도의 교전, 물자 많음
**야스나야**: 안전하게 파밍하고 싶을 때

본인 실력에 맞춰서 선택하시면 됩니다.

저는 주로 포친키 갑니다!`,
        createAt: getYesterdayDate('09:20:00'),
        comment: 2,
        game: '배틀그라운드',
        category: '팁',
        likes: 310,
        views: 2200,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 19,
                username: '배그생존왕',
                profileImage: '/lol/profile-lol-2.png',
                content: '저는 군기지가 최고예요',
                createAt: getYesterdayDate('10:00:00'),
                likes: 9,
            },
            {
                id: 2,
                userId: 20,
                username: '배그프로',
                profileImage: '/lol/profile-lol-3.png',
                content: '포친키 물자 진짜 좋죠',
                createAt: getYesterdayDate('11:15:00'),
                likes: 7,
            },
        ],
    },
    10: {
        id: 10,
        userId: 58,
        image: '/community/community10.jpg',
        username: '롤토체스장인',
        profileImage: '/lol/profile-lol-2.png',
        title: '시즌2 메타 덱 정리',
        content: `시즌2 현재 메타 덱 정리해봤습니다.

**S티어**
- 요정 기계류
- 용족 마법사

**A티어**
- 전사 화신
- 암살자 엘리트

**B티어**
- 기타 덱

현재는 요정 기계류가 압도적으로 강합니다.

자세한 공략은 제 블로그에 올려놨으니 참고하세요!`,
        createAt: getYesterdayDate('22:15:00'),
        comment: 3,
        game: '전략적 팀 전투',
        category: '공략',
        likes: 890,
        views: 5100,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 1,
                username: '전략가',
                profileImage: '/lol/profile-lol-3.png',
                content: '요정 기계류 카운터는 뭔가요?',
                createAt: getYesterdayDate('23:00:00'),
                likes: 25,
            },
            {
                id: 2,
                userId: 2,
                username: '롤체매니아',
                profileImage: '/lol/profile-lol-4.png',
                content: '정리 잘 해주셨네요!',
                createAt: getYesterdayDate('23:30:00'),
                likes: 18,
            },
            {
                id: 3,
                userId: 3,
                username: '젠장또대상혁이야',
                profileImage: '/lol/profile-lol-1.png',
                content: '블로그 주소 알 수 있을까요?',
                createAt: getYesterdayDate('00:15:00'),
                likes: 12,
            },
        ],
    },
    11: {
        id: 11,
        userId: 59,
        image: '/community/community11.jpg',
        username: '브론즈탈출기',
        profileImage: '/lol/profile-lol-1.png',
        title: '드디어 실버 됐다ㅠㅠ',
        content: `3개월 동안 노력한 결과 드디어 실버 달성했습니다 ㅠㅠ

너무 기쁘네요!!!

다음 목표는 골드입니다.

여러분도 포기하지 마세요!`,
        createAt: getYesterdayDate('19:40:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '자유',
        likes: 280,
        views: 1600,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 4,
                username: '정글러의품격',
                profileImage: '/lol/profile-lol-2.png',
                content: '축하드려요! 골드도 금방 가실 거예요',
                createAt: getYesterdayDate('20:00:00'),
                likes: 10,
            },
            {
                id: 2,
                userId: 5,
                username: '미드라이너',
                profileImage: '/lol/profile-lol-3.png',
                content: '고생하셨습니다 ㅎㅎ',
                createAt: getYesterdayDate('21:15:00'),
                likes: 6,
            },
        ],
    },
    12: {
        id: 12,
        userId: 60,
        image: '/community/community12.jpg',
        username: '겐지장인',
        profileImage: '/lol/profile-lol-1.png',
        title: '겐지 칼질 타이밍 질문',
        content: `겐지 칼질 타이밍 질문드립니다.

질풍참 쓰고 바로 칼질하는 게 맞나요?

아니면 살짝 딜레이 주고 칼질하는 게 맞나요?

고수분들 조언 부탁드립니다!`,
        createAt: getYesterdayDate('16:25:00'),
        comment: 2,
        game: '오버워치2',
        category: '질문',
        likes: 190,
        views: 1400,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 6,
                username: '오버워치마스터',
                profileImage: '/overwatch/profile-overwatch-2.png',
                content: '상황마다 다르지만 보통은 질풍참 직후가 좋아요',
                createAt: getYesterdayDate('17:00:00'),
                likes: 15,
            },
            {
                id: 2,
                userId: 7,
                username: '힐러의길',
                profileImage: '/overwatch/profile-overwatch-1.png',
                content: '연습장에서 타이밍 연습 많이 해보세요!',
                createAt: getYesterdayDate('18:20:00'),
                likes: 8,
            },
        ],
    },
    13: {
        id: 13,
        userId: 61,
        image: '/community/community13.jpg',
        username: '발로초보',
        profileImage: '/lol/profile-lol-4.png',
        title: '스킬 사용 타이밍 모르겠어요',
        content: `발로란트 시작한 지 한 달 됐는데요.

스킬을 언제 써야 할지 모르겠어요.

초반에 다 쓰면 나중에 없고, 아끼면 죽고...

스킬 사용 타이밍 팁 좀 알려주세요!`,
        createAt: getYesterdayDate('13:50:00'),
        comment: 2,
        game: '발로란트',
        category: '질문',
        likes: 150,
        views: 1200,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 8,
                username: '발로란트고수',
                profileImage: '/lol/profile-lol-3.png',
                content: '상황 판단이 중요해요. 영상 많이 보시는 걸 추천',
                createAt: getYesterdayDate('14:30:00'),
                likes: 12,
            },
            {
                id: 2,
                userId: 9,
                username: '발로고인물',
                profileImage: '/lol/profile-lol-1.png',
                content: '라운드 초반엔 정보 스킬, 중반엔 전투 스킬!',
                createAt: getYesterdayDate('15:15:00'),
                likes: 18,
            },
        ],
    },
    14: {
        id: 14,
        userId: 62,
        image: '/community/community14.jpg',
        username: '배그생존왕',
        profileImage: '/lol/profile-lol-2.png',
        title: '최종 안전지대 생존 팁',
        content: `최종 안전지대에서 자주 죽으시는 분들을 위한 팁입니다.

1. 엄폐물 확보가 최우선
2. 이동은 최소화
3. 소리에 집중하기
4. 섣부른 교전 금지

특히 4번이 정말 중요합니다.

끝까지 버티는 게 승리의 비결!`,
        createAt: getYesterdayDate('10:30:00'),
        comment: 2,
        game: '배틀그라운드',
        category: '공략',
        likes: 520,
        views: 3400,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 10,
                username: '배그킹',
                profileImage: '/lol/profile-lol-4.png',
                content: '마지막 팁이 진짜 중요하죠',
                createAt: getYesterdayDate('11:15:00'),
                likes: 14,
            },
            {
                id: 2,
                userId: 11,
                username: '배그프로',
                profileImage: '/lol/profile-lol-3.png',
                content: '유익한 정보 감사합니다!',
                createAt: getYesterdayDate('12:00:00'),
                likes: 10,
            },
        ],
    },
    15: {
        id: 15,
        userId: 63,
        image: '/community/community15.jpg',
        username: '롤체매니아',
        profileImage: '/lol/profile-lol-4.png',
        title: '롤토체스 재밌네요',
        content: `요즘 롤토체스에 빠졌어요.

원래 롤만 하다가 심심해서 해봤는데 완전 재밌네요 ㅋㅋ

전략 짜는 재미가 있어서 좋은 것 같아요.

여러분도 한번 해보세요!`,
        createAt: getYesterdayDate('21:00:00'),
        comment: 2,
        game: '전략적 팀 전투',
        category: '자유',
        likes: 210,
        views: 1300,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 12,
                username: '롤토체스장인',
                profileImage: '/lol/profile-lol-2.png',
                content: '환영합니다! 재밌게 즐기세요',
                createAt: getYesterdayDate('21:30:00'),
                likes: 5,
            },
            {
                id: 2,
                userId: 13,
                username: '전략가',
                profileImage: '/lol/profile-lol-3.png',
                content: '저도 롤토체스가 본게임보다 재밌어요 ㅎㅎ',
                createAt: getYesterdayDate('22:15:00'),
                likes: 7,
            },
        ],
    },
    16: {
        id: 16,
        userId: 64,
        image: '/community/community16.jpg',
        username: '미드라이너',
        profileImage: '/lol/profile-lol-3.png',
        title: '미드 라인전 꿀팁 정리',
        content: `미드 라인전에서 이기는 방법 정리해봤습니다.

**레벨 2 먼저 찍기**: 미니언 9마리면 레벨 2
**웨이브 컨트롤**: 상대가 cs 먹을 때 견제
**로밍 타이밍**: 웨이브 밀고 가는 게 기본
**시야 장악**: 양쪽 강 부쉬에 와드

이것만 지켜도 라인전은 이깁니다!`,
        createAt: getYesterdayDate('18:20:00'),
        comment: 2,
        game: '리그오브레전드',
        category: '공략',
        likes: 650,
        views: 3800,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 14,
                username: '브론즈탈출기',
                profileImage: '/lol/profile-lol-1.png',
                content: '레벨 2 타이밍 몰랐는데 감사합니다!',
                createAt: getYesterdayDate('19:00:00'),
                likes: 22,
            },
            {
                id: 2,
                userId: 15,
                username: '정글러의품격',
                profileImage: '/lol/profile-lol-2.png',
                content: '정글 입장에서도 도움되는 글이네요',
                createAt: getYesterdayDate('20:15:00'),
                likes: 16,
            },
        ],
    },
    17: {
        id: 17,
        userId: 65,
        image: '/community/community17.jpg',
        username: '힐러의길',
        profileImage: '/overwatch/profile-overwatch-1.png',
        title: '서포터 포지션 어떻게 잡나요?',
        content: `서포터 처음 시작했는데 포지션을 어떻게 잡아야 할지 모르겠어요.

팀 뒤에 있으면 딜러들이 앞으로 너무 나가고,

팀이랑 같이 있으면 제가 먼저 죽고...

서포터 포지셔닝 팁 좀 알려주세요!`,
        createAt: getYesterdayDate('15:10:00'),
        comment: 2,
        game: '오버워치2',
        category: '질문',
        likes: 270,
        views: 1900,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 16,
                username: '오버워치마스터',
                profileImage: '/overwatch/profile-overwatch-2.png',
                content: '탱커 뒤에서 팀 전체를 볼 수 있는 위치가 좋아요',
                createAt: getYesterdayDate('16:00:00'),
                likes: 18,
            },
            {
                id: 2,
                userId: 17,
                username: '겐지장인',
                profileImage: '/lol/profile-lol-1.png',
                content: '엄폐물 근처에 계시는 게 중요합니다',
                createAt: getYesterdayDate('17:30:00'),
                likes: 12,
            },
        ],
    },
    18: {
        id: 18,
        userId: 66,
        image: '/community/community18.jpg',
        username: '발로고인물',
        profileImage: '/lol/profile-lol-1.png',
        title: '랭크 올리는 법',
        content: `제가 아이언에서 다이아까지 올라온 방법 공유합니다.

1. 한 가지 요원만 파기
2. 크로스헤어 설정 중요
3. 커뮤니케이션 적극적으로
4. 멘탈 관리가 제일 중요

특히 4번 멘탈 관리... 이게 진짜 어렵습니다.

한 판 졌다고 틸트하지 마세요!`,
        createAt: getYesterdayDate('12:00:00'),
        comment: 2,
        game: '발로란트',
        category: '팁',
        likes: 480,
        views: 2700,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 18,
                username: '발로초보',
                profileImage: '/lol/profile-lol-4.png',
                content: '멘탈이 진짜 중요하죠 ㅠㅠ',
                createAt: getYesterdayDate('13:00:00'),
                likes: 15,
            },
            {
                id: 2,
                userId: 19,
                username: '발로란트고수',
                profileImage: '/lol/profile-lol-3.png',
                content: '한 요원 파는 게 정답인 것 같아요',
                createAt: getYesterdayDate('14:30:00'),
                likes: 20,
            },
        ],
    },
    19: {
        id: 19,
        userId: 67,
        image: '/community/community19.jpg',
        username: '배그프로',
        profileImage: '/lol/profile-lol-3.png',
        title: '근접전 이기는 방법',
        content: `배그에서 근접전 자주 지시는 분들 계신가요?

제가 써먹는 팁 몇 가지 알려드릴게요.

1. 엄폐물 활용 필수
2. 샷건 or SMG 들기
3. 수류탄 먼저 던지기
4. 소리 듣고 위치 파악

근접전은 반응속도가 중요합니다!`,
        createAt: getYesterdayDate('20:45:00'),
        comment: 2,
        game: '배틀그라운드',
        category: '팁',
        likes: 390,
        views: 2300,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 20,
                username: '배그킹',
                profileImage: '/lol/profile-lol-4.png',
                content: '수류탄 먼저 던지는 거 진짜 중요해요',
                createAt: getYesterdayDate('21:30:00'),
                likes: 11,
            },
            {
                id: 2,
                userId: 1,
                username: '배그생존왕',
                profileImage: '/lol/profile-lol-2.png',
                content: '엄폐물 잘 쓰는 게 핵심이죠',
                createAt: getYesterdayDate('22:15:00'),
                likes: 8,
            },
        ],
    },
    20: {
        id: 20,
        userId: 68,
        image: '/community/community20.jpg',
        username: '전략가',
        profileImage: '/lol/profile-lol-3.png',
        title: '롤토체스 초보 가이드',
        content: `롤토체스 처음 시작하시는 분들을 위한 가이드입니다.

**기본 개념**
- 체스판에 챔피언을 배치해서 자동 전투
- 같은 챔피언 3개 = 별 업그레이드
- 시너지를 맞추는 게 중요

**초보자 추천 덱**
- 전사 덱: 쉽고 강함
- 요정 덱: 초반 강세

**꿀팁**
- 체력 관리 중요
- 경제 운영 (이자 시스템)
- 아이템 조합 외우기

천천히 배워가시면 됩니다!`,
        createAt: getYesterdayDate('17:30:00'),
        comment: 3,
        game: '전략적 팀 전투',
        category: '공략',
        likes: 720,
        views: 4200,
        isLiked: false,
        comments: [
            {
                id: 1,
                userId: 2,
                username: '롤체매니아',
                profileImage: '/lol/profile-lol-4.png',
                content: '초보자한테 딱 필요한 글이네요!',
                createAt: getYesterdayDate('18:15:00'),
                likes: 24,
            },
            {
                id: 2,
                userId: 3,
                username: '젠장또대상혁이야',
                profileImage: '/lol/profile-lol-1.png',
                content: '경제 운영이 진짜 어려워요 ㅠㅠ',
                createAt: getYesterdayDate('19:00:00'),
                likes: 16,
            },
            {
                id: 3,
                userId: 4,
                username: '롤토체스장인',
                profileImage: '/lol/profile-lol-2.png',
                content: '잘 정리하셨네요. 추천합니다',
                createAt: getYesterdayDate('20:30:00'),
                likes: 19,
            },
        ],
    },
};
