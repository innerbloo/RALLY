'use client';

import { ReactNode } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import styled from '@emotion/styled';

import OnlineUserCard from './OnlineUserCard';

interface OnlineUserData {
    id: number;
    profileImage: string;
    username: string;
    position?: ReactNode;
    userCode: string;
    currentGame: string;
    status: 'online' | 'in-game' | 'matching';
    rankImage: string;
    rankText: string;
    tags: string[];
    gameImage: string;
    gameAlt: string;
}

interface OnlineUserListProps {
    users: OnlineUserData[];
}

export default function OnlineUserList({ users }: OnlineUserListProps) {
    return (
        <OnlineWrapper>
            <StyledSwiper
                spaceBetween={12}
                slidesPerView={1.3}
                breakpoints={{
                    640: {
                        slidesPerView: 2.2,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 2.8,
                        spaceBetween: 16,
                    },
                }}
            >
                {users.map((user) => (
                    <SwiperSlide key={user.id}>
                        <OnlineUserCard
                            profileImage={user.profileImage}
                            username={user.username}
                            position={user.position}
                            userCode={user.userCode}
                            currentGame={user.currentGame}
                            status={user.status}
                            rankImage={user.rankImage}
                            rankText={user.rankText}
                            tags={user.tags}
                            gameImage={user.gameImage}
                            gameAlt={user.gameAlt}
                        />
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </OnlineWrapper>
    );
}

const OnlineWrapper = styled.div`
    width: 100%;
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
    padding-bottom: 1rem;
`;