'use client';

import { Home, MessageCircle, User, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { ChatRoom, mockChatRooms } from '@/data/chatMockData';

interface MenuItemType {
    id: string;
    label: string;
    path: string;
    icon: React.ComponentType<{ size?: number }>;
    activeIcon: React.ComponentType<{ size?: number }>;
    size?: number;
}

const menuItems: MenuItemType[] = [
    {
        id: 'home',
        label: '홈',
        path: '/',
        icon: Home,
        activeIcon: Home,
    },
    {
        id: 'match',
        label: '매칭',
        path: '/match',
        icon: UserPlus,
        activeIcon: UserPlus,
    },
    {
        id: 'chat',
        label: '채팅',
        path: '/chat',
        icon: MessageCircle,
        activeIcon: MessageCircle,
        size: 18,
    },
    {
        id: 'community',
        label: '커뮤니티',
        path: '/community',
        icon: Users,
        activeIcon: Users,
    },
    {
        id: 'profile',
        label: '마이',
        path: '/profile',
        icon: User,
        activeIcon: User,
    },
];

export default function GNB() {
    const pathname = usePathname();
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms);
    // const [isInputFocused, setIsInputFocused] = useState(false);
    // const focusOutTimerRef = useRef<NodeJS.Timeout | null>(null);

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path);
    };

    const handleMatchClick = () => {
        // 매칭 페이지로 이동할 때 튜토리얼 표시 플래그 설정
        sessionStorage.setItem('showMatchTutorial', 'true');
    };

    // localStorage에서 채팅방 데이터 로드
    useEffect(() => {
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

        setChatRooms(allRooms);

        // localStorage 변경 감지 (다른 탭/창에서 변경 시)
        const handleStorageChange = () => {
            const updatedRooms = JSON.parse(
                localStorage.getItem('chatRooms') || '[]',
            ) as ChatRoom[];
            const mergedRooms = [...mockChatRooms];
            updatedRooms.forEach((storedRoom) => {
                if (!mergedRooms.find((room) => room.id === storedRoom.id)) {
                    mergedRooms.push(storedRoom);
                }
            });
            setChatRooms(mergedRooms);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // 읽지 않은 메시지 총 개수 계산
    const totalUnreadCount = useMemo(() => {
        return chatRooms.reduce((sum, room) => sum + room.unreadCount, 0);
    }, [chatRooms]);

    // Input 포커스 감지 (모바일에서만 GNB 숨김)
    // useEffect(() => {
    //     // 모바일 디바이스 감지
    //     const isMobileDevice = () => {
    //         const userAgent = navigator.userAgent || navigator.vendor;
    //         return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    //             userAgent.toLowerCase(),
    //         );
    //     };

    //     // 모바일이 아니면 early return
    //     if (!isMobileDevice()) {
    //         return;
    //     }

    //     const handleFocusIn = (e: FocusEvent) => {
    //         const target = e.target as HTMLElement;
    //         if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    //             // 이전에 설정된 타이머가 있으면 취소
    //             if (focusOutTimerRef.current) {
    //                 clearTimeout(focusOutTimerRef.current);
    //                 focusOutTimerRef.current = null;
    //             }
    //             setIsInputFocused(true);
    //         }
    //     };

    //     const handleFocusOut = (e: FocusEvent) => {
    //         const target = e.target as HTMLElement;
    //         if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    //             // 1초 후에 GNB 다시 표시
    //             focusOutTimerRef.current = setTimeout(() => {
    //                 setIsInputFocused(false);
    //                 focusOutTimerRef.current = null;
    //             }, 1000);
    //         }
    //     };

    //     document.addEventListener('focusin', handleFocusIn);
    //     document.addEventListener('focusout', handleFocusOut);

    //     return () => {
    //         document.removeEventListener('focusin', handleFocusIn);
    //         document.removeEventListener('focusout', handleFocusOut);
    //         // cleanup 시 타이머 정리
    //         if (focusOutTimerRef.current) {
    //             clearTimeout(focusOutTimerRef.current);
    //         }
    //     };
    // }, []);

    // Input 포커스 시 GNB 렌더링 중단
    // if (isInputFocused) return null;

    return (
        <GNBContainer data-gnb>
            <GNBWrapper>
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    const IconComponent = active ? item.activeIcon : item.icon;
                    const showBadge =
                        item.id === 'chat' && totalUnreadCount > 0;

                    return (
                        <GNBItem key={item.id}>
                            <Link
                                href={item.path}
                                onClick={
                                    item.id === 'match'
                                        ? handleMatchClick
                                        : undefined
                                }
                            >
                                <GNBLink $active={active}>
                                    <IconWrapper>
                                        <IconComponent size={item.size ?? 20} />
                                        {showBadge && (
                                            <UnreadBadge>
                                                {totalUnreadCount > 99
                                                    ? '99+'
                                                    : totalUnreadCount}
                                            </UnreadBadge>
                                        )}
                                    </IconWrapper>
                                    <GNBLabel $active={active}>
                                        {item.label}
                                    </GNBLabel>
                                </GNBLink>
                            </Link>
                        </GNBItem>
                    );
                })}
            </GNBWrapper>
        </GNBContainer>
    );
}

const GNBContainer = styled.nav`
    position: fixed;
    bottom: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    max-width: 390px;
    width: calc(100% - 2.4rem);
    z-index: 1000;

    /* iOS 스타일 글래스모피즘 효과 */
    background: rgba(30, 30, 32, 0.85);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    /* 둥근 모서리 */
    border-radius: 2.4rem;

    /* 미묘한 테두리와 그림자 효과 */
    border: 0.1rem solid rgba(255, 255, 255, 0.15);
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 2px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.1);

    /* iOS Safari 하단 홈 인디케이터 영역 처리 */
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
        bottom: calc(1.2rem + env(safe-area-inset-bottom, 0));
    }

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
            bottom: 1.2rem;
        }
    }
`;

const GNBWrapper = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    //padding: 1.4rem 1.2rem;
    padding: 0.8rem;
    margin: 0;
    list-style: none;
`;

const GNBItem = styled.li`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const GNBLink = styled.div<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem;
    min-width: 44px;
    transition: all 0.2s ease;
    color: ${({ $active }) => ($active ? '#4272EC' : '#939393')};

    svg {
        stroke-width: ${({ $active }) => ($active ? '2.5' : '1.5')};
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: ${({ $active }) => ($active ? '#3a5fd9' : '#ffffff')};
        }
    }
`;

const IconWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
        width: 2rem;
        height: 2rem;
        text-align: center;
    }
`;

const UnreadBadge = styled.div`
    position: absolute;
    top: -0.6rem;
    right: -0.8rem;
    min-width: 1.8rem;
    height: 1.8rem;
    padding: 0 0.4rem;
    background: #4272ec;
    border-radius: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    border: 0.2rem solid #1a1a1a;
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);
`;

const GNBLabel = styled.span<{ $active: boolean }>`
    font-size: 1.1rem;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};
    text-align: center;
`;
