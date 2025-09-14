'use client';

import { useState } from 'react';

import styled from '@emotion/styled';

interface StyleFilterProps {
    selectedFilters: string[];
    onFilterChange: (filters: string[]) => void;
}

const gameStyleFilters = {
    '전투 스타일': ['공격적인', '수비적인', '팀 중심형', '혼자 플레이 선호'],
    '게임 진행 스타일': ['빠른 템포 선호', '신중한 플레이', '전략적인', '창의적인 플레이'],
    '역할 기반': ['리더형', '서포터형', '팀플 선호', '솔로 플레이 선호'],
};

const communicationStyleFilters = {
    '말투 / 태도': ['예의 바른', '편하게 대화하는', '유머러스한', '차분한', '감정 기복 없는', '직설적인'],
    '소통 방식': ['마이크 필수', '마이크 가능하지만 조용한', '채팅 위주', '필요한 말만 하는'],
    '욕설 / 감정 표현': ['욕 안 하는', '가끔 욕하지만 선 넘지 않음', '감정 조절 가능', '다혈질', '쿨하고 감정 없음'],
};

export default function StyleFilter({ selectedFilters, onFilterChange }: StyleFilterProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => 
            prev.includes(section) 
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const toggleFilter = (filter: string) => {
        const newFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter];
        
        onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        onFilterChange([]);
    };

    const renderFilterSection = (title: string, filters: Record<string, string[]>, type: 'game' | 'communication') => {
        return (
            <FilterSection key={title}>
                <SectionHeader onClick={() => toggleSection(title)}>
                    <SectionTitle>{title}</SectionTitle>
                    <ToggleIcon $expanded={expandedSections.includes(title)}>
                        ▼
                    </ToggleIcon>
                </SectionHeader>
                
                {expandedSections.includes(title) && (
                    <FilterContent>
                        {Object.entries(filters).map(([category, categoryFilters]) => (
                            <FilterCategory key={category}>
                                <CategoryTitle>{category}</CategoryTitle>
                                <FilterGrid>
                                    {categoryFilters.map(filter => (
                                        <FilterButton
                                            key={filter}
                                            $active={selectedFilters.includes(filter)}
                                            $type={type}
                                            onClick={() => toggleFilter(filter)}
                                        >
                                            {filter}
                                        </FilterButton>
                                    ))}
                                </FilterGrid>
                            </FilterCategory>
                        ))}
                    </FilterContent>
                )}
            </FilterSection>
        );
    };

    return (
        <StyleFilterContainer>
            <FilterHeader>
                <FilterTitle>성향 및 커뮤니케이션 필터</FilterTitle>
                {selectedFilters.length > 0 && (
                    <ClearButton onClick={clearAllFilters}>
                        전체 해제 ({selectedFilters.length})
                    </ClearButton>
                )}
            </FilterHeader>

            <FilterSections>
                {renderFilterSection('게임 성향', gameStyleFilters, 'game')}
                {renderFilterSection('커뮤니케이션 스타일', communicationStyleFilters, 'communication')}
            </FilterSections>

            {selectedFilters.length > 0 && (
                <SelectedFilters>
                    <SelectedTitle>선택된 필터:</SelectedTitle>
                    <SelectedFilterList>
                        {selectedFilters.map(filter => (
                            <SelectedFilterTag key={filter} onClick={() => toggleFilter(filter)}>
                                {filter}
                                <RemoveIcon>×</RemoveIcon>
                            </SelectedFilterTag>
                        ))}
                    </SelectedFilterList>
                </SelectedFilters>
            )}
        </StyleFilterContainer>
    );
}

const StyleFilterContainer = styled.div`
    background-color: #252527;
    border-radius: 1.2rem;
    padding: 2rem;
    margin-bottom: 2rem;
`;

const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const ClearButton = styled.button`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: #ef4444;
    color: #ffffff;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #dc2626;
        }
    }
`;

const FilterSections = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FilterSection = styled.div`
    border: 0.1rem solid #3f3f41;
    border-radius: 1rem;
    overflow: hidden;
`;

const SectionHeader = styled.button`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background-color: #1f1f21;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #2a2a2c;
        }
    }
`;

const SectionTitle = styled.h4`
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const ToggleIcon = styled.span<{ $expanded: boolean }>`
    font-size: 1.2rem;
    color: #939393;
    transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.2s ease;
`;

const FilterContent = styled.div`
    padding: 2rem 1.5rem;
`;

const FilterCategory = styled.div`
    margin-bottom: 2rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CategoryTitle = styled.h5`
    font-size: 1.4rem;
    font-weight: 500;
    color: #cccccc;
    margin: 0 0 1rem;
`;

const FilterGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const FilterButton = styled.button<{ $active: boolean; $type: 'game' | 'communication' }>`
    padding: 0.8rem 1.6rem;
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
            return $type === 'game' ? '#4272ec' : '#22c55e';
        }
        return 'transparent';
    }};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: ${({ $type }) => $type === 'game' ? '#4272ec' : '#22c55e'};
            color: #ffffff;
        }
    }
`;

const SelectedFilters = styled.div`
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 0.1rem solid #3f3f41;
`;

const SelectedTitle = styled.h4`
    font-size: 1.4rem;
    font-weight: 500;
    color: #cccccc;
    margin: 0 0 1rem;
`;

const SelectedFilterList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
`;

const SelectedFilterTag = styled.button`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 500;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;

const RemoveIcon = styled.span`
    font-size: 1.6rem;
    line-height: 1;
    opacity: 0.8;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 1;
        }
    }
`;