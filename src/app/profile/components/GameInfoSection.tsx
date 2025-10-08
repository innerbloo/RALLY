'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import GameInfoCard from './GameInfoCard';

export interface UserGame {
    id: string;
    gameName: string;
    gameImage: string;
    gameId: string;
    rank: string;
    rankImage: string;
    positions: string[];
    gameStyles?: string[];
    communicationStyles?: string[];
}

interface GameInfoSectionProps {
    games: UserGame[];
}

export default function GameInfoSection({ games }: GameInfoSectionProps) {
    const router = useRouter();

    const handleAddGame = () => {
        router.push('/profile/game/add');
    };

    const handleDeleteGame = (id: string) => {
        const userGames = JSON.parse(localStorage.getItem('userGames') || '[]');
        const updatedGames = userGames.filter((game: UserGame) => game.id !== id);
        localStorage.setItem('userGames', JSON.stringify(updatedGames));

        // 페이지 새로고침
        window.location.reload();
    };

    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>게임 정보</SectionTitle>
                <AddButton onClick={handleAddGame}>
                    <Plus size={16} />
                    <span>게임 추가</span>
                </AddButton>
            </SectionHeader>

            {games.length > 0 ? (
                <GameList>
                    {games.map((game) => (
                        <GameInfoCard
                            key={game.id}
                            id={game.id}
                            gameImage={game.gameImage}
                            gameName={game.gameName}
                            gameId={game.gameId}
                            rank={game.rank}
                            rankImage={game.rankImage}
                            positions={game.positions}
                            gameStyles={game.gameStyles}
                            communicationStyles={game.communicationStyles}
                            onDelete={handleDeleteGame}
                        />
                    ))}
                </GameList>
            ) : (
                <EmptyState>
                    <EmptyIcon>🎮</EmptyIcon>
                    <EmptyText>등록된 게임 정보가 없습니다.</EmptyText>
                    <EmptySubText>
                        게임 추가 버튼을 눌러 게임 정보를 등록해보세요.
                    </EmptySubText>
                </EmptyState>
            )}
        </SectionContainer>
    );
}

const SectionContainer = styled.div`
    margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.2rem;
    padding: 0 0.5rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const AddButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    background-color: transparent;
    border: 0.1rem solid #4272ec;
    border-radius: 0.8rem;
    color: #4272ec;
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #4272ec;
            color: #ffffff;
        }
    }

    &:active {
        background-color: #3a5fd9;
        border-color: #3a5fd9;
    }
`;

const GameList = styled.div`
    display: flex;
    gap: 1.2rem;
    overflow-x: auto;
    padding-bottom: 1rem;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        height: 0.6rem;
    }

    &::-webkit-scrollbar-track {
        background: #1a1a1a;
        border-radius: 0.3rem;
    }

    &::-webkit-scrollbar-thumb {
        background: #3f3f41;
        border-radius: 0.3rem;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #4272ec;
    }
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
`;

const EmptyText = styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    color: #ffffff;
    margin: 0 0 0.5rem;
`;

const EmptySubText = styled.p`
    font-size: 1.3rem;
    color: #939393;
    margin: 0;
    text-align: center;
`;
