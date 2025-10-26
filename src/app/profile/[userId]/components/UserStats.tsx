'use client';

import { Users, Star, TrendingUp, Trophy } from 'lucide-react';
import styled from '@emotion/styled';

interface UserStatsProps {
    matchCount: number;
    rating: number;
    winRate: number;
    kda: number;
    game: string;
}

export default function UserStats({ matchCount, rating, winRate, kda, game }: UserStatsProps) {
    const isTFT = game === '전략적 팀 전투';

    return (
        <StatsContainer $isTFT={isTFT}>
            <StatCard>
                <IconWrapper $color="#4272ec">
                    <Users size={20} />
                </IconWrapper>
                <StatInfo>
                    <StatValue>{matchCount}</StatValue>
                    <StatLabel>매칭 횟수</StatLabel>
                </StatInfo>
            </StatCard>

            <StatCard>
                <IconWrapper $color="#FFD700">
                    <Star size={20} />
                </IconWrapper>
                <StatInfo>
                    <StatValue>{rating.toFixed(1)}</StatValue>
                    <StatLabel>평균 평점</StatLabel>
                </StatInfo>
            </StatCard>

            <StatCard>
                <IconWrapper $color="#22c55e">
                    <TrendingUp size={20} />
                </IconWrapper>
                <StatInfo>
                    <StatValue>{winRate}%</StatValue>
                    <StatLabel>승률</StatLabel>
                </StatInfo>
            </StatCard>

            {!isTFT && (
                <StatCard>
                    <IconWrapper $color="#ef4444">
                        <Trophy size={20} />
                    </IconWrapper>
                    <StatInfo>
                        <StatValue>{kda.toFixed(2)}</StatValue>
                        <StatLabel>KDA</StatLabel>
                    </StatInfo>
                </StatCard>
            )}
        </StatsContainer>
    );
}

const StatsContainer = styled.div<{ $isTFT: boolean }>`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
`;

const StatCard = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.6rem;
    background-color: #252527;
    border-radius: 1.2rem;
    border: 0.1rem solid #3f3f41;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec40;
            transform: translateY(-0.2rem);
            box-shadow: 0 4px 12px rgba(66, 114, 236, 0.1);
        }
    }
`;

const IconWrapper = styled.div<{ $color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background-color: ${({ $color }) => $color}20;
    border-radius: 50%;
    color: ${({ $color }) => $color};
    flex-shrink: 0;
`;

const StatInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const StatValue = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
`;

const StatLabel = styled.div`
    font-size: 1.2rem;
    color: #939393;
    white-space: nowrap;
`;