'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

// Lottie JSON 파일 import
import swipeAnimation from '../../../../../../public/opinion-swap-card.json';

interface SwipeAnimationProps {
    show: boolean;
    onClose: () => void;
}

export default function SwipeAnimation({ show, onClose }: SwipeAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [show]);

    if (!isVisible) return null;

    const handleOverlayClick = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        <AnimationOverlay onClick={handleOverlayClick}>
            <AnimationContainer onClick={(e) => e.stopPropagation()}>
                <LottieWrapper>
                    <Lottie
                        animationData={swipeAnimation}
                        loop={true}
                        autoplay={true}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </LottieWrapper>

                <InstructionText>
                    카드를 좌우로 스와이프하세요!
                </InstructionText>

                <CloseButton onClick={handleOverlayClick}>
                    시작하기
                </CloseButton>
            </AnimationContainer>
        </AnimationOverlay>
    );
}

const AnimationOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
`;

const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    max-width: 40rem;
    width: 100%;
`;

const LottieWrapper = styled.div`
    position: relative;
    width: 25rem;
    height: 25rem;
`;

const CloseButton = styled.button`
    padding: 1.2rem 3rem;
    font-size: 1.6rem;
    font-weight: 600;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 2rem;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(66, 114, 236, 0.4);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const InstructionText = styled.p`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    margin: 0;
    opacity: 0.9;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 0.9;
            transform: translateY(0);
        }
    }
`;