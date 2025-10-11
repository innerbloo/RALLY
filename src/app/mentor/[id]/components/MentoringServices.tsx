'use client';

import { Clock } from 'lucide-react';

import styled from '@emotion/styled';

import type { MentorService } from '@/data/mentorDetailMockData';

interface MentoringServicesProps {
    services: MentorService[];
    curriculum: string[];
}

export default function MentoringServices({
    services,
    curriculum,
}: MentoringServicesProps) {
    return (
        <Container>
            <SectionTitle>멘토링 서비스</SectionTitle>

            <ServicesGrid>
                {services.map((service, index) => (
                    <ServiceCard key={index}>
                        <ServiceHeader>
                            <ServiceType>{service.type}</ServiceType>
                        </ServiceHeader>
                        <ServiceDescription>
                            {service.description}
                        </ServiceDescription>
                        <ServiceDetails>
                            <DetailItem>
                                <WonIcon>₩</WonIcon>
                                <DetailText>
                                    {service.price.toLocaleString()}원
                                </DetailText>
                            </DetailItem>
                            <DetailItem>
                                <Clock size={16} />
                                <DetailText>{service.duration}분</DetailText>
                            </DetailItem>
                        </ServiceDetails>
                    </ServiceCard>
                ))}
            </ServicesGrid>

            {curriculum.length > 0 && (
                <CurriculumSection>
                    <CurriculumTitle>커리큘럼</CurriculumTitle>
                    <CurriculumList>
                        {curriculum.map((item, index) => (
                            <CurriculumItem key={index}>
                                <CurriculumBullet>
                                    {index + 1}
                                </CurriculumBullet>
                                <CurriculumText>{item}</CurriculumText>
                            </CurriculumItem>
                        ))}
                    </CurriculumList>
                </CurriculumSection>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
`;

const ServiceCard = styled.div`
    padding: 2rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            transform: translateY(-0.2rem);
        }
    }
`;

const ServiceHeader = styled.div`
    padding-bottom: 1rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const ServiceType = styled.h3`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const ServiceDescription = styled.p`
    font-size: 1.4rem;
    line-height: 1.6;
    color: #939393;
    margin: 0;
    word-break: keep-all;
`;

const ServiceDetails = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: auto;
`;

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #4272ec;
`;

const WonIcon = styled.span`
    font-size: 1.6rem;
    font-weight: 700;
    color: #4272ec;
    line-height: 1;
`;

const DetailText = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
`;

const CurriculumSection = styled.div`
    padding: 2rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
`;

const CurriculumTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 0.2rem solid #4272ec;
`;

const CurriculumList = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CurriculumItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
`;

const CurriculumBullet = styled.div`
    flex-shrink: 0;
    width: 2.8rem;
    height: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 700;
    border-radius: 50%;
`;

const CurriculumText = styled.span`
    flex: 1;
    font-size: 1.5rem;
    line-height: 1.6;
    color: #cccccc;
    padding-top: 0.4rem;
    word-break: keep-all;
`;
