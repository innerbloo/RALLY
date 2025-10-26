'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface OnlineUserCardProps {
    profileImage: string;
    username: string;
    position?: ReactNode;
    userCode: string;
    currentGame: string;
    status: 'online' | 'in-game' | 'matching';
    rankImage: string;
    rankText: string;
    tags: string[];
    gameImage: string;
    gameAlt: string;
}

export default function OnlineUserCard({
    profileImage,
    username,
    position,
    userCode,
    currentGame,
    status,
    rankImage,
    rankText,
    tags,
    gameImage,
    gameAlt,
}: OnlineUserCardProps) {
    const getStatusColor = () => {
        switch (status) {
            case 'online': return '#4CAF50';
            case 'in-game': return '#FF9800';
            case 'matching': return '#2196F3';
            default: return '#757575';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'online': return '온라인';
            case 'in-game': return '게임 중';
            case 'matching': return '매칭 중';
            default: return '오프라인';
        }
    };

    return (
        <CardContainer>
            <OnlineTopSection>
                <div>
                    <ProfileImageWrapper>
                        <Image
                            src={profileImage}
                            width={40}
                            height={40}
                            alt={`${username} 프로필`}
                        />
                        <OnlineIndicator $color={getStatusColor()} />
                    </ProfileImageWrapper>
                    <div>
                        <h3>
                            {username}
                            {position}
                        </h3>
                        <span>{userCode}</span>
                        <StatusText $color={getStatusColor()}>
                            {getStatusText()} • {currentGame}
                        </StatusText>
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
            </OnlineTopSection>
            <OnlineBottomSection>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
                <Image src={gameImage} width={30} height={30} alt={gameAlt} />
            </OnlineBottomSection>
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
    min-width: 280px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #2a2a2c;
        }
    }
`;

const OnlineTopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    > div:first-of-type {
        display: flex;

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
        margin: 0;
    }

    span {
        font-size: 1.3rem;
        color: #939393;
        margin: 0;
    }
`;

const ProfileImageWrapper = styled.div`
    position: relative;
    margin: 0 1rem 0 0;

    img {
        border-radius: 50%;
    }
`;

const OnlineIndicator = styled.div<{ $color: string }>`
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    background-color: ${({ $color }) => $color};
    border: 2px solid #252527;
    border-radius: 50%;
`;

const StatusText = styled.p<{ $color: string }>`
    font-size: 1.2rem;
    color: ${({ $color }) => $color};
    margin: 0;
    font-weight: 500;
`;

const OnlineBottomSection = styled.div`
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