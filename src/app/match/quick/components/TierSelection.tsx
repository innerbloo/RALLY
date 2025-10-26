'use client';

import Image from 'next/image';
import { useState } from 'react';

import styled from '@emotion/styled';

import type { TierOption } from '../types/quickMatch';

interface TierSelectionProps {
    selectedGame: string | null;
    desiredTier: string | null;
    onDesiredTierChange: (tierId: string) => void;
}

const lolTierOptions: TierOption[] = [
    {
        id: 'unranked',
        name: '언랭크',
        icon: '/lol/rank-lol-unranked.webp',
        subTiers: [],
    },
    {
        id: 'iron',
        name: '아이언',
        icon: '/lol/rank-lol-iron.webp',
        subTiers: ['I1', 'I2', 'I3', 'I4'],
    },
    {
        id: 'bronze',
        name: '브론즈',
        icon: '/lol/rank-lol-bronze.webp',
        subTiers: ['B1', 'B2', 'B3', 'B4'],
    },
    {
        id: 'silver',
        name: '실버',
        icon: '/lol/rank-lol-silver.webp',
        subTiers: ['S1', 'S2', 'S3', 'S4'],
    },
    {
        id: 'gold',
        name: '골드',
        icon: '/lol/rank-lol-gold.webp',
        subTiers: ['G1', 'G2', 'G3', 'G4'],
    },
    {
        id: 'platinum',
        name: '플래티넘',
        icon: '/lol/rank-lol-platinum.webp',
        subTiers: ['P1', 'P2', 'P3', 'P4'],
    },
    {
        id: 'emerald',
        name: '에메랄드',
        icon: '/lol/rank-lol-emerald.webp',
        subTiers: ['E1', 'E2', 'E3', 'E4'],
    },
    {
        id: 'diamond',
        name: '다이아몬드',
        icon: '/lol/rank-lol-diamond.webp',
        subTiers: ['D1', 'D2', 'D3', 'D4'],
    },
    {
        id: 'master',
        name: '마스터',
        icon: '/lol/rank-lol-master.webp',
        subTiers: [],
    },
    {
        id: 'grandmaster',
        name: '그랜드마스터',
        icon: '/lol/rank-lol-grandmaster.webp',
        subTiers: [],
    },
    {
        id: 'challenger',
        name: '챌린저',
        icon: '/lol/rank-lol-challenger.webp',
        subTiers: [],
    },
];

const overwatchTierOptions: TierOption[] = [
    {
        id: 'bronze',
        name: '브론즈',
        icon: '/overwatch/rank-overwatch-bronze.webp',
        subTiers: [],
    },
    {
        id: 'silver',
        name: '실버',
        icon: '/overwatch/rank-overwatch-silver.webp',
        subTiers: [],
    },
    {
        id: 'gold',
        name: '골드',
        icon: '/overwatch/rank-overwatch-gold.webp',
        subTiers: [],
    },
    {
        id: 'platinum',
        name: '플래티넘',
        icon: '/overwatch/rank-overwatch-platinum.webp',
        subTiers: [],
    },
    {
        id: 'diamond',
        name: '다이아몬드',
        icon: '/overwatch/rank-overwatch-diamond.webp',
        subTiers: [],
    },
    {
        id: 'master',
        name: '마스터',
        icon: '/overwatch/rank-overwatch-master.webp',
        subTiers: [],
    },
    {
        id: 'grandmaster',
        name: '그랜드마스터',
        icon: '/overwatch/rank-overwatch-grandmaster.webp',
        subTiers: [],
    },
    {
        id: '500',
        name: '상위 500위',
        icon: '/overwatch/rank-overwatch-500.webp',
        subTiers: [],
    },
];

export default function TierSelection({
    selectedGame,
    desiredTier,
    onDesiredTierChange,
}: TierSelectionProps) {
    // 게임에 따라 티어 옵션 선택
    const isOverwatch = selectedGame === 'overwatch';
    const tierOptions = isOverwatch ? overwatchTierOptions : lolTierOptions;

    const handleTierSelect = (tierId: string) => {
        onDesiredTierChange(tierId);

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
    };

    return (
        <TierSelectionContainer>
            <Section>
                <SectionTitle>원하는 듀오 티어</SectionTitle>
                <SectionDescription>함께 플레이하고 싶은 티어를 선택해주세요</SectionDescription>

                <TierGrid>
                    {tierOptions.map((tier) => (
                        <TierCard
                            key={tier.id}
                            $active={desiredTier === tier.id}
                            onClick={() => handleTierSelect(tier.id)}
                        >
                            <TierIcon>
                                <Image
                                    src={tier.icon}
                                    width={40}
                                    height={40}
                                    alt={tier.name}
                                />
                            </TierIcon>
                            <TierName>{tier.name}</TierName>
                            {desiredTier === tier.id && (
                                <SelectedIndicator>✓</SelectedIndicator>
                            )}
                        </TierCard>
                    ))}
                </TierGrid>
            </Section>
        </TierSelectionContainer>
    );
}

const TierSelectionContainer = styled.div`
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

const TierGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
`;

const TierCard = styled.button<{ $active: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 1rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : '#252527'
    };
    border: 0.2rem solid ${({ $active }) =>
        $active ? '#4272ec' : '#3f3f41'
    };
    border-radius: 1.2rem;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            background-color: rgba(66, 114, 236, 0.1);
        }
    }
`;

const TierIcon = styled.div`
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TierName = styled.span`
    font-size: 1.3rem;
    font-weight: 600;
    color: #f5f5f5;
    text-align: center;
`;


const SubTierGrid = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
`;

const SubTierButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: ${({ $active }) =>
        $active ? '#4272ec' : 'transparent'
    };
    color: ${({ $active }) =>
        $active ? '#f5f5f5' : '#939393'
    };
    border: 0.1rem solid ${({ $active }) =>
        $active ? '#4272ec' : '#3f3f41'
    };
    border-radius: 2rem;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #4272ec;
            color: #f5f5f5;
        }
    }
`;

const RangeSection = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
`;

const RangeSelector = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    flex: 1;
    min-width: 0;
`;

const RangeLabel = styled.label`
    font-size: 1.4rem;
    font-weight: 600;
    color: #cccccc;
`;

const TierDropdown = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1rem;
    padding: 1rem;
    max-height: 30rem;
    overflow-y: auto;
    width: 100%;

    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar { /* WebKit */
        display: none;
    }
`;

const TierOption = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : 'transparent'
    };
    border: none;
    border-radius: 0.8rem;
    color: #f5f5f5;
    font-size: 1.2rem;
    transition: background-color 0.2s ease;

    &:disabled {
        opacity: 0.5;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
            background-color: rgba(66, 114, 236, 0.1);
        }
    }

    span {
        margin-left: auto;
        color: #4272ec;
    }
`;

const RangeDivider = styled.div`
    font-size: 2rem;
    color: #939393;
    font-weight: bold;
`;

const SelectedIndicator = styled.div`
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
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
    margin-top: 2rem;
`;

const SummaryContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SummaryItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
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