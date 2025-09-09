'use client';

import styled from '@emotion/styled';

import RecommendContentCard from '@/app/components/RecommendContentCard';

interface RecommendContentData {
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
}

interface RecommendContentListProps {
    contents: RecommendContentData[];
}

export default function RecommendContentList({ contents }: RecommendContentListProps) {
    return (
        <ContentWrapper>
            {contents.map((content) => (
                <RecommendContentCard
                    key={content.id}
                    image={content.image}
                    title={content.title}
                    type={content.type}
                    difficulty={content.difficulty}
                    author={content.author}
                    createAt={content.createAt}
                    likes={content.likes}
                    views={content.views}
                    game={content.game}
                />
            ))}
        </ContentWrapper>
    );
}

const ContentWrapper = styled.ul`
    width: 100%;
    margin: 0;
    padding: 0;
`;