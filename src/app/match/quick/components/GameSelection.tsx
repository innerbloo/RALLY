'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';

import { GameOption } from '../types/quickMatch';

import styled from '@emotion/styled';

interface GameSelectionProps {
    selectedGame: string | null;
    onGameSelect: (game: 'lol' | 'tft' | 'overwatch') => void;
}

const gameOptions: GameOption[] = [
    {
        id: 'lol',
        name: '리그오브레전드',
        icon: '/game1.png',
        available: true,
    },
    {
        id: 'tft',
        name: '전략적 팀 전투',
        icon: '/game2.png',
        available: true,
    },
    {
        id: 'overwatch',
        name: '오버워치2',
        icon: '/game4.png',
        available: true,
    },
    {
        id: 'valorant',
        name: '발로란트',
        icon: '/game3.png',
        available: false,
    },
    {
        id: 'pubg',
        name: '배틀그라운드',
        icon: '/game5.png',
        available: false,
    },
    {
        id: 'lostark',
        name: '로스트아크',
        icon: '/game7.png',
        available: false,
    },
    {
        id: 'apex',
        name: 'APEX 레전드',
        icon: '/game8.png',
        available: false,
    },
    {
        id: 'fortnite',
        name: '포트나이트',
        icon: '/game6.png',
        available: false,
    },
];

export default function GameSelection({
    selectedGame,
    onGameSelect,
}: GameSelectionProps) {
    const toastId = 'game-unavailable';
    return (
        <GameSelectionContainer>
            <Section>
                <SectionTitle>게임 선택</SectionTitle>
                <SectionDescription>
                    듀오 매칭을 원하는 게임을 선택해주세요
                </SectionDescription>

                <GameGrid>
                    {gameOptions.map((game) => (
                        <GameCard
                            key={game.id}
                            $active={selectedGame === game.id}
                            $available={game.available}
                            onClick={() => {
                                if (game.available) {
                                    onGameSelect(
                                        game.id as 'lol' | 'tft' | 'overwatch',
                                    );

                                    // 자동 스크롤 비활성화 (Fixed 버튼 사용으로 불필요)
                                    // setTimeout(() => {
                                    //     const footer =
                                    //         document.querySelector('footer');
                                    //     if (footer) {
                                    //         const headerHeight = 140;
                                    //         const footerTop =
                                    //             footer.getBoundingClientRect()
                                    //                 .top + window.scrollY;
                                    //         const targetScroll = Math.max(
                                    //             0,
                                    //             footerTop -
                                    //                 window.innerHeight +
                                    //                 footer.offsetHeight +
                                    //                 headerHeight,
                                    //         );

                                    //         window.scrollTo({
                                    //             top: targetScroll,
                                    //             behavior: 'smooth',
                                    //         });
                                    //     }
                                    // }, 100);
                                } else {
                                    toast('아직 서비스 준비중인 게임입니다!', {
                                        id: toastId,
                                    });
                                }
                            }}
                        >
                            <GameIcon>
                                <Image
                                    src={game.icon}
                                    width={60}
                                    height={60}
                                    alt={game.name}
                                />
                                {!game.available && <UnavailableOverlay />}
                            </GameIcon>
                            <GameName $available={game.available}>
                                {game.name}
                            </GameName>
                            {/*{!game.available && (*/}
                            {/*    <UnavailableLabel>준비중</UnavailableLabel>*/}
                            {/*)}*/}
                            {selectedGame === game.id && (
                                <SelectedIndicator>✓</SelectedIndicator>
                            )}
                        </GameCard>
                    ))}
                </GameGrid>
            </Section>
        </GameSelectionContainer>
    );
}

const GameSelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0rem;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #f5f5f5;
    margin: 0;
    text-align: center;
`;

const SectionDescription = styled.p`
    font-size: 1.4rem;
    color: #939393;
    text-align: center;
    margin: 0 0 2rem;
    line-height: 1.4;
`;

const GameGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 60rem;
    margin: auto;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
`;

const GameCard = styled.button<{ $active: boolean; $available: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    padding: 2rem 1.5rem;
    background-color: ${({ $active, $available }) => {
        if (!$available) return '#252527';
        if ($active) return 'rgba(66, 114, 236, 0.2)';
        return '#252527';
    }};
    border: 0.2rem solid
        ${({ $active, $available }) => {
            if (!$available) return '#3f3f41';
            if ($active) return '#4272ec';
            return '#3f3f41';
        }};
    border-radius: 1.6rem;
    cursor: ${({ $available }) => ($available ? 'pointer' : 'not-allowed')};
    transition: all 0.2s ease;
    opacity: ${({ $available }) => ($available ? 1 : 0.6)};

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${({ $available }) =>
                $available &&
                `
                border-color: #4272ec;
                background-color: rgba(66, 114, 236, 0.1);
                transform: translateY(-2px);
            `}
        }
    }
`;

const GameIcon = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: 8rem;
    padding: 1rem;

    img {
        object-fit: contain;
    }
`;

const UnavailableOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GameName = styled.h3<{ $available: boolean }>`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${({ $available }) => ($available ? '#ffffff' : '#939393')};
    text-align: center;
    margin: 0;
    line-height: 1.3;
`;

const UnavailableLabel = styled.span`
    font-size: 1.2rem;
    color: #939393;
    background-color: #3f3f41;
    padding: 0.4rem 1rem;
    border-radius: 1rem;
    font-weight: 500;
`;

const SelectedIndicator = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.4rem;
    height: 2.4rem;
    background-color: #4272ec;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: #ffffff;
    font-weight: bold;
`;
