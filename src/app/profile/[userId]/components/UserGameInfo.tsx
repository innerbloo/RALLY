'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import { GameUser } from '@/data/mockGameUsers';

interface UserGameInfoProps {
    user: GameUser;
}

export default function UserGameInfo({ user }: UserGameInfoProps) {
    const getRankImagePath = (game: string, tier: string): string => {
        const tierMap: { [key: string]: string } = {
            아이언: 'iron',
            브론즈: 'bronze',
            실버: 'silver',
            골드: 'gold',
            플래티넘: 'platinum',
            에메랄드: 'emerald',
            다이아몬드: 'diamond',
            마스터: 'master',
            그랜드마스터: 'grandmaster',
            챌린저: 'challenger',
        };

        const tierKey = tierMap[tier] || 'bronze';

        if (game === '리그오브레전드') {
            return `/lol/rank-lol-${tierKey}.webp`;
        } else if (game === '오버워치2') {
            return `/overwatch/rank-ow-${tierKey}.png`;
        } else if (game === '전략적 팀 전투') {
            return `/tft/rank-tft-${tierKey}.webp`;
        }

        return `/lol/rank-lol-bronze.webp`;
    };

    return (
        <InfoContainer>
            <SectionTitle>게임 정보</SectionTitle>

            <GameCard>
                <GameHeader>
                    <GameName>{user.game}</GameName>
                    <RankInfo>
                        <RankImage
                            src={getRankImagePath(user.game, user.tier)}
                            width={48}
                            height={48}
                            alt={`${user.tier} ${user.rank}`}
                        />
                        <RankText>
                            {/*<TierName>{user.tier}</TierName>*/}
                            <RankName>{user.rank}</RankName>
                        </RankText>
                    </RankInfo>
                </GameHeader>

                <StatsRow>
                    <StatItem>
                        <StatLabel>승률</StatLabel>
                        <StatValue
                            $color={
                                user.winRate >= 60
                                    ? '#22c55e'
                                    : user.winRate >= 50
                                      ? '#f59e0b'
                                      : '#ef4444'
                            }
                        >
                            {user.winRate}%
                        </StatValue>
                    </StatItem>
                    <StatItem>
                        <StatLabel>KDA</StatLabel>
                        <StatValue
                            $color={
                                user.kda >= 3
                                    ? '#22c55e'
                                    : user.kda >= 2
                                      ? '#f59e0b'
                                      : '#ef4444'
                            }
                        >
                            {user.kda.toFixed(2)}
                        </StatValue>
                    </StatItem>
                </StatsRow>

                {user.recentChampions && user.recentChampions.length > 0 && (
                    <ChampionSection>
                        <SubTitle>최근 플레이한 챔피언</SubTitle>
                        <ChampionList>
                            {user.recentChampions.map((champion, index) => (
                                <ChampionImage
                                    key={index}
                                    src={champion}
                                    width={40}
                                    height={40}
                                    alt="챔피언"
                                />
                            ))}
                        </ChampionList>
                    </ChampionSection>
                )}

                {'position' in user && user.position && (
                    <PositionSection>
                        <SubTitle>주 포지션</SubTitle>
                        <PositionBadge>
                            {user.position}
                            <PositionText>
                                {'positionId' in user &&
                                    user.positionId === 'top' &&
                                    '탑'}
                                {'positionId' in user &&
                                    user.positionId === 'jungle' &&
                                    '정글'}
                                {'positionId' in user &&
                                    user.positionId === 'mid' &&
                                    '미드'}
                                {'positionId' in user &&
                                    user.positionId === 'adc' &&
                                    '원딜'}
                                {'positionId' in user &&
                                    user.positionId === 'support' &&
                                    '서포터'}
                                {'roleId' in user &&
                                    user.roleId === 'tank' &&
                                    '탱커'}
                                {'roleId' in user &&
                                    user.roleId === 'damage' &&
                                    '딜러'}
                                {'roleId' in user &&
                                    user.roleId === 'support' &&
                                    '지원'}
                            </PositionText>
                        </PositionBadge>
                    </PositionSection>
                )}
            </GameCard>
        </InfoContainer>
    );
}

const InfoContainer = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 1.2rem 0.5rem;
`;

const GameCard = styled.div`
    background-color: #252527;
    border-radius: 1.6rem;
    padding: 2rem;
    border: 0.1rem solid #3f3f41;
`;

const GameHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const GameName = styled.h4`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const RankInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    //gap: 1rem;
`;

const RankImage = styled(Image)`
    object-fit: contain;
`;

const RankText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const TierName = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
`;

const RankName = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const StatsRow = styled.div`
    display: flex;
    gap: 3rem;
    margin-bottom: 2rem;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const StatLabel = styled.span`
    font-size: 1.3rem;
    color: #939393;
`;

const StatValue = styled.span<{ $color: string }>`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
`;

const ChampionSection = styled.div`
    margin-bottom: 2rem;
`;

const SubTitle = styled.h5`
    font-size: 1.4rem;
    font-weight: 500;
    color: #939393;
    margin: 0 0 1rem;
`;

const ChampionList = styled.div`
    display: flex;
    gap: 1rem;
`;

const ChampionImage = styled(Image)`
    border-radius: 0.8rem;
    border: 0.1rem solid #3f3f41;
`;

const PositionSection = styled.div``;

const PositionBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1.6rem;
    background-color: #1a1a1a;
    border-radius: 1rem;

    svg {
        width: 2rem;
        height: 2rem;
    }
`;

const PositionText = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: #ffffff;
`;
