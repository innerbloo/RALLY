'use client';

import { MessageSquare, Mic, MicOff } from 'lucide-react';

import { MicrophoneOption } from '../types/quickMatch';

import styled from '@emotion/styled';

interface MicrophoneSelectionProps {
    selectedPreference: 'required' | 'optional' | 'chat' | null;
    onPreferenceSelect: (preference: 'required' | 'optional' | 'chat') => void;
}

const microphoneOptions: MicrophoneOption[] = [
    {
        id: 'required',
        name: '마이크 필수',
        description: '음성 채팅을 통한 원활한 소통을 원해요',
        icon: 'mic',
    },
    {
        id: 'optional',
        name: '마이크 가능',
        description: '상황에 따라 음성이나 채팅 모두 괜찮아요',
        icon: 'mic-optional',
    },
    {
        id: 'chat',
        name: '채팅 위주',
        description: '텍스트 채팅으로만 소통하고 싶어요',
        icon: 'chat',
    },
];

export default function MicrophoneSelection({
    selectedPreference,
    onPreferenceSelect,
}: MicrophoneSelectionProps) {
    const getIcon = (iconName: string, isActive: boolean) => {
        const iconProps = {
            size: 32,
            color: isActive ? '#4272ec' : '#939393',
        };

        switch (iconName) {
            case 'mic':
                return <Mic {...iconProps} />;
            case 'mic-optional':
                return <MicOff {...iconProps} />;
            case 'chat':
                return <MessageSquare {...iconProps} />;
            default:
                return <Mic {...iconProps} />;
        }
    };

    return (
        <MicrophoneSelectionContainer>
            <Description>듀오와의 소통 방식을 선택해주세요</Description>

            <OptionGrid>
                {microphoneOptions.map((option) => (
                    <OptionCard
                        key={option.id}
                        $active={selectedPreference === option.id}
                        onClick={() => {
                            onPreferenceSelect(option.id);

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
                        }}
                    >
                        <IconContainer
                            $active={selectedPreference === option.id}
                        >
                            {getIcon(
                                option.icon,
                                selectedPreference === option.id,
                            )}
                        </IconContainer>

                        <OptionContent>
                            <OptionTitle>{option.name}</OptionTitle>
                            <OptionDescription>
                                {option.description}
                            </OptionDescription>
                        </OptionContent>

                        {selectedPreference === option.id && (
                            <SelectedIndicator>✓</SelectedIndicator>
                        )}
                    </OptionCard>
                ))}
            </OptionGrid>

            <TipSection>
                <TipTitle>💡 소통 방식 안내</TipTitle>
                <TipList>
                    <TipItem>
                        <strong>마이크 필수:</strong> 실시간 음성 소통으로 더
                        빠른 협업이 가능해요
                    </TipItem>
                    <TipItem>
                        <strong>마이크 가능:</strong> 유연한 소통으로 상황에
                        맞게 대응할 수 있어요
                    </TipItem>
                    <TipItem>
                        <strong>채팅 위주:</strong> 조용한 환경에서도 편안하게
                        플레이할 수 있어요
                    </TipItem>
                </TipList>
            </TipSection>
        </MicrophoneSelectionContainer>
    );
}

const MicrophoneSelectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
`;

const Description = styled.p`
    font-size: 1.6rem;
    color: #cccccc;
    text-align: center;
    line-height: 1.5;
    margin: 0;
`;

const OptionGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 50rem;
`;

const OptionCard = styled.button<{ $active: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem 2rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.15)' : '#252527'};
    border: 0.2rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 1.6rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            background-color: rgba(66, 114, 236, 0.1);
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
    }
`;

const IconContainer = styled.div<{ $active: boolean }>`
    flex-shrink: 0;
    width: 6rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    border-radius: 50%;
    transition: all 0.2s ease;
`;

const OptionContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const OptionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const OptionDescription = styled.p`
    font-size: 1.4rem;
    color: #939393;
    line-height: 1.4;
    margin: 0;
`;

const SelectedIndicator = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
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

const TipSection = styled.div`
    width: 100%;
    max-width: 50rem;
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

    strong {
        color: #cccccc;
        font-weight: 600;
    }
`;
