'use client';

import styled from '@emotion/styled';

import EventCard from '@/app/components/EventCard';

interface EventData {
    id: number;
    image: string;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    participants?: number;
    game: string;
}

interface EventListProps {
    events: EventData[];
}

export default function EventList({ events }: EventListProps) {
    return (
        <EventWrapper>
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    image={event.image}
                    title={event.title}
                    type={event.type}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    participants={event.participants}
                    game={event.game}
                />
            ))}
        </EventWrapper>
    );
}

const EventWrapper = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0;
`;