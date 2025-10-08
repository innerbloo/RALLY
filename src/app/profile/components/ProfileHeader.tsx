'use client';

import { Edit2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

interface ProfileHeaderProps {
    profileImage: string;
    nickname: string;
    bio: string;
}

export default function ProfileHeader({
    profileImage,
    nickname,
    bio,
}: ProfileHeaderProps) {
    const router = useRouter();

    // 마침표 뒤에 줄바꿈 처리
    const formatBio = (text: string) => {
        if (!text) return '자기소개를 작성해주세요.';

        // 마침표, 느낌표, 물음표 뒤에 공백이 있으면 줄바꿈으로 변환
        const sentences = text.split(/([.!?])\s+/);
        const elements: React.ReactNode[] = [];

        for (let i = 0; i < sentences.length; i += 2) {
            if (sentences[i]) {
                elements.push(
                    <span key={i}>
                        {sentences[i]}
                        {sentences[i + 1] || ''}
                        {i + 2 < sentences.length && <br />}
                    </span>
                );
            }
        }

        return elements;
    };

    return (
        <HeaderContainer>
            <ProfileImageWrapper>
                <ProfileImage
                    src={profileImage}
                    width={80}
                    height={80}
                    alt={`${nickname} 프로필`}
                />
            </ProfileImageWrapper>
            <ProfileInfo>
                <NicknameRow>
                    <Nickname>{nickname}</Nickname>
                    <EditButton onClick={() => router.push('/profile/edit')}>
                        <Edit2 size={16} />
                        <span>프로필 수정</span>
                    </EditButton>
                </NicknameRow>
                <Bio>{formatBio(bio)}</Bio>
            </ProfileInfo>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display: flex;
    gap: 1.6rem;
    padding: 2rem;
    background-color: #252527;
    border-radius: 1.6rem;
    margin-bottom: 2rem;
`;

const ProfileImageWrapper = styled.div`
    flex-shrink: 0;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    min-width: 0;
`;

const NicknameRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
`;

const Nickname = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const EditButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    background-color: transparent;
    border: 0.1rem solid #4272ec;
    border-radius: 0.8rem;
    color: #4272ec;
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    span {
        @media (max-width: 768px) {
            display: none;
        }
    }

    @media (max-width: 768px) {
        padding: 0.8rem;
        border-radius: 50%;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #4272ec;
            color: #ffffff;
        }
    }

    &:active {
        background-color: #3a5fd9;
        border-color: #3a5fd9;
    }
`;

const Bio = styled.p`
    font-size: 1.4rem;
    color: #939393;
    line-height: 1.7;
    margin: 0;
    word-break: break-word;
    white-space: pre-wrap;
`;
