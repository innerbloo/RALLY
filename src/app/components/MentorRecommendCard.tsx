'use client';

import Image from 'next/image';

import Rate from '/public/mentor/rate.svg';

import styled from '@emotion/styled';

interface DuoRecommendCardProps {
    profileImage: string;
    username: string;
    rate: number;
    reviews: number;
    description: string;
    gameImage: string;
    gameAlt: string;
}

export default function MentorRecommendCard({
    profileImage,
    username,
    rate,
    reviews,
    description,
    gameImage,
    gameAlt,
}: DuoRecommendCardProps) {
    return (
        <CardContainer>
            <DuoTopSection>
                <Image
                    src={profileImage}
                    width={40}
                    height={40}
                    alt={`${username} 프로필`}
                />
                <h3>
                    {username}
                    <Image
                        src={gameImage}
                        width={20}
                        height={20}
                        alt={gameAlt}
                    />
                </h3>
                <div>
                    <Rate width={12} height={12} />
                    <p>{rate}</p>
                    <span>({reviews})</span>
                </div>
            </DuoTopSection>
            <DuoBottomSection>
                <p>{description}</p>
            </DuoBottomSection>
        </CardContainer>
    );
}

const CardContainer = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    background-color: #252527;
`;

const DuoTopSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin: 0 0 0.5rem;
    }

    h3 {
        font-size: 1.4rem;
        display: flex;
        gap: 0.3rem;
    }

    > div {
        margin: -0.6rem 0 0;
        display: flex;
        align-items: center;
        gap: 0.3rem;

        p {
            font-size: 1.2rem;
            font-weight: 500;
        }

        span {
            font-size: 1.2rem;
            font-weight: 300;
            color: #939393;
        }
    }
`;

const DuoBottomSection = styled.div`
    p {
        font-size: 1.2rem;
        color: #939393;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 보여줄 줄 수 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
