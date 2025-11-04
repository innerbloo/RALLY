'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

import MatchCard from './components/MatchCard';
import MatchSuccessModal from './components/MatchSuccessModal';
import SwipeAnimation from './components/SwipeAnimation';
import SwipeableStack from './components/SwipeableStack';

import styled from '@emotion/styled';

import { useQuickMatch } from '@/contexts/QuickMatchContext';
import { getUsersByGame, getGameNameById, type GameUser } from '@/data/mockGameUsers';
import { ChatRoom, Message, mockChatRooms } from '@/data/chatMockData';

// 매칭된 사용자 인터페이스 (GameUser와 동일)
type MatchUser = GameUser;

// 매칭된 사용자 인터페이스 (추가 정보 포함)
type ExtendedMatchUser = MatchUser & {
    displayTier?: string;
    displayRank?: string;
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
    const [allUsers, setAllUsers] = useState<MatchUser[]>([]); // 전체 유저 리스트
    const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 보고 있는 카드 인덱스
    const [matchedUser, setMatchedUser] = useState<MatchUser | null>(null);
    const [matchedUsers, setMatchedUsers] = useState<ExtendedMatchUser[]>([]); // 매칭된 모든 유저들
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSwipeTutorial, setShowSwipeTutorial] = useState(false); // 스와이프 튜토리얼 상태
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

        // localStorage에서 매칭된 유저들 불러오기
        const storedMatchedUsers = localStorage.getItem('quickMatchedUsers');
        if (storedMatchedUsers) {
            setMatchedUsers(JSON.parse(storedMatchedUsers));
        }

        // URL 파라미터에서 매칭 조건 가져오기
        const game = searchParams.get('game');
        const positions = searchParams.get('positions');
        const tier = searchParams.get('tier');
        const micPreference = searchParams.get('micPreference');
        const gameStyles = searchParams.get('gameStyles');
        const commStyles = searchParams.get('commStyles');
        const userIds = searchParams.get('userIds');
        const userRanks = searchParams.get('userRanks');
        const savedIndex = searchParams.get('currentIndex'); // URL에서 현재 인덱스 읽기

        console.log('매칭 조건:', {
            game,
            positions,
            tier,
            micPreference,
            gameStyles,
            commStyles,
            userIds,
            userRanks,
            savedIndex,
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

            setAllUsers(selectedUsers);
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

            setAllUsers(filteredUsers.slice(0, 5));
        }

        // URL에서 currentIndex가 있으면 설정, 없으면 0
        if (savedIndex) {
            setCurrentIndex(parseInt(savedIndex, 10));
        } else {
            // 매칭 결과 진입 시 항상 튜토리얼 표시
            setShowSwipeTutorial(true);
        }

        // 선택한 스타일과 티어 저장
        setSelectedGameStyles(gameStyles ? JSON.parse(gameStyles) : []);
        setSelectedCommStyles(commStyles ? JSON.parse(commStyles) : []);
        setSelectedTier(tier || '');

        return () => {
            setProgress(0);
        };
    }, [setProgress, searchParams]);

    const updateURLWithIndex = (newIndex: number) => {
        // 현재 URL 파라미터를 모두 유지하면서 currentIndex만 업데이트
        const params = new URLSearchParams(searchParams.toString());
        params.set('currentIndex', newIndex.toString());
        router.replace(`/match/quick/results?${params.toString()}`);
    };

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

            // 매칭된 유저 리스트에 추가하고 localStorage에 저장
            const updatedMatchedUsers = [...matchedUsers, {
                ...user,
                displayTier,
                displayRank,
            }];
            setMatchedUsers(updatedMatchedUsers);
            localStorage.setItem('quickMatchedUsers', JSON.stringify(updatedMatchedUsers));
        }

        // 다음 인덱스로 이동하고 URL 업데이트
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        updateURLWithIndex(nextIndex);
    };

    const handleChatClick = () => {
        if (!matchedUser) return;

        // localStorage에서 기존 채팅방 목록 가져오기
        const storedRooms = JSON.parse(
            localStorage.getItem('chatRooms') || '[]',
        ) as ChatRoom[];

        // 매칭된 유저와의 채팅방이 이미 있는지 확인
        const existingRoom = storedRooms.find(
            (room) => room.matchedUser.userId === matchedUser.id,
        );

        if (existingRoom) {
            // 기존 채팅방이 있으면 해당 채팅방으로 이동
            router.push(`/chat/${existingRoom.id}`);
        } else {
            // 새 채팅방 생성 - mockChatRooms와 ID 충돌 방지
            const allExistingIds = [
                ...storedRooms.map((r) => r.id),
                ...mockChatRooms.map((r) => r.id),
            ];
            const newRoomId = allExistingIds.length > 0
                ? Math.max(...allExistingIds) + 1
                : 1;

            const newRoom: ChatRoom = {
                id: newRoomId,
                matchedUser: {
                    userId: matchedUser.id,
                    username: matchedUser.username,
                    profileImage: matchedUser.profileImage,
                    isOnline: true,
                },
                game: {
                    name: matchedUser.game,
                    image: `/game${matchedUser.game === '리그오브레전드' ? '1' : matchedUser.game === '전략적 팀 전투' ? '2' : matchedUser.game === '발로란트' ? '3' : matchedUser.game === '오버워치2' ? '4' : '5'}.png`,
                },
                lastMessage: {
                    content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
                    timestamp: new Date().toISOString(),
                    senderId: 0,
                },
                unreadCount: 0,
                matchedAt: new Date().toISOString(),
            };

            // 채팅방 목록에 추가
            storedRooms.push(newRoom);
            localStorage.setItem('chatRooms', JSON.stringify(storedRooms));

            // 초기 시스템 메시지 추가
            const storedMessages = JSON.parse(
                localStorage.getItem('chatMessages') || '{}',
            ) as { [roomId: number]: Message[] };

            const initialMessage: Message = {
                id: 1,
                roomId: newRoomId,
                senderId: 0,
                content: '매칭이 완료되었습니다! 서로 인사를 나눠보세요.',
                timestamp: new Date().toISOString(),
                isRead: true,
                messageType: 'system',
            };

            storedMessages[newRoomId] = [initialMessage];
            localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

            // 새 채팅방으로 이동
            router.push(`/chat/${newRoomId}`);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        setMatchedUser(null);
    };

    const handleBackToMatch = () => {
        // 새로운 매칭 시작 시 매칭 리스트 클리어
        localStorage.removeItem('quickMatchedUsers');
        setProgress(0);
        router.push('/match');
    };

    // 현재 인덱스부터 남은 유저들만 표시
    const remainingUsers = allUsers.slice(currentIndex);

    // 매칭된 유저와 채팅 시작하는 함수
    const handleStartChat = (user: ExtendedMatchUser) => {
        setMatchedUser(user);
        handleChatClick();
    };

    // 프로필 페이지로 이동하는 함수
    const handleProfileClick = (userId: number) => {
        router.push(`/profile/${userId}`);
    };

    if (remainingUsers.length === 0) {
        // 매칭된 유저가 있으면 리스트를 보여주고, 없으면 기본 메시지 표시
        if (matchedUsers.length > 0) {
            return (
                <NoMoreUsersContainer>
                    <MatchedUsersContent>
                        <Title>매칭된 사용자들</Title>
                        <Description>
                            {matchedUsers.length}명의 사용자와 매칭되었습니다
                        </Description>

                        <MatchedUsersList>
                            {matchedUsers.map((user) => (
                                <MatchedUserCard key={user.id}>
                                    <UserClickArea onClick={() => handleProfileClick(user.id)}>
                                        <UserImage
                                            src={user.profileImage}
                                            alt={user.username}
                                        />
                                        <UserInfo>
                                            <UserName>{user.username}</UserName>
                                            <UserGameId>{user.gameId}</UserGameId>
                                            <UserTier>
                                                {user.displayTier || user.tier} {user.displayRank || user.rank}
                                            </UserTier>
                                        </UserInfo>
                                    </UserClickArea>
                                    <ChatButton onClick={() => handleStartChat(user)}>
                                        <MessageSquare size={18} />
                                        <ChatButtonText>채팅하기</ChatButtonText>
                                    </ChatButton>
                                </MatchedUserCard>
                            ))}
                        </MatchedUsersList>

                        <ButtonGroup>
                            <BackButton onClick={handleBackToMatch}>
                                매칭 홈으로 돌아가기
                            </BackButton>
                        </ButtonGroup>
                    </MatchedUsersContent>
                </NoMoreUsersContainer>
            );
        } else {
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
    }

    return (
        <MatchResultsContainer>
            {/* 스와이프 튜토리얼 애니메이션 */}
            <SwipeAnimation
                show={showSwipeTutorial}
                onClose={() => {
                    setShowSwipeTutorial(false);
                }}
            />

            <SwipeableStack
                users={remainingUsers}
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
                    onChatClick={handleChatClick}
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

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding-bottom: 8rem;
    }
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

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding-bottom: 8rem;
    }
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

const MatchedUsersContent = styled.div`
    text-align: center;
    max-width: 80rem;
    width: 100%;
    padding: 2rem;
`;

const MatchedUsersList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 3rem 0;
    max-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 0.8rem;
    }

    &::-webkit-scrollbar-track {
        background: #252527;
        border-radius: 0.4rem;
    }

    &::-webkit-scrollbar-thumb {
        background: #4272ec;
        border-radius: 0.4rem;
    }
`;

const MatchedUserCard = styled.div`
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    padding: 1.6rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            transform: translateY(-0.2rem);
            box-shadow: 0 4px 12px rgba(66, 114, 236, 0.2);
        }
    }
`;

const UserClickArea = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const UserImage = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;
    border: 0.2rem solid #4272ec;
`;

const UserInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-align: left;
`;

const UserName = styled.div`
    font-size: 1.6rem;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const UserGameId = styled.div`
    font-size: 1.3rem;
    color: #939393;
`;

const UserTier = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
    color: #4272ec;
`;

const ChatButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.8rem;
    width: 3.6rem;
    height: 3.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    transition: all 0.2s ease;
    white-space: nowrap;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;

const ChatButtonText = styled.span`
    display: none;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    margin-top: 3rem;
`;
