'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import DuoRecommendCard from './DuoRecommendCard';

import styled from '@emotion/styled';

interface DuoData {
    id: number;
    profileImage: string;
    username: string;
    position?: ReactNode;
    userCode: string;
    description: string;
    rankImage: string;
    rankText: string;
    tags: string[];
    gameImage: string;
    gameAlt: string;
}

interface DuoRecommendListProps {
    duos: DuoData[];
}

export default function DuoRecommendList({ duos }: DuoRecommendListProps) {
    const router = useRouter();

    const handleDuoClick = (userId: number) => {
        router.push(`/profile/${userId}`, { scroll: false });
    };

    return (
        <DuoWrapper>
            {duos.map((duo) => (
                <DuoRecommendCard
                    key={duo.id}
                    profileImage={duo.profileImage}
                    username={duo.username}
                    position={duo.position}
                    userCode={duo.userCode}
                    description={duo.description}
                    rankImage={duo.rankImage}
                    rankText={duo.rankText}
                    tags={duo.tags}
                    gameImage={duo.gameImage}
                    gameAlt={duo.gameAlt}
                    onClick={() => handleDuoClick(duo.id)}
                />
            ))}
        </DuoWrapper>
    );
}

const DuoWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
