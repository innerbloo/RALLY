'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styled from '@emotion/styled';

const banners = [
    { id: 1, image: '/banner1.png', alt: '배너 1' },
    { id: 2, image: '/banner2.png', alt: '배너 2' },
    { id: 3, image: '/banner3.png', alt: '배너 3' },
];

export default function BannerSwiper() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(1);

    const handleSlideChange = (swiper: SwiperType) => {
        setCurrentIndex(swiper.realIndex + 1);
    };

    const handleBannerClick = (bannerId: number) => {
        router.push(`/event/${bannerId}`);
    };

    return (
        <BannerContainer>
            <StyledSwiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onSlideChange={handleSlideChange}
            >
                {banners.map((banner) => (
                    <StyledSwiperSlide key={banner.id}>
                        <BannerSlide onClick={() => handleBannerClick(banner.id)}>
                            <Image
                                src={banner.image}
                                alt={banner.alt}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </BannerSlide>
                    </StyledSwiperSlide>
                ))}
            </StyledSwiper>
            <PageIndicator>
                {currentIndex}/{banners.length}
            </PageIndicator>
        </BannerContainer>
    );
}

const BannerContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 390 / 200;
    overflow: hidden;
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
    height: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
    width: 100%;
    height: 100%;
`;

const BannerSlide = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const PageIndicator = styled.div`
    position: absolute;
    bottom: 1.2rem;
    right: 1.2rem;
    padding: 0.6rem 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 1.6rem;
    z-index: 10;
`;
