'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styled from '@emotion/styled';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Review {
    id: number;
    reviewerId: number;
    reviewerName: string;
    reviewerImage: string;
    rating: number;
    comment: string;
    createdAt: string;
    helpful?: number;
}

interface UserReviewsProps {
    reviews: Review[];
    userId: number;
}

export default function UserReviews({ reviews, userId }: UserReviewsProps) {
    const router = useRouter();
    const [helpfulReviews, setHelpfulReviews] = useState<Set<number>>(
        new Set(),
    );

    const handleReviewerClick = (reviewerId: number) => {
        router.push(`/profile/${reviewerId}`, { scroll: false });
    };

    const handleHelpful = (reviewId: number) => {
        setHelpfulReviews((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(reviewId)) {
                newSet.delete(reviewId);
            } else {
                newSet.add(reviewId);
            }
            return newSet;
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i}>
                <Star size={16} fill={i < rating ? '#FFD700' : 'none'} color="#FFD700" />
            </StarIcon>
        ));
    };

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0;

    return (
        <ReviewsContainer>
            <SectionHeader>
                <SectionTitle>받은 리뷰</SectionTitle>
                {reviews.length > 0 && (
                    <AverageRating>
                        <AverageStars>
                            {renderStars(Math.round(averageRating))}
                        </AverageStars>
                        <AverageText>
                            {averageRating.toFixed(1)} ({reviews.length}개)
                        </AverageText>
                    </AverageRating>
                )}
            </SectionHeader>

            {reviews.length > 0 ? (
                <ReviewList>
                    {reviews.map((review) => (
                        <ReviewCard key={review.id}>
                            <ReviewHeader>
                                <ReviewerInfo
                                    onClick={() =>
                                        handleReviewerClick(review.reviewerId)
                                    }
                                >
                                    <ReviewerImage
                                        src={review.reviewerImage || '/hsu.png'}
                                        width={40}
                                        height={40}
                                        alt={review.reviewerName}
                                    />
                                    <ReviewerDetails>
                                        <ReviewerName>
                                            {review.reviewerName}
                                        </ReviewerName>
                                        <ReviewDate>
                                            {dayjs(review.createdAt).fromNow()}
                                        </ReviewDate>
                                    </ReviewerDetails>
                                </ReviewerInfo>
                                <ReviewRating>
                                    {renderStars(review.rating)}
                                </ReviewRating>
                            </ReviewHeader>

                            <ReviewComment>{review.comment}</ReviewComment>

                            <ReviewFooter>
                                <HelpfulButton
                                    $active={helpfulReviews.has(review.id)}
                                    onClick={() => handleHelpful(review.id)}
                                >
                                    <ThumbsUp size={14} />
                                    도움이 됐어요
                                    {(review.helpful || 0) +
                                        (helpfulReviews.has(review.id)
                                            ? 1
                                            : 0) >
                                        0 && (
                                        <HelpfulCount>
                                            {(review.helpful || 0) +
                                                (helpfulReviews.has(review.id)
                                                    ? 1
                                                    : 0)}
                                        </HelpfulCount>
                                    )}
                                </HelpfulButton>
                            </ReviewFooter>
                        </ReviewCard>
                    ))}
                </ReviewList>
            ) : (
                <EmptyState>
                    <EmptyIcon>💬</EmptyIcon>
                    <EmptyText>아직 받은 리뷰가 없습니다.</EmptyText>
                    <EmptySubText>
                        함께 플레이한 유저들이 리뷰를 남길 수 있습니다.
                    </EmptySubText>
                </EmptyState>
            )}
        </ReviewsContainer>
    );
}

const ReviewsContainer = styled.div`
    margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const AverageRating = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;

const AverageStars = styled.div`
    display: flex;
    gap: 0.2rem;
`;

const AverageText = styled.span`
    font-size: 1.4rem;
    color: #939393;
`;

const StarIcon = styled.div`
    display: flex;
    align-items: center;
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const ReviewCard = styled.div`
    background-color: #252527;
    border-radius: 1.2rem;
    padding: 1.8rem;
    border: 0.1rem solid #3f3f41;
`;

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
`;

const ReviewerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: opacity 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.7;
        }
    }
`;

const ReviewerImage = styled(Image)`
    border-radius: 50%;
    object-fit: cover;
`;

const ReviewerDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const ReviewerName = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
`;

const ReviewDate = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const ReviewRating = styled.div`
    display: flex;
    gap: 0.2rem;
`;

const ReviewComment = styled.p`
    font-size: 1.4rem;
    color: #e0e0e0;
    line-height: 1.6;
    margin: 0 0 1.2rem;
`;

const ReviewFooter = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const HelpfulButton = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.2rem;
    background-color: ${({ $active }) =>
        $active ? '#4272ec20' : 'transparent'};
    border: 0.1rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 0.8rem;
    color: ${({ $active }) => ($active ? '#4272ec' : '#939393')};
    font-size: 1.3rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${({ $active }) =>
                $active ? '#4272ec30' : '#252527'};
            border-color: #4272ec;
            color: #4272ec;
        }
    }
`;

const HelpfulCount = styled.span`
    padding: 0.2rem 0.6rem;
    background-color: #4272ec;
    color: #ffffff;
    border-radius: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.4;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
`;

const EmptyText = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: #ffffff;
    margin: 0 0 0.5rem;
`;

const EmptySubText = styled.p`
    font-size: 1.3rem;
    color: #939393;
    margin: 0;
    text-align: center;
`;
