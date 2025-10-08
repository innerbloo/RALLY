'use client';

import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

export default function NewPostPage() {
    const router = useRouter();
    const [selectedGame, setSelectedGame] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');

    const gameSelectRef = useRef<HTMLSelectElement>(null);
    const categorySelectRef = useRef<HTMLSelectElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

    // 페이지 진입 시 스크롤 최상단 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const games = [
        '리그오브레전드',
        '전략적 팀 전투',
        '발로란트',
        '오버워치2',
        '배틀그라운드',
    ];

    const categories = ['공략', '자유', '질문', '팁'];

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
        setImagePreview('');
    };

    const handleAddTag = () => {
        if (tagInput.trim() && tags.length < 5) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!selectedGame) {
            toast.error('게임을 선택해주세요.');
            gameSelectRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            return;
        }
        if (!selectedCategory) {
            toast.error('카테고리를 선택해주세요.');
            categorySelectRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            return;
        }
        if (!title.trim()) {
            toast.error('제목을 입력해주세요.');
            titleInputRef.current?.focus();
            return;
        }
        if (!content.trim()) {
            toast.error('내용을 입력해주세요.');
            contentTextareaRef.current?.focus();
            return;
        }

        // 로컬스토리지에서 프로필 정보 가져오기
        const userProfile = JSON.parse(
            localStorage.getItem('userProfile') ||
                '{"nickname":"현재유저","profileImage":"/hsu.png","bio":""}',
        );

        // 로컬스토리지에 게시글 저장
        const newPost = {
            id: Date.now(),
            image: imagePreview,
            username: userProfile.nickname,
            profileImage: userProfile.profileImage,
            title,
            content,
            createAt: new Date().toISOString(),
            comment: 0,
            game: selectedGame,
            category: selectedCategory,
            likes: 0,
            views: 0,
            isLiked: false,
            comments: [],
            tags,
        };

        const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        myPosts.unshift(newPost);
        localStorage.setItem('myPosts', JSON.stringify(myPosts));

        toast.success('게시글이 작성되었습니다!');
        router.push('/community');
    };

    return (
        <NewPostContainer>
            <FormContent>
                <FormSection>
                    <SectionLabel>
                        게임 선택 <Required>*</Required>
                    </SectionLabel>
                    <Select
                        ref={gameSelectRef}
                        value={selectedGame}
                        onChange={(e) => setSelectedGame(e.target.value)}
                    >
                        <option value="">게임을 선택하세요</option>
                        {games.map((game) => (
                            <option key={game} value={game}>
                                {game}
                            </option>
                        ))}
                    </Select>
                </FormSection>

                <FormSection>
                    <SectionLabel>
                        카테고리 선택 <Required>*</Required>
                    </SectionLabel>
                    <Select
                        ref={categorySelectRef}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">카테고리를 선택하세요</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Select>
                </FormSection>

                <FormSection>
                    <SectionLabel>
                        제목 <Required>*</Required>
                    </SectionLabel>
                    <TitleInput
                        ref={titleInputRef}
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                    />
                    <CharacterCount>
                        {title.length} / 100
                    </CharacterCount>
                </FormSection>

                <FormSection>
                    <SectionLabel>이미지 (선택)</SectionLabel>
                    {imagePreview ? (
                        <ImagePreviewContainer>
                            <PreviewImage
                                src={imagePreview}
                                alt="미리보기"
                                width={400}
                                height={250}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '1.2rem',
                                }}
                            />
                            <RemoveImageButton onClick={handleRemoveImage}>
                                <X size={20} />
                            </RemoveImageButton>
                        </ImagePreviewContainer>
                    ) : (
                        <ImageUploadButton>
                            <ImageUploadLabel htmlFor="image-upload">
                                <ImageIcon size={24} />
                                <span>이미지 업로드</span>
                            </ImageUploadLabel>
                            <ImageUploadInput
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </ImageUploadButton>
                    )}
                </FormSection>

                <FormSection>
                    <SectionLabel>
                        내용 <Required>*</Required>
                    </SectionLabel>
                    <ContentTextarea
                        ref={contentTextareaRef}
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={2000}
                    />
                    <CharacterCount>
                        {content.length} / 2000
                    </CharacterCount>
                </FormSection>

                <FormSection>
                    <SectionLabel>태그 (선택, 최대 5개)</SectionLabel>
                    <TagInputContainer>
                        <TagInput
                            type="text"
                            placeholder="태그를 입력하고 Enter"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            disabled={tags.length >= 5}
                        />
                        <AddTagButton
                            onClick={handleAddTag}
                            disabled={tags.length >= 5}
                        >
                            추가
                        </AddTagButton>
                    </TagInputContainer>
                    {tags.length > 0 && (
                        <TagList>
                            {tags.map((tag, index) => (
                                <TagItem key={index}>
                                    <span>#{tag}</span>
                                    <RemoveTagButton
                                        onClick={() => handleRemoveTag(index)}
                                    >
                                        <X size={14} />
                                    </RemoveTagButton>
                                </TagItem>
                            ))}
                        </TagList>
                    )}
                </FormSection>
            </FormContent>

            <SubmitButtonFixed onClick={handleSubmit}>
                완료
            </SubmitButtonFixed>
        </NewPostContainer>
    );
}

const NewPostContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(2rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh;
`;

const FormContent = styled.div`
    padding: 2rem;
`;

const SubmitButtonFixed = styled.button`
    width: 100%;
    padding: 1.6rem 2rem;
    margin: 0 2rem 2rem;
    max-width: calc(100% - 4rem);
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    font-size: 1.6rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }

    &:active {
        background-color: #3151b8;
    }
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

const Select = styled.select`
    width: 100%;
    padding: 1.2rem 1.6rem;
    font-size: 1.6rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    color: #ffffff;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23939393' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1.6rem center;
    padding-right: 4rem;

    option {
        background-color: #252527;
        color: #ffffff;
    }

    option:disabled {
        color: #939393;
    }

    &:focus {
        border-color: #4272ec;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
        }
    }
`;

const TitleInput = styled.input`
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

const CharacterCount = styled.div`
    text-align: right;
    font-size: 1.2rem;
    color: #939393;
    margin-top: 0.5rem;
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
    padding: 3rem;
    background-color: #252527;
    border: 0.2rem dashed #3f3f41;
    border-radius: 1.2rem;
    color: #939393;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #4272ec;
        }
    }

    span {
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

const ImageUploadInput = styled.input`
    display: none;
`;

const ImagePreviewContainer = styled.div`
    position: relative;
`;

const PreviewImage = styled(Image)``;

const RemoveImageButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #ef4444;
        }
    }
`;

const ContentTextarea = styled.textarea`
    width: 100%;
    min-height: 30rem;
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

const TagInputContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const TagInput = styled.input`
    flex: 1;
    padding: 1.2rem 1.6rem;
    font-size: 1.4rem;
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

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const AddTagButton = styled.button`
    padding: 1.2rem 2rem;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1rem;
`;

const TagItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.2rem;
    background-color: #4272ec;
    color: #ffffff;
    border-radius: 2rem;
    font-size: 1.3rem;
    font-weight: 500;
`;

const RemoveTagButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.7;
        }
    }
`;
