'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

import styled from '@emotion/styled';

import type { MentorDetail } from '@/data/mentorDetailMockData';

interface MentorProfileHeaderProps {
    mentor: MentorDetail;
}

export default function MentorProfileHeader({
    mentor,
}: MentorProfileHeaderProps) {
    return (
        <HeaderContainer>
            <ProfileImageWrapper>
                <ProfileImage
                    src={mentor.profileImage}
                    alt={mentor.username}
                    width={120}
                    height={120}
                />
            </ProfileImageWrapper>

            <ProfileInfo>
                <NameSection>
                    <MentorName>{mentor.username}</MentorName>
                    <GameBadge>
                        <GameImage
                            src={mentor.gameImage}
                            alt={mentor.game}
                            width={20}
                            height={20}
                        />
                        <span>{mentor.game}</span>
                    </GameBadge>
                </NameSection>

                <RatingSection>
                    <StarIcon>
                        <Star size={20} fill="#FFD700" color="#FFD700" />
                    </StarIcon>
                    <RatingText>
                        <RatingValue>{mentor.rating.toFixed(1)}</RatingValue>
                        <ReviewCount>({mentor.reviewCount}개 리뷰)</ReviewCount>
                    </RatingText>
                </RatingSection>

                <BadgesSection>
                    {mentor.badges.map((badge, index) => (
                        <Badge key={index}>{badge}</Badge>
                    ))}
                </BadgesSection>
            </ProfileInfo>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #252527;
    border-radius: 1.6rem;
    border: 0.1rem solid #3f3f41;
`;

const ProfileImageWrapper = styled.div`
    margin-bottom: 1.5rem;
    cursor: pointer;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    object-fit: cover;
    border: 0.3rem solid #4272ec;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const NameSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.2rem;
`;

const MentorName = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const GameBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.2rem;
    background-color: #1a1a1a;
    border-radius: 2rem;

    span {
        font-size: 1.3rem;
        font-weight: 600;
        color: #cccccc;
    }
`;

const GameImage = styled(Image)`
    object-fit: contain;
`;

const RatingSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
`;

const StarIcon = styled.div`
    display: flex;
    align-items: center;
`;

const RatingText = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
`;

const RatingValue = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: #FFD700;
`;

const ReviewCount = styled.span`
    font-size: 1.4rem;
    color: #939393;
`;

const BadgesSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
`;

const Badge = styled.span`
    padding: 0.6rem 1.2rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border-radius: 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
`;
