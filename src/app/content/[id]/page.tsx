'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

import { getYesterdayDate } from '@/data/communityMockData';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface ContentData {
    id: number;
    image: string;
    title: string;
    type: 'guide' | 'tip' | 'strategy';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    author: string;
    createAt: string;
    likes: number;
    views: number;
    game: string;
    youtubeUrl: string;
    description: string;
    tags: string[];
}

interface Comment {
    id: number;
    userId: number;
    username: string;
    profileImage: string;
    content: string;
    createAt: string;
    likes: number;
}

// Mock 데이터 (메인 페이지와 동일)
const mockContents: ContentData[] = [
    {
        id: 1,
        image: '/content/content1.png',
        title: '초보자를 위한 LOL 완벽 가이드',
        type: 'guide',
        difficulty: 'beginner',
        author: '롤 마스터',
        createAt: getYesterdayDate('10:00:00'),
        likes: 1250,
        views: 15600,
        game: '리그오브레전드',
        youtubeUrl: 'https://www.youtube.com/embed/t3OvYcVzVzQ',
        description:
            '리그오브레전드를 처음 시작하는 분들을 위한 완벽한 가이드입니다. 게임의 기본 조작법부터 챔피언 선택, 라인 운영, 팀 플레이까지 초보자가 알아야 할 모든 것을 단계별로 설명합니다.\n\n이 가이드를 통해 게임의 기본 메커니즘을 이해하고, 효과적인 플레이 방법을 배울 수 있습니다. 또한 실전에서 자주 발생하는 실수들을 미리 파악하고 예방할 수 있습니다.',
        tags: ['초보가이드', '기초튜토리얼', '챔피언추천', '라인운영'],
    },
    {
        id: 2,
        image: '/content/content2.png',
        title: '오버워치2 포지셔닝 완전정복',
        type: 'strategy',
        difficulty: 'intermediate',
        author: '옵치 프로',
        createAt: getYesterdayDate('14:30:00'),
        likes: 980,
        views: 12400,
        game: '오버워치2',
        youtubeUrl: 'https://www.youtube.com/embed/mtjgUGaZFGo',
        description:
            '오버워치2에서 가장 중요한 포지셔닝에 대해 심도 있게 다룹니다. 각 영웅별 최적의 포지션, 맵별 전략적 위치, 팀 조합에 따른 포지셔닝 변화를 상세히 설명합니다.\n\n중급 이상 플레이어가 한 단계 도약하기 위해 반드시 알아야 할 포지셔닝의 모든 것을 담았습니다. 실전 게임 플레이 영상과 함께 설명하여 이해하기 쉽습니다.',
        tags: ['포지셔닝', '맵전략', '영웅별가이드', '실전팁'],
    },
    {
        id: 3,
        image: '/content/content3.png',
        title: '롤토체스 하이퍼롤 메타 분석',
        type: 'tip',
        difficulty: 'advanced',
        author: 'TFT 분석가',
        createAt: getYesterdayDate('16:45:00'),
        likes: 756,
        views: 9800,
        game: '전략적 팀 전투',
        youtubeUrl: 'https://www.youtube.com/embed/xULj8NJPnzM',
        description:
            '현재 하이퍼롤 모드의 최신 메타를 깊이 있게 분석합니다. 티어1 덱 조합, 아이템 빌드, 포지셔닝 전략, 그리고 상황별 대처법까지 고급 전략을 모두 다룹니다.\n\n최상위 랭커들이 사용하는 덱 빌딩 전략과 경제 운영 노하우를 공유합니다. 플래티넘 이상 플레이어에게 추천하는 고급 컨텐츠입니다.',
        tags: ['메타분석', '덱빌딩', '하이퍼롤', '랭크팁'],
    },
    {
        id: 4,
        image: '/content/content4.png',
        title: '발로란트 에임 향상 꿀팁',
        type: 'tip',
        difficulty: 'intermediate',
        author: '발로 고수',
        createAt: getYesterdayDate('11:20:00'),
        likes: 1120,
        views: 14200,
        game: '발로란트',
        youtubeUrl: 'https://www.youtube.com/embed/V2DScN3-zqQ',
        description:
            '발로란트에서 에임 실력을 향상시키는 검증된 방법들을 소개합니다. 감도 설정, 크로스헤어 조정, 효과적인 연습 루틴, 그리고 실전에서 바로 적용 가능한 팁들을 담았습니다.\n\n에임 훈련 맵 활용법부터 실전 교전 상황에서의 에임 컨트롤까지, 체계적인 훈련 방법을 단계별로 설명합니다. 중급 플레이어의 에임 향상에 최적화된 컨텐츠입니다.',
        tags: ['에임연습', '감도설정', '훈련루틴', '실전팁'],
    },
];

// Mock 댓글 데이터
const mockComments: { [contentId: number]: Comment[] } = {
    1: [
        {
            id: 1001,
            userId: 101,
            username: '롤초보탈출',
            profileImage: '/lol/profile-lol-1.png',
            content: '정말 도움 많이 됐어요! 이 영상 보고 바로 실전에 적용했는데 승률이 올라갔어요 ㅎㅎ',
            createAt: getYesterdayDate('14:30:00').replace(' ', 'T'),
            likes: 24,
        },
        {
            id: 1002,
            userId: 102,
            username: '정글러의품격',
            profileImage: '/lol/profile-lol-3.png',
            content: '초보자분들한테 추천하고 싶네요. 설명이 너무 쉽고 명확해요!',
            createAt: getYesterdayDate('16:15:00').replace(' ', 'T'),
            likes: 18,
        },
        {
            id: 1003,
            userId: 103,
            username: '한성대즐겜러',
            profileImage: '/hsu.png',
            content: '챔피언 추천 부분이 특히 좋았습니다. 감사합니다!',
            createAt: getYesterdayDate('18:45:00').replace(' ', 'T'),
            likes: 12,
        },
    ],
    2: [
        {
            id: 2001,
            userId: 201,
            username: '겐지장인',
            profileImage: '/overwatch/profile-overwatch-2.png',
            content: '포지셔닝의 중요성을 다시 한번 깨달았습니다. 맵별 전략 부분 정말 유익했어요!',
            createAt: getYesterdayDate('15:20:00').replace(' ', 'T'),
            likes: 31,
        },
        {
            id: 2002,
            userId: 202,
            username: '힐러러버',
            profileImage: '/overwatch/profile-overwatch-1.png',
            content: '서포터 입장에서도 배울 점이 많았습니다. 좋은 영상 감사해요',
            createAt: getYesterdayDate('19:30:00').replace(' ', 'T'),
            likes: 15,
        },
    ],
    3: [
        {
            id: 3001,
            userId: 301,
            username: '티모',
            profileImage: '/lol/profile-lol-2.png',
            content: '덱 빌딩 전략 너무 좋네요! 바로 플레 찍었습니다 ㄷㄷ',
            createAt: getYesterdayDate('17:00:00').replace(' ', 'T'),
            likes: 42,
        },
        {
            id: 3002,
            userId: 302,
            username: 'TFT마스터',
            profileImage: '/lol/profile-lol-4.png',
            content: '메타 분석 정말 디테일하네요. 경제 운영 팁도 유용했습니다!',
            createAt: getYesterdayDate('20:15:00').replace(' ', 'T'),
            likes: 28,
        },
        {
            id: 3003,
            userId: 303,
            username: '롤토체스광',
            profileImage: '/mentor/profile-mentor-3.png',
            content: '고급 전략까지 다뤄주셔서 감사합니다',
            createAt: getYesterdayDate('10:30:00').replace(' ', 'T'),
            likes: 19,
        },
    ],
    4: [
        {
            id: 4001,
            userId: 401,
            username: '발로고인물',
            profileImage: '/lol/profile-lol-1.png',
            content: '에임 훈련 루틴 따라하니까 진짜 실력이 늘었어요! 강추합니다',
            createAt: getYesterdayDate('12:40:00').replace(' ', 'T'),
            likes: 35,
        },
        {
            id: 4002,
            userId: 402,
            username: 'Jett메인',
            profileImage: '/lol/profile-lol-2.png',
            content: '크로스헤어 설정 부분 참고했습니다. 감사합니다 ㅎㅎ',
            createAt: getYesterdayDate('16:20:00').replace(' ', 'T'),
            likes: 22,
        },
    ],
};

export default function ContentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const contentId = Number(params.id);
    const content = mockContents.find((c) => c.id === contentId);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>(
        {},
    );

    // 페이지 진입 시 스크롤 최상단 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 좋아요 및 댓글 상태 로드
    useEffect(() => {
        if (!contentId || !content) return;

        // 초기 좋아요 수 설정
        setLikes(content.likes);

        const contentLikes = JSON.parse(
            localStorage.getItem('contentLikes') || '{}',
        );
        setIsLiked(contentLikes[contentId] || false);

        // 댓글 불러오기 (목업 + localStorage 병합)
        const contentComments = JSON.parse(
            localStorage.getItem('contentComments') || '{}',
        );
        const userComments = contentComments[contentId] || [];
        const initialComments = mockComments[contentId] || [];
        setComments([...initialComments, ...userComments]);

        // 댓글 좋아요 상태 불러오기
        const savedCommentLikes = JSON.parse(
            localStorage.getItem('contentCommentLikes') || '{}',
        );
        setCommentLikes(savedCommentLikes);
    }, [contentId, content]);

    const handleLike = () => {
        const newIsLiked = !isLiked;
        const newLikes = isLiked ? likes - 1 : likes + 1;

        setIsLiked(newIsLiked);
        setLikes(newLikes);

        // 로컬스토리지에 저장
        const contentLikes = JSON.parse(
            localStorage.getItem('contentLikes') || '{}',
        );
        contentLikes[contentId] = newIsLiked;
        localStorage.setItem('contentLikes', JSON.stringify(contentLikes));
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: content?.title || '',
                    text: content?.description || '',
                    url: window.location.href,
                });
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    toast.error('공유에 실패했습니다.');
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('링크가 복사되었습니다!');
            } catch (error) {
                toast.success('링크가 복사되었습니다!');
            }
        }
    };

    const handleCommentLike = (commentId: number) => {
        setCommentLikes((prev) => {
            const newLikes = {
                ...prev,
                [commentId]: !prev[commentId],
            };

            localStorage.setItem(
                'contentCommentLikes',
                JSON.stringify(newLikes),
            );

            return newLikes;
        });

        setComments((prev) =>
            prev.map((comment) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          likes: commentLikes[commentId]
                              ? comment.likes - 1
                              : comment.likes + 1,
                      }
                    : comment,
            ),
        );
    };

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;

        const commentContent = newComment.trim();
        setNewComment('');

        const userProfile = JSON.parse(
            localStorage.getItem('userProfile') ||
                '{"nickname":"한성대 즐겜러","profileImage":"/hsu.png"}',
        );

        const newCommentObj: Comment = {
            id: Date.now(),
            userId: 0,
            username: userProfile.nickname,
            profileImage: userProfile.profileImage,
            content: commentContent,
            createAt: new Date().toISOString(),
            likes: 0,
        };

        const contentComments = JSON.parse(
            localStorage.getItem('contentComments') || '{}',
        );
        if (!contentComments[contentId]) {
            contentComments[contentId] = [];
        }
        contentComments[contentId].push(newCommentObj);
        localStorage.setItem(
            'contentComments',
            JSON.stringify(contentComments),
        );

        setComments((prev) => [...prev, newCommentObj]);
    };

    const handleScrollToComments = () => {
        const commentsSection = document.getElementById('comments-section');
        if (commentsSection) {
            commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleUserClick = (userId: number) => {
        if (userId === 0) {
            // 내 댓글인 경우 내 프로필로 이동
            router.push('/profile');
        } else {
            // 다른 유저 프로필로 이동
            router.push(`/profile/${userId}`);
        }
    };

    if (!content) {
        return (
            <ErrorContainer>
                <ErrorMessage>컨텐츠를 찾을 수 없습니다.</ErrorMessage>
                <BackButton onClick={() => router.push('/')}>
                    홈으로 돌아가기
                </BackButton>
            </ErrorContainer>
        );
    }

    const getTypeText = () => {
        switch (content.type) {
            case 'guide':
                return '가이드';
            case 'tip':
                return '팁';
            case 'strategy':
                return '전략';
            default:
                return '컨텐츠';
        }
    };

    const getDifficultyText = () => {
        switch (content.difficulty) {
            case 'beginner':
                return '초급';
            case 'intermediate':
                return '중급';
            case 'advanced':
                return '고급';
            default:
                return '일반';
        }
    };

    const getDifficultyColor = () => {
        switch (content.difficulty) {
            case 'beginner':
                return '#4CAF50';
            case 'intermediate':
                return '#FF9800';
            case 'advanced':
                return '#F44336';
            default:
                return '#757575';
        }
    };

    return (
        <DetailContainer>
            {/* 유튜브 영상 섹션 */}
            <VideoSection>
                <VideoWrapper>
                    <VideoIframe
                        src={content.youtubeUrl}
                        title={content.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </VideoWrapper>
            </VideoSection>

            {/* 컨텐츠 정보 섹션 */}
            <ContentSection>
                <ContentHeader>
                    <BadgeWrapper>
                        <TypeBadge>{getTypeText()}</TypeBadge>
                        <DifficultyBadge $color={getDifficultyColor()}>
                            {getDifficultyText()}
                        </DifficultyBadge>
                        <GameBadge>{content.game}</GameBadge>
                    </BadgeWrapper>
                    <ContentTitle>{content.title}</ContentTitle>
                    <ContentMeta>
                        {content.author} • {dayjs(content.createAt).fromNow()}
                    </ContentMeta>
                </ContentHeader>

                {/* 통계 섹션 */}
                <StatsSection>
                    <StatItem>
                        <Heart size={20} />
                        <StatLabel>좋아요</StatLabel>
                        <StatValue>{likes.toLocaleString()}</StatValue>
                    </StatItem>
                    <StatDivider />
                    <StatItem>
                        <Eye size={20} />
                        <StatLabel>조회수</StatLabel>
                        <StatValue>{content.views.toLocaleString()}</StatValue>
                    </StatItem>
                </StatsSection>

                {/* 액션 버튼 */}
                <ActionsSection>
                    <ActionButton onClick={handleLike} $active={isLiked}>
                        <Heart size={20} fill={isLiked ? '#ef4444' : 'none'} />
                        <span>좋아요</span>
                    </ActionButton>
                    <ActionButton onClick={handleScrollToComments}>
                        <MessageCircle size={20} />
                        <span>댓글 {comments.length}</span>
                    </ActionButton>
                    <ActionButton onClick={handleShare}>
                        <Share2 size={20} />
                        <span>공유</span>
                    </ActionButton>
                </ActionsSection>

                {/* 태그 섹션 */}
                {content.tags && content.tags.length > 0 && (
                    <TagsSection>
                        {content.tags.map((tag, index) => (
                            <TagItem key={index}>#{tag}</TagItem>
                        ))}
                    </TagsSection>
                )}

                {/* 본문 섹션 */}
                <ContentBody>
                    <SectionTitle>컨텐츠 소개</SectionTitle>
                    <ContentDescription>{content.description}</ContentDescription>
                </ContentBody>
            </ContentSection>

            {/* 댓글 섹션 */}
            <CommentsSection id="comments-section">
                <CommentsHeader>
                    댓글 <CommentsCount>{comments.length}</CommentsCount>
                </CommentsHeader>

                <CommentsList>
                    {comments.map((comment) => (
                        <CommentItem key={comment.id}>
                            <CommentAuthor onClick={() => handleUserClick(comment.userId)}>
                                <CommentAuthorImage
                                    src={comment.profileImage}
                                    alt={comment.username}
                                />
                                <CommentAuthorInfo>
                                    <CommentAuthorName>
                                        {comment.username}
                                    </CommentAuthorName>
                                    <CommentDate>
                                        {dayjs(comment.createAt).fromNow()}
                                    </CommentDate>
                                </CommentAuthorInfo>
                            </CommentAuthor>
                            <CommentContent>{comment.content}</CommentContent>
                            <CommentActions>
                                <CommentLikeButton
                                    onClick={() =>
                                        handleCommentLike(comment.id)
                                    }
                                    $active={commentLikes[comment.id]}
                                >
                                    <Heart
                                        size={14}
                                        fill={
                                            commentLikes[comment.id]
                                                ? '#ef4444'
                                                : 'none'
                                        }
                                    />
                                    <span>{comment.likes}</span>
                                </CommentLikeButton>
                            </CommentActions>
                        </CommentItem>
                    ))}
                </CommentsList>

                <CommentInputSection>
                    <CommentInput
                        placeholder="댓글을 입력하세요..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Enter' &&
                                !e.shiftKey &&
                                !e.nativeEvent.isComposing
                            ) {
                                e.preventDefault();
                                handleSubmitComment();
                            }
                        }}
                    />
                    <CommentSubmitButton onClick={handleSubmitComment}>
                        등록
                    </CommentSubmitButton>
                </CommentInputSection>
            </CommentsSection>
        </DetailContainer>
    );
}

const DetailContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(2rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh;

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding-bottom: 2rem;
    }
`;

const VideoSection = styled.div`
    width: 100%;
    background-color: #000000;
`;

const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 비율 */
    height: 0;
    overflow: hidden;
`;

const VideoIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
`;

const ContentSection = styled.div`
    padding: 2rem;
`;

const ContentHeader = styled.div`
    margin-bottom: 2rem;
`;

const BadgeWrapper = styled.div`
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
`;

const TypeBadge = styled.span`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    background-color: #4272ec;
    color: #ffffff;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
`;

const DifficultyBadge = styled.span<{ $color: string }>`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    background-color: ${({ $color }) => $color};
    color: #ffffff;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
`;

const GameBadge = styled.span`
    display: inline-block;
    padding: 0.4rem 0.8rem;
    background-color: #252527;
    color: #cccccc;
    border: 0.1rem solid #3f3f41;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    font-weight: 500;
`;

const ContentTitle = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.4;
    margin: 0 0 0.8rem;
    word-break: keep-all;
`;

const ContentMeta = styled.p`
    font-size: 1.4rem;
    color: #939393;
    margin: 0;
`;

const StatsSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2rem;
    background-color: #252527;
    border-radius: 1.2rem;
    margin-bottom: 2rem;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    color: #4272ec;

    svg {
        color: #4272ec;
    }
`;

const StatLabel = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const StatValue = styled.span`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
`;

const StatDivider = styled.div`
    width: 0.1rem;
    height: 4rem;
    background-color: #3f3f41;
`;

const ActionsSection = styled.div`
    display: flex;
    gap: 2rem;
    padding: 1.5rem 2rem;
    margin: 0 -2rem 0;
    border-top: 0.1rem solid #3f3f41;
    border-bottom: 0.1rem solid #3f3f41;
`;

const ActionButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 0;
    background-color: transparent;
    border: none;
    color: ${({ $active }) => ($active ? '#ef4444' : '#939393')};
    font-size: 1.4rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: ${({ $active }) => ($active ? '#dc2626' : '#ffffff')};
        }
    }
`;

const TagsSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    padding: 1.5rem 2rem;
    margin: 0 -2rem 2rem;
    background-color: #252527;
    border-top: 0.1rem solid #3f3f41;
    border-bottom: 0.1rem solid #3f3f41;
`;

const TagItem = styled.span`
    display: inline-block;
    padding: 0.6rem 1.2rem;
    background-color: #1a1a1a;
    color: #4272ec;
    border: 0.1rem solid #4272ec;
    border-radius: 2rem;
    font-size: 1.3rem;
    font-weight: 500;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #4272ec;
            color: #ffffff;
        }
    }
`;

const ContentBody = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 0.2rem solid #4272ec;
`;

const ContentDescription = styled.p`
    font-size: 1.5rem;
    line-height: 1.8;
    color: #b8b8b8;
    margin: 0;
    word-break: keep-all;
    white-space: pre-line;
`;

const CommentsSection = styled.section`
    padding: 2rem;
    background-color: #252527;
`;

const CommentsHeader = styled.h3`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 1.5rem;
`;

const CommentsCount = styled.span`
    color: #4272ec;
`;

const CommentsList = styled.div`
    margin-bottom: 2rem;
`;

const CommentItem = styled.div`
    padding: 1.5rem 0;
    border-bottom: 0.1rem solid #3f3f41;

    &:last-child {
        border-bottom: none;
    }
`;

const CommentAuthor = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.8rem;
    cursor: pointer;
    transition: opacity 0.2s ease;
    padding: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    border-radius: 0.8rem;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #1a1a1a;
        }
    }
`;

const CommentAuthorImage = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
`;

const CommentAuthorInfo = styled.div`
    flex: 1;
`;

const CommentAuthorName = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.2rem;
`;

const CommentDate = styled.div`
    font-size: 1.1rem;
    color: #939393;
`;

const CommentContent = styled.div`
    font-size: 1.4rem;
    line-height: 1.6;
    color: #cccccc;
    margin-bottom: 0.8rem;
`;

const CommentActions = styled.div`
    display: flex;
    gap: 1rem;
`;

const CommentLikeButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    border: none;
    color: ${({ $active }) => ($active ? '#ef4444' : '#939393')};
    font-size: 1.2rem;
    padding: 0;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: #ef4444;
        }
    }
`;

const CommentInputSection = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #1a1a1a;
    border-radius: 0;
    margin: 1.5rem -2rem -2rem -2rem;
`;

const CommentInput = styled.textarea`
    flex: 1;
    padding: 1rem 1.2rem;
    font-size: 1.4rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 0.8rem;
    color: #ffffff;
    outline: none;
    resize: none;
    min-height: 4rem;
    font-family: inherit;

    &::placeholder {
        color: #939393;
    }

    &:focus {
        border-color: #4272ec;
    }
`;

const CommentSubmitButton = styled.button`
    padding: 1rem 2rem;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #1a1a1a;
`;

const ErrorMessage = styled.div`
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 2rem;
`;

const BackButton = styled.button`
    padding: 1.2rem 2.4rem;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 3rem;
    font-size: 1.4rem;
    font-weight: 600;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;
