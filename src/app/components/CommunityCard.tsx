'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface CommunityCardProps {
    image: string;
    username: string;
    title: string;
    createAt: string;
    comment: number;
    game: string;
}

export default function CommunityCard({
    image,
    username,
    title,
    createAt,
    comment,
    game,
}: CommunityCardProps) {
    return (
        <CardContainer>
            <CommunityTopSection></CommunityTopSection>
            <CommunityBottomSection></CommunityBottomSection>
        </CardContainer>
    );
}

const CardContainer = styled.li`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    background-color: #252527;
`;

const CommunityTopSection = styled.div``;

const DescriptionText = styled.p`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

const CommunityBottomSection = styled.div``;
