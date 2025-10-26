'use client';

import { AlertCircle, Heart, MessageSquare, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

import { mockChatRooms } from '@/data/chatMockData';

interface ActionButtonsProps {
    userId: number;
    username: string;
    profileImage: string;
    game: string;
}

export default function ActionButtons({
    userId,
    username,
    profileImage,
    game,
}: ActionButtonsProps) {
    const router = useRouter();
    const [isFollowed, setIsFollowed] = useState(false);

    // 로컬스토리지에서 팔로우 상태 불러오기
    useEffect(() => {
        const followedUsers = JSON.parse(
            localStorage.getItem('followedUsers') || '[]',
        );
        setIsFollowed(followedUsers.includes(userId));
    }, [userId]);

    const handleChat = () => {
        // 목 데이터와 로컬스토리지의 채팅방을 모두 확인
        const storedRooms = JSON.parse(localStorage.getItem('chatRooms') || '[]');
        const allRooms = [...mockChatRooms, ...storedRooms];

        // 기존 채팅방이 있는지 확인
        const existingRoom = allRooms.find(
            (room) => room.matchedUser.userId === userId,
        );

        if (existingRoom) {
            // 기존 채팅방으로 이동
            router.push(`/chat/${existingRoom.id}`);
        } else {
            // 게임 이름에 따른 아이콘 매핑
            const gameImageMap: { [key: string]: string } = {
                '리그오브레전드': '/game1.png',
                '전략적 팀 전투': '/game2.png',
                '발로란트': '/game3.png',
                '오버워치2': '/game4.png',
                '배틀그라운드': '/game5.png',
            };

            // 새 채팅방 생성
            const newRoom = {
                id: Date.now(),
                matchedUser: {
                    userId,
                    username,
                    profileImage,
                    isOnline: true,
                },
                game: {
                    name: game,
                    image: gameImageMap[game] || '/game1.png',
                },
                lastMessage: {
                    content: '프로필에서 채팅을 시작했습니다.',
                    timestamp: new Date().toISOString(),
                    senderId: 0,
                },
                unreadCount: 0,
                matchedAt: new Date().toISOString(),
            };

            storedRooms.push(newRoom);
            localStorage.setItem('chatRooms', JSON.stringify(storedRooms));
            router.push(`/chat/${newRoom.id}`);
        }
    };

    const handleMatchRequest = () => {
        toast.success('매칭 신청을 보냈습니다!', {
            id: 'match-request',
            duration: 3000,
            icon: '🎮',
        });
    };

    const handleFollow = () => {
        const followedUsers = JSON.parse(
            localStorage.getItem('followedUsers') || '[]',
        );

        if (!isFollowed) {
            // 팔로우 추가
            const updatedUsers = [...followedUsers, userId];
            localStorage.setItem('followedUsers', JSON.stringify(updatedUsers));
            setIsFollowed(true);
            toast.success(`${username}님을 팔로우했습니다!`, {
                id: 'follow',
                duration: 2000,
                icon: '❤️',
            });
        } else {
            // 팔로우 취소
            const updatedUsers = followedUsers.filter(
                (id: number) => id !== userId,
            );
            localStorage.setItem('followedUsers', JSON.stringify(updatedUsers));
            setIsFollowed(false);
            toast.success('팔로우를 취소했습니다.', {
                id: 'follow',
                duration: 2000,
                icon: '💔',
            });
        }
    };

    const handleReport = () => {
        toast.error('신고 기능은 준비 중입니다.', {
            id: 'report',
            duration: 2000,
        });
    };

    return (
        <ButtonContainer>
            <PrimaryButton onClick={handleChat}>
                <MessageSquare size={20} />
                채팅하기
            </PrimaryButton>

            <PrimaryButton
                onClick={handleMatchRequest}
                $variant="secondary"
            >
                <Users size={20} />
                매칭 신청
            </PrimaryButton>

            <SecondaryButtons>
                <IconButton onClick={handleFollow} $active={isFollowed}>
                    <Heart size={20} />
                </IconButton>

                <IconButton onClick={handleReport}>
                    <AlertCircle size={20} />
                </IconButton>
            </SecondaryButtons>
        </ButtonContainer>
    );
}

const ButtonContainer = styled.div`
    display: flex;
    gap: 0.8rem;
    margin: 2rem 0;
    width: 100%;
    box-sizing: border-box;
`;

const PrimaryButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 1.2rem 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    background-color: ${({ $variant }) =>
        $variant === 'secondary' ? 'transparent' : '#4272ec'};
    color: ${({ $variant }) =>
        $variant === 'secondary' ? '#4272ec' : '#ffffff'};
    border: ${({ $variant }) =>
        $variant === 'secondary' ? '0.2rem solid #4272ec' : 'none'};
    border-radius: 1.2rem;
    transition: all 0.2s ease;
    white-space: nowrap;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${({ $variant }) =>
                $variant === 'secondary' ? '#4272ec20' : '#3a5fd9'};
            transform: translateY(-0.2rem);
            box-shadow: 0 4px 12px rgba(66, 114, 236, 0.2);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const SecondaryButtons = styled.div`
    display: flex;
    gap: 0.6rem;
    align-items: center;
    flex-shrink: 0;
`;

const IconButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.2rem;
    height: 4.2rem;
    flex-shrink: 0;
    background-color: ${({ $active }) =>
        $active ? '#ef444420' : 'transparent'};
    border: 0.2rem solid ${({ $active }) => ($active ? '#ef4444' : '#3f3f41')};
    border-radius: 1.2rem;
    color: ${({ $active }) => ($active ? '#ef4444' : '#939393')};
    transition: all 0.2s ease;
    cursor: pointer;

    svg {
        fill: ${({ $active }) => ($active ? '#ef4444' : 'none')};
        width: 1.8rem;
        height: 1.8rem;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${({ $active }) =>
                $active ? '#ef444430' : '#252527'};
            border-color: ${({ $active }) => ($active ? '#ef4444' : '#4272ec')};
            color: ${({ $active }) => ($active ? '#ef4444' : '#4272ec')};
        }
    }
`;
