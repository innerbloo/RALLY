'use client';

import { Bell, ChevronDown, Search, UserPlus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { useQuickMatch } from '@/contexts/QuickMatchContext';

interface UserStatus {
    isOnline: boolean;
    currentGame: string | null;
    matchingStatus: 'available' | 'matching' | 'in-game';
}

interface Notification {
    id: number;
    type: 'match' | 'message' | 'community';
    title: string;
    message: string;
    time: string;
    isRead: boolean;
}

const mockUserStatus: UserStatus = {
    isOnline: true,
    currentGame: '리그오브레전드',
    matchingStatus: 'available',
};

const mockNotifications: Notification[] = [
    {
        id: 1,
        type: 'match',
        title: '매칭 요청',
        message: '멋졌으면 핑찍어님이 듀오 요청을 보냈습니다.',
        time: '방금 전',
        isRead: false,
    },
    {
        id: 2,
        type: 'message',
        title: '새 메시지',
        message: '채팅방에 새 메시지가 있습니다.',
        time: '5분 전',
        isRead: false,
    },
];

const games = [
    { id: 'lol', name: '리그오브레전드', icon: '/game1.png' },
    { id: 'tft', name: '전략적 팀 전투', icon: '/game2.png' },
    { id: 'valorant', name: '발로란트', icon: '/game3.png' },
    { id: 'overwatch', name: '오버워치2', icon: '/game4.png' },
    { id: 'pubg', name: '배틀그라운드', icon: '/game5.png' },
];

export default function Header() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isGameSelectOpen, setIsGameSelectOpen] = useState(false);
    const [currentGame, setCurrentGame] = useState('리그오브레전드');

    // QuickMatch progress context (will be 0 if not in QuickMatch)
    const { progress } = useQuickMatch();
    const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

    // 스크롤 시 드롭다운 닫기
    useEffect(() => {
        const handleScroll = () => {
            setIsNotificationOpen(false);
            setIsGameSelectOpen(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getStatusColor = (status: UserStatus['matchingStatus']) => {
        switch (status) {
            case 'available':
                return '#22c55e'; // green
            case 'matching':
                return '#f59e0b'; // amber
            case 'in-game':
                return '#ef4444'; // red
            default:
                return '#6b7280'; // gray
        }
    };

    const getStatusText = (status: UserStatus['matchingStatus']) => {
        switch (status) {
            case 'available':
                return '매칭 가능';
            case 'matching':
                return '매칭 중';
            case 'in-game':
                return '게임 중';
            default:
                return '오프라인';
        }
    };

    return (
        <HeaderContainer>
            <ProgressOverlay $progress={progress} />
            <HeaderWrapper>
                {/* 브랜딩 영역 */}
                <BrandingSection>
                    <Logo>
                        <Image
                            src={'/logo-b2.png'}
                            width={72}
                            height={20}
                            alt={'로고'}
                        ></Image>
                    </Logo>
                    {/*<StatusIndicator>*/}
                    {/*    <StatusDot $color={getStatusColor(mockUserStatus.matchingStatus)} />*/}
                    {/*    <StatusText>{getStatusText(mockUserStatus.matchingStatus)}</StatusText>*/}
                    {/*</StatusIndicator>*/}
                </BrandingSection>

                {/* 액션 영역 */}
                <ActionSection>
                    {/* 게임 선택 */}
                    <GameSelect
                        onClick={() => {
                            setIsGameSelectOpen(!isGameSelectOpen);
                            setIsNotificationOpen(false);
                        }}
                    >
                        <Image
                            src={
                                games.find((g) => g.name === currentGame)
                                    ?.icon || '/game1.png'
                            }
                            width={24}
                            height={24}
                            alt={currentGame}
                        />
                        <span>{currentGame}</span>
                        <ChevronDown size={16} />

                        {isGameSelectOpen && (
                            <GameDropdown>
                                {games.map((game) => (
                                    <GameItem
                                        key={game.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentGame(game.name);
                                            setIsGameSelectOpen(false);
                                        }}
                                    >
                                        <Image
                                            src={game.icon}
                                            width={20}
                                            height={20}
                                            alt={game.name}
                                        />
                                        <span>{game.name}</span>
                                    </GameItem>
                                ))}
                            </GameDropdown>
                        )}
                    </GameSelect>

                    {/* 빠른 매칭 버튼 */}
                    {/*<QuickMatchButton>*/}
                    {/*    <UserPlus size={18} />*/}
                    {/*    <span>매칭</span>*/}
                    {/*</QuickMatchButton>*/}

                    {/* 알림 */}
                    <NotificationButton
                        onClick={() => {
                            setIsNotificationOpen(!isNotificationOpen);
                            setIsGameSelectOpen(false);
                        }}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <NotificationBadge>{unreadCount}</NotificationBadge>
                        )}

                        {isNotificationOpen && (
                            <NotificationDropdown>
                                <NotificationHeader>알림</NotificationHeader>
                                {mockNotifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        $isRead={notification.isRead}
                                    >
                                        <NotificationContent>
                                            <NotificationTitle>
                                                {notification.title}
                                            </NotificationTitle>
                                            <NotificationMessage>
                                                {notification.message}
                                            </NotificationMessage>
                                        </NotificationContent>
                                        <NotificationTime>
                                            {notification.time}
                                        </NotificationTime>
                                    </NotificationItem>
                                ))}
                            </NotificationDropdown>
                        )}
                    </NotificationButton>

                    {/* 프로필 */}
                    {/*<ProfileButton>*/}
                    {/*    <Image*/}
                    {/*        src="/lol/profile-lol-1.png"*/}
                    {/*        width={32}*/}
                    {/*        height={32}*/}
                    {/*        alt="프로필"*/}
                    {/*    />*/}
                    {/*</ProfileButton>*/}
                </ActionSection>
            </HeaderWrapper>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #1a1a1a;
    border-bottom: 1px solid #3f3f41;
    padding-top: env(safe-area-inset-top);
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 100%;
`;

const BrandingSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const Logo = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #4272ec;
    margin: 0;
    height: 2rem;
`;

const StatusIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const StatusDot = styled.div<{ $color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
`;

const StatusText = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const ActionSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    position: relative;
`;

const GameSelect = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: #252527;
    border-radius: 2rem;
    cursor: pointer;
    position: relative;
    min-width: 44px;

    span {
        font-size: 1.3rem;
        color: #ffffff;
    }

    svg {
        color: #939393;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #2a2a2c;
        }
    }

    @media (max-width: 480px) {
        span {
            display: none;
        }
    }
`;

const GameDropdown = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    background: #252527;
    border: 1px solid #3f3f41;
    border-radius: 1.2rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const GameItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    cursor: pointer;

    span {
        font-size: 1.3rem;
        color: #ffffff;
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

const QuickMatchButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: #4272ec;
    border: none;
    border-radius: 2rem;
    color: #ffffff;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    min-width: 44px;

    &:hover {
        background: #315fbb;
    }

    @media (max-width: 480px) {
        span {
            display: none;
        }
        padding: 0.8rem;
    }
`;

const NotificationButton = styled.div`
    position: relative;
    cursor: pointer;
    padding: 0.8rem;
    border-radius: 50%;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #252527;
        }
    }

    svg {
        color: #939393;
    }
`;

const NotificationBadge = styled.span`
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    background: #ef4444;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 1rem;
    min-width: 1.6rem;
    text-align: center;
    line-height: 1.2;
`;

const NotificationDropdown = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    width: 300px;
    background: #252527;
    border: 1px solid #3f3f41;
    border-radius: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 999;

    @media (max-width: 480px) {
        width: 280px;
        right: -2rem;
    }
`;

const NotificationHeader = styled.div`
    padding: 1.2rem 1.5rem 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    border-bottom: 1px solid #3f3f41;
`;

const NotificationItem = styled.div<{ $isRead: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.2rem 1.5rem;
    background: ${({ $isRead }) =>
        $isRead ? 'transparent' : 'rgba(66, 114, 236, 0.05)'};

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #2a2a2c;
        }
    }

    &:not(:last-child) {
        border-bottom: 1px solid #3f3f41;
    }
`;

const NotificationContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const NotificationTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
    color: #ffffff;
`;

const NotificationMessage = styled.div`
    font-size: 1.2rem;
    color: #939393;
    line-height: 1.4;
`;

const NotificationTime = styled.div`
    font-size: 1.1rem;
    color: #6b7280;
    white-space: nowrap;
`;

const ProfileButton = styled.div`
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 50%;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        border-radius: 50%;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #252527;
        }
    }
`;

const ProgressOverlay = styled.div<{ $progress: number }>`
    position: absolute;
    bottom: -3px;
    left: 0;
    height: 3px;
    width: ${({ $progress }) => $progress}%;
    background: linear-gradient(90deg, #4272ec 0%, #3a5fd9 100%);
    transition: width 0.3s ease;
    z-index: 1;
`;
