'use client';

import styled from '@emotion/styled';

import MentorRecommendCard from '@/app/components/MentorRecommendCard';

interface MentorData {
    id: number;
    profileImage: string;
    username: string;
    rate: number;
    reviews: number;
    description: string;
    gameImage: string;
    gameAlt: string;
}

interface MentorRecommendListProps {
    mentors: MentorData[];
}

export default function MentorRecommendList({
    mentors,
}: MentorRecommendListProps) {
    return (
        <MentorWrapper>
            {mentors.map((mentor) => (
                <MentorRecommendCard
                    key={mentor.id}
                    profileImage={mentor.profileImage}
                    username={mentor.username}
                    rate={mentor.rate}
                    reviews={mentor.reviews}
                    description={mentor.description}
                    gameImage={mentor.gameImage}
                    gameAlt={mentor.gameAlt}
                />
            ))}
        </MentorWrapper>
    );
}

const MentorWrapper = styled.ul`
    display: flex;
    gap: 1rem;
`;
