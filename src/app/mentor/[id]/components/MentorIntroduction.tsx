'use client';

import styled from '@emotion/styled';

import type { MentorDetail } from '@/data/mentorDetailMockData';

interface MentorIntroductionProps {
    mentor: MentorDetail;
}

export default function MentorIntroduction({
    mentor,
}: MentorIntroductionProps) {
    return (
        <Container>
            <Section>
                <SectionTitle>자기소개</SectionTitle>
                <BioText>{mentor.bio}</BioText>
            </Section>

            <Section>
                <SectionTitle>경력</SectionTitle>
                <ListContainer>
                    {mentor.career.map((item, index) => (
                        <ListItem key={index}>
                            <Bullet>•</Bullet>
                            <ListText>{item}</ListText>
                        </ListItem>
                    ))}
                </ListContainer>
            </Section>

            <Section>
                <SectionTitle>전문 분야</SectionTitle>
                <TagsContainer>
                    {mentor.specialties.map((specialty, index) => (
                        <Tag key={index}>{specialty}</Tag>
                    ))}
                </TagsContainer>
            </Section>

            <Section>
                <SectionTitle>멘토링 스타일</SectionTitle>
                <StyleText>{mentor.style}</StyleText>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding: 2rem;
    background-color: #252527;
    border-radius: 1.6rem;
    border: 0.1rem solid #3f3f41;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    padding-bottom: 0.8rem;
    border-bottom: 0.2rem solid #4272ec;
`;

const BioText = styled.p`
    font-size: 1.5rem;
    line-height: 1.8;
    color: #cccccc;
    margin: 0;
    white-space: pre-line;
    word-break: keep-all;
`;

const ListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ListItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
`;

const Bullet = styled.span`
    color: #4272ec;
    font-size: 1.8rem;
    line-height: 1.6;
    font-weight: 700;
`;

const ListText = styled.span`
    flex: 1;
    font-size: 1.5rem;
    line-height: 1.6;
    color: #cccccc;
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
`;

const Tag = styled.span`
    padding: 0.8rem 1.4rem;
    background-color: #1a1a1a;
    border: 0.1rem solid #4272ec;
    border-radius: 2rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #4272ec;
`;

const StyleText = styled.p`
    font-size: 1.5rem;
    line-height: 1.8;
    color: #cccccc;
    margin: 0;
    padding: 1rem 0;
    word-break: keep-all;
`;
