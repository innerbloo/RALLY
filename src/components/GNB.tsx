'use client';

import { Home, MessageCircle, User, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from '@emotion/styled';

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

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path);
    };

    return (
        <GNBContainer>
            <GNBWrapper>
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    const IconComponent = active ? item.activeIcon : item.icon;

                    return (
                        <GNBItem key={item.id}>
                            <Link href={item.path}>
                                <GNBLink $active={active}>
                                    <IconWrapper>
                                        <IconComponent size={item.size ?? 20} />
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
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #1a1a1a;
    border-top: 1px solid #3f3f41;
    padding-bottom: calc(env(safe-area-inset-bottom) - 0.5rem);
`;

const GNBWrapper = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.8rem 0;
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
    cursor: pointer;
    transition: all 0.2s ease;
    color: ${({ $active }) => ($active ? '#4272EC' : '#939393')};

    svg {
        stroke-width: ${({ $active }) => ($active ? '2.5' : '1.5')};
    }

    &:hover {
        color: ${({ $active }) => ($active ? '#3a5fd9' : '#ffffff')};
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
        width: 2rem;
        height: 2rem;
        text-align: center;
    }
`;

const GNBLabel = styled.span<{ $active: boolean }>`
    font-size: 1.1rem;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};
    text-align: center;
`;
