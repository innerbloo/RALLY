'use client';

import Image from 'next/image';

import PositionLolTop2 from '/public/lol/position-lol-top2.svg';
import PositionOverwatchDPS2 from '/public/overwatch/position-overwatch-dps2.svg';

import styled from '@emotion/styled';

import DuoRecommendList from '@/app/components/DuoRecommendList';
import MentorRecommendList from '@/app/components/MentorRecommendList';

export default function Home() {
    return (
        <div>
            <HomeContainer>
                <PopularGameSection>
                    <h2>인기 게임</h2>
                    <GameWrapper>
                        <li>
                            <Image
                                src={'/game1.png'}
                                width={62}
                                height={62}
                                alt={'리그오브레전드'}
                            />
                            리그오브레전드
                        </li>
                        <li>
                            <Image
                                src={'/game2.png'}
                                width={62}
                                height={62}
                                alt={'전략적 팀 전투'}
                            />
                            전략적 팀 전투
                        </li>
                        <li>
                            <Image
                                src={'/game3.png'}
                                width={62}
                                height={62}
                                alt={'발로란트'}
                            />
                            발로란트
                        </li>
                        <li>
                            <Image
                                src={'/game4.png'}
                                width={62}
                                height={62}
                                alt={'오버워치2'}
                            />
                            오버워치2
                        </li>
                        <li>
                            <Image
                                src={'/game5.png'}
                                width={62}
                                height={62}
                                alt={'배틀그라운드'}
                            />
                            배틀그라운드
                        </li>
                        <li>
                            <Image
                                src={'/game-more.png'}
                                width={62}
                                height={62}
                                alt={'더보기'}
                            />
                            더보기
                        </li>
                    </GameWrapper>
                </PopularGameSection>
                <DuoRecommendSection>
                    <h2>듀오 추천</h2>
                    <DuoRecommendList
                        duos={[
                            {
                                id: 1,
                                profileImage: '/lol/profile-lol-1.png',
                                username: '멋졌으면 핑찍어',
                                position: (
                                    <PositionLolTop2 width={20} height={20} />
                                ),
                                userCode: '#96327',
                                description:
                                    '디코하면서 같이 으쌰으쌰 하실분찾아요~',
                                rankImage: '/lol/rank-lol-emerald.webp',
                                rankText: 'E4',
                                tags: [
                                    '공격적인',
                                    '신중한 플레이',
                                    '다혈질',
                                    '+',
                                ],
                                gameImage: '/game1.png',
                                gameAlt: '리그오브레전드',
                            },
                            {
                                id: 2,
                                profileImage: '/lol/profile-lol-2.png',
                                username: '티 모',
                                userCode: '#TM1',
                                description:
                                    '함께 할 듀오 파트너를 찾고있어요.',
                                rankImage: '/lol/rank-lol-gold.webp',
                                rankText: 'G1',
                                tags: [
                                    '전략적인',
                                    '창의적인 플레이',
                                    '편하게 대화하는',
                                    '+',
                                ],
                                gameImage: '/game2.png',
                                gameAlt: '전략적 팀 전투',
                            },
                            {
                                id: 3,
                                profileImage:
                                    '/overwatch/profile-overwatch-1.png',
                                username: '닮은 살걀',
                                position: (
                                    <PositionOverwatchDPS2
                                        width={18}
                                        height={20}
                                        style={{ objectFit: 'contain' }}
                                    />
                                ),
                                userCode: '#32948',
                                description: '즐빡겜 듀오 구해요!',
                                rankImage:
                                    '/overwatch/rank-overwatch-diamond.webp',
                                rankText: 'D2',
                                tags: [
                                    '팀 중심형',
                                    '빠른 템포 선호',
                                    '리더형',
                                    '+',
                                ],
                                gameImage: '/game4.png',
                                gameAlt: '전략적 팀 전투',
                            },
                        ]}
                    />
                </DuoRecommendSection>
                <MentorRecommendSection>
                    <h2>멘토 추천</h2>
                    <MentorRecommendList
                        mentors={[
                            {
                                id: 1,
                                profileImage: '/mentor/profile-mentor-1.png',
                                username: '고양이 발바닥',
                                rate: 5.0,
                                reviews: 142,
                                description:
                                    '안녕하세요! 브론즈부터 차근차근 모든 구간에서 플레이하며 티어를 올려본 경험을 바탕으로, 작은 성취를 쌓아가는 과정의 즐거움과 꾸준함의 가치를 배웠습니다. 이러한 경험은 어떤 도전에서도 흔들리지 않고 성장할 수 있는 저의 강점이 될 것이라 믿습니다.',
                                gameImage: '/game1.png',
                                gameAlt: '리그오브레전드',
                            },
                            {
                                id: 2,
                                profileImage: '/mentor/profile-mentor-1.png',
                                username: '고양이 발바닥',
                                rate: 5.0,
                                reviews: 142,
                                description:
                                    '안녕하세요! 브론즈부터 차근차근 모든 구간에서 플레이하며 티어를 올려본 경험을 바탕으로, 작은 성취를 쌓아가는 과정의 즐거움과 꾸준함의 가치를 배웠습니다. 이러한 경험은 어떤 도전에서도 흔들리지 않고 성장할 수 있는 저의 강점이 될 것이라 믿습니다.',
                                gameImage: '/game1.png',
                                gameAlt: '리그오브레전드',
                            },
                            {
                                id: 3,
                                profileImage: '/mentor/profile-mentor-1.png',
                                username: '고양이 발바닥',
                                rate: 5.0,
                                reviews: 142,
                                description:
                                    '안녕하세요! 브론즈부터 차근차근 모든 구간에서 플레이하며 티어를 올려본 경험을 바탕으로, 작은 성취를 쌓아가는 과정의 즐거움과 꾸준함의 가치를 배웠습니다. 이러한 경험은 어떤 도전에서도 흔들리지 않고 성장할 수 있는 저의 강점이 될 것이라 믿습니다.',
                                gameImage: '/game1.png',
                                gameAlt: '리그오브레전드',
                            },
                        ]}
                    />
                </MentorRecommendSection>
            </HomeContainer>
        </div>
    );
}

const HomeContainer = styled.main`
    padding: 2rem;

    > section {
        margin: 0 0 4rem;

        > h2 {
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 2rem;
        }
    }
`;

const PopularGameSection = styled.section``;

const GameWrapper = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2rem;

    li {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

const DuoRecommendSection = styled.section``;

const MentorRecommendSection = styled.section``;
