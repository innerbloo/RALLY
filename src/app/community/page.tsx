'use client';

import { Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import CommunityList from '@/app/components/CommunityList';
import { mockPosts } from '@/data/communityMockData';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useQueryParams } from '@/hooks/useQueryParams';

export const dynamic = 'force-dynamic';

export default function CommunityPage() {
    const { getParam, updateParams } = useQueryParams();
    const [selectedGame, setSelectedGame] = useState<string>('전체');
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
    const [allPosts, setAllPosts] = useState(mockPosts);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const router = useRouter();
    const { scrollRef, isDragging } = useDragScroll();

    // URL 쿼리 파라미터에서 초기 상태 복원
    useEffect(() => {
        const game = getParam('game') || '전체';
        const category = getParam('category') || '전체';
        const search = getParam('search') || '';
        const sort =
            (getParam('sort') as 'latest' | 'popular' | null) || 'latest';

        setSelectedGame(game);
        setSelectedCategory(category);
        setSearchTerm(search);
        setSortBy(sort);
    }, [getParam]);

    // 로컬스토리지에서 내가 작성한 게시글 불러오기
    useEffect(() => {
        const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        setAllPosts([...myPosts, ...mockPosts]);
    }, []);

    // 스크롤 바닥 감지
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // 바닥에서 50px 이내면 버튼 숨김
            const atBottom = scrollTop + windowHeight >= documentHeight - 50;
            setIsAtBottom(atBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNewPost = () => {
        router.push('/community/new');
    };

    const filteredPosts = allPosts
        .filter((post) => {
            const gameFilter =
                selectedGame === '전체' || post.game === selectedGame;
            const categoryFilter =
                selectedCategory === '전체' ||
                post.category === selectedCategory;
            const searchFilter =
                searchTerm === '' ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.username.toLowerCase().includes(searchTerm.toLowerCase());

            return gameFilter && categoryFilter && searchFilter;
        })
        .sort((a, b) => {
            if (sortBy === 'latest') {
                return (
                    new Date(b.createAt).getTime() -
                    new Date(a.createAt).getTime()
                );
            } else {
                return b.likes - a.likes;
            }
        });

    return (
        <CommunityContainer>
            <CommunityHeader>
                <h1>커뮤니티</h1>
                <SearchSection>
                    <SearchInput
                        type="text"
                        placeholder="제목이나 작성자를 검색해보세요"
                        value={searchTerm}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchTerm(value);
                            updateParams({
                                search: value || undefined,
                            });
                        }}
                    />
                </SearchSection>
            </CommunityHeader>

            <FilterSection>
                <GameFilterContainer>
                    <h3>게임</h3>
                    <GameFilterList ref={scrollRef} $isDragging={isDragging}>
                        {[
                            '전체',
                            '리그오브레전드',
                            '전략적 팀 전투',
                            '오버워치2',
                            '발로란트',
                            '배틀그라운드',
                        ].map((game) => (
                            <GameFilterButton
                                key={game}
                                $active={selectedGame === game}
                                onClick={() => {
                                    setSelectedGame(game);
                                    updateParams({
                                        game: game === '전체' ? undefined : game,
                                    });
                                }}
                            >
                                {game}
                            </GameFilterButton>
                        ))}
                    </GameFilterList>
                </GameFilterContainer>

                <CategoryFilterContainer>
                    <h3>카테고리</h3>
                    <CategoryFilterList>
                        {['전체', '공략', '자유', '질문', '팁'].map(
                            (category) => (
                                <CategoryFilterButton
                                    key={category}
                                    $active={selectedCategory === category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        updateParams({
                                            category:
                                                category === '전체'
                                                    ? undefined
                                                    : category,
                                        });
                                    }}
                                >
                                    {category}
                                </CategoryFilterButton>
                            ),
                        )}
                    </CategoryFilterList>
                </CategoryFilterContainer>
            </FilterSection>

            <SortSection>
                <PostCount>{filteredPosts.length}개의 게시글</PostCount>
                <SortButtons>
                    <SortButton
                        $active={sortBy === 'latest'}
                        onClick={() => {
                            setSortBy('latest');
                            updateParams({
                                sort: undefined,
                            });
                        }}
                    >
                        최신순
                    </SortButton>
                    <SortButton
                        $active={sortBy === 'popular'}
                        onClick={() => {
                            setSortBy('popular');
                            updateParams({
                                sort: 'popular',
                            });
                        }}
                    >
                        인기순
                    </SortButton>
                </SortButtons>
            </SortSection>

            <PostListSection>
                <CommunityList list={filteredPosts} />
            </PostListSection>

            <NewPostButton onClick={handleNewPost} $isAtBottom={isAtBottom}>
                <Edit3 size={20} />
                <span>글쓰기</span>
            </NewPostButton>
        </CommunityContainer>
    );
}

const CommunityContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(10rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh;
`;

const CommunityHeader = styled.header`
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;

    h1 {
        font-size: 2.4rem;
        font-weight: 700;
        margin: 0 0 2rem;
        color: #ffffff;
    }
`;

const SearchSection = styled.div`
    margin-bottom: 1rem;
`;

const SearchInput = styled.input`
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

const FilterSection = styled.section`
    padding: 2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const GameFilterContainer = styled.div`
    margin-bottom: 1.5rem;

    h3 {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0 0 1rem;
        color: #ffffff;
    }
`;

const GameFilterList = styled.div<{ $isDragging?: boolean }>`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
    user-select: none;
    margin: 0 -2rem;
    padding: 0 2rem;

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
    }

    /* Prevent buttons from shrinking */
    > button {
        flex-shrink: 0;
        pointer-events: ${({ $isDragging }) => ($isDragging ? 'none' : 'auto')};
    }
`;

const GameFilterButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: 0.1rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 2rem;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #ffffff;
        }
    }
`;

const CategoryFilterContainer = styled.div`
    h3 {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0 0 1rem;
        color: #ffffff;
    }
`;

const CategoryFilterList = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const CategoryFilterButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    border: 0.1rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 2rem;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #ffffff;
        }
    }
`;

const SortSection = styled.section`
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1rem solid #3f3f41;
`;

const SortButtons = styled.div`
    display: flex;
    gap: 1.2rem;
`;

const SortButton = styled.button<{ $active: boolean }>`
    padding: 0.6rem 0;
    font-size: 1.3rem;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};
    border: none;
    background-color: transparent;
    color: ${({ $active }) => ($active ? '#4272ec' : '#939393')};
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: #4272ec;
        }
    }
`;

const PostCount = styled.div`
    font-size: 1.3rem;
    color: #939393;
`;

const PostListSection = styled.section`
    flex: 1;
`;

const NewPostButton = styled.button<{ $isAtBottom: boolean }>`
    position: fixed;
    left: 50%;
    bottom: calc(10rem + env(safe-area-inset-bottom));
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 1.6rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 3rem;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(66, 114, 236, 0.4);
    z-index: 999;
    transition: all 0.3s ease;
    transform: ${({ $isAtBottom }) =>
        $isAtBottom
            ? 'translateX(calc(-100% + 220px - 1.5rem)) translateY(150%)'
            : 'translateX(calc(-100% + 220px - 1.5rem))'};

    @media (max-width: 768px) {
        left: auto;
        right: 1.5rem;
        transform: ${({ $isAtBottom }) =>
            $isAtBottom ? 'translateY(150%)' : 'none'};
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 769px) {
        &:hover {
            transform: ${({ $isAtBottom }) =>
                $isAtBottom
                    ? 'translateX(calc(-100% + 220px - 1.5rem)) translateY(150%)'
                    : 'translateX(calc(-100% + 220px - 1.5rem)) translateY(-2px)'};
            box-shadow: 0 8px 25px rgba(66, 114, 236, 0.5);
        }
    }

    @media (min-width: 769px) {
        &:active {
            transform: ${({ $isAtBottom }) =>
                $isAtBottom
                    ? 'translateX(calc(-100% + 220px - 1.5rem)) translateY(150%)'
                    : 'translateX(calc(-100% + 220px - 1.5rem))'};
        }
    }

    svg {
        flex-shrink: 0;
    }
`;
