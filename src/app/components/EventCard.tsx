'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';

import styled from '@emotion/styled';

interface EventCardProps {
    image: string;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    participants?: number;
    game: string;
}

export default function EventCard({
    image,
    title,
    type,
    startDate,
    endDate,
    participants,
    game,
}: EventCardProps) {
    const formatDateRange = () => {
        const start = dayjs(startDate).format('MM.DD');
        const end = dayjs(endDate).format('MM.DD');
        return `${start} ~ ${end}`;
    };

    return (
        <CardContainer>
            <EventLeftSection>
                <EventBadge>{type}</EventBadge>
                <h2>{title}</h2>
                <p>{`${game} | ${formatDateRange()}`}</p>
                {participants && (
                    <ParticipantInfo>{participants}명 참여</ParticipantInfo>
                )}
            </EventLeftSection>
            <EventRightSection>
                <Image src={image} width={60} height={60} alt={title} />
            </EventRightSection>
        </CardContainer>
    );
}

const CardContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const EventLeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h2 {
        font-size: 1.6rem;
        font-weight: 500;
        margin: 0;
    }

    p {
        color: #939393;
        font-weight: 300;
        font-size: 1.3rem;
        margin: 0;
    }
`;

const EventBadge = styled.span`
    display: inline-block;
    padding: 0.3rem 0.8rem;
    background-color: #4272ec;
    color: white;
    border-radius: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    width: fit-content;
`;

const ParticipantInfo = styled.span`
    color: #4272ec;
    font-size: 1.2rem;
    font-weight: 400;
`;

const EventRightSection = styled.div`
    img {
        border-radius: 0.8rem;
    }
`;
