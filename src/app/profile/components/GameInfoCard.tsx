'use client';

import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

interface GameInfoCardProps {
    id: string;
    gameImage: string;
    gameName: string;
    gameId: string;
    rank: string;
    rankImage: string;
    positions: string[];
    gameStyles?: string[];
    communicationStyles?: string[];
    onDelete: (id: string) => void;
}

export default function GameInfoCard({
    id,
    gameImage,
    gameName,
    gameId,
    rank,
    rankImage,
    positions,
    gameStyles,
    communicationStyles,
    onDelete,
}: GameInfoCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        if (confirm(`${gameName} 게임 정보를 삭제하시겠습니까?`)) {
            onDelete(id);
            toast.success('게임 정보가 삭제되었습니다.');
        }
    };

    const hasStyles =
        (gameStyles && gameStyles.length > 0) ||
        (communicationStyles && communicationStyles.length > 0);

    return (
        <CardContainer
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ActionButtons $show={isHovered}>
                <ActionButton
                    onClick={handleDelete}
                    $color="#ef4444"
                >
                    <Trash2 size={16} />
                </ActionButton>
            </ActionButtons>

            <GameHeader>
                <GameIcon
                    src={gameImage}
                    width={40}
                    height={40}
                    alt={gameName}
                />
                <GameName>{gameName}</GameName>
            </GameHeader>

            <GameInfo>
                <InfoRow>
                    <InfoLabel>게임 아이디</InfoLabel>
                    <InfoValue>{gameId}</InfoValue>
                </InfoRow>

                <InfoRow>
                    <InfoLabel>랭크</InfoLabel>
                    <RankWrapper>
                        <RankImage
                            src={rankImage}
                            width={20}
                            height={20}
                            alt={rank}
                        />
                        <InfoValue>{rank}</InfoValue>
                    </RankWrapper>
                </InfoRow>

                <InfoRow>
                    <InfoLabel>포지션</InfoLabel>
                    <PositionList>
                        {positions.map((position, index) => (
                            <PositionBadge key={index}>{position}</PositionBadge>
                        ))}
                    </PositionList>
                </InfoRow>

                {hasStyles && (
                    <StyleContainer>
                        {gameStyles &&
                            gameStyles.map((style, index) => (
                                <StyleTag key={index} $type="game">
                                    {style}
                                </StyleTag>
                            ))}
                        {communicationStyles &&
                            communicationStyles.map((style, index) => (
                                <StyleTag key={index} $type="communication">
                                    {style}
                                </StyleTag>
                            ))}
                    </StyleContainer>
                )}
            </GameInfo>
        </CardContainer>
    );
}

const CardContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    min-width: 28rem;
    padding: 1.6rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
        }
    }
`;

const ActionButtons = styled.div<{ $show: boolean }>`
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    opacity: ${({ $show }) => ($show ? 1 : 0)};
    pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
    transition: opacity 0.2s ease;
    z-index: 1;

    /* 모바일에서는 항상 표시 */
    @media (max-width: 768px) {
        opacity: 1;
        pointer-events: auto;
    }
`;

const ActionButton = styled.button<{ $color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: ${({ $color }) => $color};
    border: none;
    border-radius: 50%;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px ${({ $color }) => $color}66;
        }
    }

    &:active {
        transform: scale(0.95);
    }
`;

const GameHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1.2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const GameIcon = styled(Image)`
    border-radius: 0.8rem;
`;

const GameName = styled.h4`
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const GameInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InfoLabel = styled.span`
    font-size: 1.3rem;
    color: #939393;
    font-weight: 400;
`;

const InfoValue = styled.span`
    font-size: 1.4rem;
    color: #ffffff;
    font-weight: 500;
`;

const RankWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const RankImage = styled(Image)``;

const PositionList = styled.div`
    display: flex;
    gap: 0.4rem;
`;

const PositionBadge = styled.span`
    padding: 0.4rem 0.8rem;
    background-color: #4272ec;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 0.6rem;
`;

const StyleContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
`;

const StyleTag = styled.span<{ $type: 'game' | 'communication' }>`
    padding: 0.2rem 0.6rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.8rem;
    background-color: ${({ $type }) =>
        $type === 'game' ? '#4272ec' : '#22c55e'};
    color: #ffffff;
    white-space: nowrap;
`;
