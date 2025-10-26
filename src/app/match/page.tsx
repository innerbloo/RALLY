'use client';

import { Zap } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import MatchTutorial from '@/app/match/components/MatchTutorial';
import StyleFilter from '@/app/match/components/StyleFilter';
import { type BaseUser, getAllUsers } from '@/data/mockGameUsers';

interface MatchUser extends BaseUser {
    status: 'online' | 'offline' | 'in-game' | 'matching';
}

export default function MatchPage() {
    const [selectedGame, setSelectedGame] = useState<string>('전체');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const [mockUsers, setMockUsers] = useState<MatchUser[]>([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const router = useRouter();

    // 클라이언트에서만 유저 상태 설정 (Hydration 에러 방지)
    useEffect(() => {
        const statuses: Array<'online' | 'offline' | 'in-game' | 'matching'> = [
            'online',
            'offline',
            'in-game',
            'matching',
        ];
        const usersWithStatus = getAllUsers().map((user) => ({
            ...user,
            status: statuses[Math.floor(Math.random() * statuses.length)],
        }));
        setMockUsers(usersWithStatus);
    }, []);

    // 티어 이미지 매핑 함수
    const getTierImage = (tier: string, game: string): string => {
        // 오버워치인 경우
        if (game === '오버워치2') {
            const overwatchTierMap: { [key: string]: string } = {
                브론즈: '/overwatch/rank-overwatch-bronze.webp',
                실버: '/overwatch/rank-overwatch-silver.webp',
                골드: '/overwatch/rank-overwatch-gold.webp',
                플래티넘: '/overwatch/rank-overwatch-platinum.webp',
                다이아몬드: '/overwatch/rank-overwatch-diamond.webp',
                마스터: '/overwatch/rank-overwatch-master.webp',
                그랜드마스터: '/overwatch/rank-overwatch-grandmaster.webp',
                '상위 500위': '/overwatch/rank-overwatch-500.webp',
            };
            return (
                overwatchTierMap[tier] ||
                '/overwatch/rank-overwatch-bronze.webp'
            );
        }

        // 리그오브레전드, TFT인 경우
        const lolTierMap: { [key: string]: string } = {
            아이언: '/lol/rank-lol-iron.webp',
            브론즈: '/lol/rank-lol-bronze.webp',
            실버: '/lol/rank-lol-silver.webp',
            골드: '/lol/rank-lol-gold.webp',
            플래티넘: '/lol/rank-lol-platinum.webp',
            에메랄드: '/lol/rank-lol-emerald.webp',
            다이아몬드: '/lol/rank-lol-diamond.webp',
            마스터: '/lol/rank-lol-master.webp',
            그랜드마스터: '/lol/rank-lol-grandmaster.webp',
            챌린저: '/lol/rank-lol-challenger.webp',
        };
        return lolTierMap[tier] || '/lol/rank-lol-unranked.webp';
    };

    const handleQuickMatch = () => {
        // 튜토리얼 활성화 중이면 튜토리얼 닫기
        if (showTutorial) {
            handleCloseTutorial();
            return;
        }
        // 튜토리얼이 없으면 빠른 매칭 실행
        router.push('/match/quick');
    };

    // 튜토리얼 표시 - GNB를 통해 접근했을 때만
    useEffect(() => {
        const shouldShowTutorial =
            sessionStorage.getItem('showMatchTutorial') === 'true';
        if (shouldShowTutorial) {
            // 플래그 제거 (한 번만 표시)
            sessionStorage.removeItem('showMatchTutorial');
            // 페이지 로드 후 약간의 딜레이를 두고 표시
            setTimeout(() => setShowTutorial(true), 250);
        }
    }, []);

    // 튜토리얼 활성화 시 백그라운드 스크롤 비활성화
    useEffect(() => {
        if (showTutorial) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY;
            // body와 html 모두 스크롤 비활성화
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            // 모바일 대응
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // 스크롤 위치 복원
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        // 컴포넌트 언마운트 시 원래대로 복원
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [showTutorial]);

    const handleCloseTutorial = () => {
        setShowTutorial(false);
    };

    const filteredUsers = useMemo(() => {
        return mockUsers.filter((user) => {
            const gameFilter =
                selectedGame === '전체' || user.game === selectedGame;
            const searchFilter =
                searchTerm === '' ||
                user.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.gameId.toLowerCase().includes(searchTerm.toLowerCase());
            const styleFilter =
                selectedFilters.length === 0 ||
                selectedFilters.some(
                    (filter) =>
                        user.gameStyles.includes(filter) ||
                        user.communicationStyles.includes(filter),
                );

            return gameFilter && searchFilter && styleFilter;
        });
    }, [mockUsers, selectedGame, searchTerm, selectedFilters]);

    // 스크롤 바닥 감지 및 인피니트 스크롤
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // 바닥에서 50px 이내면 버튼 숨김
            const atBottom = scrollTop + windowHeight >= documentHeight - 50;
            setIsAtBottom(atBottom);

            // 인피니트 스크롤: 바닥에서 200px 이내이고, 로딩 중이 아니고, 더 불러올 유저가 있으면
            if (
                scrollTop + windowHeight >= documentHeight - 200 &&
                !isLoadingMore &&
                visibleCount < filteredUsers.length
            ) {
                setIsLoadingMore(true);
                // 300ms 딜레이 후 10명 더 로드
                setTimeout(() => {
                    setVisibleCount((prev) => prev + 10);
                    setIsLoadingMore(false);
                }, 300);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoadingMore, visibleCount, filteredUsers.length]);

    // 필터 변경 시 visibleCount 초기화
    useEffect(() => {
        setVisibleCount(10);
    }, [selectedGame, searchTerm, selectedFilters]);

    // 표시할 유저 목록 (인피니트 스크롤)
    const visibleUsers = useMemo(() => {
        return filteredUsers.slice(0, visibleCount);
    }, [filteredUsers, visibleCount]);

    return (
        <MatchContainer>
            <MatchHeader>
                <h1>매칭</h1>
                <SearchSection>
                    <SearchInput
                        type="text"
                        placeholder="닉네임이나 게임 ID를 검색해보세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchSection>
            </MatchHeader>

            <FilterSection>
                <GameFilterContainer>
                    <h3>게임</h3>
                    <GameFilterList>
                        {[
                            '전체',
                            '리그오브레전드',
                            '전략적 팀 전투',
                            '오버워치2',
                            '발로란트',
                            '배틀그라운드',
                        ].map((game) => (
                            <GameFilterButton
                                key={game}
                                $active={selectedGame === game}
                                onClick={() => setSelectedGame(game)}
                            >
                                {game}
                            </GameFilterButton>
                        ))}
                    </GameFilterList>
                </GameFilterContainer>

                <StyleFilter
                    selectedFilters={selectedFilters}
                    onFilterChange={setSelectedFilters}
                />
            </FilterSection>

            <UserListSection>
                <ListHeader>
                    <div>닉네임</div>
                    <div>상태</div>
                    <div>티어</div>
                    <div>승률</div>
                    <div>KDA</div>
                    <div>액션</div>
                </ListHeader>
                <UserList>
                    {visibleUsers.map((user) => (
                        <UserRow
                            key={user.id}
                            onClick={() => router.push(`/profile/${user.id}`)}
                        >
                            <UserNameCell>
                                <UserProfileImage
                                    src={user.profileImage}
                                    alt={`${user.username} 프로필`}
                                />
                                <UserNameContent>
                                    <UserNameWithPosition>
                                        {user.username}
                                        {user.position && (
                                            <PositionIcon>
                                                {user.position}
                                            </PositionIcon>
                                        )}
                                    </UserNameWithPosition>
                                    <UserGameId>{user.gameId}</UserGameId>
                                    <UserDescription>
                                        {user.description}
                                    </UserDescription>
                                    <UserTags>
                                        {user.gameStyles
                                            .slice(0, 2)
                                            .map((style, index) => (
                                                <TagBadge
                                                    key={index}
                                                    $type="game"
                                                >
                                                    {style}
                                                </TagBadge>
                                            ))}
                                        {user.communicationStyles
                                            .slice(0, 2)
                                            .map((style, index) => (
                                                <TagBadge
                                                    key={index}
                                                    $type="communication"
                                                >
                                                    {style}
                                                </TagBadge>
                                            ))}
                                    </UserTags>
                                </UserNameContent>
                            </UserNameCell>
                            <StatusCell>
                                <StatusBadge $status={user.status}>
                                    {user.status === 'online' && '온라인'}
                                    {user.status === 'offline' && '오프라인'}
                                    {user.status === 'in-game' && '게임중'}
                                    {user.status === 'matching' && '매칭중'}
                                </StatusBadge>
                            </StatusCell>
                            <TierCell>
                                <TierImage
                                    src={getTierImage(user.tier, user.game)}
                                    alt={user.tier}
                                    width={32}
                                    height={32}
                                />
                                <TierRank>{user.rank}</TierRank>
                            </TierCell>
                            <WinRateCell>
                                <WinRateValue $rate={user.winRate}>
                                    {user.winRate}%
                                </WinRateValue>
                            </WinRateCell>
                            <KDACell>
                                <KDAValue $kda={user.kda}>{user.kda}</KDAValue>
                            </KDACell>
                            <ActionCell onClick={(e) => e.stopPropagation()}>
                                <ActionButtons>
                                    <MatchButton>듀오</MatchButton>
                                    <ChatButton>채팅</ChatButton>
                                </ActionButtons>
                            </ActionCell>
                        </UserRow>
                    ))}
                </UserList>

                {isLoadingMore && (
                    <LoadingSpinner>
                        <Spinner />
                    </LoadingSpinner>
                )}
            </UserListSection>

            <QuickMatchButton
                onClick={handleQuickMatch}
                $isAtBottom={isAtBottom}
                $tutorialActive={showTutorial}
            >
                <Zap size={24} />
                <span>빠른 매칭</span>
            </QuickMatchButton>

            {showTutorial && <MatchTutorial onClose={handleCloseTutorial} />}
        </MatchContainer>
    );
}

const MatchContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(6.65rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh;
`;

const MatchHeader = styled.header`
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;

    h1 {
        font-size: 2.4rem;
        font-weight: 700;
        margin: 0 0 2rem;
        color: #ffffff;
    }
`;

const SearchSection = styled.div`
    margin-bottom: 1rem;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 1.2rem 1.6rem;
    font-size: 1.6rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    color: #ffffff;
    outline: none;

    &::placeholder {
        color: #939393;
    }

    &:focus {
        border-color: #4272ec;
    }
`;

const FilterSection = styled.section`
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const GameFilterContainer = styled.div`
    margin-bottom: 1.5rem;

    h3 {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0 0 1rem;
        color: #ffffff;
    }
`;

const GameFilterList = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    margin: 0 -2rem;
    padding: 0 2rem;

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
    }

    /* Prevent buttons from shrinking */
    > button {
        flex-shrink: 0;
    }
`;

const GameFilterButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    white-space: nowrap;
    border: 0.1rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 2rem;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #ffffff;
        }
    }
`;

const UserListSection = styled.section`
    flex: 1;
`;

const ListHeader = styled.div`
    display: none;
`;

const UserList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const UserRow = styled.li`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const UserNameCell = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
`;

const UserProfileImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
`;

const UserNameContent = styled.div`
    flex: 1;
    min-width: 0;
`;

const UserNameWithPosition = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.3rem;
`;

const PositionIcon = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;

    svg {
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
    }
`;

const UserGameId = styled.div`
    font-size: 1.2rem;
    color: #939393;
    margin-bottom: 0.5rem;
`;

const UserDescription = styled.div`
    font-size: 1.3rem;
    color: #cccccc;
    line-height: 1.3;
    margin-bottom: 0.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const UserTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
`;

const TagBadge = styled.span<{ $type: 'game' | 'communication' }>`
    padding: 0.2rem 0.6rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.8rem;
    background-color: ${({ $type }) =>
        $type === 'game' ? '#4272ec' : '#22c55e'};
    color: #ffffff;
`;

const TierCell = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.2rem;
`;

const TierImage = styled(Image)`
    object-fit: contain;
    flex-shrink: 0;
`;

const TierRank = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    color: #ffffff;
`;

const WinRateCell = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::before {
        content: '승률: ';
        color: #939393;
    }
`;

const WinRateValue = styled.div<{ $rate: number }>`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ $rate }) =>
        $rate >= 60 ? '#22c55e' : $rate >= 50 ? '#f59e0b' : '#ef4444'};
`;

const KDACell = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::before {
        content: 'KDA: ';
        color: #939393;
    }
`;

const KDAValue = styled.div<{ $kda: number }>`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ $kda }) =>
        $kda >= 2.0 ? '#22c55e' : $kda >= 1.5 ? '#f59e0b' : '#ef4444'};
`;

const StatusCell = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const StatusBadge = styled.span<{ $status: string }>`
    padding: 0.4rem 0.8rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 1rem;
    background-color: transparent;
    color: ${({ $status }) => {
        switch ($status) {
            case 'online':
                return '#22c55e';
            case 'in-game':
                return '#f59e0b';
            case 'matching':
                return '#4272ec';
            default:
                return '#6b7280';
        }
    }};
`;

const ActionCell = styled.div`
    display: flex;
    justify-content: center;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.6rem;
    width: 100%;
    justify-content: center;
`;

const MatchButton = styled.button`
    flex: 1;
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.5rem;
    transition: background-color 0.2s ease;
    word-break: keep-all;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;

const ChatButton = styled.button`
    flex: 1;
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: transparent;
    color: #4272ec;
    border: 0.1rem solid #4272ec;
    border-radius: 1.5rem;
    transition: all 0.2s ease;
    word-break: keep-all;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #4272ec;
            color: #ffffff;
        }
    }
`;

const QuickMatchButton = styled.button<{
    $isAtBottom: boolean;
    $tutorialActive: boolean;
}>`
    position: fixed;
    right: 1.5rem;
    bottom: calc(8rem + env(safe-area-inset-bottom));
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 1.6rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 3rem;
    font-size: 1.3rem;
    font-weight: 600;
    z-index: ${({ $tutorialActive }) => ($tutorialActive ? 10000 : 999)};
    transition: all 0.3s ease;
    transform: ${({ $isAtBottom, $tutorialActive }) => {
        if ($tutorialActive) return 'none';
        return $isAtBottom ? 'translateY(150%)' : 'none';
    }};

    ${({ $tutorialActive }) =>
        $tutorialActive
            ? `
        animation: pulseGlow 2s ease-in-out infinite;

        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 0 0 4px rgba(66, 114, 236, 0.3), 0 8px 30px rgba(66, 114, 236, 0.6);
            }
            50% {
                box-shadow: 0 0 0 8px rgba(66, 114, 236, 0.2), 0 12px 40px rgba(66, 114, 236, 0.8);
            }
        }
    `
            : `
        box-shadow: 0 4px 20px rgba(66, 114, 236, 0.4);
    `}

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: ${({ $isAtBottom, $tutorialActive }) => {
                if ($tutorialActive) return 'translateY(-2px)';
                return $isAtBottom ? 'translateY(150%)' : 'translateY(-2px)';
            }};
            box-shadow: ${({ $tutorialActive }) =>
                $tutorialActive
                    ? '0 0 0 4px rgba(66, 114, 236, 0.3), 0 12px 35px rgba(66, 114, 236, 0.7)'
                    : '0 8px 25px rgba(66, 114, 236, 0.5)'};
        }
    }

    &:active {
        transform: ${({ $isAtBottom, $tutorialActive }) => {
            if ($tutorialActive) return 'translateY(0)';
            return $isAtBottom ? 'translateY(150%)' : 'translateY(0)';
        }};
    }

    svg {
        flex-shrink: 0;
    }
`;

const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    gap: 1rem;
`;

const Spinner = styled.div`
    width: 3rem;
    height: 3rem;
    border: 0.3rem solid #3f3f41;
    border-top-color: #4272ec;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
