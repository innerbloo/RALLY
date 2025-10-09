'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
    Ban,
    Bell,
    ChevronDown,
    ChevronLeft,
    ChevronUp,
    Flag,
    LogOut,
    MoreVertical,
    Search,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

import MessageBubble from '@/app/components/MessageBubble';
import MessageInput from '@/app/components/MessageInput';
import TypingIndicator from '@/app/components/TypingIndicator';
import { Message, mockChatRooms, mockMessages } from '@/data/chatMockData';

export default function ChatRoomPage() {
    const params = useParams();
    const router = useRouter();
    const roomId = Number(params.roomId);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 채팅방 정보 찾기
    const room = mockChatRooms.find((r) => r.id === roomId);

    // 메시지 상태
    const [messages, setMessages] = useState<Message[]>([]);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<number[]>([]); // 메시지 ID 배열
    const [currentResultIndex, setCurrentResultIndex] = useState(0);

    // localStorage에서 메시지 불러오기
    useEffect(() => {
        const storedMessages = JSON.parse(
            localStorage.getItem('chatMessages') || '{}',
        );

        // localStorage에 저장된 메시지가 있으면 사용, 없으면 mockMessages 사용
        const loadedMessages =
            storedMessages[roomId] || mockMessages[roomId] || [];
        setMessages(loadedMessages);
    }, [roomId]);

    // 자동 스크롤
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isAiTyping]);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // More 버튼이나 드롭다운 내부 클릭이 아닌 경우에만 닫기
            if (!target.closest('button[aria-label="more-menu"]') &&
                !target.closest('[data-more-dropdown]')) {
                setIsMoreMenuOpen(false);
            }
        };

        if (isMoreMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMoreMenuOpen]);

    // 검색 기능
    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setSearchResults([]);
            setCurrentResultIndex(0);
            return;
        }

        // 메시지 내용에서 검색어 찾기 (대소문자 구분 없이)
        const results = messages
            .filter((msg) =>
                msg.content.toLowerCase().includes(query.toLowerCase()),
            )
            .map((msg) => msg.id);

        setSearchResults(results);
        setCurrentResultIndex(0);

        // 첫 번째 결과로 스크롤
        if (results.length > 0) {
            scrollToMessage(results[0]);
        }
    };

    const scrollToMessage = (messageId: number) => {
        const messageElement = document.getElementById(`message-${messageId}`);
        if (messageElement) {
            messageElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    const handlePreviousResult = () => {
        if (searchResults.length === 0) return;

        const newIndex =
            currentResultIndex > 0
                ? currentResultIndex - 1
                : searchResults.length - 1;
        setCurrentResultIndex(newIndex);
        scrollToMessage(searchResults[newIndex]);
    };

    const handleNextResult = () => {
        if (searchResults.length === 0) return;

        const newIndex =
            currentResultIndex < searchResults.length - 1
                ? currentResultIndex + 1
                : 0;
        setCurrentResultIndex(newIndex);
        scrollToMessage(searchResults[newIndex]);
    };

    const closeSearch = () => {
        setIsSearchMode(false);
        setSearchQuery('');
        setSearchResults([]);
        setCurrentResultIndex(0);
    };

    // 메시지 전송 핸들러
    const handleSendMessage = async (content: string) => {
        const newMessage: Message = {
            id: messages.length + 1,
            roomId: roomId,
            senderId: 0, // 본인
            content: content,
            timestamp: new Date().toISOString(),
            isRead: false,
            messageType: 'text',
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        // localStorage에 저장
        const storedMessages = JSON.parse(
            localStorage.getItem('chatMessages') || '{}',
        );
        storedMessages[roomId] = updatedMessages;
        localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

        // 0.5초 후 읽음 처리
        setTimeout(() => {
            setMessages((prevMessages) => {
                const readMessages = prevMessages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, isRead: true } : msg,
                );
                const storedMessages = JSON.parse(
                    localStorage.getItem('chatMessages') || '{}',
                );
                storedMessages[roomId] = readMessages;
                localStorage.setItem(
                    'chatMessages',
                    JSON.stringify(storedMessages),
                );
                return readMessages;
            });
        }, 500);

        // 1초 후 AI 응답 생성
        setTimeout(async () => {
            setIsAiTyping(true);
            try {
                // 대화 히스토리를 OpenAI 메시지 포맷으로 변환
                const conversationHistory = updatedMessages.map((msg) => ({
                    role: msg.senderId === 0 ? 'user' : 'assistant',
                    content: msg.content,
                }));

                console.log('Sending to AI:', conversationHistory);

                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: conversationHistory,
                        roomId: roomId,
                    }),
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('API Error:', errorData);
                    throw new Error(errorData.details || 'AI 응답 생성 실패');
                }

                // 스트리밍 응답 처리
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                let aiResponseText = '';

                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        // 텍스트 스트림을 직접 디코딩
                        const chunk = decoder.decode(value, { stream: true });
                        aiResponseText += chunk;
                    }
                }

                console.log('AI Response:', aiResponseText);

                setIsAiTyping(false);

                // AI 응답 메시지 추가 (빈 응답은 무시)
                if (aiResponseText.trim()) {
                    const aiMessage: Message = {
                        id: updatedMessages.length + 1,
                        roomId: roomId,
                        senderId: room?.matchedUser.userId || 1,
                        content: aiResponseText.trim(),
                        timestamp: new Date().toISOString(),
                        isRead: false, // 처음엔 읽지 않음
                        messageType: 'text',
                    };

                    // 함수형 업데이트로 최신 state 기반으로 AI 메시지 추가
                    setMessages((prevMessages) => {
                        const finalMessages = [...prevMessages, aiMessage];

                        // localStorage에 AI 응답도 저장
                        const storedMessages = JSON.parse(
                            localStorage.getItem('chatMessages') || '{}',
                        );
                        storedMessages[roomId] = finalMessages;
                        localStorage.setItem(
                            'chatMessages',
                            JSON.stringify(storedMessages),
                        );

                        return finalMessages;
                    });

                    // 0.5초 후 AI 메시지 읽음 처리
                    setTimeout(() => {
                        setMessages((prevMessages) => {
                            const readMessages = prevMessages.map((msg) =>
                                msg.id === aiMessage.id
                                    ? { ...msg, isRead: true }
                                    : msg,
                            );
                            const storedMessages = JSON.parse(
                                localStorage.getItem('chatMessages') || '{}',
                            );
                            storedMessages[roomId] = readMessages;
                            localStorage.setItem(
                                'chatMessages',
                                JSON.stringify(storedMessages),
                            );
                            return readMessages;
                        });
                    }, 500);
                } else {
                    console.warn('Empty AI response received - ignoring');
                }
            } catch (error) {
                console.error('AI 응답 생성 오류:', error);
                setIsAiTyping(false);

                // 에러 발생 시 간단한 응답 추가
                const errorMessage: Message = {
                    id: updatedMessages.length + 1,
                    roomId: roomId,
                    senderId: room?.matchedUser.userId || 1,
                    content: 'ㅠㅠ 잠깐 연결이 안 좋네',
                    timestamp: new Date().toISOString(),
                    isRead: false,
                    messageType: 'text',
                };

                // 함수형 업데이트로 최신 state 기반으로 에러 메시지 추가
                setMessages((prevMessages) => {
                    const finalMessages = [...prevMessages, errorMessage];

                    const storedMessages = JSON.parse(
                        localStorage.getItem('chatMessages') || '{}',
                    );
                    storedMessages[roomId] = finalMessages;
                    localStorage.setItem(
                        'chatMessages',
                        JSON.stringify(storedMessages),
                    );

                    return finalMessages;
                });

                // 0.5초 후 에러 메시지도 읽음 처리
                setTimeout(() => {
                    setMessages((prevMessages) => {
                        const readMessages = prevMessages.map((msg) =>
                            msg.id === errorMessage.id
                                ? { ...msg, isRead: true }
                                : msg,
                        );
                        const storedMessages = JSON.parse(
                            localStorage.getItem('chatMessages') || '{}',
                        );
                        storedMessages[roomId] = readMessages;
                        localStorage.setItem(
                            'chatMessages',
                            JSON.stringify(storedMessages),
                        );
                        return readMessages;
                    });
                }, 500);
            }
        }, 1000); // 1초 후 AI 응답 생성 setTimeout 종료
    };

    // 채팅방이 없는 경우
    if (!room) {
        return (
            <ErrorContainer>
                <ErrorText>채팅방을 찾을 수 없습니다.</ErrorText>
            </ErrorContainer>
        );
    }

    // 날짜별로 메시지 그룹화
    const groupMessagesByDate = () => {
        const groups: { [date: string]: Message[] } = {};

        messages.forEach((message) => {
            const date = dayjs(message.timestamp).format('YYYY년 M월 D일');
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return groups;
    };

    const messageGroups = groupMessagesByDate();

    // 프로필 이미지 표시 여부 결정
    const shouldShowProfileImage = (index: number) => {
        if (index === 0) return true;
        const currentMessage = messages[index];
        const previousMessage = messages[index - 1];

        // 발신자가 다르면 프로필 표시
        if (currentMessage.senderId !== previousMessage.senderId) {
            return true;
        }

        // 시간 차이가 5분 이상이면 프로필 표시
        const timeDiff = dayjs(currentMessage.timestamp).diff(
            dayjs(previousMessage.timestamp),
            'minute',
        );
        if (timeDiff >= 5) {
            return true;
        }

        return false;
    };

    return (
        <ChatRoomContainer>
            <ChatRoomHeader>
                {isSearchMode ? (
                    <SearchHeader>
                        <SearchInputWrapper>
                            <Search size={18} color="#939393" />
                            <SearchInput
                                type="text"
                                placeholder="메시지 검색"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        if (e.shiftKey) {
                                            handlePreviousResult();
                                        } else {
                                            handleNextResult();
                                        }
                                    }
                                }}
                                autoFocus
                            />
                            {searchQuery && (
                                <SearchResultInfo>
                                    {searchResults.length > 0
                                        ? `${currentResultIndex + 1}/${searchResults.length}`
                                        : '0'}
                                </SearchResultInfo>
                            )}
                        </SearchInputWrapper>
                        <SearchActions>
                            {searchResults.length > 0 && (
                                <>
                                    <SearchNavButton
                                        onClick={handlePreviousResult}
                                    >
                                        <ChevronUp size={20} />
                                    </SearchNavButton>
                                    <SearchNavButton onClick={handleNextResult}>
                                        <ChevronDown size={20} />
                                    </SearchNavButton>
                                </>
                            )}
                            <CloseSearchButton onClick={closeSearch}>
                                <X size={24} />
                            </CloseSearchButton>
                        </SearchActions>
                    </SearchHeader>
                ) : (
                    <>
                        <HeaderLeft>
                            <BackButton onClick={() => router.back()}>
                                <ChevronLeft size={28} />
                            </BackButton>
                            <ProfileImageWrapper>
                                <Image
                                    src={room.matchedUser.profileImage}
                                    width={40}
                                    height={40}
                                    alt={`${room.matchedUser.username} 프로필`}
                                />
                                {room.matchedUser.isOnline && (
                                    <OnlineIndicator />
                                )}
                            </ProfileImageWrapper>
                            <UserInfo>
                                <Username>{room.matchedUser.username}</Username>
                                <OnlineStatus>
                                    {room.matchedUser.isOnline
                                        ? '온라인'
                                        : '오프라인'}
                                </OnlineStatus>
                            </UserInfo>
                        </HeaderLeft>
                        <HeaderRight>
                            <MoreButton
                                aria-label="more-menu"
                                onClick={() =>
                                    setIsMoreMenuOpen(!isMoreMenuOpen)
                                }
                            >
                                <MoreVertical size={24} />

                                {isMoreMenuOpen && (
                                    <MoreDropdown
                                        data-more-dropdown
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreMenuItem
                                            onClick={() => {
                                                setIsSearchMode(true);
                                                setIsMoreMenuOpen(false);
                                            }}
                                        >
                                            <Search size={18} />
                                            <span>대화 내용 검색</span>
                                        </MoreMenuItem>
                                        <MoreMenuItem
                                            onClick={() => {
                                                toast(
                                                    '알림 설정 기능은 준비 중입니다.',
                                                );
                                                setIsMoreMenuOpen(false);
                                            }}
                                        >
                                            <Bell size={18} />
                                            <span>알림 설정</span>
                                        </MoreMenuItem>
                                        <MoreMenuItem
                                            onClick={() => {
                                                toast(
                                                    '차단하기 기능은 준비 중입니다.',
                                                );
                                                setIsMoreMenuOpen(false);
                                            }}
                                        >
                                            <Ban size={18} />
                                            <span>차단하기</span>
                                        </MoreMenuItem>
                                        <MoreMenuItem
                                            onClick={() => {
                                                toast(
                                                    '신고하기 기능은 준비 중입니다.',
                                                );
                                                setIsMoreMenuOpen(false);
                                            }}
                                        >
                                            <Flag size={18} />
                                            <span>신고하기</span>
                                        </MoreMenuItem>
                                        <MoreMenuItem
                                            $danger
                                            onClick={() => {
                                                toast(
                                                    '채팅방 나기기 기능은 준비 중입니다.',
                                                );
                                                setIsMoreMenuOpen(false);
                                            }}
                                        >
                                            <LogOut size={18} />
                                            <span>채팅방 나가기</span>
                                        </MoreMenuItem>
                                    </MoreDropdown>
                                )}
                            </MoreButton>
                        </HeaderRight>
                    </>
                )}
            </ChatRoomHeader>

            <MessagesContainer>
                {Object.entries(messageGroups).map(([date, dateMessages]) => (
                    <div key={date}>
                        <DateDivider>
                            <DateText>{date}</DateText>
                        </DateDivider>
                        {dateMessages.map((message) => {
                            const globalIndex = messages.indexOf(message);
                            const isMine = message.senderId === 0;
                            const showProfile =
                                !isMine && shouldShowProfileImage(globalIndex);

                            const isCurrentResult =
                                searchResults[currentResultIndex] ===
                                message.id;

                            return (
                                <div
                                    key={message.id}
                                    id={`message-${message.id}`}
                                >
                                    <MessageBubble
                                        message={message}
                                        isMine={isMine}
                                        senderProfileImage={
                                            room.matchedUser.profileImage
                                        }
                                        showProfileImage={showProfile}
                                        searchQuery={searchQuery}
                                        isCurrentSearchResult={isCurrentResult}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
                {isAiTyping && (
                    <TypingIndicatorWrapper>
                        <TypingIndicator />
                    </TypingIndicatorWrapper>
                )}
                <div ref={messagesEndRef} />
            </MessagesContainer>

            <MessageInput onSendMessage={handleSendMessage} />
        </ChatRoomContainer>
    );
}

const ChatRoomContainer = styled.main`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #1a1a1a;
`;

const ChatRoomHeader = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 800px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(env(safe-area-inset-top) + 1.2rem) 2rem 1.2rem;
    background-color: #1a1a1a;
    border-bottom: 0.1rem solid #3f3f41;
    z-index: 1000;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #939393;
    cursor: pointer;
    padding: 0.8rem;
    margin-left: -0.8rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #252527;
        }
    }
`;

const ProfileImageWrapper = styled.div`
    position: relative;

    img {
        border-radius: 50%;
        object-fit: cover;
    }
`;

const OnlineIndicator = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #22c55e;
    border: 0.2rem solid #1a1a1a;
    border-radius: 50%;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const Username = styled.h1`
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const OnlineStatus = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
`;

const MoreButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #939393;
    cursor: pointer;
    padding: 0.8rem;
    margin-right: -0.8rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #252527;
        }
    }
`;

const MoreDropdown = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 200px;
    background: #252527;
    border: 1px solid #3f3f41;
    border-radius: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    z-index: 999;
`;

const MoreMenuItem = styled.div<{ $danger?: boolean }>`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem 1.6rem;
    cursor: pointer;
    color: ${({ $danger }) => ($danger ? '#ef4444' : '#ffffff')};

    span {
        font-size: 1.4rem;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #2a2a2c;
        }
    }

    &:not(:last-child) {
        border-bottom: 1px solid #3f3f41;
    }
`;

const MoreMenuDivider = styled.div`
    height: 1px;
    background: #3f3f41;
    margin: 0.4rem 0;
`;

const SearchHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: 100%;
    height: 4.65rem;
`;

const SearchInputWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: #252527;
    border-radius: 2rem;
    padding: 0.8rem 1.6rem;
`;

const SearchInput = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 1.4rem;

    &::placeholder {
        color: #939393;
    }
`;

const SearchResultInfo = styled.span`
    font-size: 1.2rem;
    color: #939393;
    white-space: nowrap;
`;

const SearchActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
`;

const SearchNavButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #939393;
    cursor: pointer;
    padding: 0.6rem;
    min-width: 36px;
    min-height: 36px;
    border-radius: 50%;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #252527;
        }
    }
`;

const CloseSearchButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #939393;
    cursor: pointer;
    padding: 0.6rem;
    min-width: 36px;
    min-height: 36px;
    border-radius: 50%;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #252527;
        }
    }
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding-top: calc(env(safe-area-inset-top) + 7rem);
    padding-bottom: calc(10rem + env(safe-area-inset-bottom));

    &::-webkit-scrollbar {
        width: 0.6rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #3f3f41;
        border-radius: 0.3rem;
    }
`;

const DateDivider = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 0 1rem;
`;

const DateText = styled.div`
    padding: 0.6rem 1.4rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 1.6rem;
    font-size: 1.2rem;
    color: #939393;
`;

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #1a1a1a;
`;

const ErrorText = styled.p`
    font-size: 1.6rem;
    color: #939393;
`;

const TypingIndicatorWrapper = styled.div`
    padding: 1rem 2rem;
    display: flex;
    align-items: flex-start;
`;
