'use client';

import { Bell, ChevronRight, LogOut, Settings, User } from 'lucide-react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

export default function SettingsMenu() {
    const handleNotificationSettings = () => {
        toast('알림 설정 기능은 준비 중입니다.');
    };

    const handleAccountSettings = () => {
        toast('계정 관리 기능은 준비 중입니다.');
    };

    const handleLogout = () => {
        toast.success('로그아웃되었습니다.');
        // 향후 실제 로그아웃 로직 추가
    };

    return (
        <MenuContainer>
            <SectionTitle>설정</SectionTitle>
            <MenuList>
                <MenuItem onClick={handleNotificationSettings}>
                    <MenuItemLeft>
                        <IconWrapper $color="#4272ec">
                            <Bell size={18} />
                        </IconWrapper>
                        <MenuItemText>알림 설정</MenuItemText>
                    </MenuItemLeft>
                    <ChevronRight size={18} color="#939393" />
                </MenuItem>

                <MenuItem onClick={handleAccountSettings}>
                    <MenuItemLeft>
                        <IconWrapper $color="#9C27B0">
                            <User size={18} />
                        </IconWrapper>
                        <MenuItemText>계정 관리</MenuItemText>
                    </MenuItemLeft>
                    <ChevronRight size={18} color="#939393" />
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <MenuItemLeft>
                        <IconWrapper $color="#ef4444">
                            <LogOut size={18} />
                        </IconWrapper>
                        <MenuItemText $danger>로그아웃</MenuItemText>
                    </MenuItemLeft>
                    <ChevronRight size={18} color="#939393" />
                </MenuItem>
            </MenuList>
        </MenuContainer>
    );
}

const MenuContainer = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 1.2rem;
    padding: 0 0.5rem;
`;

const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const MenuItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #2a2a2c;
            border-color: #4272ec;
        }
    }

    &:active {
        background-color: #2a2a2c;
    }
`;

const MenuItemLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const IconWrapper = styled.div<{ $color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
    height: 3.6rem;
    background-color: ${({ $color }) => $color}20;
    border-radius: 50%;
    color: ${({ $color }) => $color};
`;

const MenuItemText = styled.span<{ $danger?: boolean }>`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ $danger }) => ($danger ? '#ef4444' : '#ffffff')};
`;
