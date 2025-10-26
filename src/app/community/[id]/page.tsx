'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

import { Comment, PostDetail, mockPostDetails } from '@/data/communityMockData';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function CommunityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const postId = Number(params.id);
    const [post, setPost] = useState<PostDetail | undefined>(
        mockPostDetails[postId],
    );
    const [newComment, setNewComment] = useState<string>('');
    const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>(
        {},
    );

    const getCategoryColor = (category: string) => {
        switch (category) {
            case '공략':
                return '#4272ec';
            case '자유':
                return '#9C27B0';
            case '질문':
                return '#FF9800';
            case '팁':
                return '#4CAF50';
            default:
                return '#4272ec';
        }
    };

    // 페이지 진입 시 스크롤 최상단 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 로컬스토리지에서 데이터 불러오기
    useEffect(() => {
        if (!postId) return;

        // 내가 작성한 게시글 먼저 확인
        const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        const myPost = myPosts.find((p: PostDetail) => p.id === postId);

        // 게시글 좋아요 상태
        const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}');
        const isLiked = postLikes[postId] || false;

        // 댓글 좋아요 상태
        const savedCommentLikes = JSON.parse(
            localStorage.getItem('commentLikes') || '{}',
        );
        setCommentLikes(savedCommentLikes);

        // 내가 작성한 댓글
        const myComments = JSON.parse(
            localStorage.getItem('myComments') || '{}',
        );
        const postComments = myComments[postId] || [];

        if (myPost) {
            // 내가 작성한 게시글
            setPost({
                ...myPost,
                isLiked,
                comments: [...(myPost.comments || []), ...postComments],
            });
        } else if (mockPostDetails[postId]) {
            // 목업 게시글
            const originalPost = mockPostDetails[postId];
            setPost({
                ...originalPost,
                isLiked,
                comments: [...originalPost.comments, ...postComments],
            });
        }
    }, [postId]);

    if (!post) {
        return (
            <ErrorContainer>
                <ErrorMessage>게시글을 찾을 수 없습니다.</ErrorMessage>
                <BackButton onClick={() => router.push('/community')}>
                    목록으로 돌아가기
                </BackButton>
            </ErrorContainer>
        );
    }

    const handleLike = () => {
        setPost((prev) => {
            if (!prev) return prev;

            const newIsLiked = !prev.isLiked;
            const newLikes = prev.isLiked ? prev.likes - 1 : prev.likes + 1;

            // 로컬스토리지에 저장
            const postLikes = JSON.parse(
                localStorage.getItem('postLikes') || '{}',
            );
            postLikes[postId] = newIsLiked;
            localStorage.setItem('postLikes', JSON.stringify(postLikes));

            // 내가 작성한 게시글인 경우 좋아요 수 업데이트
            const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
            const myPostIndex = myPosts.findIndex(
                (p: PostDetail) => p.id === postId,
            );
            if (myPostIndex !== -1) {
                myPosts[myPostIndex].likes = newLikes;
                localStorage.setItem('myPosts', JSON.stringify(myPosts));
            }

            return {
                ...prev,
                isLiked: newIsLiked,
                likes: newLikes,
            };
        });
    };

    const handleShare = async () => {
        console.log('공유 버튼 클릭됨');
        console.log('navigator.share 지원:', !!navigator.share);

        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.content,
                    url: window.location.href,
                });
                console.log('공유 성공');
            } catch (error) {
                console.log('공유 에러:', error);
                // 사용자가 공유를 취소한 경우 조용히 처리
                if ((error as Error).name !== 'AbortError') {
                    console.error('공유 실패:', error);
                    toast.error('공유에 실패했습니다.');
                }
            }
        } else {
            // 공유 API를 지원하지 않는 경우 클립보드에 복사
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('링크가 복사되었습니다!');
                console.log('클립보드 복사 성공');
            } catch (error) {
                console.error('복사 실패:', error);
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

            // 로컬스토리지에 저장
            localStorage.setItem('commentLikes', JSON.stringify(newLikes));

            return newLikes;
        });

        // 댓글 좋아요 수 업데이트
        setPost((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                comments: prev.comments.map((comment) =>
                    comment.id === commentId
                        ? {
                              ...comment,
                              likes: commentLikes[commentId]
                                  ? comment.likes - 1
                                  : comment.likes + 1,
                          }
                        : comment,
                ),
            };
        });
    };

    const handleAuthorClick = () => {
        router.push(`/profile/${post.userId}`);
    };

    const handleCommentAuthorClick = (userId: number) => {
        router.push(`/profile/${userId}`);
    };

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;

        // 댓글 내용을 임시 저장하고 즉시 입력창 초기화 (중복 제출 방지)
        const commentContent = newComment.trim();
        setNewComment('');

        // 로컬스토리지에서 프로필 정보 가져오기
        const userProfile = JSON.parse(
            localStorage.getItem('userProfile') ||
                '{"nickname":"한성대 즐겜러","profileImage":"/hsu.png","bio":""}',
        );

        const newCommentObj: Comment = {
            id: Date.now(), // 고유 ID 생성
            userId: 0, // 현재 사용자 ID
            username: userProfile.nickname,
            profileImage: userProfile.profileImage,
            content: commentContent,
            createAt: new Date().toISOString(),
            likes: 0,
        };

        // 로컬스토리지에 저장
        const myComments = JSON.parse(
            localStorage.getItem('myComments') || '{}',
        );
        if (!myComments[postId]) {
            myComments[postId] = [];
        }
        myComments[postId].push(newCommentObj);
        localStorage.setItem('myComments', JSON.stringify(myComments));

        // 내가 작성한 게시글인 경우 댓글 수 업데이트
        const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
        const myPostIndex = myPosts.findIndex(
            (p: PostDetail) => p.id === postId,
        );
        if (myPostIndex !== -1) {
            myPosts[myPostIndex].comment += 1;
            localStorage.setItem('myPosts', JSON.stringify(myPosts));
        }

        setPost((prev) =>
            prev
                ? {
                      ...prev,
                      comments: [...prev.comments, newCommentObj],
                      comment: prev.comment + 1,
                  }
                : prev,
        );
    };

    return (
        <DetailContainer>
            <PostContent>
                <PostMeta>
                    <CategoryBadge $color={getCategoryColor(post.category)}>
                        {post.category}
                    </CategoryBadge>
                    <GameBadge>{post.game}</GameBadge>
                </PostMeta>

                <PostTitle>{post.title}</PostTitle>

                <AuthorInfo>
                    <AuthorProfile onClick={handleAuthorClick}>
                        <AuthorImage
                            src={post.profileImage}
                            alt={post.username}
                        />
                        <AuthorDetails>
                            <AuthorName>{post.username}</AuthorName>
                            <PostDate>
                                {dayjs(post.createAt).fromNow()} • 조회{' '}
                                {post.views.toLocaleString()}
                            </PostDate>
                        </AuthorDetails>
                    </AuthorProfile>
                </AuthorInfo>

                {post.image && (
                    <PostImage>
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={400}
                            height={250}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </PostImage>
                )}

                <PostBody>{post.content}</PostBody>

                <PostActions>
                    <ActionButton onClick={handleLike} $active={post.isLiked}>
                        <Heart
                            size={20}
                            fill={post.isLiked ? '#ef4444' : 'none'}
                        />
                        <span>{post.likes}</span>
                    </ActionButton>
                    <ActionButton>
                        <MessageCircle size={20} />
                        <span>{post.comment}</span>
                    </ActionButton>
                    <ActionButton onClick={handleShare}>
                        <Share2 size={20} />
                        <span>공유</span>
                    </ActionButton>
                </PostActions>
            </PostContent>

            <CommentsSection>
                <CommentsHeader>
                    댓글 <CommentsCount>{post.comments.length}</CommentsCount>
                </CommentsHeader>

                <CommentsList>
                    {post.comments.map((comment) => (
                        <CommentItem key={comment.id}>
                            <CommentAuthor
                                onClick={() =>
                                    handleCommentAuthorClick(comment.userId)
                                }
                            >
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
`;

const PostContent = styled.article`
    padding: 2rem 2rem 0;
`;

const PostMeta = styled.div`
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
`;

const CategoryBadge = styled.span<{ $color: string }>`
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    background-color: ${({ $color }) => $color};
    color: #ffffff;
    border-radius: 1.2rem;
`;

const GameBadge = styled.span`
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    background-color: #252527;
    color: #939393;
    border-radius: 1.2rem;
`;

const PostTitle = styled.h2`
    font-size: 2.2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 1.5rem;
    line-height: 1.4;
`;

const AuthorInfo = styled.div`
    margin-bottom: 2rem;
`;

const AuthorProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: opacity 0.2s ease;
    padding: 0.5rem;
    margin: -0.5rem;
    border-radius: 0.8rem;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #252527;
        }
    }
`;

const AuthorImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
`;

const AuthorDetails = styled.div`
    flex: 1;
`;

const AuthorName = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.2rem;
`;

const PostDate = styled.div`
    font-size: 1.2rem;
    color: #939393;
`;

const PostImage = styled.div`
    margin-bottom: 2rem;
`;

const PostBody = styled.div`
    font-size: 1.6rem;
    line-height: 1.8;
    color: #cccccc;
    white-space: pre-line;
    margin-bottom: 2rem;
`;

const PostActions = styled.div`
    display: flex;
    gap: 2rem;
    padding: 1.5rem 2rem;
    margin: 0 -2rem;
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
    transition: opacity 0.2s ease;
    padding: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    border-radius: 0.8rem;
    cursor: pointer;

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
