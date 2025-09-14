'use client';

import { Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

import PositionLolTop2 from '/public/lol/position-lol-top2.svg';
import PositionOverwatchDPS2 from '/public/overwatch/position-overwatch-dps2.svg';

import styled from '@emotion/styled';

import StyleFilter from '@/app/match/components/StyleFilter';

interface MatchUser {
    id: number;
    profileImage: string;
    username: string;
    gameId: string;
    position?: ReactNode;
    tier: string;
    rank: string;
    winRate: number;
    kda: number;
    recentChampions: string[];
    gameStyles: string[];
    communicationStyles: string[];
    status: 'online' | 'offline' | 'in-game' | 'matching';
    description: string;
    registeredAt: string;
    game: string;
}

const mockUsers: MatchUser[] = [
    {
        id: 1,
        profileImage: '/lol/profile-lol-1.png',
        username: '멋졌으면 핑찍어',
        gameId: '#96327',
        position: <PositionLolTop2 width={20} height={20} />,
        tier: '에메랄드',
        rank: 'E4',
        winRate: 68,
        kda: 1.85,
        recentChampions: ['아트록스', '가렌', '다리우스'],
        gameStyles: ['공격적인', '팀 중심형', '빠른 템포 선호'],
        communicationStyles: ['마이크 필수', '편하게 대화하는', '욕 안 하는'],
        status: 'online',
        description: '디코하면서 같이 으쌰으쌰 하실분찾아요~',
        registeredAt: '2025-09-13 14:30:00',
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
        recentChampions: ['티모', '케넨', '티모'],
        gameStyles: ['전략적인', '창의적인 플레이', '신중한 플레이'],
        communicationStyles: ['채팅 위주', '차분한', '감정 조절 가능'],
        status: 'matching',
        description: '함께 할 듀오 파트너를 찾고있어요.',
        registeredAt: '2025-09-13 13:45:00',
        game: '전략적 팀 전투',
    },
    {
        id: 3,
        profileImage: '/overwatch/profile-overwatch-1.png',
        username: '닮은 살걀',
        gameId: '#32948',
        position: <PositionOverwatchDPS2 width={18} height={20} />,
        tier: '다이아몬드',
        rank: 'D2',
        winRate: 65,
        kda: 2.45,
        recentChampions: ['트레이서', '겐지', '리퍼'],
        gameStyles: ['팀 중심형', '빠른 템포 선호', '리더형'],
        communicationStyles: ['마이크 필수', '직설적인', '필요한 말만 하는'],
        status: 'in-game',
        description: '즐빡겜 듀오 구해요!',
        registeredAt: '2025-09-13 12:20:00',
        game: '오버워치2',
    },
];

export default function MatchPage() {
    const [selectedGame, setSelectedGame] = useState<string>('전체');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const router = useRouter();

    const handleQuickMatch = () => {
        router.push('/match/quick');
    };

    const filteredUsers = mockUsers.filter((user) => {
        const gameFilter =
            selectedGame === '전체' || user.game === selectedGame;
        const searchFilter =
            searchTerm === '' ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                            '발로란트',
                            '오버워치2',
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
                    <div>소환사 이름</div>
                    <div>티어</div>
                    <div>승률</div>
                    <div>KDA</div>
                    <div>상태</div>
                    <div>등록일시</div>
                    <div>액션</div>
                </ListHeader>
                <UserList>
                    {filteredUsers.map((user) => (
                        <UserRow key={user.id}>
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
                            <TierCell>
                                <TierRank>{user.rank}</TierRank>
                                <TierName>{user.tier}</TierName>
                            </TierCell>
                            <WinRateCell>
                                <WinRateValue $rate={user.winRate}>
                                    {user.winRate}%
                                </WinRateValue>
                            </WinRateCell>
                            <KDACell>
                                <KDAValue $kda={user.kda}>{user.kda}</KDAValue>
                            </KDACell>
                            <StatusCell>
                                <StatusBadge $status={user.status}>
                                    {user.status === 'online' && '온라인'}
                                    {user.status === 'offline' && '오프라인'}
                                    {user.status === 'in-game' && '게임중'}
                                    {user.status === 'matching' && '매칭중'}
                                </StatusBadge>
                            </StatusCell>
                            <TimeCell>
                                <TimeText>
                                    {new Date(
                                        user.registeredAt,
                                    ).toLocaleDateString('ko-KR', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </TimeText>
                            </TimeCell>
                            <ActionCell>
                                <ActionButtons>
                                    <MatchButton>듀오</MatchButton>
                                    <ChatButton>채팅</ChatButton>
                                </ActionButtons>
                            </ActionCell>
                        </UserRow>
                    ))}
                </UserList>
            </UserListSection>

            <QuickMatchButton onClick={handleQuickMatch}>
                <Zap size={24} />
                <span>빠른 매칭</span>
            </QuickMatchButton>
        </MatchContainer>
    );
}

const MatchContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: 8rem;
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
    flex-wrap: wrap;
`;

const GameFilterButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: 0.1rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 2rem;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    cursor: pointer;
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
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1.2fr 1fr;
    gap: 1rem;
    padding: 1.5rem 2rem;
    background-color: #252527;
    border-bottom: 0.1rem solid #3f3f41;
    font-size: 1.3rem;
    font-weight: 600;
    color: #939393;

    @media (max-width: 768px) {
        display: none;
    }
`;

const UserList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const UserRow = styled.li`
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1.2fr 1fr;
    gap: 1rem;
    align-items: center;
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: stretch;
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
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;

    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

const TierRank = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    color: #ffffff;
`;

const TierName = styled.div`
    font-size: 1.1rem;
    color: #939393;
`;

const WinRateCell = styled.div`
    text-align: center;

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 768px) {
        &::before {
            content: '승률: ';
            color: #939393;
        }
    }
`;

const WinRateValue = styled.div<{ $rate: number }>`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ $rate }) =>
        $rate >= 60 ? '#22c55e' : $rate >= 50 ? '#f59e0b' : '#ef4444'};
`;

const KDACell = styled.div`
    text-align: center;

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 768px) {
        &::before {
            content: 'KDA: ';
            color: #939393;
        }
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
    justify-content: center;

    @media (max-width: 768px) {
        justify-content: flex-start;
    }
`;

const StatusBadge = styled.span<{ $status: string }>`
    padding: 0.4rem 0.8rem;
    font-size: 1.1rem;
    font-weight: 500;
    border-radius: 1rem;
    background-color: ${({ $status }) => {
        switch ($status) {
            case 'online':
                return '#22c55e';
            case 'in-game':
                return '#f59e0b';
            case 'matching':
                return '#8b5cf6';
            default:
                return '#6b7280';
        }
    }};
    color: #ffffff;
`;

const TimeCell = styled.div`
    text-align: center;

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 768px) {
        &::before {
            content: '등록: ';
            color: #939393;
        }
    }
`;

const TimeText = styled.div`
    font-size: 1.2rem;
    color: #939393;
`;

const ActionCell = styled.div`
    display: flex;
    justify-content: center;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.6rem;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
    }
`;

const MatchButton = styled.button`
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }

    @media (max-width: 768px) {
        flex: 1;
        padding: 1rem;
        font-size: 1.4rem;
    }
`;

const ChatButton = styled.button`
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
    background-color: transparent;
    color: #4272ec;
    border: 0.1rem solid #4272ec;
    border-radius: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #4272ec;
            color: #ffffff;
        }
    }

    @media (max-width: 768px) {
        flex: 1;
        padding: 1rem;
        font-size: 1.4rem;
    }
`;

const QuickMatchButton = styled.button`
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 2rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 3rem;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(66, 114, 236, 0.4);
    z-index: 999;
    transition: all 0.3s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(66, 114, 236, 0.5);
        }
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        right: 1.5rem;
        bottom: calc(8rem + env(safe-area-inset-bottom));
        padding: 1rem 1.6rem;
        font-size: 1.3rem;
    }

    svg {
        flex-shrink: 0;
    }
`;
