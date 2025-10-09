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

        // 포지션 매칭만 수행 (티어는 무시)
        if (criteria.positions.length > 0 && !criteria.positions.includes('all')) {
            // 'all'이 아닌 경우에만 필터링
            const positionId = 'positionId' in user ? user.positionId : undefined;
            if (!positionId || !criteria.positions.includes(positionId)) {
                return false;
            }
        }

        // 티어, 마이크 선호도, 게임 스타일, 커뮤니케이션 스타일 필터링 제거
        // (포지션만 필터링 - 카드에서 선택한 티어와 스타일을 표시)

        return true;
    });
};


// 티어 ID를 한글 이름으로 변환
const getTierNameFromId = (tierId: string): string => {
    // tierId 형식: "ironI1", "bronzeB3", "silverS2", "goldG1", "platinumP4",
    //              "emeraldE2", "diamondD1", "masterM1", "grandmasterGM1", "challengerC1"

    if (!tierId) return '';

    const tierMap: { [key: string]: string } = {
        iron: '아이언',
        bronze: '브론즈',
        silver: '실버',
        gold: '골드',
        platinum: '플래티넘',
        emerald: '에메랄드',
        diamond: '다이아몬드',
        master: '마스터',
        grandmaster: '그랜드마스터',
        challenger: '챌린저',
    };

    // tierId에서 티어 부분만 추출 (예: "emeraldE2" -> "emerald")
    const tierKey = tierId.match(/^[a-z]+/i)?.[0]?.toLowerCase() || '';

    return tierMap[tierKey] || '';
};

// 티어 정확히 일치 검사
const isExactTierMatch = (userTier: string, targetTierId: string): boolean => {
    const targetTierName = getTierNameFromId(targetTierId);
    return userTier === targetTierName;
};


function MatchResultsContent() {
    const [currentUsers, setCurrentUsers] =
        useState<MatchUser[]>([]);
    const [matchedUser, setMatchedUser] = useState<MatchUser | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedGameStyles, setSelectedGameStyles] = useState<string[]>([]);
    const [selectedCommStyles, setSelectedCommStyles] = useState<string[]>([]);
    const [selectedTier, setSelectedTier] = useState<string>('');
    const [userRanksMap, setUserRanksMap] = useState<{ [key: number]: string }>({});
    const [matchedUserTier, setMatchedUserTier] = useState<string>('');
    const [matchedUserRank, setMatchedUserRank] = useState<string>('');
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
        const userIds = searchParams.get('userIds');
        const userRanks = searchParams.get('userRanks');

        console.log('매칭 조건:', {
            game,
            positions,
            tier,
            micPreference,
            gameStyles,
            commStyles,
            userIds,
            userRanks,
        });

        // URL에서 전달받은 유저 ID와 랭크 맵 사용
        if (userIds && userRanks) {
            const selectedUserIds: number[] = JSON.parse(userIds);
            const ranksMap: { [key: number]: string } = JSON.parse(userRanks);

            // 전체 유저 목록에서 선택된 유저들만 필터링
            const gameUsers = game ? getUsersByGame(getGameNameById(game)) : [];
            const selectedUsers = gameUsers.filter(user =>
                selectedUserIds.includes(user.id)
            );

            setCurrentUsers(selectedUsers);
            setUserRanksMap(ranksMap);
        } else {
            // URL에 유저 정보가 없으면 기존 방식으로 필터링 (폴백)
            const filteredUsers = filterUsersByMatchingCriteria({
                game,
                positions: positions ? JSON.parse(positions) : [],
                tier,
                micPreference,
                gameStyles: gameStyles ? JSON.parse(gameStyles) : [],
                commStyles: commStyles ? JSON.parse(commStyles) : [],
            });

            setCurrentUsers(filteredUsers.slice(0, 5));
        }

        // 선택한 스타일과 티어 저장
        setSelectedGameStyles(gameStyles ? JSON.parse(gameStyles) : []);
        setSelectedCommStyles(commStyles ? JSON.parse(commStyles) : []);
        setSelectedTier(tier || '');

        return () => {
            setProgress(0);
        };
    }, [setProgress, searchParams]);

    const handleSwipe = (user: MatchUser, direction: 'left' | 'right') => {
        console.log('handleSwipe called:', { user: user.username, direction });

        if (direction === 'right') {
            // 관심 표시 - 매칭 성공
            setMatchedUser(user);

            // 매칭된 유저의 티어와 랭크 계산
            const tierMap: { [key: string]: { name: string } } = {
                iron: { name: '아이언' },
                bronze: { name: '브론즈' },
                silver: { name: '실버' },
                gold: { name: '골드' },
                platinum: { name: '플래티넘' },
                emerald: { name: '에메랄드' },
                diamond: { name: '다이아몬드' },
                master: { name: '마스터' },
                grandmaster: { name: '그랜드마스터' },
                challenger: { name: '챌린저' },
            };

            const tierKey = selectedTier?.match(/^[a-z]+/i)?.[0]?.toLowerCase() || '';
            const tierInfo = tierMap[tierKey];
            const displayTier = tierInfo ? tierInfo.name : user.tier;
            const displayRank = userRanksMap[user.id] || user.rank;

            setMatchedUserTier(displayTier);
            setMatchedUserRank(displayRank);
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
                        selectedGameStyles={selectedGameStyles}
                        selectedCommStyles={selectedCommStyles}
                        selectedTier={selectedTier}
                        assignedRank={userRanksMap[user.id]}
                        {...props}
                    />
                )}
            />

            {showSuccessModal && matchedUser && (
                <MatchSuccessModal
                    user={matchedUser}
                    displayTier={matchedUserTier}
                    displayRank={matchedUserRank}
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
