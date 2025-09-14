'use client';

import styled from '@emotion/styled';

interface StyleSelectionProps {
    selectedStyles: {
        gameStyles: string[];
        communicationStyles: string[];
    };
    onStylesChange: (styles: {
        gameStyles: string[];
        communicationStyles: string[];
    }) => void;
}

const gameStyleOptions = {
    '전투 스타일': ['공격적인', '수비적인', '팀 중심형', '혼자 플레이 선호'],
    '게임 진행 스타일': ['빠른 템포 선호', '신중한 플레이', '전략적인', '창의적인 플레이'],
    '역할 기반': ['리더형', '서포터형', '팀플 선호', '솔로 플레이 선호'],
};

const communicationStyleOptions = {
    '말투 / 태도': ['예의 바른', '편하게 대화하는', '유머러스한', '차분한', '감정 기복 없는', '직설적인'],
    '소통 방식': ['마이크 필수', '마이크 가능하지만 조용한', '채팅 위주', '필요한 말만 하는'],
    '욕설 / 감정 표현': ['욕 안 하는', '가끔 욕하지만 선 넘지 않음', '감정 조절 가능', '다혈질', '쿨하고 감정 없음'],
};

export default function StyleSelection({ selectedStyles, onStylesChange }: StyleSelectionProps) {
    const toggleGameStyle = (style: string) => {
        const isSelected = selectedStyles.gameStyles.includes(style);
        const newGameStyles = isSelected
            ? selectedStyles.gameStyles.filter(s => s !== style)
            : [...selectedStyles.gameStyles, style];
        
        onStylesChange({
            ...selectedStyles,
            gameStyles: newGameStyles,
        });
    };

    const toggleCommunicationStyle = (style: string) => {
        const isSelected = selectedStyles.communicationStyles.includes(style);
        const newCommunicationStyles = isSelected
            ? selectedStyles.communicationStyles.filter(s => s !== style)
            : [...selectedStyles.communicationStyles, style];
        
        onStylesChange({
            ...selectedStyles,
            communicationStyles: newCommunicationStyles,
        });
    };

    const renderStyleSection = (
        title: string,
        options: Record<string, string[]>,
        selectedItems: string[],
        onToggle: (item: string) => void,
        type: 'game' | 'communication'
    ) => (
        <StyleSection>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>
                원하는 듀오의 {title.toLowerCase()}을 선택해주세요 (다중 선택 가능)
            </SectionDescription>
            
            {Object.entries(options).map(([category, items]) => (
                <CategorySection key={category}>
                    <CategoryTitle>{category}</CategoryTitle>
                    <TagGrid>
                        {items.map((item) => (
                            <StyleTag
                                key={item}
                                $active={selectedItems.includes(item)}
                                $type={type}
                                onClick={() => onToggle(item)}
                            >
                                {item}
                                {selectedItems.includes(item) && (
                                    <SelectedMark>✓</SelectedMark>
                                )}
                            </StyleTag>
                        ))}
                    </TagGrid>
                </CategorySection>
            ))}
        </StyleSection>
    );

    const getTotalSelectedCount = () => {
        return selectedStyles.gameStyles.length + selectedStyles.communicationStyles.length;
    };

    return (
        <StyleSelectionContainer>
            <Description>
                함께 플레이하고 싶은 듀오의 성향을 선택해주세요
            </Description>

            {renderStyleSection(
                '게임 성향',
                gameStyleOptions,
                selectedStyles.gameStyles,
                toggleGameStyle,
                'game'
            )}

            {renderStyleSection(
                '커뮤니케이션 스타일',
                communicationStyleOptions,
                selectedStyles.communicationStyles,
                toggleCommunicationStyle,
                'communication'
            )}

            {getTotalSelectedCount() > 0 && (
                <SelectionSummary>
                    <SummaryTitle>
                        선택된 성향 ({getTotalSelectedCount()}개)
                    </SummaryTitle>
                    
                    {selectedStyles.gameStyles.length > 0 && (
                        <SummarySection>
                            <SummaryLabel>게임 성향:</SummaryLabel>
                            <SummaryTags>
                                {selectedStyles.gameStyles.map((style) => (
                                    <SummaryTag key={style} $type="game">
                                        {style}
                                    </SummaryTag>
                                ))}
                            </SummaryTags>
                        </SummarySection>
                    )}

                    {selectedStyles.communicationStyles.length > 0 && (
                        <SummarySection>
                            <SummaryLabel>커뮤니케이션:</SummaryLabel>
                            <SummaryTags>
                                {selectedStyles.communicationStyles.map((style) => (
                                    <SummaryTag key={style} $type="communication">
                                        {style}
                                    </SummaryTag>
                                ))}
                            </SummaryTags>
                        </SummarySection>
                    )}
                </SelectionSummary>
            )}

            <TipSection>
                <TipTitle>💡 선택 가이드</TipTitle>
                <TipList>
                    <TipItem>더 많은 성향을 선택할수록 정확한 매칭이 가능해요</TipItem>
                    <TipItem>최소 3-5개 정도 선택하시는 것을 추천합니다</TipItem>
                    <TipItem>나중에 언제든지 설정을 변경할 수 있어요</TipItem>
                </TipList>
            </TipSection>
        </StyleSelectionContainer>
    );
}

const StyleSelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const Description = styled.p`
    font-size: 1.6rem;
    color: #cccccc;
    text-align: center;
    line-height: 1.5;
    margin: 0;
`;

const StyleSection = styled.div`
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

const CategorySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const CategoryTitle = styled.h3`
    font-size: 1.6rem;
    font-weight: 600;
    color: #cccccc;
    margin: 0;
`;

const TagGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const StyleTag = styled.button<{ $active: boolean; $type: 'game' | 'communication' }>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 1.6rem;
    font-size: 1.3rem;
    font-weight: 500;
    border: 0.1rem solid ${({ $active, $type }) => {
        if ($active) {
            return $type === 'game' ? '#4272ec' : '#22c55e';
        }
        return '#3f3f41';
    }};
    border-radius: 2rem;
    background-color: ${({ $active, $type }) => {
        if ($active) {
            return $type === 'game' 
                ? 'rgba(66, 114, 236, 0.2)' 
                : 'rgba(34, 197, 94, 0.2)';
        }
        return 'transparent';
    }};
    color: ${({ $active, $type }) => {
        if ($active) {
            return $type === 'game' ? '#4272ec' : '#22c55e';
        }
        return '#939393';
    }};
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: ${({ $type }) => $type === 'game' ? '#4272ec' : '#22c55e'};
            background-color: ${({ $type }) => 
                $type === 'game' 
                    ? 'rgba(66, 114, 236, 0.1)' 
                    : 'rgba(34, 197, 94, 0.1)'
            };
            color: ${({ $type }) => $type === 'game' ? '#4272ec' : '#22c55e'};
        }
    }
`;

const SelectedMark = styled.span`
    font-size: 1rem;
    font-weight: bold;
`;

const SelectionSummary = styled.div`
    padding: 2rem;
    background-color: rgba(66, 114, 236, 0.1);
    border: 0.1rem solid #4272ec;
    border-radius: 1.6rem;
    margin-top: 2rem;
`;

const SummaryTitle = styled.h3`
    font-size: 1.6rem;
    font-weight: 600;
    color: #f5f5f5;
    margin: 0 0 2rem;
    text-align: center;
`;

const SummarySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const SummaryLabel = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: #cccccc;
`;

const SummaryTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
`;

const SummaryTag = styled.span<{ $type: 'game' | 'communication' }>`
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 1.5rem;
    background-color: ${({ $type }) => 
        $type === 'game' ? '#4272ec' : '#22c55e'};
    color: #f5f5f5;
`;

const TipSection = styled.div`
    width: 100%;
    max-width: 50rem;
    margin: 0 auto;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.02);
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
`;

const TipTitle = styled.h4`
    font-size: 1.4rem;
    font-weight: 600;
    color: #cccccc;
    margin: 0 0 1.5rem;
    text-align: center;
`;

const TipList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const TipItem = styled.li`
    font-size: 1.3rem;
    color: #939393;
    line-height: 1.5;
    position: relative;
    padding-left: 1.5rem;

    &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #cccccc;
        font-weight: bold;
    }

    strong {
        color: #cccccc;
        font-weight: 600;
    }
`;