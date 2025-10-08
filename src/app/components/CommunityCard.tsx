'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface CommunityCardProps {
    id: number;
    image: string;
    username: string;
    title: string;
    createAt: string;
    comment: number;
    game: string;
    category: string;
}

export default function CommunityCard({
    id,
    image,
    username,
    title,
    createAt,
    comment,
    game,
    category,
}: CommunityCardProps) {
    const router = useRouter();
    const [actualCommentCount, setActualCommentCount] = useState(comment);

    // localStorage에서 실제 댓글 수 계산
    useEffect(() => {
        const myComments = JSON.parse(localStorage.getItem('myComments') || '{}');
        const postComments = myComments[id] || [];

        // 목업 데이터의 기본 댓글 수 + 사용자가 추가한 댓글 수
        setActualCommentCount(comment + postComments.length);
    }, [id, comment]);

    const handleClick = () => {
        router.push(`/community/${id}`);
    };

    const getCategoryColor = () => {
        switch (category) {
            case '공략':
                return '#4272ec';
            case '자유':
                return '#9C27B0';
            case '질문':
                return '#FF9800';
            case '팁':
                return '#4CAF50';
            default:
                return '#4272ec';
        }
    };

    return (
        <CardContainer onClick={handleClick}>
            <CommunityLeftSection>
                <MetaInfo>
                    <CategoryBadge $color={getCategoryColor()}>
                        {category}
                    </CategoryBadge>
                    <GameTitle>{game}</GameTitle>
                </MetaInfo>
                <h2>
                    {title} <span>[{actualCommentCount}]</span>
                </h2>
                <p>{`${username} • ${dayjs(createAt).fromNow()}`}</p>
            </CommunityLeftSection>
            {image && (
                <CommunityRightSection>
                    <Image
                        src={image}
                        width={50}
                        height={50}
                        alt={username}
                    ></Image>
                </CommunityRightSection>
            )}
        </CardContainer>
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

const CommunityLeftSection = styled.div`
    h2 {
        font-size: 1.6rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: unset;
        margin: 0 0 0.2rem;

        span {
            font-weight: 300;
            font-size: 1.4rem;
            color: #4272ec;
        }
    }

    p {
        color: #939393;
        font-weight: 300;
        font-size: 1.3rem;
    }
`;

const MetaInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.6rem;
`;

const CategoryBadge = styled.span<{ $color: string }>`
    display: inline-block;
    padding: 0.3rem 0.8rem;
    font-size: 1.1rem;
    font-weight: 600;
    background-color: ${({ $color }) => $color};
    color: #ffffff;
    border-radius: 0.8rem;
`;

const GameTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: #939393;
`;

const CommunityRightSection = styled.div`
    img {
        border-radius: 1.2rem;
        vertical-align: top;
    }
`;
