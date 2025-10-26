'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import styled from '@emotion/styled';

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

interface MatchCardProps {
    user: MatchUser;
    index?: number;
    isTop?: boolean;
    isDragging?: boolean;
    dragX?: number;
    dragY?: number;
    selectedGameStyles?: string[];
    selectedCommStyles?: string[];
    selectedTier?: string;
    assignedRank?: string;
    onMouseDown?: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
}

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
            overwatchTierMap[tier] || '/overwatch/rank-overwatch-bronze.webp'
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

// 포지션 이름 가져오기 함수
const getPositionName = (positionElement: React.ReactNode): string => {
    if (!positionElement || typeof positionElement !== 'object') return '';

    const elementType = (positionElement as { type?: { name?: string } }).type;
    if (!elementType || !elementType.name) return '';

    const positionMap: { [key: string]: string } = {
        PositionLolTop2: '탑',
        PositionLolJungle2: '정글',
        PositionLolMid2: '미드',
        PositionLolAdc2: '원딜',
        PositionLolSupport2: '서포터',
    };

    return positionMap[elementType.name] || '';
};

// 이미지 경로에서 챔피언 이름 추출 함수
const getChampionNameFromPath = (imagePath: string): string => {
    // '/lol/top-Aatrox.png' -> 'Aatrox' 또는 '/lol/support_Sona.png' -> 'Sona'
    const fileName = imagePath.split('/').pop() || '';
    const nameWithoutExtension = fileName.split('.')[0];

    // '-' 또는 '_'로 구분된 마지막 부분을 챔피언 이름으로 추출
    let championName = '';
    if (nameWithoutExtension.includes('-')) {
        championName = nameWithoutExtension.split('-').pop() || '';
    } else if (nameWithoutExtension.includes('_')) {
        championName = nameWithoutExtension.split('_').pop() || '';
    } else {
        championName = nameWithoutExtension;
    }

    // 영어 이름을 한국어로 변환
    const championNameMap: { [key: string]: string } = {
        Aatrox: '아트록스',
        Garen: '가렌',
        Gangplank: '갱플랭크',
        Sion: '사이온',
        Vayne: '베인',
        KhaZix: '카직스',
        Viego: '비에고',
        Nidalee: '니달리',
        Rammus: '람머스',
        'Master Yi': '마스터 이',
        Yasuo: '야스오',
        LeBlanc: '르블랑',
        Vex: '벡스',
        'Twisted Fate': '트위스티드 페이트',
        Lissandra: '리산드라',
        Jinx: '징크스',
        KaiSa: '카이사',
        Ezreal: '이즈리얼',
        Lucian: '루시안',
        Zeri: '제리',
        Sona: '소나',
        Janna: '잔나',
        Braum: '브라움',
        Blitzcrank: '블리츠크랭크',
        Nautilus: '노틸러스',
    };

    return championNameMap[championName] || championName;
};

export default function MatchCard({
    user,
    index = 0,
    isDragging = false,
    dragX = 0,
    dragY = 0,
    selectedGameStyles = [],
    selectedCommStyles = [],
    selectedTier = '',
    assignedRank,
    onMouseDown,
    onTouchStart,
}: MatchCardProps) {
    // 드래그 방향에 따른 오버레이 투명도 계산
    const getOverlayOpacity = () => {
        if (!isDragging) return 0;
        return Math.min(Math.abs(dragX) / 150, 0.8);
    };

    const getOverlayType = () => {
        if (dragX > 50) return 'like';
        if (dragX < -50) return 'reject';
        return null;
    };

    // 선택한 티어 ID를 한글 티어명과 랭크로 변환
    const getDisplayTierInfo = (tierId: string, preAssignedRank?: string) => {
        if (!tierId) return { tierName: user.tier, rank: user.rank };

        const tierMap: { [key: string]: { name: string; abbr: string } } = {
            iron: { name: '아이언', abbr: 'I' },
            bronze: { name: '브론즈', abbr: 'B' },
            silver: { name: '실버', abbr: 'S' },
            gold: { name: '골드', abbr: 'G' },
            platinum: { name: '플래티넘', abbr: 'P' },
            emerald: { name: '에메랄드', abbr: 'E' },
            diamond: { name: '다이아몬드', abbr: 'D' },
            master: { name: '마스터', abbr: 'M' },
            grandmaster: { name: '그랜드마스터', abbr: 'GM' },
            challenger: { name: '챌린저', abbr: 'C' },
        };

        // tierId에서 티어 부분 추출 (예: "emeraldE2" -> "emerald")
        const tierKey = tierId.match(/^[a-z]+/i)?.[0]?.toLowerCase() || '';
        const tierInfo = tierMap[tierKey];

        if (!tierInfo) return { tierName: user.tier, rank: user.rank };

        // 미리 할당된 랭크가 있으면 사용, 없으면 랜덤 생성 (폴백)
        const displayRank =
            preAssignedRank ||
            `${tierInfo.abbr}${Math.floor(Math.random() * 4) + 1}`;

        return { tierName: tierInfo.name, rank: displayRank };
    };

    const { tierName: displayTier, rank: displayRank } = useMemo(
        () => getDisplayTierInfo(selectedTier, assignedRank),
        [selectedTier, assignedRank, user.id],
    );

    console.log('MatchCard 티어 변환:', {
        selectedTier,
        originalTier: user.tier,
        originalRank: user.rank,
        displayTier,
        displayRank,
    });

    // 유저의 실제 스타일과 선택한 스타일을 병합 (중복 제거)
    const displayGameStyles = Array.from(
        new Set([...selectedGameStyles, ...user.gameStyles]),
    );
    const displayCommStyles = Array.from(
        new Set([...selectedCommStyles, ...user.communicationStyles]),
    );

    console.log('MatchCard render:', {
        index,
        isDragging,
        dragX,
        dragY,
        hasOnTouchStart: !!onTouchStart,
    });

    return (
        <CardContainer
            $index={index}
            $isDragging={isDragging}
            $dragX={dragX}
            $dragY={dragY}
            onMouseDown={(e) => {
                console.log('Card onMouseDown');
                onMouseDown?.(e);
            }}
            onTouchStart={(e) => {
                console.log('Card onTouchStart');
                onTouchStart?.(e);
            }}
            onClick={() => console.log('Card clicked - basic test')}
        >
            {/* 드래그 오버레이 */}
            {isDragging && getOverlayType() && (
                <DragOverlay
                    $type={getOverlayType()!}
                    $opacity={getOverlayOpacity()}
                >
                    <OverlayContent>
                        <OverlayIconCircle $type={getOverlayType()!}>
                            <OverlayIcon>
                                {getOverlayType() === 'like' ? '⚡' : '👋'}
                            </OverlayIcon>
                        </OverlayIconCircle>
                        <OverlayText $type={getOverlayType()!}>
                            {getOverlayType() === 'like' ? 'PICK' : 'SKIP'}
                        </OverlayText>
                        <OverlaySubText>
                            {getOverlayType() === 'like'
                                ? '함께 플레이!'
                                : '다음에'}
                        </OverlaySubText>
                    </OverlayContent>
                </DragOverlay>
            )}

            {/* 사용자 정보 */}
            <UserInfo>
                <UserHeaderSection>
                    <ProfileImage
                        src={user.profileImage}
                        alt={`${user.username} 프로필`}
                        width={60}
                        height={60}
                    />
                    <UserNameInfo>
                        <UserName>
                            {user.username}
                            {user.position && (
                                <PositionBadge>
                                    {user.position}
                                    <PositionText>
                                        {getPositionName(user.position)}
                                    </PositionText>
                                </PositionBadge>
                            )}
                        </UserName>
                        <GameId>{user.gameId}</GameId>
                    </UserNameInfo>
                    <TierBadge>
                        <TierImage
                            src={getTierImage(displayTier, user.game)}
                            alt={`${displayTier} 티어`}
                            width={24}
                            height={24}
                        />
                        <TierInfo>
                            <TierRank>{displayRank}</TierRank>
                        </TierInfo>
                    </TierBadge>
                </UserHeaderSection>

                <StatsSection $isSingleStat={user.game === '전략적 팀 전투'}>
                    <StatItem>
                        <StatLabel>승률</StatLabel>
                        <StatValue $type="winrate" $value={user.winRate}>
                            {user.winRate}%
                        </StatValue>
                    </StatItem>
                    {user.game !== '전략적 팀 전투' && (
                        <StatItem>
                            <StatLabel>KDA</StatLabel>
                            <StatValue $type="kda" $value={user.kda}>
                                {user.kda}
                            </StatValue>
                        </StatItem>
                    )}
                </StatsSection>

                <Description>{user.description}</Description>

                {/* 최근 선호 챔피언/시너지 */}
                <StyleSection>
                    <SectionTitle>
                        {user.game === '전략적 팀 전투'
                            ? '최근 선호 시너지'
                            : '최근 선호 챔피언'}
                    </SectionTitle>
                    <ChampionList>
                        {user.recentChampions
                            .slice(0, 3)
                            .map((champion, index) => (
                                <ChampionItem key={`champion-${index}`}>
                                    <ChampionImage
                                        src={champion}
                                        alt={getChampionNameFromPath(champion)}
                                        width={32}
                                        height={32}
                                        $isSynergy={
                                            user.game === '전략적 팀 전투'
                                        }
                                    />
                                    <ChampionName>
                                        {getChampionNameFromPath(champion)}
                                    </ChampionName>
                                </ChampionItem>
                            ))}
                    </ChampionList>
                </StyleSection>

                {/* 게임 스타일 */}
                <StyleSection>
                    <SectionTitle>게임 스타일</SectionTitle>
                    <StyleTags>
                        {displayGameStyles.slice(0, 3).map((style, index) => (
                            <StyleTag key={`game-${index}`} $type="game">
                                {style}
                            </StyleTag>
                        ))}
                    </StyleTags>
                </StyleSection>

                {/* 커뮤니케이션 스타일 */}
                <StyleSection>
                    <SectionTitle>커뮤니케이션 스타일</SectionTitle>
                    <StyleTags>
                        {displayCommStyles.slice(0, 3).map((style, index) => (
                            <StyleTag
                                key={`comm-${index}`}
                                $type="communication"
                            >
                                {style}
                            </StyleTag>
                        ))}
                    </StyleTags>
                </StyleSection>
            </UserInfo>
        </CardContainer>
    );
}

const CardContainer = styled.div<{
    $index: number;
    $isDragging: boolean;
    $dragX: number;
    $dragY: number;
}>`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    max-width: 32rem;
    max-height: 85vh;
    height: auto;
    background-color: #252527;
    border-radius: 1.6rem;
    border: 0.2rem solid #3f3f41;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
    user-select: none;
    display: flex;
    flex-direction: column;
    touch-action: none;

    /* 위치 및 변형 통합 계산 */
    transform: ${({ $index, $isDragging, $dragX, $dragY }) => {
        const baseTransform = 'translate(-50%, -50%)';

        if ($index === 0) {
            // 최상위 카드
            if ($isDragging) {
                const rotation = $dragX * 0.1;
                return `${baseTransform} translate(${$dragX}px, ${$dragY}px) rotate(${rotation}deg) scale(1.02)`;
            }
            return `${baseTransform} scale(1)`;
        } else if ($index === 1) {
            // 두 번째 카드
            return `${baseTransform} scale(0.95)`;
        } else if ($index === 2) {
            // 세 번째 카드
            return `${baseTransform} scale(0.9)`;
        } else {
            // 숨김
            return `${baseTransform} scale(0)`;
        }
    }};

    opacity: ${({ $index, $isDragging, $dragX }) => {
        if ($index === 0 && $isDragging) {
            return Math.max(0.7, 1 - Math.abs($dragX) / 300);
        }
        if ($index === 2) return 0.8;
        if ($index > 2) return 0;
        return 1;
    }};

    z-index: ${({ $index }) => {
        if ($index === 0) return 3;
        if ($index === 1) return 2;
        if ($index === 2) return 1;
        return 0;
    }};

    transition: ${({ $isDragging }) =>
        $isDragging ? 'none' : 'all 0.3s ease'};

    /* 화면 밖 카드 숨김 */
    display: ${({ $index }) => ($index > 2 ? 'none' : 'flex')};
`;

const DragOverlay = styled.div<{ $type: 'like' | 'reject'; $opacity: number }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $type }) =>
        $type === 'like'
            ? 'linear-gradient(135deg, rgba(66, 114, 236, 0.95) 0%, rgba(88, 86, 214, 0.98) 100%)'
            : 'linear-gradient(135deg, rgba(147, 147, 147, 0.92) 0%, rgba(99, 99, 99, 0.95) 100%)'};
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    opacity: ${({ $opacity }) => $opacity};
    transition: opacity 0.15s ease-out;
`;

const OverlayContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    animation: overlayPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

    @keyframes overlayPop {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const OverlayIconCircle = styled.div<{ $type: 'like' | 'reject' }>`
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: 0.4rem solid rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: ${({ $type }) =>
        $type === 'like'
            ? 'heartBeat 0.6s ease-in-out infinite'
            : 'wave 0.6s ease-in-out infinite'};

    @keyframes heartBeat {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @keyframes wave {
        0%,
        100% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(-15deg);
        }
        75% {
            transform: rotate(15deg);
        }
    }
`;

const OverlayIcon = styled.div`
    font-size: 5rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
`;

const OverlayText = styled.div<{ $type: 'like' | 'reject' }>`
    font-size: 3.2rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.3rem;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    font-family:
        -apple-system, BlinkMacSystemFont, 'Pretendard Variable', sans-serif;
`;

const OverlaySubText = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    border: 0.2rem solid #ffffff;
    object-fit: cover;
    flex-shrink: 0;
`;

const UserInfo = styled.div`
    padding: 1rem 1rem 1.5rem 1rem;
    flex: 1;
    overflow: visible;
    display: flex;
    flex-direction: column;
`;

const UserHeaderSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 1rem;
`;

const UserNameInfo = styled.div`
    flex: 1;
`;

const UserName = styled.h2`
    font-size: 1.6rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-wrap: wrap;
`;

const GameId = styled.p`
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
`;

const TierBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
    border-radius: 1.2rem;
    flex-shrink: 0;
`;

const TierImage = styled(Image)`
    object-fit: contain;
    flex-shrink: 0;
`;

const TierInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
`;

const TierRank = styled.span`
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
`;

const StatsSection = styled.div<{ $isSingleStat?: boolean }>`
    display: flex;
    justify-content: ${({ $isSingleStat }) =>
        $isSingleStat ? 'center' : 'space-around'};
    margin-bottom: 1rem;
    padding: 0.8rem;
    background-color: #1f1f21;
    border-radius: 1rem;
`;

const StatItem = styled.div`
    text-align: center;
`;

const StatLabel = styled.div`
    font-size: 1.3rem;
    color: #939393;
    margin-bottom: 0.5rem;
`;

const StatValue = styled.div<{ $type: string; $value: number }>`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ $type, $value }) => {
        if ($type === 'winrate') {
            return $value >= 60
                ? '#22c55e'
                : $value >= 50
                  ? '#f59e0b'
                  : '#ef4444';
        }
        if ($type === 'kda') {
            return $value >= 2.0
                ? '#22c55e'
                : $value >= 1.5
                  ? '#f59e0b'
                  : '#ef4444';
        }
        return '#ffffff';
    }};
`;

const Description = styled.p`
    font-size: 1.3rem;
    color: #cccccc;
    line-height: 1.4;
    text-align: center;
    margin: 0 0 1rem;
    padding: 1rem;
    word-break: keep-all;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
`;

const StyleSection = styled.div`
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0.8rem;
    }
`;

const SectionTitle = styled.h3`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 0.8rem;
`;

const StyleTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const StyleTag = styled.span<{ $type: 'game' | 'communication' }>`
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    border-radius: 0.8rem;
    background-color: ${({ $type }) =>
        $type === 'game' ? '#4272ec' : '#22c55e'};
    color: #ffffff;
`;

const ChampionList = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const ChampionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    flex: 1;
`;

const ChampionImage = styled(Image, {
    shouldForwardProp: (prop) => prop !== '$isSynergy',
})<{ $isSynergy?: boolean }>`
    border-radius: 50%;
    border: 0.1rem solid #4272ec;
    object-fit: cover;
    padding: ${({ $isSynergy }) => ($isSynergy ? '0.4rem' : '0')};
    background-color: ${({ $isSynergy }) =>
        $isSynergy ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
`;

const ChampionName = styled.span`
    font-size: 1.1rem;
    color: #cccccc;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
`;

const PositionBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 1rem;
    flex-shrink: 0;

    svg {
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
        color: #e5e7eb;
    }
`;

const PositionText = styled.span`
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 1;
`;
