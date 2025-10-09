'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';

import styled from '@emotion/styled';

import { Message } from '@/data/chatMockData';

interface MessageBubbleProps {
    message: Message;
    isMine: boolean;
    senderProfileImage?: string;
    showProfileImage: boolean; // 같은 발신자의 연속 메시지인 경우 프로필 숨김
    searchQuery?: string; // 검색어
    isCurrentSearchResult?: boolean; // 현재 선택된 검색 결과인지
}

export default function MessageBubble({
    message,
    isMine,
    senderProfileImage,
    showProfileImage,
    searchQuery,
    isCurrentSearchResult,
}: MessageBubbleProps) {
    // 검색어 하이라이트 함수
    const highlightText = (text: string, query: string) => {
        if (!query || !query.trim()) return text;

        try {
            // 정규식 특수문자 이스케이프
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

            return parts.map((part, index) => {
                if (part.toLowerCase() === query.toLowerCase()) {
                    return (
                        <Highlight key={index} $isCurrent={isCurrentSearchResult}>
                            {part}
                        </Highlight>
                    );
                }
                return part;
            });
        } catch (error) {
            // 정규식 에러 발생 시 원본 텍스트 반환
            console.error('Highlight error:', error);
            return text;
        }
    };

    // 시스템 메시지인 경우
    if (message.messageType === 'system') {
        return (
            <SystemMessageContainer>
                <SystemMessage>{message.content}</SystemMessage>
            </SystemMessageContainer>
        );
    }

    // 일반 텍스트 메시지
    return (
        <MessageContainer $isMine={isMine}>
            {!isMine && showProfileImage && senderProfileImage && (
                <ProfileImage>
                    <Image
                        src={senderProfileImage}
                        width={32}
                        height={32}
                        alt="프로필"
                    />
                </ProfileImage>
            )}
            {!isMine && !showProfileImage && <ProfileSpacer />}

            <BubbleWrapper $isMine={isMine}>
                <Bubble $isMine={isMine}>
                    {searchQuery
                        ? highlightText(message.content, searchQuery)
                        : message.content}
                </Bubble>
                <MessageInfo $isMine={isMine}>
                    <TimeStamp>{dayjs(message.timestamp).format('A h:mm')}</TimeStamp>
                    {isMine && message.isRead && <ReadStatus>읽음</ReadStatus>}
                </MessageInfo>
            </BubbleWrapper>
        </MessageContainer>
    );
}

const SystemMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 2rem 1rem;
`;

const SystemMessage = styled.div`
    padding: 0.8rem 1.6rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 1.6rem;
    font-size: 1.3rem;
    color: #939393;
    text-align: center;
    max-width: 80%;
`;

const MessageContainer = styled.div<{ $isMine: boolean }>`
    display: flex;
    align-items: flex-end;
    gap: 0.8rem;
    padding: 0.4rem 2rem;
    justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
`;

const ProfileImage = styled.div`
    flex-shrink: 0;

    img {
        border-radius: 50%;
        object-fit: cover;
    }
`;

const ProfileSpacer = styled.div`
    width: 3.2rem;
    flex-shrink: 0;
`;

const BubbleWrapper = styled.div<{ $isMine: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
    max-width: 70%;
`;

const Bubble = styled.div<{ $isMine: boolean }>`
    padding: 1rem 1.4rem;
    border-radius: ${({ $isMine }) =>
        $isMine ? '1.6rem 1.6rem 0.4rem 1.6rem' : '1.6rem 1.6rem 1.6rem 0.4rem'};
    background: ${({ $isMine }) =>
        $isMine
            ? 'linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%)'
            : '#252527'};
    color: #ffffff;
    font-size: 1.5rem;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
`;

const MessageInfo = styled.div<{ $isMine: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.4rem;
    flex-direction: ${({ $isMine }) => ($isMine ? 'row-reverse' : 'row')};
`;

const TimeStamp = styled.span`
    font-size: 1.1rem;
    color: #6b6b6b;
`;

const ReadStatus = styled.span`
    font-size: 1.1rem;
    color: #4272ec;
    font-weight: 500;
`;

const Highlight = styled.mark<{ $isCurrent?: boolean }>`
    background-color: ${({ $isCurrent }) =>
        $isCurrent ? '#fbbf24' : '#fde047'};
    color: #000000;
    font-weight: 600;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
`;
