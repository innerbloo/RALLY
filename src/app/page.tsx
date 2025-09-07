'use client';

import Image from 'next/image';

import PositionLolTop2 from '/public/position-lol-top2.svg';

import styled from '@emotion/styled';

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
                    <DuoWrapper>
                        <li>
                            <DuoTopSection>
                                <div>
                                    <Image
                                        src={'/profile-lol-1.png'}
                                        width={40}
                                        height={40}
                                        alt={'롤 프로필 이미지1'}
                                    />
                                    <div>
                                        <h3>
                                            멋졌으면 핑찍어
                                            <PositionLolTop2
                                                width={20}
                                                height={20}
                                            />
                                        </h3>
                                        <span>#96327</span>
                                        <p>
                                            디코하면서 같이 으쌰으쌰
                                            하실분찾아요~
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Image
                                        src={'/rank-lol-emerald.png'}
                                        width={20}
                                        height={20}
                                        alt={'롤 에메랄드'}
                                    />
                                    E4
                                </div>
                            </DuoTopSection>
                            <DuoBottomSection>
                                <ul>
                                    <li>공격적인</li>
                                    <li>신중한 플레이</li>
                                    <li>다혈질</li>
                                    <li>+</li>
                                </ul>
                                <Image
                                    src={'/game1.png'}
                                    width={30}
                                    height={30}
                                    alt={'리그오브레전드'}
                                />
                            </DuoBottomSection>
                        </li>
                    </DuoWrapper>
                </DuoRecommendSection>
            </HomeContainer>
        </div>
    );
}

const HomeContainer = styled.main`
    padding: 2rem;

    h2 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 2rem;
    }

    section {
        margin: 0 0 2rem;
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

const DuoWrapper = styled.ul`
    > li {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        border: 0.1rem solid #3f3f41;
        border-radius: 1.6rem;
        background-color: #252527;
    }
`;

const DuoTopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    > div:first-of-type {
        display: flex;

        > img {
            border-radius: 50%;
            margin: 0 1rem 0 0;
        }

        > div {
            display: flex;
            flex-direction: column;
        }
    }

    > div:last-of-type {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    h3 {
        font-size: 1.6rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    span {
        font-size: 1.3rem;
        color: #939393;
    }

    p {
        font-size: 1.3rem;
        color: #939393;
    }
`;

const DuoBottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
        display: flex;
        gap: 0.5rem;

        li {
            min-width: 2.8rem;
            padding: 0.2rem 0.7rem;
            text-align: center;
            font-size: 1.2rem;
            font-weight: 500;
            color: #424242;
            background-color: #f5f5f5;
            border-radius: 8rem;
        }
    }
`;
