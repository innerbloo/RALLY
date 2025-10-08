'use client';

import { Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import CommunityList from '@/app/components/CommunityList';
import { mockPosts } from '@/data/communityMockData';

export default function CommunityPage() {
    const [selectedGame, setSelectedGame] = useState<string>('전체');
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
    const [allPosts, setAllPosts] = useState(mockPosts);
    const router = useRouter();

    // 로컬스토리지에서 내가 작성한 게시글 불러오기
    useEffect(() => {
        const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        setAllPosts([...myPosts, ...mockPosts]);
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchSection>
            </CommunityHeader>

            <FilterSection>
                <GameFilterContainer>
                    <h3>게임</h3>
                    <GameFilterList>
                        {[
                            '전체',
                            '리그오브레전드',
                            '전략적 팀 전투',
                            '발로란트',
                            '오버워치2',
                            '배틀그라운드',
                        ].map((game) => (
                            <GameFilterButton
                                key={game}
                                $active={selectedGame === game}
                                onClick={() => setSelectedGame(game)}
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
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
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
                        onClick={() => setSortBy('latest')}
                    >
                        최신순
                    </SortButton>
                    <SortButton
                        $active={sortBy === 'popular'}
                        onClick={() => setSortBy('popular')}
                    >
                        인기순
                    </SortButton>
                </SortButtons>
            </SortSection>

            <PostListSection>
                <CommunityList list={filteredPosts} />
            </PostListSection>

            <NewPostButton onClick={handleNewPost}>
                <Edit3 size={20} />
                <span>글쓰기</span>
            </NewPostButton>
        </CommunityContainer>
    );
}

const CommunityContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: 6.65rem;
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

const GameFilterList = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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

const NewPostButton = styled.button`
    position: fixed;
    bottom: 8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 2rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 3rem;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(66, 114, 236, 0.4);
    z-index: 999;
    transition: all 0.3s ease;

    /* Position relative to centered 800px container */
    left: 50%;
    transform: translateX(calc(800px / 2 - 2rem - 100%));

    @media (max-width: 800px) {
        right: 2rem;
        left: auto;
        transform: none;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateX(calc(800px / 2 - 2rem - 100%))
                translateY(-2px);
            box-shadow: 0 8px 25px rgba(66, 114, 236, 0.5);
        }
    }

    @media (hover: hover) and (pointer: fine) and (max-width: 800px) {
        &:hover {
            transform: translateY(-2px);
        }
    }

    &:active {
        transform: translateX(calc(800px / 2 - 2rem - 100%)) translateY(0);
    }

    @media (max-width: 800px) {
        &:active {
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        right: 1.5rem;
        bottom: calc(8rem + env(safe-area-inset-bottom));
        padding: 1rem 1.6rem;
        font-size: 1.3rem;
    }

    svg {
        flex-shrink: 0;
    }
`;
