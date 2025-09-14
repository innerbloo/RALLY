'use client';

import { Zap } from 'lucide-react';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export default function LoadingSpinner() {
    return (
        <LoadingContainer>
            <LoadingContent>
                <SpinnerIcon>
                    <Zap size={48} />
                </SpinnerIcon>
                <LoadingTitle>빠른 매칭 진행중</LoadingTitle>
                <LoadingDescription>
                    최적의 듀오 파트너를 찾고 있습니다...
                </LoadingDescription>
                <ProgressDots>
                    <Dot $delay={0} />
                    <Dot $delay={0.2} />
                    <Dot $delay={0.4} />
                </ProgressDots>
            </LoadingContent>
        </LoadingContainer>
    );
}

const pulse = keyframes`
    0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
`;

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoadingContainer = styled.div`
    min-height: 100vh;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const LoadingContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 40rem;
`;

const SpinnerIcon = styled.div`
    width: 8rem;
    height: 8rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-bottom: 3rem;
    animation: ${spin} 2s linear infinite;
    box-shadow: 0 8px 32px rgba(66, 114, 236, 0.4);
`;

const LoadingTitle = styled.h2`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 1rem;
`;

const LoadingDescription = styled.p`
    font-size: 1.6rem;
    color: #939393;
    line-height: 1.5;
    margin: 0 0 3rem;
`;

const ProgressDots = styled.div`
    display: flex;
    gap: 1rem;
`;

const Dot = styled.div<{ $delay: number }>`
    width: 1.2rem;
    height: 1.2rem;
    background-color: #4272ec;
    border-radius: 50%;
    animation: ${pulse} 1.4s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
`;