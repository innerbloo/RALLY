'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

import { getEventById } from '@/data/eventMockData';

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = Number(params.id);
    const event = getEventById(eventId);

    // 페이지 진입 시 스크롤 최상단 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!event) {
        return (
            <ErrorContainer>
                <ErrorMessage>이벤트를 찾을 수 없습니다.</ErrorMessage>
                <BackButton onClick={() => router.push('/')}>
                    홈으로 돌아가기
                </BackButton>
            </ErrorContainer>
        );
    }

    const handleParticipate = () => {
        toast.success('이벤트 참여가 완료되었습니다!', {
            id: 'event-participate',
        });
    };

    return (
        <DetailContainer>
            <BannerSection>
                <BannerImage
                    src={event.bannerImage}
                    alt={event.title}
                    width={800}
                    height={400}
                    priority
                />
            </BannerSection>

            <ContentSection>
                <EventHeader>
                    <EventBadge>EVENT</EventBadge>
                    <EventTitle>{event.title}</EventTitle>
                    <EventDescription>{event.description}</EventDescription>
                    <EventPeriod>
                        {formatDate(event.startDate)} ~{' '}
                        {formatDate(event.endDate)}
                    </EventPeriod>
                </EventHeader>

                <EventBody>
                    <EventContent>{event.content}</EventContent>

                    <SectionBlock>
                        <SectionTitle>혜택</SectionTitle>
                        <BenefitsList>
                            {event.benefits.map((benefit, index) => (
                                <BenefitItem key={index}>
                                    <BenefitBullet>•</BenefitBullet>
                                    <BenefitText>{benefit}</BenefitText>
                                </BenefitItem>
                            ))}
                        </BenefitsList>
                    </SectionBlock>

                    <SectionBlock>
                        <SectionTitle>참여 방법</SectionTitle>
                        <StepsList>
                            {event.howToParticipate.map((step, index) => (
                                <StepItem key={index}>
                                    <StepNumber>{index + 1}</StepNumber>
                                    <StepText>{step}</StepText>
                                </StepItem>
                            ))}
                        </StepsList>
                    </SectionBlock>

                    <SectionBlock>
                        <SectionTitle>유의 사항</SectionTitle>
                        <NotesList>
                            {event.notes.map((note, index) => (
                                <NoteItem key={index}>
                                    <NoteBullet>•</NoteBullet>
                                    <NoteText>{note}</NoteText>
                                </NoteItem>
                            ))}
                        </NotesList>
                    </SectionBlock>
                </EventBody>

                <ParticipateButton onClick={handleParticipate}>
                    참여하기
                </ParticipateButton>
            </ContentSection>
        </DetailContainer>
    );
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
}

const DetailContainer = styled.main`
    padding-top: calc(6rem + env(safe-area-inset-top));
    padding-bottom: calc(2rem + env(safe-area-inset-bottom));
    background-color: #1a1a1a;
    min-height: 100vh;
`;

const BannerSection = styled.div`
    width: 100%;
    aspect-ratio: 2 / 1;
    position: relative;
    background-color: #252527;
`;

const BannerImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
`;

const ContentSection = styled.div`
    padding: 2rem;
`;

const EventHeader = styled.div`
    margin-bottom: 3rem;
`;

const EventBadge = styled.span`
    display: inline-block;
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border-radius: 1.2rem;
    margin-bottom: 1.5rem;
`;

const EventTitle = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.4;
    margin: 0 0 1rem;
`;

const EventDescription = styled.p`
    font-size: 1.6rem;
    color: #cccccc;
    line-height: 1.6;
    margin: 0 0 1.5rem;
`;

const EventPeriod = styled.div`
    display: inline-block;
    padding: 0.8rem 1.6rem;
    background-color: #252527;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    color: #4272ec;
    font-weight: 600;
`;

const EventBody = styled.div`
    margin-bottom: 2rem;
`;

const EventContent = styled.p`
    font-size: 1.5rem;
    line-height: 1.8;
    color: #b8b8b8;
    margin-bottom: 3rem;
    word-break: keep-all;
`;

const SectionBlock = styled.div`
    margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 0.2rem solid #4272ec;
`;

const BenefitsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const BenefitItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background-color: #252527;
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const BenefitBullet = styled.span`
    color: #4272ec;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.6;
`;

const BenefitText = styled.span`
    flex: 1;
    font-size: 1.5rem;
    color: #cccccc;
    line-height: 1.6;
    word-break: keep-all;
`;

const StepsList = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const StepItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 1.5rem;
    background-color: #252527;
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const StepNumber = styled.div`
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

const StepText = styled.span`
    flex: 1;
    font-size: 1.5rem;
    color: #cccccc;
    line-height: 1.6;
    padding-top: 0.4rem;
`;

const NotesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NoteItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    border-radius: 0.4rem;
    margin-bottom: 0.8rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const NoteBullet = styled.span`
    color: #939393;
    font-size: 1.6rem;
    line-height: 1.6;
`;

const NoteText = styled.span`
    flex: 1;
    font-size: 1.4rem;
    color: #939393;
    line-height: 1.6;
    word-break: keep-all;
`;

const ParticipateButton = styled.button`
    width: 100%;
    padding: 1.8rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 1.6rem;
    font-size: 1.6rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(66, 114, 236, 0.3);

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 6px 20px rgba(66, 114, 236, 0.4);
        }
    }

    &:active {
        transform: translateY(0);
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
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #3a5fd9;
        }
    }
`;
