'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { ReactNode } from 'react';

import styled from '@emotion/styled';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface CommunityCardProps {
    image: string;
    username: string;
    title: string;
    createAt: string;
    comment: number;
    game: string;
}

export default function CommunityCard({
    image,
    username,
    title,
    createAt,
    comment,
    game,
}: CommunityCardProps) {
    return (
        <CardContainer>
            <CommunityLeftSection>
                <h2>
                    {title} <span>[{comment}]</span>
                </h2>
                <p>{`${game} | ${dayjs(createAt).fromNow()} | ${username}`}</p>
            </CommunityLeftSection>
            <CommunityRightSection>
                <Image
                    src={image}
                    width={50}
                    height={50}
                    alt={username}
                ></Image>
            </CommunityRightSection>
        </CardContainer>
    );
}

const CardContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const CommunityLeftSection = styled.div`
    h2 {
        font-size: 1.6rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: unset;

        span {
            font-weight: 300;
            font-size: 1.4rem;
            color: #4272ec;
        }
    }

    p {
        color: #939393;
        font-weight: 300;
        font-size: 1.3rem;
    }
`;

const CommunityRightSection = styled.div``;
