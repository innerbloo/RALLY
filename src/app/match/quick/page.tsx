'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import GameSelection from './components/GameSelection';
import LoadingSpinner from './components/LoadingSpinner';
import MicrophoneSelection from './components/MicrophoneSelection';
import PositionSelection from './components/PositionSelection';
import StyleSelection from './components/StyleSelection';
import TierSelection from './components/TierSelection';
import { QuickMatchData, QuickMatchStep } from './types/quickMatch';

import styled from '@emotion/styled';

import { useQuickMatch } from '@/contexts/QuickMatchContext';

const initialData: QuickMatchData = {
    game: null,
    myPosition: null,
    desiredPositions: [],
    myTier: null,
    desiredTierRange: null,
    microphonePreference: null,
    desiredStyles: {
        gameStyles: [],
        communicationStyles: [],
    },
};

export default function QuickMatchPage() {
    const [currentStep, setCurrentStep] = useState<QuickMatchStep>(1);
    const [matchData, setMatchData] = useState<QuickMatchData>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const { setProgress } = useQuickMatch();
    const router = useRouter();

    // Set initial progress on mount
    useEffect(() => {
        setProgress((currentStep / 5) * 100);
        return () => setProgress(0); // Clear progress on unmount
    }, [currentStep, setProgress]);

    const handleNext = () => {
        if (currentStep < 5) {
            const nextStep = (currentStep + 1) as QuickMatchStep;
            setCurrentStep(nextStep);
            setProgress((nextStep / 5) * 100);
            window.scrollTo(0, 0);
        } else {
            handleStartMatching();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            const prevStep = (currentStep - 1) as QuickMatchStep;
            setCurrentStep(prevStep);
            setProgress((prevStep / 5) * 100);
            window.scrollTo(0, 0);
        } else {
            setProgress(0);
            router.back();
        }
    };

    const handleStartMatching = async () => {
        setIsLoading(true);
        setProgress(100);

        // 3초 로딩 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // 매칭 데이터를 URL 파라미터로 전달하여 결과 페이지로 이동
        const params = new URLSearchParams({
            game: matchData.game || '',
            positions: JSON.stringify(matchData.desiredPositions),
            tier: matchData.myTier
                ? `${matchData.myTier.main}${matchData.myTier.sub ? matchData.myTier.sub : ''}`
                : '',
            micPreference: matchData.microphonePreference || '',
            gameStyles: JSON.stringify(matchData.desiredStyles.gameStyles),
            commStyles: JSON.stringify(
                matchData.desiredStyles.communicationStyles,
            ),
        });

        setIsLoading(false);
        router.push(`/match/quick/results?${params.toString()}`);
    };

    const updateMatchData = (updates: Partial<QuickMatchData>) => {
        setMatchData((prev) => ({ ...prev, ...updates }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return matchData.game !== null;
            case 2:
                return (
                    matchData.myPosition !== null &&
                    matchData.myPosition.length > 0 &&
                    matchData.desiredPositions.length > 0
                );
            case 3:
                return (
                    matchData.myTier !== null &&
                    matchData.desiredTierRange !== null
                );
            case 4:
                return matchData.microphonePreference !== null;
            case 5:
                return (
                    matchData.desiredStyles.gameStyles.length > 0 ||
                    matchData.desiredStyles.communicationStyles.length > 0
                );
            default:
                return false;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <GameSelection
                        selectedGame={matchData.game}
                        onGameSelect={(game) => updateMatchData({ game })}
                    />
                );
            case 2:
                return (
                    <PositionSelection
                        selectedGame={matchData.game}
                        myPosition={matchData.myPosition}
                        desiredPositions={matchData.desiredPositions}
                        onMyPositionSelect={(positions) =>
                            updateMatchData({ myPosition: positions })
                        }
                        onDesiredPositionsChange={(positions) =>
                            updateMatchData({ desiredPositions: positions })
                        }
                    />
                );
            case 3:
                return (
                    <TierSelection
                        myTier={matchData.myTier}
                        desiredTierRange={matchData.desiredTierRange}
                        onMyTierSelect={(tier) =>
                            updateMatchData({ myTier: tier })
                        }
                        onDesiredTierRangeChange={(range) =>
                            updateMatchData({ desiredTierRange: range })
                        }
                    />
                );
            case 4:
                return (
                    <MicrophoneSelection
                        selectedPreference={matchData.microphonePreference}
                        onPreferenceSelect={(preference) =>
                            updateMatchData({
                                microphonePreference: preference,
                            })
                        }
                    />
                );
            case 5:
                return (
                    <StyleSelection
                        selectedStyles={matchData.desiredStyles}
                        onStylesChange={(styles) =>
                            updateMatchData({ desiredStyles: styles })
                        }
                    />
                );
            default:
                return null;
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return '게임을 선택해주세요';
            case 2:
                return '포지션을 설정해주세요';
            case 3:
                return '티어를 설정해주세요';
            case 4:
                return '마이크 사용을 설정해주세요';
            case 5:
                return '원하는 성향을 선택해주세요';
            default:
                return '';
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <QuickMatchContainer>
            <QuickMatchContent>
                <StepContent>{renderStepContent()}</StepContent>
            </QuickMatchContent>

            <QuickMatchFooter>
                <NavigationButton onClick={handlePrevious} $variant="secondary">
                    <ArrowLeft size={18} />
                    이전
                </NavigationButton>

                <NavigationButton
                    onClick={handleNext}
                    $variant="primary"
                    disabled={!canProceed()}
                >
                    {currentStep === 5 ? '매칭 시작' : '다음'}
                    {currentStep < 5 && <ArrowRight size={18} />}
                </NavigationButton>
            </QuickMatchFooter>
        </QuickMatchContainer>
    );
}

const QuickMatchContainer = styled.div`
    min-height: 100vh;
    background-color: #1a1a1a;
    display: flex;
    flex-direction: column;
`;

const QuickMatchContent = styled.main`
    flex: 1;
    padding: 0 2rem;
    padding-top: calc(8rem + env(safe-area-inset-top));
    display: flex;
    flex-direction: column;
`;

const StepContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const QuickMatchFooter = styled.footer`
    padding: 2rem;
    padding-bottom: calc(3rem + env(safe-area-inset-bottom));
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;

const NavigationButton = styled.button<{
    $variant: 'primary' | 'secondary';
    disabled?: boolean;
}>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 1.4rem 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    background-color: ${({ $variant, disabled }) => {
        if (disabled) return '#3f3f41';
        return $variant === 'primary' ? '#4272ec' : 'transparent';
    }};

    color: ${({ $variant, disabled }) => {
        if (disabled) return '#939393';
        return $variant === 'primary' ? '#ffffff' : '#4272ec';
    }};

    border: ${({ $variant, disabled }) =>
        $variant === 'secondary' && !disabled
            ? '0.1rem solid #4272ec'
            : 'none'};

    &:disabled {
        cursor: not-allowed;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
            background-color: ${({ $variant }) =>
                $variant === 'primary' ? '#3a5fd9' : '#4272ec'};
            color: #ffffff;
        }
    }
`;
