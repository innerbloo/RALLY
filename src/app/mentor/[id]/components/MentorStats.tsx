'use client';

import { Award, Star, Users, Trophy } from 'lucide-react';

import styled from '@emotion/styled';

interface MentorStatsProps {
    totalSessions: number;
    studentCount: number;
    rating: number;
    tier: string;
}

export default function MentorStats({
    totalSessions,
    studentCount,
    rating,
    tier,
}: MentorStatsProps) {
    return (
        <Container>
            <SectionTitle>멘토 통계</SectionTitle>
            <StatsGrid>
                <StatCard>
                    <IconWrapper $color="#4272ec">
                        <Trophy size={24} />
                    </IconWrapper>
                    <StatInfo>
                        <StatLabel>총 멘토링 횟수</StatLabel>
                        <StatValue>{totalSessions.toLocaleString()}회</StatValue>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <IconWrapper $color="#9C27B0">
                        <Users size={24} />
                    </IconWrapper>
                    <StatInfo>
                        <StatLabel>누적 수강생</StatLabel>
                        <StatValue>{studentCount.toLocaleString()}명</StatValue>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <IconWrapper $color="#FFD700">
                        <Star size={24} />
                    </IconWrapper>
                    <StatInfo>
                        <StatLabel>평균 평점</StatLabel>
                        <StatValue>{rating.toFixed(1)}점</StatValue>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <IconWrapper $color="#4CAF50">
                        <Award size={24} />
                    </IconWrapper>
                    <StatInfo>
                        <StatLabel>최고 티어</StatLabel>
                        <StatValue>{tier}</StatValue>
                    </StatInfo>
                </StatCard>
            </StatsGrid>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const StatCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1.5rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-0.2rem);
            border-color: #4272ec;
        }
    }
`;

const IconWrapper = styled.div<{ $color: string }>`
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $color }) => $color}20;
    border-radius: 50%;
    color: ${({ $color }) => $color};
`;

const StatInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
`;

const StatLabel = styled.span`
    font-size: 1.2rem;
    color: #939393;
    text-align: center;
`;

const StatValue = styled.span`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
`;
