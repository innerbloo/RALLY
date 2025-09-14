'use client';

import Lottie from 'lottie-react';

import styled from '@emotion/styled';
import loadingAnimation from '../../../../../public/loading-lottie.json';

export default function LoadingSpinner() {
    return (
        <LoadingContainer>
            <LoadingContent>
                <LottieContainer>
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        style={{ width: 200, height: 200 }}
                    />
                </LottieContainer>
                <LoadingTitle>빠른 매칭 진행중</LoadingTitle>
                <LoadingDescription>
                    최적의 듀오 파트너를 찾고 있습니다...
                </LoadingDescription>
            </LoadingContent>
        </LoadingContainer>
    );
}

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

const LottieContainer = styled.div`
    margin-bottom: 2rem;
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
    margin: 0;
`;