'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import MatchCard from './components/MatchCard';
import MatchSuccessModal from './components/MatchSuccessModal';
import SwipeableStack from './components/SwipeableStack';

import styled from '@emotion/styled';

import { useQuickMatch } from '@/contexts/QuickMatchContext';

// 매칭된 사용자 인터페이스
interface MatchUser {
    id: number;
    profileImage: string;
    username: string;
    gameId: string;
    position?: React.ReactNode;
    tier: string;
    rank: string;
    winRate: number;
    kda: number;
    recentChampions: string[];
    gameStyles: string[];
    communicationStyles: string[];
    description: string;
    game: string;
}

// 매칭 조건 인터페이스
interface MatchingCriteria {
    game: string | null;
    positions: string[];
    tier: string | null;
    micPreference: string | null;
    gameStyles: string[];
    commStyles: string[];
}

// 티어 순서 정의 (매칭 범위 계산용)
const tierOrder = [
    '아이언',
    '브론즈',
    '실버',
    '골드',
    '플래티넘',
    '에메랄드',
    '다이아몬드',
    '마스터',
    '그랜드마스터',
    '챌린저',
];

// 매칭 조건에 따른 사용자 필터링 함수
const filterUsersByMatchingCriteria = (
    criteria: MatchingCriteria,
): MatchUser[] => {
    return mockMatchUsers.filter((user) => {
        // 게임 매칭
        if (criteria.game && user.game !== getGameNameById(criteria.game)) {
            return false;
        }

        // 티어 매칭 (±2 티어 범위)
        if (criteria.tier && !isCompatibleTier(user.tier, criteria.tier)) {
            return false;
        }

        // 마이크 선호도 매칭
        if (
            criteria.micPreference &&
            !isCompatibleMicPreference(
                user.communicationStyles,
                criteria.micPreference,
            )
        ) {
            return false;
        }

        // 게임 스타일 매칭 (최소 1개 일치)
        if (
            criteria.gameStyles.length > 0 &&
            !hasMatchingStyles(user.gameStyles, criteria.gameStyles)
        ) {
            return false;
        }

        // 커뮤니케이션 스타일 매칭 (최소 1개 일치)
        if (
            criteria.commStyles.length > 0 &&
            !hasMatchingStyles(user.communicationStyles, criteria.commStyles)
        ) {
            return false;
        }

        return true;
    });
};

// 게임 ID를 게임 이름으로 변환
const getGameNameById = (gameId: string): string => {
    const gameMap: { [key: string]: string } = {
        lol: '리그오브레전드',
        tft: '전략적 팀 전투',
        overwatch: '오버워치2',
        valorant: '발로란트',
        pubg: '배틀그라운드',
    };
    return gameMap[gameId] || gameId;
};

// 티어 호환성 검사 (±2 티어 범위)
const isCompatibleTier = (userTier: string, targetTier: string): boolean => {
    const userIndex = tierOrder.indexOf(userTier);
    const targetIndex = tierOrder.indexOf(targetTier);

    if (userIndex === -1 || targetIndex === -1) return true; // 알 수 없는 티어는 허용

    return Math.abs(userIndex - targetIndex) <= 2;
};

// 마이크 선호도 호환성 검사
const isCompatibleMicPreference = (
    userCommStyles: string[],
    micPreference: string,
): boolean => {
    if (micPreference === '마이크 필수') {
        return userCommStyles.includes('마이크 필수');
    } else if (micPreference === '마이크 선택') {
        return (
            userCommStyles.includes('마이크 필수') ||
            userCommStyles.includes('마이크 가능하지만 조용한')
        );
    } else if (micPreference === '채팅만') {
        return (
            userCommStyles.includes('채팅 위주') ||
            !userCommStyles.includes('마이크 필수')
        );
    }
    return true;
};

// 스타일 매칭 검사 (최소 1개 일치)
const hasMatchingStyles = (
    userStyles: string[],
    targetStyles: string[],
): boolean => {
    return targetStyles.some((style) => userStyles.includes(style));
};

// 임시 매칭 사용자 데이터
const mockMatchUsers: MatchUser[] = [
    {
        id: 1,
        profileImage: '/lol/profile-lol-1.png',
        username: '멋졌으면 핑찍어',
        gameId: '#96327',
        tier: '에메랄드',
        rank: 'E4',
        winRate: 68,
        kda: 1.85,
        recentChampions: ['아트록스', '가렌', '시온'],
        gameStyles: ['공격적인', '팀 중심형', '빠른 템포 선호'],
        communicationStyles: ['마이크 필수', '편하게 대화하는', '욕 안 하는'],
        description: '디코하면서 같이 으쌰으쌰 하실분찾아요~',
        game: '리그오브레전드',
    },
    {
        id: 2,
        profileImage: '/lol/profile-lol-2.png',
        username: '티 모',
        gameId: '#TM1',
        tier: '골드',
        rank: 'G1',
        winRate: 72,
        kda: 2.14,
        recentChampions: ['베인', '갱플랭크', '가렌'],
        gameStyles: ['전략적인', '창의적인 플레이', '신중한 플레이'],
        communicationStyles: ['채팅 위주', '차분한', '감정 조절 가능'],
        description: '함께 할 듀오 파트너를 찾고있어요.',
        game: '리그오브레전드',
    },
    {
        id: 3,
        profileImage: '/lol/profile-lol-3.png',
        username: '프로게이머의꿈',
        gameId: '#PRO123',
        tier: '플래티넘',
        rank: 'P3',
        winRate: 65,
        kda: 2.05,
        recentChampions: ['르블랑', '야스오', '벡스'],
        gameStyles: ['리더형', '공격적인', '빠른 템포 선호'],
        communicationStyles: ['마이크 필수', '직설적인', '필요한 말만 하는'],
        description: '승부욕 강한 분 환영! 함께 랭크 올려요',
        game: '리그오브레전드',
    },
    {
        id: 4,
        profileImage: '/lol/profile-lol-4.png',
        username: '힐링게임러',
        gameId: '#HEAL456',
        tier: '실버',
        rank: 'S2',
        winRate: 58,
        kda: 1.92,
        recentChampions: ['소나', '잔나', '브라움'],
        gameStyles: ['팀 중심형', '서포터형', '신중한 플레이'],
        communicationStyles: [
            '마이크 가능하지만 조용한',
            '예의 바른',
            '감정 조절 가능',
        ],
        description: '재밌게 게임하고 싶어요! 욕설은 안해요',
        game: '리그오브레전드',
    },
    {
        id: 5,
        profileImage: '/lol/profile-lol-5.png',
        username: '정글의왕',
        gameId: '#JUNGLE789',
        tier: '다이아몬드',
        rank: 'D4',
        winRate: 71,
        kda: 2.38,
        recentChampions: ['비에고', '카직스', '니달리'],
        gameStyles: ['공격적인', '리더형', '창의적인 플레이'],
        communicationStyles: ['마이크 필수', '유머러스한', '편하게 대화하는'],
        description: '정글 전문, 캐리하고 싶은 분들 오세요!',
        game: '리그오브레전드',
    },
];

function MatchResultsContent() {
    const [currentUsers, setCurrentUsers] =
        useState<MatchUser[]>(mockMatchUsers);
    const [matchedUser, setMatchedUser] = useState<MatchUser | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { setProgress } = useQuickMatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // 진행률을 100%로 설정 (매칭 완료)
        setProgress(100);

        // URL 파라미터에서 매칭 조건 가져오기
        const game = searchParams.get('game');
        const positions = searchParams.get('positions');
        const tier = searchParams.get('tier');
        const micPreference = searchParams.get('micPreference');
        const gameStyles = searchParams.get('gameStyles');
        const commStyles = searchParams.get('commStyles');

        console.log('매칭 조건:', {
            game,
            positions,
            tier,
            micPreference,
            gameStyles,
            commStyles,
        });

        // 매칭 조건에 따라 사용자 필터링
        const filteredUsers = filterUsersByMatchingCriteria({
            game,
            positions: positions ? JSON.parse(positions) : [],
            tier,
            micPreference,
            gameStyles: gameStyles ? JSON.parse(gameStyles) : [],
            commStyles: commStyles ? JSON.parse(commStyles) : [],
        });

        setCurrentUsers(filteredUsers);

        return () => {
            setProgress(0);
        };
    }, [setProgress, searchParams]);

    const handleSwipe = (user: MatchUser, direction: 'left' | 'right') => {
        console.log('handleSwipe called:', { user: user.username, direction });

        if (direction === 'right') {
            // 관심 표시 - 매칭 성공
            setMatchedUser(user);
            setShowSuccessModal(true);
        }

        // 현재 사용자를 목록에서 제거
        setCurrentUsers((prev) => {
            const newUsers = prev.filter((u) => u.id !== user.id);
            console.log(
                'Users after swipe:',
                newUsers.map((u) => ({ id: u.id, username: u.username })),
            );
            return newUsers;
        });
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        setMatchedUser(null);

        // TODO: 실제 채팅방으로 이동
        console.log('채팅방으로 이동');
    };

    const handleBackToMatch = () => {
        setProgress(0);
        router.push('/match');
    };

    if (currentUsers.length === 0) {
        return (
            <NoMoreUsersContainer>
                <NoMoreUsersContent>
                    <Title>더 이상 매칭할 사용자가 없습니다</Title>
                    <Description>
                        조건을 변경하거나 나중에 다시 시도해보세요
                    </Description>
                    <BackButton onClick={handleBackToMatch}>
                        매칭으로 돌아가기
                    </BackButton>
                </NoMoreUsersContent>
            </NoMoreUsersContainer>
        );
    }

    return (
        <MatchResultsContainer>
            <SwipeableStack
                users={currentUsers}
                onSwipe={handleSwipe}
                renderCard={(user, index) => (
                    <MatchCard user={user} isTop={index === 0} />
                )}
            />

            {showSuccessModal && matchedUser && (
                <MatchSuccessModal
                    user={matchedUser}
                    onClose={handleSuccessModalClose}
                />
            )}
        </MatchResultsContainer>
    );
}

export default function MatchResultsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MatchResultsContent />
        </Suspense>
    );
}

const MatchResultsContainer = styled.div`
    height: 100dvh;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(8rem + env(safe-area-inset-bottom));
    overflow: hidden;
    box-sizing: border-box;
`;

const NoMoreUsersContainer = styled.div`
    height: 100dvh;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(8rem + env(safe-area-inset-bottom));
    overflow: hidden;
`;

const NoMoreUsersContent = styled.div`
    text-align: center;
    max-width: 40rem;
`;

const Title = styled.h2`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.2rem;
    line-height: 1.4;
`;

const Description = styled.p`
    font-size: 1.6rem;
    color: #939393;
    line-height: 1.5;
    margin-bottom: 2rem;
`;

const BackButton = styled.button`
    padding: 1.2rem 2.4rem;
    font-size: 1.6rem;
    font-weight: 600;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    margin-top: 2rem;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;
