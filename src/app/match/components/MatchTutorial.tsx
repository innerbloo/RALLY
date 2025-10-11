'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

interface MatchTutorialProps {
    onClose: () => void;
}

export default function MatchTutorial({ onClose }: MatchTutorialProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 애니메이션을 위해 약간의 딜레이
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <SpotlightOverlay $isVisible={isVisible} onClick={handleClose}>
            <TooltipCard onClick={(e) => e.stopPropagation()}>
                <TooltipText>
                    빠른 매칭으로
                    <br />
                    나에게 딱 맞는 듀오를 찾아보세요
                </TooltipText>
                <CloseButton onClick={handleClose}>
                    <X size={16} />
                </CloseButton>
            </TooltipCard>
        </SpotlightOverlay>
    );
}

const SpotlightOverlay = styled.div<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 0.3s ease;
    pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

    /* Spotlight 효과 - 버튼 영역만 밝게 */
    /* 데스크톱: 중앙 800px 컨테이너 기준 오른쪽, 버튼은 bottom: 8rem */
    background: radial-gradient(
        circle 140px at calc(50% + 800px / 2 - 8rem) calc(100% - 9rem),
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.85) 100%
    );

    @media (max-width: 800px) {
        /* 모바일: 오른쪽에서 약 8rem 위치 */
        background: radial-gradient(
            circle 130px at calc(100% - 8rem) calc(100% - 10rem),
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.85) 100%
        );
    }

    @media (max-width: 768px) {
        /* 작은 모바일: 버튼이 safe-area-inset-bottom 고려 */
        background: radial-gradient(
            circle 120px at calc(100% - 7rem) calc(100% - 10rem),
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.85) 100%
        );
    }
`;

const TooltipCard = styled.div`
    position: fixed;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    border-radius: 1.6rem;
    padding: 1.8rem 2rem;
    max-width: 30rem;
    box-shadow: 0 8px 30px rgba(66, 114, 236, 0.5);
    animation: fadeInScale 0.3s ease;

    /* 데스크톱: 버튼과 같은 수평 위치 (중앙 800px 컨테이너 기준 오른쪽) */
    /* 버튼(bottom: 8rem) 바로 위에 배치 */
    bottom: 16rem;
    left: 50%;
    transform: translateX(calc(800px / 2 - 2rem - 100%));

    /* 말풍선 꼬리 */
    &::after {
        content: '';
        position: absolute;
        bottom: -1rem;
        right: 2rem;
        width: 0;
        height: 0;
        border-left: 1.2rem solid transparent;
        border-right: 1.2rem solid transparent;
        border-top: 1rem solid #3a5fd9;
    }

    @media (max-width: 800px) {
        /* 모바일: 오른쪽 정렬 */
        right: 2rem;
        left: auto;
        transform: none;
        bottom: calc(15rem + env(safe-area-inset-bottom));
    }

    @media (max-width: 768px) {
        right: 1.5rem;
        max-width: calc(100vw - 3rem);
        bottom: calc(15rem + env(safe-area-inset-bottom));
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const TooltipText = styled.p`
    font-size: 1.5rem;
    line-height: 1.6;
    color: #ffffff;
    margin: 0;
    padding-right: 2.5rem;
    text-align: center;
    font-weight: 500;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffffff;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    }
`;
