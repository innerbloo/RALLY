'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface ChatRoomCardProps {
    id: number;
    matchedUser: {
        userId: number;
        username: string;
        profileImage: string;
        position?: string;
        isOnline: boolean;
    };
    game: {
        name: string;
        image: string;
    };
    lastMessage: {
        content: string;
        timestamp: string;
        senderId: number;
    };
    unreadCount: number;
}

export default function ChatRoomCard({
    id,
    matchedUser,
    game,
    lastMessage,
    unreadCount,
}: ChatRoomCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/chat/${id}`, { scroll: false });
    };

    return (
        <CardContainer onClick={handleClick}>
            <GameIcon>
                <Image
                    src={game.image}
                    width={32}
                    height={32}
                    alt={game.name}
                />
            </GameIcon>

            <ProfileSection>
                <ProfileImageWrapper>
                    <Image
                        src={matchedUser.profileImage}
                        width={56}
                        height={56}
                        alt={`${matchedUser.username} 프로필`}
                    />
                    {matchedUser.isOnline && <OnlineIndicator />}
                </ProfileImageWrapper>
            </ProfileSection>

            <ContentSection>
                <TopRow>
                    <Username>{matchedUser.username}</Username>
                    <TimeStamp>
                        {dayjs(lastMessage.timestamp).fromNow()}
                    </TimeStamp>
                </TopRow>

                <BottomRow>
                    <LastMessage $hasUnread={unreadCount > 0}>
                        {lastMessage.content}
                    </LastMessage>
                    {unreadCount > 0 && (
                        <UnreadBadge>{unreadCount}</UnreadBadge>
                    )}
                </BottomRow>
            </ContentSection>
        </CardContainer>
    );
}

const CardContainer = styled.li`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.6rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
    transition: background-color 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const ProfileSection = styled.div`
    position: relative;
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
    bottom: 0.2rem;
    right: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #22c55e;
    border: 0.2rem solid #1a1a1a;
    border-radius: 50%;
`;

const ContentSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    min-width: 0;
`;

const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Username = styled.h3`
    font-size: 1.6rem;
    font-weight: 500;
    color: #ffffff;
    margin: 0;
`;

const TimeStamp = styled.span`
    font-size: 1.2rem;
    color: #939393;
    white-space: nowrap;
`;

const BottomRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

const LastMessage = styled.p<{ $hasUnread: boolean }>`
    font-size: 1.4rem;
    color: ${({ $hasUnread }) => ($hasUnread ? '#ffffff' : '#939393')};
    font-weight: ${({ $hasUnread }) => ($hasUnread ? '500' : '400')};
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
`;

const UnreadBadge = styled.div`
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.6rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    flex-shrink: 0;
`;

const GameIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
        border-radius: 0.8rem;
    }
`;
