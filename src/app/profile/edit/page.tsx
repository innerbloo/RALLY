'use client';

import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

export default function ProfileEditPage() {
    const router = useRouter();
    const [nickname, setNickname] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>('');

    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const bioTextareaRef = useRef<HTMLTextAreaElement>(null);

    // 페이지 진입 시 스크롤 최상단 이동 및 프로필 정보 로드
    useEffect(() => {
        window.scrollTo(0, 0);

        // localStorage에서 프로필 정보 불러오기
        const userProfile = JSON.parse(
            localStorage.getItem('userProfile') ||
                '{"nickname":"한성대 즐겜러","profileImage":"/hsu.png","bio":""}',
        );

        setNickname(userProfile.nickname);
        setBio(userProfile.bio);
        setProfileImage(userProfile.profileImage);
        setImagePreview(userProfile.profileImage);
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview('/hsu.png'); // 기본 이미지로 리셋
    };

    const handleSubmit = () => {
        // 유효성 검사
        if (!nickname.trim()) {
            toast.error('닉네임을 입력해주세요.');
            nicknameInputRef.current?.focus();
            return;
        }

        if (nickname.trim().length < 2) {
            toast.error('닉네임은 최소 2자 이상이어야 합니다.');
            nicknameInputRef.current?.focus();
            return;
        }

        if (nickname.trim().length > 20) {
            toast.error('닉네임은 최대 20자까지 입력 가능합니다.');
            nicknameInputRef.current?.focus();
            return;
        }

        // 프로필 저장
        const updatedProfile = {
            nickname: nickname.trim(),
            profileImage: imagePreview || '/hsu.png',
            bio: bio.trim(),
        };

        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        toast.success('프로필이 저장되었습니다!');
        router.push('/profile', { scroll: false });
    };

    const handleCancel = () => {
        router.push('/profile', { scroll: false });
    };

    return (
        <EditContainer>
            <FormContent>
                <FormSection>
                    <SectionLabel>
                        프로필 이미지 <Required>*</Required>
                    </SectionLabel>
                    <ImageUploadArea>
                        {imagePreview ? (
                            <ImagePreviewContainer>
                                <ProfileImagePreview
                                    src={imagePreview}
                                    alt="프로필 미리보기"
                                    width={120}
                                    height={120}
                                />
                                <RemoveImageButton onClick={handleRemoveImage}>
                                    <X size={20} />
                                </RemoveImageButton>
                            </ImagePreviewContainer>
                        ) : (
                            <ImageUploadButton>
                                <ImageUploadLabel htmlFor="image-upload">
                                    <ImageIcon size={32} />
                                    <span>프로필 이미지 업로드</span>
                                </ImageUploadLabel>
                                <ImageUploadInput
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </ImageUploadButton>
                        )}
                    </ImageUploadArea>
                </FormSection>

                <FormSection>
                    <SectionLabel>
                        닉네임 <Required>*</Required>
                    </SectionLabel>
                    <NicknameInput
                        ref={nicknameInputRef}
                        type="text"
                        placeholder="닉네임을 입력하세요 (2-20자)"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        maxLength={20}
                    />
                    <CharacterCount>{nickname.length} / 20</CharacterCount>
                </FormSection>

                <FormSection>
                    <SectionLabel>자기소개</SectionLabel>
                    <BioTextarea
                        ref={bioTextareaRef}
                        placeholder="자신을 소개하는 글을 작성해보세요."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={200}
                    />
                    <CharacterCount>{bio.length} / 200</CharacterCount>
                </FormSection>
            </FormContent>

            <ButtonGroup>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
                <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
            </ButtonGroup>
        </EditContainer>
    );
}

const EditContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(2rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh;
`;

const FormContent = styled.div`
    padding: 2rem;
`;

const FormSection = styled.section`
    margin-bottom: 3rem;
`;

const SectionLabel = styled.label`
    display: block;
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1.2rem;
`;

const Required = styled.span`
    color: #ef4444;
`;

const ImageUploadArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageUploadButton = styled.div`
    position: relative;
`;

const ImageUploadLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 12rem;
    height: 12rem;
    background-color: #252527;
    border: 0.2rem dashed #3f3f41;
    border-radius: 50%;
    color: #939393;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #4272ec;
        }
    }

    span {
        font-size: 1.2rem;
        font-weight: 500;
        text-align: center;
        padding: 0 1rem;
    }
`;

const ImageUploadInput = styled.input`
    display: none;
`;

const ImagePreviewContainer = styled.div`
    position: relative;
    width: 12rem;
    height: 12rem;
`;

const ProfileImagePreview = styled(Image)`
    border-radius: 50%;
    object-fit: cover;
`;

const RemoveImageButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #ef4444;
        }
    }
`;

const NicknameInput = styled.input`
    width: 100%;
    padding: 1.2rem 1.6rem;
    font-size: 1.6rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    color: #ffffff;
    outline: none;

    &::placeholder {
        color: #939393;
    }

    &:focus {
        border-color: #4272ec;
    }
`;

const BioTextarea = styled.textarea`
    width: 100%;
    min-height: 15rem;
    padding: 1.2rem 1.6rem;
    font-size: 1.6rem;
    line-height: 1.6;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    color: #ffffff;
    outline: none;
    resize: vertical;
    font-family: inherit;

    &::placeholder {
        color: #939393;
    }

    &:focus {
        border-color: #4272ec;
    }
`;

const CharacterCount = styled.div`
    text-align: right;
    font-size: 1.2rem;
    color: #939393;
    margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    padding: 0 2rem 2rem;
`;

const CancelButton = styled.button`
    flex: 1;
    padding: 1.6rem 2rem;
    background-color: #252527;
    color: #ffffff;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    font-size: 1.6rem;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;

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

const SubmitButton = styled.button`
    flex: 1;
    padding: 1.6rem 2rem;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    font-size: 1.6rem;
    font-weight: 700;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }

    &:active {
        background-color: #3151b8;
    }
`;
