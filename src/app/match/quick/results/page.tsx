'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import MatchCard from './components/MatchCard';
import MatchSuccessModal from './components/MatchSuccessModal';
import SwipeableStack from './components/SwipeableStack';

import styled from '@emotion/styled';

import { useQuickMatch } from '@/contexts/QuickMatchContext';
import { getUsersByGame, getGameNameById, type GameUser } from '@/data/mockGameUsers';

// 매칭된 사용자 인터페이스 (GameUser와 동일)
type MatchUser = GameUser;

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
    // 게임별 사용자 데이터 가져오기
    const gameUsers = criteria.game
        ? getUsersByGame(getGameNameById(criteria.game))
        : [];

    return gameUsers.filter((user) => {
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


function MatchResultsContent() {
    const [currentUsers, setCurrentUsers] =
        useState<MatchUser[]>([]);
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
                renderCard={(user, index, props) => (
                    <MatchCard
                        user={user}
                        index={index}
                        isTop={index === 0}
                        {...props}
                    />
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
