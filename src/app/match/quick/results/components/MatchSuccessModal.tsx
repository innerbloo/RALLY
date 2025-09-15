'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface MatchUser {
    id: number;
    profileImage: string;
    username: string;
    gameId: string;
    position?: React.ReactNode;
    tier: string;
    rank: string;
    winRate: number;
    kda: number;
    recentChampions: string[];
    gameStyles: string[];
    communicationStyles: string[];
    description: string;
    game: string;
}

interface MatchSuccessModalProps {
    user: MatchUser;
    onClose: () => void;
}

export default function MatchSuccessModal({
    user,
    onClose
}: MatchSuccessModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 모달 표시 애니메이션
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // 애니메이션 완료 후 콜백
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <ModalBackdrop $visible={isVisible} onClick={handleBackdropClick}>
            <ModalContainer $visible={isVisible}>
                {/* 축하 아이콘 */}
                <CelebrationSection>
                    <HeartIcon>💕</HeartIcon>
                    <SuccessTitle>매칭 성공!</SuccessTitle>
                    <SuccessSubtitle>
                        {user.username}님과 연결되었습니다
                    </SuccessSubtitle>
                </CelebrationSection>

                {/* 사용자 정보 */}
                <UserInfoSection>
                    <ProfileImage
                        src={user.profileImage}
                        alt={`${user.username} 프로필`}
                        width={80}
                        height={80}
                    />
                    <UserDetails>
                        <UserName>{user.username}</UserName>
                        <GameInfo>
                            <span>{user.gameId}</span>
                            <TierBadge>
                                {user.rank} {user.tier}
                            </TierBadge>
                        </GameInfo>
                        <Description>{user.description}</Description>
                    </UserDetails>
                </UserInfoSection>

                {/* 매칭 팁 */}
                <TipsSection>
                    <TipsTitle>💡 매칭 팁</TipsTitle>
                    <TipsList>
                        <TipItem>먼저 인사하고 간단한 소개를 해보세요</TipItem>
                        <TipItem>선호하는 게임 모드나 플레이 시간을 물어보세요</TipItem>
                        <TipItem>서로의 플레이 스타일을 존중해주세요</TipItem>
                    </TipsList>
                </TipsSection>

                {/* 액션 버튼 */}
                <ActionSection>
                    <ChatButton onClick={handleClose}>
                        💬 채팅하기
                    </ChatButton>
                    <SecondaryButton onClick={handleClose}>
                        나중에 하기
                    </SecondaryButton>
                </ActionSection>

                {/* 닫기 버튼 */}
                <CloseButton onClick={handleClose}>
                    ✕
                </CloseButton>
            </ModalContainer>
        </ModalBackdrop>
    );
}

// 애니메이션 키프레임
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const bounce = keyframes`
    0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0) scale(1);
    }
    40%, 43% {
        transform: translate3d(0, -8px, 0) scale(1.1);
    }
    70% {
        transform: translate3d(0, -4px, 0) scale(1.05);
    }
    90% {
        transform: translate3d(0, -2px, 0) scale(1.02);
    }
`;

const heartPulse = keyframes`
    0% {
        transform: scale(1);
    }
    14% {
        transform: scale(1.2);
    }
    28% {
        transform: scale(1);
    }
    42% {
        transform: scale(1.2);
    }
    70% {
        transform: scale(1);
    }
`;

const ModalBackdrop = styled.div<{ $visible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
    opacity: ${({ $visible }) => $visible ? 1 : 0};
    transition: opacity 0.3s ease;
    backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div<{ $visible: boolean }>`
    background-color: #252527;
    border-radius: 2rem;
    border: 0.1rem solid #4272ec;
    width: 100%;
    max-width: 42rem;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: ${({ $visible }) => $visible ? slideUp : 'none'} 0.3s ease-out;
    box-shadow: 0 20px 60px rgba(66, 114, 236, 0.3);
`;

const CelebrationSection = styled.div`
    text-align: center;
    padding: 3rem 2rem 2rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    border-radius: 2rem 2rem 0 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        animation: ${bounce} 2s ease-in-out infinite;
    }
`;

const HeartIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: ${heartPulse} 2s ease-in-out infinite;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
`;

const SuccessTitle = styled.h2`
    font-size: 2.4rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const SuccessSubtitle = styled.p`
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-weight: 500;
`;

const UserInfoSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    border: 0.3rem solid #4272ec;
    object-fit: cover;
    flex-shrink: 0;
`;

const UserDetails = styled.div`
    flex: 1;
    min-width: 0;
`;

const UserName = styled.h3`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.5rem;
`;

const GameInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.8rem;

    span {
        font-size: 1.3rem;
        color: #939393;
    }
`;

const TierBadge = styled.span`
    padding: 0.3rem 0.8rem;
    background-color: rgba(66, 114, 236, 0.2);
    color: #4272ec;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 0.8rem;
    border: 0.1rem solid #4272ec;
`;

const Description = styled.p`
    font-size: 1.3rem;
    color: #cccccc;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const TipsSection = styled.div`
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const TipsTitle = styled.h4`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 1rem;
`;

const TipsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const TipItem = styled.li`
    font-size: 1.2rem;
    color: #939393;
    line-height: 1.5;
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;

    &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #4272ec;
        font-weight: bold;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const ActionSection = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ChatButton = styled.button`
    width: 100%;
    padding: 1.4rem;
    font-size: 1.6rem;
    font-weight: 600;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(66, 114, 236, 0.4);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const SecondaryButton = styled.button`
    width: 100%;
    padding: 1.2rem;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: transparent;
    color: #939393;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #939393;
            color: #ffffff;
        }
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: rgba(0, 0, 0, 0.7);
            transform: scale(1.1);
        }
    }
`;