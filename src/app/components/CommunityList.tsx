'use client';

import 'swiper/css';

import styled from '@emotion/styled';

import CommunityCard from '@/app/components/CommunityCard';

interface CommunityData {
    id: number;
    image: string;
    username: string;
    title: string;
    createAt: string;
    comment: number;
    game: string;
    category: string;
}

interface CommunityListProps {
    list: CommunityData[];
}

export default function CommunityList({ list }: CommunityListProps) {
    return (
        <CommunityWrapper>
            {list.map((item) => (
                <CommunityCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    username={item.username}
                    title={item.title}
                    createAt={item.createAt}
                    comment={item.comment}
                    game={item.game}
                    category={item.category}
                />
            ))}
        </CommunityWrapper>
    );
}

const CommunityWrapper = styled.div`
    width: 100%;
`;
