'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import styled from '@emotion/styled';

import MentorRecommendCard from '@/app/components/MentorRecommendCard';

interface MentorData {
    id: number;
    profileImage: string;
    username: string;
    rate: number;
    reviews: number;
    description: string;
    gameImage: string;
    gameAlt: string;
}

interface MentorRecommendListProps {
    mentors: MentorData[];
}

export default function MentorRecommendList({
    mentors,
}: MentorRecommendListProps) {
    return (
        <MentorWrapper>
            <StyledSwiper
                spaceBetween={10}
                slidesPerView={1.8}
                breakpoints={{
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                    },
                }}
            >
                {mentors.map((mentor) => (
                    <SwiperSlide key={mentor.id}>
                        <MentorRecommendCard
                            profileImage={mentor.profileImage}
                            username={mentor.username}
                            rate={mentor.rate}
                            reviews={mentor.reviews}
                            description={mentor.description}
                            gameImage={mentor.gameImage}
                            gameAlt={mentor.gameAlt}
                        />
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </MentorWrapper>
    );
}

const MentorWrapper = styled.div`
    width: 100%;
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
    padding-bottom: 1rem;
`;
