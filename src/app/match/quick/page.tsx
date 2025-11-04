'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import GameSelection from './components/GameSelection';
import LoadingSpinner from './components/LoadingSpinner';
import MicrophoneSelection from './components/MicrophoneSelection';
import PositionSelection from './components/PositionSelection';
import StyleSelection from './components/StyleSelection';
import TierSelection from './components/TierSelection';
import { QuickMatchData, QuickMatchStep } from './types/quickMatch';

import styled from '@emotion/styled';

import { useQuickMatch } from '@/contexts/QuickMatchContext';
import { getGameNameById, getUsersByGame } from '@/data/mockGameUsers';

const initialData: QuickMatchData = {
    game: null,
    desiredPositions: [],
    desiredTier: null,
    microphonePreference: null,
    desiredStyles: {
        gameStyles: [],
        communicationStyles: [],
    },
};

function QuickMatchContent() {
    const [currentStep, setCurrentStep] = useState<QuickMatchStep>(1);
    const [matchData, setMatchData] = useState<QuickMatchData>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const { setProgress } = useQuickMatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Read game parameter from URL and pre-select game
    useEffect(() => {
        const gameParam = searchParams.get('game');
        if (
            gameParam &&
            (gameParam === 'lol' ||
                gameParam === 'tft' ||
                gameParam === 'overwatch')
        ) {
            setMatchData((prev) => ({ ...prev, game: gameParam }));
        }
    }, [searchParams]);

    // Set initial progress on mount
    useEffect(() => {
        const isTFT = matchData.game === 'tft';
        const totalSteps = isTFT ? 4 : 5; // TFT has 4 steps (no position selection)
        const actualStep =
            isTFT && currentStep > 2 ? currentStep - 1 : currentStep;
        setProgress((actualStep / totalSteps) * 100);
        return () => setProgress(0); // Clear progress on unmount
    }, [currentStep, setProgress, matchData.game]);

    const handleNext = () => {
        const isTFT = matchData.game === 'tft';

        if (currentStep < 5) {
            let nextStep = (currentStep + 1) as QuickMatchStep;

            // Skip position selection (step 2) for TFT
            if (isTFT && currentStep === 1) {
                nextStep = 3 as QuickMatchStep;
                // Auto-set position to 'all' for TFT
                updateMatchData({ desiredPositions: ['all'] });
            }

            setCurrentStep(nextStep);
            const totalSteps = isTFT ? 4 : 5;
            const actualStep = isTFT && nextStep > 2 ? nextStep - 1 : nextStep;
            setProgress((actualStep / totalSteps) * 100);
            window.scrollTo(0, 0);
        } else {
            handleStartMatching();
        }
    };

    const handlePrevious = () => {
        const isTFT = matchData.game === 'tft';

        if (currentStep > 1) {
            let prevStep = (currentStep - 1) as QuickMatchStep;

            // Skip position selection (step 2) for TFT
            if (isTFT && currentStep === 3) {
                prevStep = 1 as QuickMatchStep;
            }

            setCurrentStep(prevStep);
            const totalSteps = isTFT ? 4 : 5;
            const actualStep = isTFT && prevStep > 2 ? prevStep - 1 : prevStep;
            setProgress((actualStep / totalSteps) * 100);
            window.scrollTo(0, 0);
        } else {
            setProgress(0);
            router.push('/match');
        }
    };

    const handleStartMatching = async () => {
        setIsLoading(true);
        setProgress(100);

        // 새로운 매칭 시작 시 이전 매칭 리스트 초기화
        localStorage.removeItem('quickMatchedUsers');

        // 매칭 조건에 따라 사용자 필터링
        const gameUsers = matchData.game
            ? getUsersByGame(getGameNameById(matchData.game))
            : [];

        const filteredUsers = gameUsers.filter((user) => {
            // 포지션/역할 매칭
            if (
                matchData.desiredPositions.length > 0 &&
                !matchData.desiredPositions.includes('all')
            ) {
                const positionId =
                    'positionId' in user ? user.positionId : undefined;
                const roleId = 'roleId' in user ? user.roleId : undefined;

                // LOL: positionId로 필터링, Overwatch: roleId로 필터링
                if (positionId) {
                    if (!matchData.desiredPositions.includes(positionId)) {
                        return false;
                    }
                } else if (roleId) {
                    if (!matchData.desiredPositions.includes(roleId)) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        });

        // 최대 5명 선택
        const selectedUsers = filteredUsers.slice(0, 5);

        // 각 유저에게 고정 랭크 할당 (티어 기반)
        const tierMap: { [key: string]: { abbr: string } } = {
            iron: { abbr: 'I' },
            bronze: { abbr: 'B' },
            silver: { abbr: 'S' },
            gold: { abbr: 'G' },
            platinum: { abbr: 'P' },
            emerald: { abbr: 'E' },
            diamond: { abbr: 'D' },
            master: { abbr: 'M' },
            grandmaster: { abbr: 'GM' },
            challenger: { abbr: 'C' },
        };

        const tierKey =
            matchData.desiredTier?.match(/^[a-z]+/i)?.[0]?.toLowerCase() || '';
        const tierInfo = tierMap[tierKey];

        // 유저별 고정 랭크 생성 (1-4 랜덤하게 할당)
        const userRanksMap: { [key: number]: string } = {};
        selectedUsers.forEach((user) => {
            const rankNum = Math.floor(Math.random() * 4) + 1;
            userRanksMap[user.id] = tierInfo
                ? `${tierInfo.abbr}${rankNum}`
                : '';
        });

        // 3초 로딩 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // 매칭 데이터를 URL 파라미터로 전달하여 결과 페이지로 이동
        const params = new URLSearchParams({
            game: matchData.game || '',
            positions: JSON.stringify(matchData.desiredPositions),
            tier: matchData.desiredTier || '',
            micPreference: matchData.microphonePreference || '',
            gameStyles: JSON.stringify(matchData.desiredStyles.gameStyles),
            commStyles: JSON.stringify(
                matchData.desiredStyles.communicationStyles,
            ),
            userIds: JSON.stringify(selectedUsers.map((u) => u.id)),
            userRanks: JSON.stringify(userRanksMap),
        });

        setIsLoading(false);
        router.push(`/match/quick/results?${params.toString()}`);
    };

    const updateMatchData = (updates: Partial<QuickMatchData>) => {
        setMatchData((prev) => ({ ...prev, ...updates }));
    };

    const canProceed = () => {
        const isTFT = matchData.game === 'tft';

        switch (currentStep) {
            case 1:
                return matchData.game !== null;
            case 2:
                // TFT doesn't need position selection
                return isTFT || matchData.desiredPositions.length > 0;
            case 3:
                return matchData.desiredTier !== null;
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
                        desiredPositions={matchData.desiredPositions}
                        onDesiredPositionsChange={(positions) =>
                            updateMatchData({ desiredPositions: positions })
                        }
                    />
                );
            case 3:
                return (
                    <TierSelection
                        selectedGame={matchData.game}
                        desiredTier={matchData.desiredTier}
                        onDesiredTierChange={(tier) =>
                            updateMatchData({ desiredTier: tier })
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
            <QuickMatchMain>
                <StepContent>{renderStepContent()}</StepContent>
            </QuickMatchMain>

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

export default function QuickMatchPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <QuickMatchContent />
        </Suspense>
    );
}

const QuickMatchContainer = styled.div`
    min-height: 100vh;
    background-color: #1a1a1a;
    display: flex;
    flex-direction: column;
`;

const QuickMatchMain = styled.main`
    flex: 1;
    padding: 0 2rem;
    padding-top: calc(10rem + env(safe-area-inset-top));
    padding-bottom: calc(10rem + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding-bottom: 10rem;
    }
`;

const StepContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const QuickMatchFooter = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 430px;
    margin: 0 auto;
    background: linear-gradient(
        to top,
        #1a1a1a 0%,
        #1a1a1a 70%,
        rgba(26, 26, 26, 0.95) 90%,
        rgba(26, 26, 26, 0) 100%
    );
    padding: 1.5rem 2rem calc(env(safe-area-inset-bottom) + 1.5rem);
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding: 1.5rem 2rem 1.5rem;
    }
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
    height: 5.6rem;
    padding: 0 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    border: none;
    border-radius: 1.6rem;
    transition: all 0.2s ease;
    cursor: pointer;

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

    @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
            background-color: ${({ $variant }) =>
                $variant === 'primary' ? '#3a5fd9' : '#4272ec'};
            color: #ffffff;
        }
    }
`;
