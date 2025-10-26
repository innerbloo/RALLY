'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import ChatRoomList from '@/app/components/ChatRoomList';
import {
    ChatRoom,
    Message,
    mockChatRooms,
    mockMessages,
} from '@/data/chatMockData';
import { useDragScroll } from '@/hooks/useDragScroll';

export default function ChatPage() {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread'>(
        'all',
    );
    const [selectedGame, setSelectedGame] = useState<string>('전체');
    const { scrollRef, isDragging } = useDragScroll();

    // localStorage에서 최신 메시지 불러와서 채팅방 목록 업데이트
    useEffect(() => {
        const storedMessages = JSON.parse(
            localStorage.getItem('chatMessages') || '{}',
        );

        // localStorage에서 저장된 채팅방 목록 가져오기
        const storedRooms = JSON.parse(
            localStorage.getItem('chatRooms') || '[]',
        ) as ChatRoom[];

        // mockChatRooms와 localStorage chatRooms 병합 (중복 제거)
        const allRooms = [...mockChatRooms];
        storedRooms.forEach((storedRoom) => {
            if (!allRooms.find((room) => room.id === storedRoom.id)) {
                allRooms.push(storedRoom);
            }
        });

        const updatedRooms = allRooms.map((room) => {
            // localStorage에 저장된 메시지가 있으면 해당 메시지 사용
            const roomMessages: Message[] =
                storedMessages[room.id] || mockMessages[room.id] || [];

            if (roomMessages.length > 0) {
                // 마지막 메시지 찾기
                const lastMessage = roomMessages[roomMessages.length - 1];

                return {
                    ...room,
                    lastMessage: {
                        content: lastMessage.content,
                        timestamp: lastMessage.timestamp,
                        senderId: lastMessage.senderId,
                    },
                };
            }

            return room;
        });

        setChatRooms(updatedRooms);
    }, []);

    const gameList = [
        '전체',
        '리그오브레전드',
        '전략적 팀 전투',
        '오버워치2',
        '발로란트',
        '배틀그라운드',
    ];

    // 필터링된 채팅방 목록
    const filteredRooms = useMemo(() => {
        return chatRooms
            .filter((room) => {
                // 검색어 필터
                const searchFilter =
                    searchTerm === '' ||
                    room.matchedUser.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());

                // 읽지 않음 필터
                const unreadFilter =
                    selectedFilter === 'all' ||
                    (selectedFilter === 'unread' && room.unreadCount > 0);

                // 게임 필터
                const gameFilter =
                    selectedGame === '전체' || room.game.name === selectedGame;

                return searchFilter && unreadFilter && gameFilter;
            })
            .sort((a, b) => {
                // 최신 메시지 순으로 정렬
                return (
                    new Date(b.lastMessage.timestamp).getTime() -
                    new Date(a.lastMessage.timestamp).getTime()
                );
            });
    }, [chatRooms, searchTerm, selectedFilter, selectedGame]);

    // 읽지 않은 메시지 총 개수
    const totalUnreadCount = useMemo(() => {
        return chatRooms.reduce((sum, room) => sum + room.unreadCount, 0);
    }, [chatRooms]);

    return (
        <ChatContainer>
            <ChatHeader>
                <HeaderTop>
                    <h1>채팅</h1>
                    {totalUnreadCount > 0 && (
                        <UnreadTotalBadge>{totalUnreadCount}</UnreadTotalBadge>
                    )}
                </HeaderTop>

                <SearchSection>
                    <SearchInputWrapper>
                        <SearchIcon>
                            <Search size={18} />
                        </SearchIcon>
                        <SearchInput
                            type="text"
                            placeholder="사용자 이름 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchInputWrapper>
                </SearchSection>

                <GameFilterList ref={scrollRef} $isDragging={isDragging}>
                    {gameList.map((game) => (
                        <GameFilterButton
                            key={game}
                            $active={selectedGame === game}
                            onClick={() => setSelectedGame(game)}
                        >
                            {game}
                        </GameFilterButton>
                    ))}
                </GameFilterList>
                <FilterSection>
                    <FilterGroup>
                        <FilterButton
                            $active={selectedFilter === 'all'}
                            onClick={() => setSelectedFilter('all')}
                        >
                            전체
                        </FilterButton>
                        <FilterButton
                            $active={selectedFilter === 'unread'}
                            onClick={() => setSelectedFilter('unread')}
                        >
                            읽지 않음
                        </FilterButton>
                    </FilterGroup>
                </FilterSection>
            </ChatHeader>

            <ResultSection>
                <ResultCount>{filteredRooms.length}개의 채팅방</ResultCount>
            </ResultSection>

            <ChatRoomList rooms={filteredRooms} />
        </ChatContainer>
    );
}

const ChatContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(6.65rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh;
`;

const ChatHeader = styled.header`
    padding: 2rem 2rem 0;
    border-bottom: 0.1rem solid #3f3f41;
`;

const HeaderTop = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    h1 {
        font-size: 2.4rem;
        font-weight: 700;
        margin: 0;
        color: #ffffff;
    }
`;

const UnreadTotalBadge = styled.div`
    min-width: 2.4rem;
    height: 2.4rem;
    padding: 0 0.8rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    border-radius: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: 700;
    color: #ffffff;
`;

const SearchSection = styled.div`
    margin-bottom: 1.5rem;
`;

const SearchInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 1.6rem;
    display: flex;
    align-items: center;
    color: #939393;
    pointer-events: none;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 1.2rem 1.6rem 1.2rem 4.6rem;
    font-size: 1.6rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    color: #ffffff;
    outline: none;

    &::placeholder {
        color: #939393;
    }

    &:focus {
        border-color: #4272ec;
    }
`;

const FilterSection = styled.div`
    margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: 0.1rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 2rem;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #ffffff;
        }
    }
`;

const GameFilterList = styled.div<{ $isDragging?: boolean }>`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin: 0 -2rem 1.5rem;
    padding: 0 2rem;
    cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
    user-select: none;

    &::-webkit-scrollbar {
        display: none;
    }

    > button {
        flex-shrink: 0;
        pointer-events: ${({ $isDragging }) => ($isDragging ? 'none' : 'auto')};
    }
`;

const GameFilterButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    white-space: nowrap;
    border: 0.1rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 2rem;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #ffffff;
        }
    }
`;

const ResultSection = styled.section`
    padding: 1.5rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const ResultCount = styled.div`
    font-size: 1.3rem;
    color: #939393;
`;
