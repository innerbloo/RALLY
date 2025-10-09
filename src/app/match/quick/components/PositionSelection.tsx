'use client';

import { useState } from 'react';

import { PositionOption } from '../types/quickMatch';
import PositionLolAdc2 from '/public/lol/position-lol-adc2.svg';
import PositionLolAll from '/public/lol/position-lol-all.svg';
import PositionLolJungle2 from '/public/lol/position-lol-jungle2.svg';
import PositionLolMid2 from '/public/lol/position-lol-mid2.svg';
import PositionLolSupport2 from '/public/lol/position-lol-support2.svg';
import PositionLolTop2 from '/public/lol/position-lol-top2.svg';

import styled from '@emotion/styled';

interface PositionSelectionProps {
    selectedGame: string | null;
    desiredPositions: string[];
    onDesiredPositionsChange: (positions: string[]) => void;
}

const lolPositions: PositionOption[] = [
    {
        id: 'top',
        name: '탑',
        icon: 'PositionLolTop2',
    },
    {
        id: 'jungle',
        name: '정글',
        icon: 'PositionLolJungle2',
    },
    {
        id: 'mid',
        name: '미드',
        icon: 'PositionLolMid2',
    },
    {
        id: 'adc',
        name: '원딜',
        icon: 'PositionLolAdc2',
    },
    {
        id: 'support',
        name: '서폿',
        icon: 'PositionLolSupport2',
    },
    {
        id: 'all',
        name: '포지션 전체',
        icon: 'PositionLolAll',
    },
];

export default function PositionSelection({
    selectedGame,
    desiredPositions,
    onDesiredPositionsChange,
}: PositionSelectionProps) {
    const [hasScrolledToFooter, setHasScrolledToFooter] = useState(false);
    if (selectedGame !== 'lol') {
        return (
            <NotSupportedMessage>
                <MessageTitle>준비 중인 기능입니다</MessageTitle>
                <MessageDescription>
                    현재는 리그오브레전드만 지원됩니다.
                    <br />
                    다른 게임은 곧 지원될 예정입니다.
                </MessageDescription>
            </NotSupportedMessage>
        );
    }

    const getPositionIcon = (iconName: string) => {
        const iconProps = { width: 20, height: 20 };
        const allIconProps = { width: 20, height: 24 };

        switch (iconName) {
            case 'PositionLolAll':
                return <PositionLolAll {...allIconProps} />;
            case 'PositionLolTop2':
                return <PositionLolTop2 {...iconProps} />;
            case 'PositionLolJungle2':
                return <PositionLolJungle2 {...iconProps} />;
            case 'PositionLolMid2':
                return <PositionLolMid2 {...iconProps} />;
            case 'PositionLolAdc2':
                return <PositionLolAdc2 {...iconProps} />;
            case 'PositionLolSupport2':
                return <PositionLolSupport2 {...iconProps} />;
            default:
                return null;
        }
    };

    const handleDesiredPositionToggle = (positionId: string) => {
        if (positionId === 'all') {
            if (desiredPositions.includes('all')) {
                onDesiredPositionsChange([]);
            } else {
                onDesiredPositionsChange(['all']);

                if (!hasScrolledToFooter) {
                    setTimeout(() => {
                        const footer = document.querySelector('footer');
                        if (footer) {
                            const headerHeight = 140;
                            const footerTop = footer.getBoundingClientRect().top + window.scrollY;
                            const targetScroll = Math.max(0, footerTop - window.innerHeight + footer.offsetHeight + headerHeight);

                            window.scrollTo({
                                top: targetScroll,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                    setHasScrolledToFooter(true);
                }
            }
        } else {
            if (desiredPositions.includes(positionId)) {
                onDesiredPositionsChange(
                    desiredPositions.filter((p) => p !== positionId),
                );
            } else {
                const newPositions = desiredPositions.filter(
                    (p) => p !== 'all',
                );
                onDesiredPositionsChange([...newPositions, positionId]);

                if (!hasScrolledToFooter) {
                    setTimeout(() => {
                        const footer = document.querySelector('footer');
                        if (footer) {
                            const headerHeight = 140;
                            const footerTop = footer.getBoundingClientRect().top + window.scrollY;
                            const targetScroll = Math.max(0, footerTop - window.innerHeight + footer.offsetHeight + headerHeight);

                            window.scrollTo({
                                top: targetScroll,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                    setHasScrolledToFooter(true);
                }
            }
        }
    };

    return (
        <PositionSelectionContainer>
            <Section>
                <SectionTitle>원하는 듀오 포지션</SectionTitle>
                <SectionDescription>
                    함께 플레이하고 싶은 포지션을 선택해주세요
                </SectionDescription>

                <PositionGrid>
                    {lolPositions.map((position) => (
                        <PositionCard
                            key={position.id}
                            $active={desiredPositions.includes(position.id)}
                            onClick={() =>
                                handleDesiredPositionToggle(position.id)
                            }
                            $multiSelect
                        >
                            <PositionIcon
                                $active={desiredPositions.includes(
                                    position.id,
                                )}
                            >
                                {getPositionIcon(position.icon)}
                            </PositionIcon>
                            <PositionName>{position.name}</PositionName>
                            {desiredPositions.includes(position.id) && (
                                <SelectedIndicator>✓</SelectedIndicator>
                            )}
                        </PositionCard>
                    ))}
                </PositionGrid>
            </Section>
        </PositionSelectionContainer>
    );
}

const PositionSelectionContainer = styled.div`
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

const PositionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1.5rem;
    max-width: 50rem;
    margin: 0 auto;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
`;

const PositionCard = styled.button<{
    $active: boolean;
    $multiSelect?: boolean;
}>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1.5rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : '#252527'};
    border: 0.2rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 1.6rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            background-color: rgba(66, 114, 236, 0.1);
            transform: translateY(-2px);
        }
    }
`;

const PositionIcon = styled.div<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    position: relative;

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.2);
        transform-origin: center center;

        ${({ $active }) =>
            $active
                ? `
                    path:first-of-type {
                        fill: #4272ec !important;
                    }
                    path:not(:first-of-type) {
                        fill: #7B7A8E !important;
                    }
                `
                : `
                    path {
                        fill: #7B7A8E !important;
                    }
                `}
    }
`;

const PositionName = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: #f5f5f5;
    text-align: center;
`;

const SelectedIndicator = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    background-color: #4272ec;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #f5f5f5;
    font-weight: bold;
`;

const SelectionSummary = styled.div`
    padding: 2rem;
    background-color: rgba(66, 114, 236, 0.1);
    border: 0.1rem solid #4272ec;
    border-radius: 1.6rem;
`;

const SummaryContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
`;

const SummaryLabel = styled.span`
    font-size: 1.4rem;
    color: #939393;
    font-weight: 500;
`;

const SummaryValue = styled.span`
    font-size: 1.4rem;
    color: #f5f5f5;
    font-weight: 600;
`;

const NotSupportedMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
    min-height: 30rem;
`;

const MessageTitle = styled.h2`
    font-size: 2.4rem;
    font-weight: 700;
    color: #f5f5f5;
    margin: 0 0 2rem;
`;

const MessageDescription = styled.p`
    font-size: 1.6rem;
    color: #939393;
    line-height: 1.6;
    margin: 0;
`;
