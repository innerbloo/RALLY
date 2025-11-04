'use client';

import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

interface MentorActionButtonsProps {
    mentorId: number;
    mentorName: string;
    mentorProfileImage?: string;
}

export default function MentorActionButtons({
    mentorId,
    mentorName,
    mentorProfileImage = '/mentor/mentor-profile-1.png',
}: MentorActionButtonsProps) {
    const router = useRouter();
    const [isSaved, setIsSaved] = useState(false);

    // 로컬스토리지에서 좋아요 상태 불러오기
    useEffect(() => {
        const savedMentors = JSON.parse(
            localStorage.getItem('savedMentors') || '[]',
        );
        setIsSaved(savedMentors.includes(mentorId));
    }, [mentorId]);

    const handleApply = () => {
        toast.success(`${mentorName} 멘토에게 멘토링을 신청했습니다!`, {
            id: 'mentor-apply',
        });
    };

    const handleMessage = () => {
        // 기존 채팅방 확인 또는 새로 생성
        const chatRooms = JSON.parse(localStorage.getItem('chatRooms') || '[]');
        const existingRoomIndex = chatRooms.findIndex(
            (room: { matchedUser: { userId: number; isMentor?: boolean } }) =>
                room.matchedUser.userId === mentorId &&
                room.matchedUser.isMentor === true,
        );

        if (existingRoomIndex !== -1) {
            // 기존 채팅방이 있으면 프로필 이미지를 최신 정보로 업데이트
            chatRooms[existingRoomIndex].matchedUser.profileImage =
                mentorProfileImage;
            chatRooms[existingRoomIndex].matchedUser.username = mentorName;
            localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
            router.push(`/chat/${chatRooms[existingRoomIndex].id}`, { scroll: false });
        } else {
            // 새 채팅방 생성 로직
            const newRoom = {
                id: Date.now(),
                matchedUser: {
                    userId: mentorId,
                    username: mentorName,
                    profileImage: mentorProfileImage,
                    isOnline: true,
                    isMentor: true,
                },
                game: {
                    name: '멘토링',
                    image: '/game1.png',
                },
                lastMessage: {
                    content: '멘토링 문의를 시작했습니다.',
                    timestamp: new Date().toISOString(),
                    senderId: 0,
                },
                unreadCount: 0,
                matchedAt: new Date().toISOString(),
            };

            chatRooms.push(newRoom);
            localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
            router.push(`/chat/${newRoom.id}`, { scroll: false });
        }
    };

    const handleSave = () => {
        const savedMentors = JSON.parse(
            localStorage.getItem('savedMentors') || '[]',
        );

        if (!isSaved) {
            // 좋아요 추가
            const updatedMentors = [...savedMentors, mentorId];
            localStorage.setItem(
                'savedMentors',
                JSON.stringify(updatedMentors),
            );
            setIsSaved(true);
            toast.success('찜 목록에 추가했습니다!', {
                id: 'mentor-save',
            });
        } else {
            // 좋아요 제거
            const updatedMentors = savedMentors.filter(
                (id: number) => id !== mentorId,
            );
            localStorage.setItem(
                'savedMentors',
                JSON.stringify(updatedMentors),
            );
            setIsSaved(false);
            toast.success('찜 목록에서 제거했습니다!', {
                id: 'mentor-unsave',
            });
        }
    };

    return (
        <FixedButtonContainer>
            <ButtonWrapper>
                <SaveButton onClick={handleSave} $active={isSaved}>
                    <Heart
                        size={24}
                        fill={isSaved ? '#ef4444' : 'none'}
                        color={isSaved ? '#ef4444' : '#ffffff'}
                    />
                </SaveButton>

                <MessageButton onClick={handleMessage}>
                    <MessageCircle size={20} />
                    <span>1:1 문의</span>
                </MessageButton>

                <ApplyButton onClick={handleApply}>멘토링 신청하기</ApplyButton>
            </ButtonWrapper>
        </FixedButtonContainer>
    );
}

const FixedButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 430px;
    margin: 0 auto;
    background: linear-gradient(
        to top,
        #1a1a1a 0%,
        #1a1a1a 70%,
        rgba(26, 26, 26, 0.95) 90%,
        rgba(26, 26, 26, 0) 100%
    );
    padding: 1.5rem 2rem calc(env(safe-area-inset-bottom) + 1.5rem);
    z-index: 1000;

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding: 1.5rem 2rem 1.5rem;
    }
`;

const ButtonWrapper = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
`;

const SaveButton = styled.button<{ $active: boolean }>`
    flex-shrink: 0;
    width: 5.6rem;
    height: 5.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $active }) => ($active ? '#ef444420' : '#252527')};
    border: 0.1rem solid ${({ $active }) => ($active ? '#ef4444' : '#3f3f41')};
    border-radius: 1.6rem;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: scale(1.05);
            border-color: ${({ $active }) => ($active ? '#dc2626' : '#4272ec')};
        }
    }
`;

const MessageButton = styled.button`
    flex-shrink: 0;
    height: 5.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0 2rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3f3f41;
            border-color: #4272ec;
        }
    }
`;

const ApplyButton = styled.button`
    flex: 1;
    height: 5.6rem;
    padding: 0 2rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    border: none;
    border-radius: 1.6rem;
    color: #ffffff;
    font-size: 1.6rem;
    font-weight: 700;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(66, 114, 236, 0.3);
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 6px 20px rgba(66, 114, 236, 0.4);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;
