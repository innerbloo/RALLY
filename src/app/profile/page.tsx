'use client';

import { useEffect, useState } from 'react';

import ActivityTabs from './components/ActivityTabs';
import GameInfoSection, { UserGame } from './components/GameInfoSection';
import ProfileHeader from './components/ProfileHeader';
import SettingsMenu from './components/SettingsMenu';
import StatsGrid from './components/StatsGrid';

import styled from '@emotion/styled';

import { mockPostDetails } from '@/data/communityMockData';

interface UserProfile {
    nickname: string;
    profileImage: string;
    bio: string;
}

interface UserStats {
    matchCount: number;
    rating: number;
}

interface CommunityPost {
    id: number;
    image: string;
    username: string;
    title: string;
    createAt: string;
    comment: number;
    game: string;
    category: string;
}

interface UserComment {
    postId: number;
    postTitle: string;
    comment: string;
    createAt: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile>({
        nickname: '한성대 즐겜러',
        profileImage: '/hsu.png',
        bio: '안녕하세요! 언제든지 같이 게임할 사람 구해요!',
    });

    const [stats, setStats] = useState<UserStats>({
        matchCount: 0,
        rating: 0,
    });

    const [games, setGames] = useState<UserGame[]>([]);
    const [myPosts, setMyPosts] = useState<CommunityPost[]>([]);
    const [likedPosts, setLikedPosts] = useState<CommunityPost[]>([]);
    const [myComments, setMyComments] = useState<UserComment[]>([]);

    // localStorage에서 데이터 로드
    useEffect(() => {
        // 프로필 데이터
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        } else {
            // 초기 프로필 데이터 저장
            localStorage.setItem('userProfile', JSON.stringify(profile));
        }

        // 통계 데이터
        const savedStats = localStorage.getItem('userStats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        } else {
            // 초기 통계 데이터 저장 (기본값)
            const initialStats = { matchCount: 0, rating: 0 };
            localStorage.setItem('userStats', JSON.stringify(initialStats));
            setStats(initialStats);
        }

        // 게임 정보
        const savedGames = localStorage.getItem('userGames');
        if (savedGames) {
            setGames(JSON.parse(savedGames));
        }

        // 내 게시글
        const savedMyPosts = localStorage.getItem('myPosts');
        if (savedMyPosts) {
            setMyPosts(JSON.parse(savedMyPosts));
        }

        // 좋아요한 게시글
        const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}');
        const likedPostIds = Object.keys(postLikes).filter(
            (id) => postLikes[id],
        );

        const likedPostsList: CommunityPost[] = [];
        likedPostIds.forEach((id) => {
            const postId = Number(id);

            // 내가 작성한 게시글에서 찾기
            const myPost = savedMyPosts
                ? JSON.parse(savedMyPosts).find(
                      (p: CommunityPost) => p.id === postId,
                  )
                : null;

            if (myPost) {
                likedPostsList.push(myPost);
            } else if (mockPostDetails[postId]) {
                // 목업 데이터에서 찾기
                const mockPost = mockPostDetails[postId];
                likedPostsList.push({
                    id: mockPost.id,
                    image: mockPost.image,
                    username: mockPost.username,
                    title: mockPost.title,
                    createAt: mockPost.createAt,
                    comment: mockPost.comments.length,
                    game: mockPost.game,
                    category: mockPost.category,
                });
            }
        });

        setLikedPosts(likedPostsList);

        // 내 댓글
        const savedMyComments = JSON.parse(
            localStorage.getItem('myComments') || '{}',
        );
        const commentsList: UserComment[] = [];

        Object.keys(savedMyComments).forEach((postId) => {
            const comments = savedMyComments[postId];
            const numPostId = Number(postId);

            // 게시글 제목 찾기
            let postTitle = '';
            const myPost = savedMyPosts
                ? JSON.parse(savedMyPosts).find(
                      (p: CommunityPost) => p.id === numPostId,
                  )
                : null;

            if (myPost) {
                postTitle = myPost.title;
            } else if (mockPostDetails[numPostId]) {
                postTitle = mockPostDetails[numPostId].title;
            }

            comments.forEach(
                (comment: { content: string; createAt: string }) => {
                    commentsList.push({
                        postId: numPostId,
                        postTitle,
                        comment: comment.content,
                        createAt: comment.createAt,
                    });
                },
            );
        });

        setMyComments(commentsList);
    }, []);

    // 통계 계산
    const postCount = myPosts.length;
    const likeCount = myPosts.reduce(
        (sum, post: CommunityPost & { likes?: number }) =>
            sum + (post.likes || 0),
        0,
    );

    return (
        <ProfileContainer>
            <ProfileHeader
                profileImage={profile.profileImage}
                nickname={profile.nickname}
                bio={profile.bio}
            />

            <StatsGrid
                matchCount={stats.matchCount}
                rating={stats.rating}
                postCount={postCount}
                likeCount={likeCount}
            />

            <GameInfoSection games={games} />

            <ActivityTabs
                myPosts={myPosts}
                likedPosts={likedPosts}
                myComments={myComments}
            />

            <SettingsMenu />
        </ProfileContainer>
    );
}

const ProfileContainer = styled.main`
    padding: calc(6rem + env(safe-area-inset-top)) 2rem
        calc(11rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh; /* Fallback */
    min-height: 100dvh; /* Dynamic viewport height */
    min-height: calc(var(--vh, 1vh) * 100); /* Custom property */

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding-bottom: 11rem;
    }

    > *:first-of-type {
        margin-top: 2rem;
    }
`;
