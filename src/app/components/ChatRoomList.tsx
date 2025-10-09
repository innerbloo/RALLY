'use client';

import styled from '@emotion/styled';

import ChatRoomCard from '@/app/components/ChatRoomCard';
import { ChatRoom } from '@/data/chatMockData';

interface ChatRoomListProps {
    rooms: ChatRoom[];
}

export default function ChatRoomList({ rooms }: ChatRoomListProps) {
    if (rooms.length === 0) {
        return (
            <EmptyState>
                <EmptyText>아직 매칭된 상대가 없습니다.</EmptyText>
                <EmptySubText>퀵 매칭으로 듀오를 찾아보세요!</EmptySubText>
            </EmptyState>
        );
    }

    return (
        <ListContainer>
            {rooms.map((room) => (
                <ChatRoomCard
                    key={room.id}
                    id={room.id}
                    matchedUser={room.matchedUser}
                    game={room.game}
                    lastMessage={room.lastMessage}
                    unreadCount={room.unreadCount}
                />
            ))}
        </ListContainer>
    );
}

const ListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    text-align: center;
`;

const EmptyText = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: #939393;
    margin: 0 0 0.8rem;
`;

const EmptySubText = styled.p`
    font-size: 1.4rem;
    color: #6b6b6b;
    margin: 0;
`;
