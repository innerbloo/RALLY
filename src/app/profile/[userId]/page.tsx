'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ActionButtons from './components/ActionButtons';
import UserGameInfo from './components/UserGameInfo';
import UserProfileHeader from './components/UserProfileHeader';
import UserReviews from './components/UserReviews';
import UserStats from './components/UserStats';

import styled from '@emotion/styled';

import {
    type GameUser,
    getGameNameById,
    getUsersByGame,
} from '@/data/mockGameUsers';
import { mockUserReviews } from '@/data/userReviewsMockData';

interface UserProfileData {
    id: number;
    profileImage: string;
    username: string;
    gameId: string;
    position?: React.ReactNode;
    positionId?: string;
    tier: string;
    rank: string;
    winRate: number;
    kda: number;
    recentChampions: string[];
    gameStyles: string[];
    communicationStyles: string[];
    description: string;
    game: string;
    status?: 'online' | 'offline' | 'in-game' | 'matching';
    bio?: string;
    matchCount?: number;
    rating?: number;
    reviews?: Review[];
}

interface Review {
    id: number;
    reviewerId: number;
    reviewerName: string;
    reviewerImage: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.userId as string;
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 모든 게임의 유저 데이터 가져오기
        const fetchUserData = async () => {
            setIsLoading(true);

            // 모든 게임 유저 데이터에서 해당 유저 찾기
            const allGames = [
                '리그오브레전드',
                '전략적 팀 전투',
                '오버워치2',
            ] as const;
            let foundUser: GameUser | null = null;

            for (const game of allGames) {
                const users = getUsersByGame(game);
                const user = users.find((u) => u.id === parseInt(userId));
                if (user) {
                    foundUser = user;
                    break;
                }
            }

            if (foundUser) {
                // localStorage에서 추가 정보 가져오기
                const storedProfiles = localStorage.getItem('userProfiles');
                const profiles = storedProfiles
                    ? JSON.parse(storedProfiles)
                    : {};
                const userProfile = profiles[userId] || {};

                // 리뷰 데이터 가져오기 (mock 데이터 + localStorage)
                const storedReviews = localStorage.getItem('userReviews');
                const reviews = storedReviews ? JSON.parse(storedReviews) : {};
                const localUserReviews = reviews[userId] || [];
                const mockReviews = mockUserReviews[parseInt(userId)] || [];
                const userReviews = [...mockReviews, ...localUserReviews];

                // 통계 데이터 가져오기 또는 생성
                const storedStats = localStorage.getItem('userStats_' + userId);
                const stats = storedStats
                    ? JSON.parse(storedStats)
                    : {
                          matchCount: Math.floor(Math.random() * 100) + 10,
                          rating:
                              userReviews.length > 0
                                  ? userReviews.reduce(
                                        (sum: number, r: Review) =>
                                            sum + r.rating,
                                        0,
                                    ) / userReviews.length
                                  : 4.5 + Math.random() * 0.5,
                      };

                setUserData({
                    ...foundUser,
                    bio: userProfile.bio || foundUser.description,
                    matchCount: stats.matchCount,
                    rating: stats.rating,
                    reviews: userReviews,
                });
            }

            setIsLoading(false);
        };

        fetchUserData();
    }, [userId]);

    if (isLoading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>프로필을 불러오는 중...</LoadingText>
            </LoadingContainer>
        );
    }

    if (!userData) {
        return (
            <ErrorContainer>
                <ErrorText>사용자를 찾을 수 없습니다.</ErrorText>
                <BackButton onClick={() => router.back()}>돌아가기</BackButton>
            </ErrorContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileContent>
                <UserProfileHeader user={userData} />

                <ActionButtons
                    userId={userData.id}
                    username={userData.username}
                    profileImage={userData.profileImage}
                    game={userData.game}
                />

                <UserStats
                    matchCount={userData.matchCount || 0}
                    rating={userData.rating || 0}
                    winRate={userData.winRate}
                    kda={userData.kda}
                    game={userData.game}
                />

                <UserGameInfo user={userData} />

                <UserReviews
                    reviews={userData.reviews || []}
                    userId={userData.id}
                />
            </ProfileContent>
        </ProfileContainer>
    );
}

const ProfileContainer = styled.main`
    min-height: 100vh;
    background-color: #1a1a1a;
    padding-bottom: calc(8rem + env(safe-area-inset-bottom));
`;

const ProfileContent = styled.div`
    padding: calc(8rem + env(safe-area-inset-top)) 2rem 2rem;
    max-width: 80rem;
    margin: 0 auto;

    > * {
        margin-bottom: 2rem;
    }

    > *:first-of-type {
        margin-top: 1rem;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #1a1a1a;
`;

const LoadingSpinner = styled.div`
    width: 5rem;
    height: 5rem;
    border: 0.4rem solid #252527;
    border-top-color: #4272ec;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const LoadingText = styled.p`
    margin-top: 2rem;
    font-size: 1.6rem;
    color: #939393;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #1a1a1a;
`;

const ErrorText = styled.p`
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 2rem;
`;

const BackButton = styled.button`
    padding: 1.2rem 2.4rem;
    font-size: 1.6rem;
    font-weight: 600;
    background-color: #4272ec;
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    transition: background-color 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;
