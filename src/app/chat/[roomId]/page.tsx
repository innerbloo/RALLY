'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import MessageBubble from '@/app/components/MessageBubble';
import MessageInput from '@/app/components/MessageInput';
import TypingIndicator from '@/app/components/TypingIndicator';
import { mockChatRooms, mockMessages, Message } from '@/data/chatMockData';

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

    // localStorage에서 메시지 불러오기
    useEffect(() => {
        const storedMessages = JSON.parse(
            localStorage.getItem('chatMessages') || '{}',
        );

        // localStorage에 저장된 메시지가 있으면 사용, 없으면 mockMessages 사용
        const loadedMessages = storedMessages[roomId] || mockMessages[roomId] || [];
        setMessages(loadedMessages);
    }, [roomId]);

    // 자동 스크롤
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

        // 1초 후 읽음 처리
        setTimeout(() => {
            setMessages((prevMessages) => {
                const readMessages = prevMessages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, isRead: true } : msg,
                );
                const storedMessages = JSON.parse(
                    localStorage.getItem('chatMessages') || '{}',
                );
                storedMessages[roomId] = readMessages;
                localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
                return readMessages;
            });
        }, 1000);

        // AI 응답 생성
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

                const finalMessages = [...updatedMessages, aiMessage];
                setMessages(finalMessages);

                // localStorage에 AI 응답도 저장
                storedMessages[roomId] = finalMessages;
                localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

                // 1초 후 AI 메시지 읽음 처리
                setTimeout(() => {
                    setMessages((prevMessages) => {
                        const readMessages = prevMessages.map((msg) =>
                            msg.id === aiMessage.id ? { ...msg, isRead: true } : msg,
                        );
                        const storedMessages = JSON.parse(
                            localStorage.getItem('chatMessages') || '{}',
                        );
                        storedMessages[roomId] = readMessages;
                        localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
                        return readMessages;
                    });
                }, 1000);
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

            const finalMessages = [...updatedMessages, errorMessage];
            setMessages(finalMessages);
            storedMessages[roomId] = finalMessages;
            localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

            // 1초 후 에러 메시지도 읽음 처리
            setTimeout(() => {
                setMessages((prevMessages) => {
                    const readMessages = prevMessages.map((msg) =>
                        msg.id === errorMessage.id ? { ...msg, isRead: true } : msg,
                    );
                    const storedMessages = JSON.parse(
                        localStorage.getItem('chatMessages') || '{}',
                    );
                    storedMessages[roomId] = readMessages;
                    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
                    return readMessages;
                });
            }, 1000);
        }
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
                <HeaderLeft>
                    <BackButton onClick={() => router.back()}>
                        <ArrowLeft size={24} />
                    </BackButton>
                    <ProfileImageWrapper>
                        <Image
                            src={room.matchedUser.profileImage}
                            width={40}
                            height={40}
                            alt={`${room.matchedUser.username} 프로필`}
                        />
                        {room.matchedUser.isOnline && <OnlineIndicator />}
                    </ProfileImageWrapper>
                    <UserInfo>
                        <Username>{room.matchedUser.username}</Username>
                        <OnlineStatus>
                            {room.matchedUser.isOnline ? '온라인' : '오프라인'}
                        </OnlineStatus>
                    </UserInfo>
                </HeaderLeft>
                <HeaderRight>
                    <MoreButton>
                        <MoreVertical size={24} />
                    </MoreButton>
                </HeaderRight>
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
                                !isMine &&
                                shouldShowProfileImage(globalIndex);

                            return (
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                    isMine={isMine}
                                    senderProfileImage={
                                        room.matchedUser.profileImage
                                    }
                                    showProfileImage={showProfile}
                                />
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
    color: #ffffff;
    cursor: pointer;
    padding: 0.4rem;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: #4272ec;
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
    width: 1rem;
    height: 1rem;
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
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    padding: 0.4rem;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: #4272ec;
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
