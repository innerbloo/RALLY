'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface DuoRecommendCardProps {
    profileImage: string;
    username: string;
    position: ReactNode;
    userCode: string;
    description: string;
    rankImage: string;
    rankText: string;
    tags: string[];
    gameImage: string;
    gameAlt: string;
}

export default function DuoRecommendCard({
    profileImage,
    username,
    position,
    userCode,
    description,
    rankImage,
    rankText,
    tags,
    gameImage,
    gameAlt,
}: DuoRecommendCardProps) {
    return (
        <CardContainer>
            <DuoTopSection>
                <div>
                    <Image
                        src={profileImage}
                        width={40}
                        height={40}
                        alt={`${username} 프로필`}
                    />
                    <div>
                        <h3>
                            {username}
                            {position}
                        </h3>
                        <span>{userCode}</span>
                        <DescriptionText>{description}</DescriptionText>
                    </div>
                </div>
                <div>
                    <Image
                        src={rankImage}
                        width={25}
                        height={25}
                        alt={rankText}
                    />
                    {rankText}
                </div>
            </DuoTopSection>
            <DuoBottomSection>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
                <Image src={gameImage} width={30} height={30} alt={gameAlt} />
            </DuoBottomSection>
        </CardContainer>
    );
}

const CardContainer = styled.li`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    background-color: #252527;
`;

const DuoTopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    > div:first-of-type {
        display: flex;

        > img {
            border-radius: 50%;
            margin: 0 1rem 0 0;
        }

        > div {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
        }
    }

    > div:last-of-type {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    h3 {
        font-size: 1.6rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    span {
        font-size: 1.3rem;
        color: #939393;
    }

    p {
        font-size: 1.3rem;
        color: #939393;
        margin: 0;
    }
`;

const DescriptionText = styled.p`
    font-size: 1.3rem;
    color: #939393;
    line-height: 1.4;
    margin: 0;
    max-width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

const DuoBottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
        display: flex;
        gap: 0.5rem;

        li {
            min-width: 2.8rem;
            padding: 0.2rem 0.7rem;
            text-align: center;
            font-size: 1.2rem;
            font-weight: 500;
            color: #424242;
            background-color: #f5f5f5;
            border-radius: 1.6rem;
        }
    }
`;
