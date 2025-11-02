'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/pagination';

import PositionLolTop2 from '/public/lol/position-lol-top2.svg';
import SupportIcon from '/public/overwatch/position-overwatch-support2.svg';

import styled from '@emotion/styled';

import BannerSwiper from '@/app/components/BannerSwiper';
import CommunityList from '@/app/components/CommunityList';
import DuoRecommendList from '@/app/components/DuoRecommendList';
import MentorRecommendList from '@/app/components/MentorRecommendList';
import RecommendContentList from '@/app/components/RecommendContentList';
import { mockPosts } from '@/data/communityMockData';
import { useDragScroll } from '@/hooks/useDragScroll';

export default function Home() {
    const [communityPosts, setCommunityPosts] = useState(mockPosts.slice(0, 5));
    const router = useRouter();
    const { scrollRef, isDragging } = useDragScroll<HTMLUListElement>();

    useEffect(() => {
        const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        const allPosts = [...myPosts, ...mockPosts];
        setCommunityPosts(allPosts.slice(0, 5));
    }, []);

    const handleGameClick = (gameId: string | null) => {
        if (gameId) {
            router.push(`/match/quick?game=${gameId}`);
        } else {
            toast('준비중입니다', { id: 'game-unavailable' });
        }
    };

    return (
        <div>
            <HomeContainer>
                <BannerSwiper />
                <PopularGameSection>
                    <h2>빠른 매칭</h2>
                    <GameWrapper ref={scrollRef} $isDragging={isDragging}>
                        <li>
                            <GameItem onClick={() => handleGameClick('lol')}>
                                <IconWrapper>
                                    <Image
                                        src={'/game1.png'}
                                        width={48}
                                        height={48}
                                        alt={'리그오브레전드'}
                                    />
                                </IconWrapper>
                                리그오브레전드
                            </GameItem>
                        </li>
                        <li>
                            <GameItem onClick={() => handleGameClick('tft')}>
                                <IconWrapper>
                                    <Image
                                        src={'/game2.png'}
                                        width={48}
                                        height={48}
                                        alt={'전략적 팀 전투'}
                                    />
                                </IconWrapper>
                                전략적 팀 전투
                            </GameItem>
                        </li>
                        <li>
                            <GameItem
                                onClick={() => handleGameClick('overwatch')}
                            >
                                <IconWrapper>
                                    <Image
                                        src={'/game4.png'}
                                        width={48}
                                        height={48}
                                        alt={'오버워치2'}
                                    />
                                </IconWrapper>
                                오버워치2
                            </GameItem>
                        </li>
                        <li>
                            <GameItem onClick={() => handleGameClick(null)}>
                                <IconWrapper>
                                    <Image
                                        src={'/game3.png'}
                                        width={48}
                                        height={48}
                                        alt={'발로란트'}
                                    />
                                </IconWrapper>
                                발로란트
                            </GameItem>
                        </li>
                        <li>
                            <GameItem onClick={() => handleGameClick(null)}>
                                <IconWrapper>
                                    <Image
                                        src={'/game5.png'}
                                        width={48}
                                        height={48}
                                        alt={'배틀그라운드'}
                                    />
                                </IconWrapper>
                                배틀그라운드
                            </GameItem>
                        </li>
                        <li>
                            <GameItem onClick={() => handleGameClick(null)}>
                                <IconWrapper>
                                    <Image
                                        src={'/game-more.png'}
                                        width={48}
                                        height={48}
                                        alt={'더보기'}
                                    />
                                </IconWrapper>
                                더보기
                            </GameItem>
                        </li>
                    </GameWrapper>
                </PopularGameSection>

                <DuoRecommendSection>
                    <h2>듀오 추천</h2>
                    <DuoRecommendList
                        duos={[
                            {
                                id: 1,
                                profileImage: '/lol/profile-lol-1.png',
                                username: '멋졌으면 핑찍어',
                                position: (
                                    <PositionLolTop2 width={20} height={20} />
                                ),
                                userCode: '#96327',
                                description:
                                    '디코하면서 같이 으쌰으쌰 하실분찾아요~',
                                rankImage: '/lol/rank-lol-emerald.webp',
                                rankText: 'E4',
                                tags: [
                                    '공격적인',
                                    '팀 중심형',
                                    '마이크 필수',
                                    '+',
                                ],
                                gameImage: '/game1.png',
                                gameAlt: '리그오브레전드',
                            },
                            {
                                id: 121,
                                profileImage: '/lol/profile-lol-4.png',
                                username: '젠장또대상혁이야',
                                position: undefined,
                                userCode: '#SANGHYUK021',
                                description:
                                    '더블업 같이 자주 하실 분 구합니다',
                                rankImage: '/lol/rank-lol-silver.webp',
                                rankText: 'S4',
                                tags: [
                                    '신중한 플레이',
                                    '서포터형',
                                    '채팅 위주',
                                    '+',
                                ],
                                gameImage: '/game2.png',
                                gameAlt: '전략적 팀 전투',
                            },
                            {
                                id: 208,
                                profileImage:
                                    '/overwatch/profile-overwatch-8.png',
                                username: '아나할머니',
                                position: (
                                    <SupportIcon width={20} height={20} />
                                ),
                                userCode: '#ANA888',
                                description:
                                    '아나 장인 출신 힐러랑 재밌게 한판 하실분 ㅎ',
                                rankImage:
                                    '/overwatch/rank-overwatch-master.webp',
                                rankText: 'M1',
                                tags: [
                                    '전략적인',
                                    '팀 중심형',
                                    '마이크 필수',
                                    '+',
                                ],
                                gameImage: '/game4.png',
                                gameAlt: '오버워치2',
                            },
                        ]}
                    />
                </DuoRecommendSection>

                <MentorRecommendSection>
                    <h2>멘토 추천</h2>
                    <MentorRecommendList
                        mentors={[
                            {
                                id: 1,
                                profileImage: '/mentor/profile-mentor-1.png',
                                username: '고양이 발바닥',
                                rate: 5.0,
                                reviews: 142,
                                description:
                                    '안녕하세요! 브론즈부터 차근차근 모든 구간에서 플레이하며 티어를 올려본 경험을 바탕으로, 작은 성취를 쌓아가는 과정의 즐거움과 꾸준함의 가치를 배웠습니다. 이러한 경험은 어떤 도전에서도 흔들리지 않고 성장할 수 있는 저의 강점이 될 것이라 믿습니다.',
                                gameImage: '/game1.png',
                                gameAlt: '리그오브레전드',
                            },
                            {
                                id: 2,
                                profileImage: '/mentor/profile-mentor-2.png',
                                username: '일타강사 옵자루',
                                rate: 4.8,
                                reviews: 136,
                                description:
                                    '오버워치라는 게임은 그 여느 FPS 게임보다도 개념적인 영역이 중요합니다. 단순히 에임이나 반사 신경만으로는 한계가 있으며, 팀 조합 이해, 맵 구조 파악, 그리고 상황별 포지셔닝이 승패를 가르는 핵심 요소가 됩니다.',
                                gameImage: '/game4.png',
                                gameAlt: '오버워치2',
                            },
                            {
                                id: 3,
                                profileImage: '/mentor/profile-mentor-3.png',
                                username: '정호성',
                                rate: 4.5,
                                reviews: 128,
                                description:
                                    '초보자분들께는 기초적인 강의를 중심으로 기본기를 다질 수 있도록 돕고, 다이아~마스터 이상 레벨의 플레이어분들께는 세밀한 디테일과 고급 전략을 위주로 다뤄 실질적인 실력 향상을 이끌어내고자 합니다.',
                                gameImage: '/game2.png',
                                gameAlt: '전략적 팀 전투',
                            },
                        ]}
                    />
                </MentorRecommendSection>

                <CommunitySection>
                    <h2>커뮤니티 인기 글</h2>
                    <CommunityList list={communityPosts} />
                </CommunitySection>

                <RecommendContentSection>
                    <h2>추천 컨텐츠</h2>
                    <RecommendContentList
                        contents={[
                            {
                                id: 1,
                                image: '/content/content1.png',
                                title: '초보자를 위한 LOL 완벽 가이드',
                                type: 'guide' as const,
                                difficulty: 'beginner' as const,
                                author: '롤 마스터',
                                createAt: '2025-09-08 10:00:00',
                                likes: 1250,
                                views: 15600,
                                game: '리그오브레전드',
                                youtubeUrl:
                                    'https://www.youtube.com/embed/t3OvYcVzVzQ',
                            },
                            {
                                id: 2,
                                image: '/content/content2.png',
                                title: '오버워치2 포지셔닝 완전정복',
                                type: 'strategy' as const,
                                difficulty: 'intermediate' as const,
                                author: '옵치 프로',
                                createAt: '2025-09-07 14:30:00',
                                likes: 980,
                                views: 12400,
                                game: '오버워치2',
                                youtubeUrl:
                                    'https://www.youtube.com/embed/mtjgUGaZFGo',
                            },
                            {
                                id: 3,
                                image: '/content/content3.png',
                                title: '롤토체스 하이퍼롤 메타 분석',
                                type: 'tip' as const,
                                difficulty: 'advanced' as const,
                                author: 'TFT 분석가',
                                createAt: '2025-09-06 16:45:00',
                                likes: 756,
                                views: 9800,
                                game: '전략적 팀 전투',
                                youtubeUrl:
                                    'https://www.youtube.com/embed/xULj8NJPnzM',
                            },
                            {
                                id: 4,
                                image: '/content/content4.png',
                                title: '발로란트 에임 향상 꿀팁',
                                type: 'tip' as const,
                                difficulty: 'intermediate' as const,
                                author: '발로 고수',
                                createAt: '2025-09-05 11:20:00',
                                likes: 1120,
                                views: 14200,
                                game: '발로란트',
                                youtubeUrl:
                                    'https://www.youtube.com/embed/V2DScN3-zqQ',
                            },
                        ]}
                    />
                </RecommendContentSection>
            </HomeContainer>
        </div>
    );
}

const HomeContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(10rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;

    > section {
        margin: 0 0 3rem;
        padding: 2rem 2rem 0;

        > h2 {
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0 0 2rem;
        }

        &:last-of-type {
            margin: 0;
        }
    }
`;

const PopularGameSection = styled.section``;

const GameWrapper = styled.ul<{ $isDragging?: boolean }>`
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    padding: 0 2rem;
    margin: 0 -2rem;
    cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
    user-select: none;

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
    }

    li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        pointer-events: ${({ $isDragging }) => ($isDragging ? 'none' : 'auto')};
    }
`;

const GameItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    color: #ffffff;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 1.2rem;
    background-color: #252527;
    transition: background-color 0.2s ease;

    img {
        border-radius: 1rem;
        pointer-events: none;
        user-select: none;
        -webkit-user-drag: none;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #2a2a2c;
        }
    }
`;

const DuoRecommendSection = styled.section``;

const MentorRecommendSection = styled.section`
    padding: 2rem 0 0 0 !important;

    > h2 {
        padding: 0 2rem;
    }
`;

const CommunitySection = styled.section`
    padding: 2rem 0 0 0 !important;

    > h2 {
        padding: 0 2rem;
        margin: 0 0 1rem !important;
    }
`;

const RecommendContentSection = styled.section`
    padding: 2rem 0 0 0 !important;

    > h2 {
        padding: 0 2rem;
        margin: 0 0 1rem !important;
    }
`;
