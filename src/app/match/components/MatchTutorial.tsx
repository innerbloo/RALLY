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
    background: radial-gradient(
        circle 120px at calc(100% - 7rem) calc(100% - 10rem),
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.85) 100%
    );
`;

const TooltipCard = styled.div`
    position: fixed;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    border-radius: 1.6rem;
    padding: 1.8rem 2rem;
    max-width: calc(100vw - 3rem);
    box-shadow: 0 8px 30px rgba(66, 114, 236, 0.5);
    animation: fadeInScale 0.3s ease;
    left: 50%;
    transform: translateX(calc(-100% + 220px - 1.5rem));
    bottom: calc(20rem + env(safe-area-inset-bottom));

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

    @media (max-width: 768px) {
        transform: unset;
        left: unset;
        right: 1.5rem;
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
    color: #ffffff;
    transition: background-color 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    }
`;
