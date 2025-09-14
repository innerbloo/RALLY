'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, Suspense } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styled from '@emotion/styled';

import Indicator from '@/app/components/Indicator';
import { CommonButton } from '@/styles/button';

const tutorialSteps = [
    {
        image: '/tutorial1.png',
        title: '정교한 매칭 시스템',
        description:
            '게임 성향과 플레이 스타일 기반으로\n잘 맞는 듀오를 추천해드려요',
        buttonText: '다음',
    },
    {
        image: '/tutorial2.png',
        title: '멘토-멘티 연결',
        description: '초보자와 숙련자를 연결해\n함께 성장할 수 있어요',
        buttonText: '다음',
    },
    {
        image: '/tutorial3.png',
        title: '게임별 커뮤니티',
        description: '게임별 전용 공간에서\n전략도 소통도 자유롭게',
        buttonText: '시작',
    },
];

function TutorialContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [visitedSlides, setVisitedSlides] = useState(new Set([1]));
    const swiperRef = useRef<SwiperType>(null);

    // URL 동기화
    useEffect(() => {
        const step = searchParams.get('step');
        if (step) {
            const stepNum = parseInt(step);
            if (stepNum >= 1 && stepNum <= 3) {
                setCurrentStep(stepNum);
                swiperRef.current?.slideTo(stepNum - 1);
            }
        }
    }, [searchParams]);

    const handleNext = () => {
        if (currentStep < 3) {
            swiperRef.current?.slideNext();
        } else {
            router.push('/');
        }
    };

    const handleSlideChange = (swiper: SwiperType) => {
        const newStep = swiper.activeIndex + 1;
        setCurrentStep(newStep);
        setVisitedSlides((prev) => new Set([...prev, newStep]));

        // URL 업데이트
        const url = new URL(window.location.href);
        url.searchParams.set('step', newStep.toString());
        window.history.pushState({}, '', url.toString());
    };

    const handleSlideChangeTransitionStart = () => {
        // 애니메이션 리셋 후 다시 트리거 (미사용)
    };

    return (
        <TutorialContainer>
            <StyledSwiper
                modules={[Keyboard]}
                spaceBetween={32}
                slidesPerView={1}
                keyboard={{ enabled: true }}
                initialSlide={currentStep - 1}
                onSlideChange={handleSlideChange}
                onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {tutorialSteps.map((step, index) => (
                    <SwiperSlide key={index}>
                        <Slide>
                            <ContentWrapper>
                                <AnimatedImage
                                    src={step.image}
                                    width={200}
                                    height={200}
                                    alt={`튜토리얼 이미지${index + 1}`}
                                    className={
                                        visitedSlides.has(index + 1)
                                            ? 'animate'
                                            : ''
                                    }
                                />
                                <AnimatedTitle
                                    className={
                                        visitedSlides.has(index + 1)
                                            ? 'animate'
                                            : ''
                                    }
                                >
                                    {step.title}
                                </AnimatedTitle>
                                <AnimatedDescription
                                    className={
                                        visitedSlides.has(index + 1)
                                            ? 'animate'
                                            : ''
                                    }
                                >
                                    {step.description}
                                </AnimatedDescription>
                            </ContentWrapper>
                        </Slide>
                    </SwiperSlide>
                ))}
            </StyledSwiper>
            <ButtonWrapper>
                <Indicator active={currentStep} />
                <CommonButton onClick={handleNext}>
                    {tutorialSteps[currentStep - 1]?.buttonText}
                </CommonButton>
            </ButtonWrapper>
        </TutorialContainer>
    );
}

export default function TutorialPage() {
    return (
        <Suspense fallback={null}>
            <TutorialContent />
        </Suspense>
    );
}

const TutorialContainer = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .swiper {
        width: 100%;
        flex: 1;
    }

    .swiper-slide {
        display: flex;
        flex-direction: column;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(24px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-0.8rem);
        }
    }
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
    height: 100%;
`;

const Slide = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 2rem;
    padding-top: env(safe-area-inset-top);
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    justify-content: center;
    margin-bottom: 12rem;

    p {
        font-size: 2.4rem;
        font-weight: 700;
        margin: 0 0 1.2rem;
    }

    span {
        text-align: center;
        color: #d6d6d6;
        white-space: pre-line;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding-bottom: 2rem;
`;

const AnimatedImage = styled(Image)`
    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(24px);
    border-radius: 1.6rem;
    //filter: drop-shadow(0 0 60px rgba(66, 114, 236, 0.3));
    //transition: filter 0.3s ease;

    &.animate {
        animation:
            fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            float 3s ease-in-out infinite;
        animation-delay: 0.2s, 0.8s;
    }
`;

const AnimatedTitle = styled.p`
    font-size: 2.4rem;
    font-weight: 700;
    margin: 0 0 1.2rem;
    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(24px);

    &.animate {
        animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        animation-delay: 0.4s;
    }
`;

const AnimatedDescription = styled.span`
    text-align: center;
    color: #d6d6d6;
    white-space: pre-line;
    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(24px);

    &.animate {
        animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        animation-delay: 0.6s;
    }
`;
