'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import MentorActionButtons from './components/MentorActionButtons';
import MentorIntroduction from './components/MentorIntroduction';
import MentorProfileHeader from './components/MentorProfileHeader';
import MentorReviews from './components/MentorReviews';
import MentorStats from './components/MentorStats';
import MentoringServices from './components/MentoringServices';

import styled from '@emotion/styled';

import { getMentorDetailById } from '@/data/mentorDetailMockData';

export default function MentorDetailPage() {
    const params = useParams();
    const router = useRouter();
    const mentorId = Number(params.id);
    const mentor = getMentorDetailById(mentorId);

    // 페이지 진입 시 스크롤 최상단 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!mentor) {
        return (
            <ErrorContainer>
                <ErrorMessage>멘토를 찾을 수 없습니다.</ErrorMessage>
                <BackButton onClick={() => router.push('/')}>
                    홈으로 돌아가기
                </BackButton>
            </ErrorContainer>
        );
    }

    return (
        <PageContainer>
            <ContentWrapper>
                <MentorProfileHeader mentor={mentor} />
                <MentorIntroduction mentor={mentor} />
                <MentoringServices services={mentor.services} curriculum={mentor.curriculum} />
                <MentorStats
                    totalSessions={mentor.totalSessions}
                    studentCount={mentor.studentCount}
                    rating={mentor.rating}
                    tier={mentor.tier}
                />
                <MentorReviews reviews={mentor.reviews} mentorId={mentor.id} />
            </ContentWrapper>
            <MentorActionButtons
                mentorId={mentor.id}
                mentorName={mentor.username}
                mentorProfileImage={mentor.profileImage}
            />
        </PageContainer>
    );
}

const PageContainer = styled.main`
    min-height: 100vh;
    background-color: #1a1a1a;
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(9rem + env(safe-area-inset-bottom));
`;

const ContentWrapper = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem;

    > * {
        margin-bottom: 3rem;
    }

    > *:last-child {
        margin-bottom: 2rem;
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
