'use client';

import Image from 'next/image';

import PositionLolTop2 from '/public/lol/position-lol-top2.svg';
import PositionOverwatchDPS2 from '/public/overwatch/position-overwatch-dps2.svg';

import styled from '@emotion/styled';

import CommunityList from '@/app/components/CommunityList';
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
                                profileImage: '/mentor/profile-mentor-2.png',
                                username: '일타강사 옵자루',
                                rate: 4.8,
                                reviews: 136,
                                description:
                                    '오버워치라는 게임은 그 여느 FPS 게임보다도 개념적인 영역이 중요합니다. 단순히 에임이나 반사 신경만으로는 한계가 있으며, 팀 조합 이해, 맵 구조 파악, 그리고 상황별 포지셔닝이 승패를 가르는 핵심 요소가 됩니다.',
                                gameImage: '/game4.png',
                                gameAlt: '오버워치2',
                            },
                            {
                                id: 3,
                                profileImage: '/mentor/profile-mentor-3.png',
                                username: '정호성',
                                rate: 4.5,
                                reviews: 128,
                                description:
                                    '초보자분들께는 기초적인 강의를 중심으로 기본기를 다질 수 있도록 돕고, 다이아~마스터 이상 레벨의 플레이어분들께는 세밀한 디테일과 고급 전략을 위주로 다뤄 실질적인 실력 향상을 이끌어내고자 합니다.',
                                gameImage: '/game2.png',
                                gameAlt: '전략적 팀 전투',
                            },
                        ]}
                    />
                </MentorRecommendSection>
                <CommunitySection>
                    <h2>커뮤니티 인기 글</h2>
                    <CommunityList
                        list={[
                            {
                                id: 1,
                                image: '/community/community1.png',
                                username: '눈팅하러오는사람',
                                title: '롤 첨할 때 생각한 거',
                                createAt: '2025-09-08 08:00:00',
                                comment: 120,
                                game: '리그오브레전드',
                            },
                            {
                                id: 2,
                                image: '/community/community2.png',
                                username: '허나거절한다',
                                title: '남탓을 할 순 있다고 생각함',
                                createAt: '2025-09-08 06:21:00',
                                comment: 113,
                                game: '리그오브레전드',
                            },
                            {
                                id: 3,
                                image: '/community/community3.png',
                                username: '천둥군주의호령',
                                title: '유미 전설 스킨 내놓는게 이해안감',
                                createAt: '2025-09-08 05:20:30',
                                comment: 98,
                                game: '리그오브레전드',
                            },
                            {
                                id: 4,
                                image: '/community/community4.png',
                                username: '수영하는파이리',
                                title: '옵치 망했네',
                                createAt: '2025-09-07 19:20:30',
                                comment: 66,
                                game: '오버워치2',
                            },
                            {
                                id: 5,
                                image: '/community/community5.png',
                                username: '젠장또대상혁이야',
                                title: '롤체 아이템 질문',
                                createAt: '2025-09-06 21:53:12',
                                comment: 53,
                                game: '전략적 팀 전투',
                            },
                        ]}
                    ></CommunityList>
                </CommunitySection>
            </HomeContainer>
        </div>
    );
}

const HomeContainer = styled.main`
    > section {
        margin: 0 0 4rem;
        padding: 2rem 2rem 0;

        > h2 {
            font-size: 2.4rem;
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

const MentorRecommendSection = styled.section`
    padding: 2rem 0 0 2rem !important;
`;

const CommunitySection = styled.section`
    padding: 2rem 0 0 0 !important;

    > h2 {
        padding: 0 2rem;
        margin: unset !important;
    }
`;
