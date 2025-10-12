'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import styled from '@emotion/styled';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface RecommendContentCardProps {
    id: number;
    image: string;
    title: string;
    type: 'guide' | 'tip' | 'strategy';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    author: string;
    createAt: string;
    likes: number;
    views: number;
    game: string;
}

export default function RecommendContentCard({
    id,
    image,
    title,
    type,
    difficulty,
    author,
    createAt,
    likes,
    views,
    game,
}: RecommendContentCardProps) {
    const getTypeText = () => {
        switch (type) {
            case 'guide':
                return '가이드';
            case 'tip':
                return '팁';
            case 'strategy':
                return '전략';
            default:
                return '컨텐츠';
        }
    };

    const getDifficultyText = () => {
        switch (difficulty) {
            case 'beginner':
                return '초급';
            case 'intermediate':
                return '중급';
            case 'advanced':
                return '고급';
            default:
                return '일반';
        }
    };

    const getDifficultyColor = () => {
        switch (difficulty) {
            case 'beginner':
                return '#4CAF50';
            case 'intermediate':
                return '#FF9800';
            case 'advanced':
                return '#F44336';
            default:
                return '#757575';
        }
    };

    return (
        <Link href={`/content/${id}`}>
            <CardContainer>
                <ContentLeftSection>
                    <ContentHeader>
                        <TypeBadge>{getTypeText()}</TypeBadge>
                        <DifficultyBadge $color={getDifficultyColor()}>
                            {getDifficultyText()}
                        </DifficultyBadge>
                    </ContentHeader>
                    <ContentTitle>{title}</ContentTitle>
                    <ContentInfo>
                        {`${author} • ${dayjs(createAt).fromNow()}`}
                    </ContentInfo>
                    <ContentStats>
                        <StatItem>
                            <Heart size={16} />
                            {likes.toLocaleString()}
                        </StatItem>
                        <StatItem>
                            <Eye size={16} />
                            {views.toLocaleString()}
                        </StatItem>
                    </ContentStats>
                </ContentLeftSection>
                <ContentRightSection>
                    <Image src={image} width={80} height={50} alt={title} />
                </ContentRightSection>
            </CardContainer>
        </Link>
    );
}

const CardContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const ContentLeftSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`;

const ContentHeader = styled.div`
    display: flex;
    gap: 0.5rem;
    margin: 0 0 0.5rem;
`;

const TypeBadge = styled.span`
    display: inline-block;
    padding: 0.2rem 0.6rem;
    background-color: #4272ec;
    color: white;
    border-radius: 0.8rem;
    font-size: 1rem;
    font-weight: 500;
`;

const DifficultyBadge = styled.span<{ $color: string }>`
    display: inline-block;
    padding: 0.2rem 0.6rem;
    background-color: ${({ $color }) => $color};
    color: white;
    border-radius: 0.8rem;
    font-size: 1rem;
    font-weight: 500;
`;

const ContentTitle = styled.h2`
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0 0 0.2rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ContentInfo = styled.p`
    color: #939393;
    font-weight: 300;
    font-size: 1.3rem;
    margin: 0 0 0.5rem;
`;

const ContentStats = styled.div`
    display: flex;
    gap: 1rem;
`;

const StatItem = styled.span`
    font-size: 1.2rem;
    color: #939393;
    display: flex;
    align-items: center;
    gap: 0.2rem;
`;

const ContentRightSection = styled.div`
    img {
        border-radius: 0.8rem;
        object-fit: cover;
    }
`;
