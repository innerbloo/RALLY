'use client';

import Image from 'next/image';
import { useState } from 'react';

import styled from '@emotion/styled';

import { TierOption } from '../types/quickMatch';

interface TierSelectionProps {
    myTier: { main: string; sub?: string } | null;
    desiredTierRange: { min: string; max: string } | null;
    onMyTierSelect: (tier: { main: string; sub?: string }) => void;
    onDesiredTierRangeChange: (range: { min: string; max: string }) => void;
}

const tierOptions: TierOption[] = [
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

export default function TierSelection({
    myTier,
    desiredTierRange,
    onMyTierSelect,
    onDesiredTierRangeChange,
}: TierSelectionProps) {
    const [selectedMainTier, setSelectedMainTier] = useState<string | null>(myTier?.main || null);
    const [rangeMinTier, setRangeMinTier] = useState<string | null>(desiredTierRange?.min || null);
    const [rangeMaxTier, setRangeMaxTier] = useState<string | null>(desiredTierRange?.max || null);

    const handleMainTierSelect = (tierId: string) => {
        setSelectedMainTier(tierId);
        const tier = tierOptions.find(t => t.id === tierId);
        if (tier) {
            if (tier.subTiers.length === 0) {
                // 마스터 이상은 세부 티어 없음
                onMyTierSelect({ main: tierId });
            } else {
                // 세부 티어가 있는 경우 기본 선택값 없음
                onMyTierSelect({ main: tierId });
            }
        }
    };

    const handleSubTierSelect = (subTier: string) => {
        if (selectedMainTier) {
            onMyTierSelect({ main: selectedMainTier, sub: subTier });
        }
    };

    const handleRangeChange = (type: 'min' | 'max', tierId: string) => {
        if (type === 'min') {
            setRangeMinTier(tierId);
            const newRange = { min: tierId, max: rangeMaxTier || tierId };
            onDesiredTierRangeChange(newRange);
        } else {
            setRangeMaxTier(tierId);
            const newRange = { min: rangeMinTier || tierId, max: tierId };
            onDesiredTierRangeChange(newRange);
        }
    };

    const getTierIndex = (tierId: string) => {
        return tierOptions.findIndex(t => t.id === tierId);
    };

    const getSelectedTier = () => {
        return tierOptions.find(t => t.id === selectedMainTier);
    };

    return (
        <TierSelectionContainer>
            <Section>
                <SectionTitle>내 티어</SectionTitle>
                <SectionDescription>현재 본인의 티어를 선택해주세요</SectionDescription>
                
                <TierGrid>
                    {tierOptions.map((tier) => (
                        <TierCard
                            key={tier.id}
                            $active={selectedMainTier === tier.id}
                            onClick={() => handleMainTierSelect(tier.id)}
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
                            {selectedMainTier === tier.id && (
                                <SelectedIndicator>✓</SelectedIndicator>
                            )}
                        </TierCard>
                    ))}
                </TierGrid>

            </Section>

            {selectedMainTier && getSelectedTier()?.subTiers.length > 0 && (
                <Section>
                    <SectionTitle>세부 티어</SectionTitle>
                    <SectionDescription>세부 티어를 선택해주세요</SectionDescription>
                    <SubTierGrid>
                        {getSelectedTier()?.subTiers.map((subTier) => (
                            <SubTierButton
                                key={subTier}
                                $active={myTier?.sub === subTier}
                                onClick={() => handleSubTierSelect(subTier)}
                            >
                                {subTier}
                            </SubTierButton>
                        ))}
                    </SubTierGrid>
                </Section>
            )}

            {myTier && (getSelectedTier()?.subTiers.length === 0 || myTier.sub) && (
                <Section>
                    <SectionTitle>원하는 듀오 티어 범위</SectionTitle>
                    <SectionDescription>함께 플레이하고 싶은 티어 범위를 설정해주세요</SectionDescription>
                
                <RangeSection>
                    <RangeSelector>
                        <RangeLabel>최소 티어</RangeLabel>
                        <TierDropdown>
                            {tierOptions.map((tier) => (
                                <TierOption
                                    key={`min-${tier.id}`}
                                    $active={rangeMinTier === tier.id}
                                    onClick={() => handleRangeChange('min', tier.id)}
                                    disabled={rangeMaxTier && getTierIndex(tier.id) > getTierIndex(rangeMaxTier)}
                                >
                                    <Image
                                        src={tier.icon}
                                        width={24}
                                        height={24}
                                        alt={tier.name}
                                    />
                                    {tier.name}
                                    {rangeMinTier === tier.id && <span>✓</span>}
                                </TierOption>
                            ))}
                        </TierDropdown>
                    </RangeSelector>
                    <RangeSelector>
                        <RangeLabel>최대 티어</RangeLabel>
                        <TierDropdown>
                            {tierOptions.map((tier) => (
                                <TierOption
                                    key={`max-${tier.id}`}
                                    $active={rangeMaxTier === tier.id}
                                    onClick={() => handleRangeChange('max', tier.id)}
                                    disabled={rangeMinTier && getTierIndex(tier.id) < getTierIndex(rangeMinTier)}
                                >
                                    <Image
                                        src={tier.icon}
                                        width={24}
                                        height={24}
                                        alt={tier.name}
                                    />
                                    {tier.name}
                                    {rangeMaxTier === tier.id && <span>✓</span>}
                                </TierOption>
                            ))}
                        </TierDropdown>
                    </RangeSelector>
                </RangeSection>
                </Section>
            )}

            {myTier && desiredTierRange && (
                <SelectionSummary>
                    <SummaryContent>
                        <SummaryItem>
                            <SummaryLabel>내 티어:</SummaryLabel>
                            <SummaryValue>
                                {tierOptions.find(t => t.id === myTier.main)?.name}
                                {myTier.sub && ` ${myTier.sub}`}
                            </SummaryValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryLabel>듀오 티어:</SummaryLabel>
                            <SummaryValue>
                                {tierOptions.find(t => t.id === desiredTierRange.min)?.name} ~ {' '}
                                {tierOptions.find(t => t.id === desiredTierRange.max)?.name}
                            </SummaryValue>
                        </SummaryItem>
                    </SummaryContent>
                </SelectionSummary>
            )}
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
    gap: 2rem;
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
    margin: 0;
    line-height: 1.4;
`;

const TierGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 1.5rem;
    margin: 0 auto;
    max-width: 80rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }
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
    cursor: pointer;
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
    cursor: pointer;
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
    align-items: center;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
`;

const RangeSelector = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`;

const RangeLabel = styled.label`
    font-size: 1.4rem;
    font-weight: 600;
    color: #cccccc;
`;

const TierDropdown = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1rem;
    padding: 1rem;
    max-height: 30rem;
    overflow-y: auto;
    min-width: 20rem;

    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar { /* WebKit */
        display: none;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        min-width: 15rem;
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
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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