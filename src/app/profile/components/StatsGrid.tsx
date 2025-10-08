'use client';

import { Heart, MessageCircle, Star, Users } from 'lucide-react';

import styled from '@emotion/styled';

interface StatsGridProps {
    matchCount: number;
    rating: number;
    postCount: number;
    likeCount: number;
}

export default function StatsGrid({
    matchCount,
    rating,
    postCount,
    likeCount,
}: StatsGridProps) {
    return (
        <GridContainer>
            <StatCard>
                <IconWrapper $color="#4272ec">
                    <Users size={20} />
                </IconWrapper>
                <StatValue>{matchCount}</StatValue>
                <StatLabel>매칭 횟수</StatLabel>
            </StatCard>

            <StatCard>
                <IconWrapper $color="#FFD700">
                    <Star size={20} />
                </IconWrapper>
                <StatValue>{rating.toFixed(1)}</StatValue>
                <StatLabel>평점</StatLabel>
            </StatCard>

            <StatCard>
                <IconWrapper $color="#9C27B0">
                    <MessageCircle size={20} />
                </IconWrapper>
                <StatValue>{postCount}</StatValue>
                <StatLabel>작성한 게시글</StatLabel>
            </StatCard>

            <StatCard>
                <IconWrapper $color="#ef4444">
                    <Heart size={20} />
                </IconWrapper>
                <StatValue>{likeCount}</StatValue>
                <StatLabel>받은 좋아요</StatLabel>
            </StatCard>
        </GridContainer>
    );
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    margin-bottom: 2rem;
`;

const StatCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 2rem 1.5rem;
    background-color: #252527;
    border-radius: 1.6rem;
    border: 0.1rem solid #3f3f41;
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
`;

const StatValue = styled.div`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
`;

const StatLabel = styled.div`
    font-size: 1.3rem;
    color: #939393;
    font-weight: 400;
`;
