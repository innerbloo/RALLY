'use client';

import { AlertCircle, Heart, MessageSquare, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import styled from '@emotion/styled';

interface ActionButtonsProps {
    userId: number;
    username: string;
    profileImage: string;
}

export default function ActionButtons({
    userId,
    username,
    profileImage,
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
        // 기존 채팅방 확인 또는 새로 생성
        const chatRooms = JSON.parse(localStorage.getItem('chatRooms') || '[]');
        const existingRoomIndex = chatRooms.findIndex(
            (room: { matchedUser: { userId: number } }) =>
                room.matchedUser.userId === userId,
        );

        if (existingRoomIndex !== -1) {
            // 기존 채팅방이 있으면 프로필 이미지를 최신 정보로 업데이트
            chatRooms[existingRoomIndex].matchedUser.profileImage = profileImage;
            chatRooms[existingRoomIndex].matchedUser.username = username;
            localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
            router.push(`/chat/${chatRooms[existingRoomIndex].id}`);
        } else {
            // 새 채팅방 생성 로직
            const newRoom = {
                id: Date.now(),
                matchedUser: {
                    userId,
                    username,
                    profileImage,
                    isOnline: true,
                },
                game: {
                    name: '리그오브레전드',
                    image: '/game1.png',
                },
                lastMessage: {
                    content: '프로필에서 채팅을 시작했습니다.',
                    timestamp: new Date().toISOString(),
                    senderId: 0,
                },
                unreadCount: 0,
                matchedAt: new Date().toISOString(),
            };

            chatRooms.push(newRoom);
            localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
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
        <>
            <Toaster
                position="top-center"
                containerStyle={{
                    top: 'calc(env(safe-area-inset-top) + 20px)',
                }}
                toastOptions={{
                    style: {
                        background:
                            'linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%)',
                        color: '#ffffff',
                        fontSize: '1.4rem',
                        padding: '1.2rem 1.6rem',
                        borderRadius: '1.2rem',
                        boxShadow: '0 4px 12px rgba(66, 114, 236, 0.3)',
                    },
                }}
            />

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
        </>
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
