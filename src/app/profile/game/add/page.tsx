'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

type GameType =
    | '리그오브레전드'
    | '전략적 팀 전투'
    | '오버워치2'
    | '발로란트'
    | '배틀그라운드'
    | '';

interface GameRank {
    main: string;
    sub?: number;
}

export default function GameAddPage() {
    const router = useRouter();
    const [selectedGame, setSelectedGame] = useState<GameType>('');
    const [gameId, setGameId] = useState<string>('');
    const [selectedRank, setSelectedRank] = useState<GameRank | null>(null);
    const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
    const [selectedStyles, setSelectedStyles] = useState<{
        gameStyles: string[];
        communicationStyles: string[];
    }>({
        gameStyles: [],
        communicationStyles: [],
    });

    const gameIdInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const games = [
        {
            name: '리그오브레전드',
            image: '/game1.png',
            ranks: [
                '아이언',
                '브론즈',
                '실버',
                '골드',
                '플래티넘',
                '에메랄드',
                '다이아몬드',
                '마스터',
                '그랜드마스터',
                '챌린저',
            ],
            positions: ['탑', '정글', '미드', '원딜', '서포터'],
        },
        {
            name: '전략적 팀 전투',
            image: '/game2.png',
            ranks: [
                '아이언',
                '브론즈',
                '실버',
                '골드',
                '플래티넘',
                '에메랄드',
                '다이아몬드',
                '마스터',
                '그랜드마스터',
                '챌린저',
            ],
            positions: [],
        },
        {
            name: '발로란트',
            image: '/game3.png',
            ranks: [
                '아이언',
                '브론즈',
                '실버',
                '골드',
                '플래티넘',
                '다이아몬드',
                '불멸',
                '레디언트',
            ],
            positions: ['듀얼리스트', '이니시에이터', '컨트롤러', '센티넬'],
        },
        {
            name: '오버워치2',
            image: '/game4.png',
            ranks: [
                '브론즈',
                '실버',
                '골드',
                '플래티넘',
                '다이아몬드',
                '마스터',
                '그랜드마스터',
            ],
            positions: ['탱크', '딜러', '힐러'],
        },
        {
            name: '배틀그라운드',
            image: '/game5.png',
            ranks: [
                '브론즈',
                '실버',
                '골드',
                '플래티넘',
                '다이아몬드',
                '마스터',
                '콘커러',
            ],
            positions: [],
        },
    ];

    const gameStyleOptions = {
        '전투 스타일': [
            '공격적인',
            '수비적인',
            '팀 중심형',
            '혼자 플레이 선호',
        ],
        '게임 진행 스타일': [
            '빠른 템포 선호',
            '신중한 플레이',
            '전략적인',
            '창의적인 플레이',
        ],
        '역할 기반': ['리더형', '서포터형', '팀플 선호', '솔로 플레이 선호'],
    };

    const communicationStyleOptions = {
        '말투 / 태도': [
            '예의 바른',
            '편하게 대화하는',
            '유머러스한',
            '차분한',
            '감정 기복 없는',
            '직설적인',
        ],
        '소통 방식': [
            '마이크 필수',
            '마이크 가능하지만 조용한',
            '채팅 위주',
            '필요한 말만 하는',
        ],
        '욕설 / 감정 표현': [
            '욕 안 하는',
            '가끔 욕하지만 선 넘지 않음',
            '감정 조절 가능',
            '다혈질',
            '쿨하고 감정 없음',
        ],
    };

    const currentGameData = games.find((g) => g.name === selectedGame);

    const handlePositionToggle = (position: string) => {
        if (selectedPositions.includes(position)) {
            setSelectedPositions(
                selectedPositions.filter((p) => p !== position),
            );
        } else {
            setSelectedPositions([...selectedPositions, position]);
        }
    };

    const toggleGameStyle = (style: string) => {
        const isSelected = selectedStyles.gameStyles.includes(style);
        const newGameStyles = isSelected
            ? selectedStyles.gameStyles.filter((s) => s !== style)
            : [...selectedStyles.gameStyles, style];

        setSelectedStyles({
            ...selectedStyles,
            gameStyles: newGameStyles,
        });
    };

    const toggleCommunicationStyle = (style: string) => {
        const isSelected = selectedStyles.communicationStyles.includes(style);
        const newCommunicationStyles = isSelected
            ? selectedStyles.communicationStyles.filter((s) => s !== style)
            : [...selectedStyles.communicationStyles, style];

        setSelectedStyles({
            ...selectedStyles,
            communicationStyles: newCommunicationStyles,
        });
    };

    const getRankImagePath = (gameName: string, rankName: string): string => {
        const rankMap: { [key: string]: { [key: string]: string } } = {
            리그오브레전드: {
                아이언: '/lol/rank-lol-iron.webp',
                브론즈: '/lol/rank-lol-bronze.webp',
                실버: '/lol/rank-lol-silver.webp',
                골드: '/lol/rank-lol-gold.webp',
                플래티넘: '/lol/rank-lol-platinum.webp',
                에메랄드: '/lol/rank-lol-emerald.webp',
                다이아몬드: '/lol/rank-lol-diamond.webp',
                마스터: '/lol/rank-lol-master.webp',
                그랜드마스터: '/lol/rank-lol-grandmaster.webp',
                챌린저: '/lol/rank-lol-challenger.webp',
            },
            '전략적 팀 전투': {
                아이언: '/lol/rank-lol-iron.webp',
                브론즈: '/lol/rank-lol-bronze.webp',
                실버: '/lol/rank-lol-silver.webp',
                골드: '/lol/rank-lol-gold.webp',
                플래티넘: '/lol/rank-lol-platinum.webp',
                에메랄드: '/lol/rank-lol-emerald.webp',
                다이아몬드: '/lol/rank-lol-diamond.webp',
                마스터: '/lol/rank-lol-master.webp',
                그랜드마스터: '/lol/rank-lol-grandmaster.webp',
                챌린저: '/lol/rank-lol-challenger.webp',
            },
        };

        return rankMap[gameName]?.[rankName] || '/lol/rank-lol-unranked.webp';
    };

    const getRankShortName = (rankName: string, tier?: number): string => {
        const shortNameMap: { [key: string]: string } = {
            아이언: 'I',
            브론즈: 'B',
            실버: 'S',
            골드: 'G',
            플래티넘: 'P',
            에메랄드: 'E',
            다이아몬드: 'D',
            마스터: 'M',
            그랜드마스터: 'GM',
            챌린저: 'C',
            불멸: 'IM',
            레디언트: 'R',
            콘커러: 'CO',
        };

        const shortName = shortNameMap[rankName] || rankName;
        return tier ? `${shortName}${tier}` : shortName;
    };

    const getPositionIconPath = (
        gameName: string,
        positionName: string,
    ): string | null => {
        const positionMap: { [key: string]: { [key: string]: string } } = {
            리그오브레전드: {
                탑: '/lol/position-lol-top.svg',
                정글: '/lol/position-lol-jungle.svg',
                미드: '/lol/position-lol-mid.svg',
                원딜: '/lol/position-lol-adc.svg',
                서포터: '/lol/position-lol-support.svg',
            },
            오버워치2: {
                탱크: '/overwatch/position-overwatch-tank.svg',
                딜러: '/overwatch/position-overwatch-dps.svg',
                힐러: '/overwatch/position-overwatch-support.svg',
            },
        };

        return positionMap[gameName]?.[positionName] || null;
    };

    const handleSubmit = () => {
        // 유효성 검사
        if (!selectedGame) {
            toast.error('게임을 선택해주세요.');
            return;
        }

        if (!gameId.trim()) {
            toast.error('게임 아이디를 입력해주세요.');
            gameIdInputRef.current?.focus();
            return;
        }

        if (!selectedRank) {
            toast.error('랭크를 선택해주세요.');
            return;
        }

        if (
            currentGameData &&
            currentGameData.positions.length > 0 &&
            selectedPositions.length === 0
        ) {
            toast.error('포지션을 최소 1개 이상 선택해주세요.');
            return;
        }

        // 게임 정보 저장
        const newGame = {
            id: Date.now().toString(),
            gameName: selectedGame,
            gameImage: currentGameData?.image || '/game1.png',
            gameId: gameId.trim(),
            rank: getRankShortName(selectedRank.main, selectedRank.sub),
            rankImage: getRankImagePath(selectedGame, selectedRank.main),
            positions: selectedPositions,
            gameStyles: selectedStyles.gameStyles,
            communicationStyles: selectedStyles.communicationStyles,
        };

        const userGames = JSON.parse(localStorage.getItem('userGames') || '[]');
        userGames.push(newGame);
        localStorage.setItem('userGames', JSON.stringify(userGames));

        toast.success('게임 정보가 추가되었습니다!');
        router.push('/profile', { scroll: false });
    };

    const handleCancel = () => {
        router.push('/profile', { scroll: false });
    };

    // 티어가 있는 랭크인지 확인
    const hasTiers = (rankName: string) => {
        return ![
            '마스터',
            '그랜드마스터',
            '챌린저',
            '불멸',
            '레디언트',
            '콘커러',
        ].includes(rankName);
    };

    // 각 섹션의 표시 여부를 결정하는 함수들
    const showGameIdSection = () => {
        return selectedGame !== '';
    };

    const showRankSection = () => {
        return selectedGame !== '' && gameId.trim().length > 0;
    };

    const showPositionSection = () => {
        return (
            selectedGame !== '' &&
            gameId.trim().length > 0 &&
            selectedRank !== null &&
            currentGameData &&
            currentGameData.positions.length > 0
        );
    };

    const showStyleSection = () => {
        const hasGame = selectedGame !== '';
        const hasGameId = gameId.trim().length > 0;
        const hasRank = selectedRank !== null;

        // 포지션이 없는 게임이거나, 포지션이 있는 게임인데 선택 완료
        const positionComplete =
            !currentGameData ||
            currentGameData.positions.length === 0 ||
            selectedPositions.length > 0;

        return hasGame && hasGameId && hasRank && positionComplete;
    };

    return (
        <AddGameContainer>
            <AddGameContent>
                <PageTitle>게임 추가</PageTitle>
                <PageDescription>
                    게임을 선택하고 정보를 입력해주세요
                </PageDescription>

                {/* 게임 선택 */}
                <FormSection>
                    <SectionLabel>
                        게임 선택 <Required>*</Required>
                    </SectionLabel>
                    <GameGrid>
                        {games.map((game) => (
                            <GameCard
                                key={game.name}
                                $active={selectedGame === game.name}
                                onClick={() => {
                                    setSelectedGame(game.name as GameType);
                                    setSelectedRank(null);
                                    setSelectedPositions([]);
                                }}
                            >
                                <GameIcon>
                                    <Image
                                        src={game.image}
                                        width={80}
                                        height={80}
                                        alt={game.name}
                                    />
                                </GameIcon>
                                <GameName>{game.name}</GameName>
                            </GameCard>
                        ))}
                    </GameGrid>
                </FormSection>

                {/* 게임 아이디 */}
                {showGameIdSection() && (
                    <FormSection>
                        <SectionLabel>
                            게임 아이디 <Required>*</Required>
                        </SectionLabel>
                        <InfoText>
                            {selectedGame === '오버워치2'
                                ? '예: 닉네임#1234'
                                : selectedGame === '발로란트'
                                  ? '예: 닉네임#TAG'
                                  : '게임 내에서 사용하는 닉네임을 입력하세요'}
                        </InfoText>
                        <Input
                            ref={gameIdInputRef}
                            type="text"
                            placeholder="게임 아이디"
                            value={gameId}
                            onChange={(e) => setGameId(e.target.value)}
                        />
                    </FormSection>
                )}

                {/* 랭크 선택 */}
                {showRankSection() && (
                    <FormSection>
                        <SectionLabel>
                            랭크 선택 <Required>*</Required>
                        </SectionLabel>
                        <InfoText>현재 랭크를 선택해주세요</InfoText>
                        <TierGrid>
                            {currentGameData?.ranks.map((rank) => (
                                <TierCard
                                    key={rank}
                                    $active={selectedRank?.main === rank}
                                    onClick={() =>
                                        setSelectedRank({
                                            main: rank,
                                            sub: hasTiers(rank) ? 4 : undefined,
                                        })
                                    }
                                >
                                    <TierIcon>
                                        <Image
                                            src={getRankImagePath(
                                                selectedGame,
                                                rank,
                                            )}
                                            width={50}
                                            height={50}
                                            alt={rank}
                                        />
                                    </TierIcon>
                                    <TierName>{rank}</TierName>
                                </TierCard>
                            ))}
                        </TierGrid>

                        {selectedRank && hasTiers(selectedRank.main) && (
                            <>
                                <SubTierLabel>티어 선택</SubTierLabel>
                                <SubTierGrid>
                                    {[1, 2, 3, 4].map((tier) => (
                                        <SubTierButton
                                            key={tier}
                                            $active={selectedRank.sub === tier}
                                            onClick={() =>
                                                setSelectedRank({
                                                    ...selectedRank,
                                                    sub: tier,
                                                })
                                            }
                                        >
                                            {tier}
                                        </SubTierButton>
                                    ))}
                                </SubTierGrid>
                            </>
                        )}
                    </FormSection>
                )}

                {/* 포지션 선택 */}
                {showPositionSection() && (
                    <FormSection>
                        <SectionLabel>
                            포지션 선택 <Required>*</Required>
                        </SectionLabel>
                        <InfoText>
                            주로 플레이하는 포지션을 선택하세요 (복수 선택 가능)
                        </InfoText>
                        <PositionGrid>
                            {currentGameData?.positions.map((position) => {
                                const iconPath = getPositionIconPath(
                                    selectedGame,
                                    position,
                                );
                                return (
                                    <PositionCard
                                        key={position}
                                        $active={selectedPositions.includes(
                                            position,
                                        )}
                                        onClick={() =>
                                            handlePositionToggle(position)
                                        }
                                    >
                                        <PositionIconBg>
                                            {iconPath ? (
                                                <Image
                                                    src={iconPath}
                                                    width={32}
                                                    height={32}
                                                    alt={position}
                                                />
                                            ) : (
                                                position.charAt(0)
                                            )}
                                        </PositionIconBg>
                                        <PositionName>{position}</PositionName>
                                        {selectedPositions.includes(
                                            position,
                                        ) && (
                                            <SelectedIndicator>
                                                ✓
                                            </SelectedIndicator>
                                        )}
                                    </PositionCard>
                                );
                            })}
                        </PositionGrid>
                    </FormSection>
                )}

                {/* 게임 성향 선택 */}
                {showStyleSection() && (
                    <>
                        <FormSection>
                            <SectionLabel>게임 성향 (선택)</SectionLabel>
                            <InfoText>
                                원하는 플레이 스타일을 선택해주세요 (다중 선택
                                가능)
                            </InfoText>
                            {Object.entries(gameStyleOptions).map(
                                ([category, items]) => (
                                    <StyleCategorySection key={category}>
                                        <CategoryTitle>
                                            {category}
                                        </CategoryTitle>
                                        <StyleTagGrid>
                                            {items.map((item) => (
                                                <StyleTag
                                                    key={item}
                                                    $active={selectedStyles.gameStyles.includes(
                                                        item,
                                                    )}
                                                    $type="game"
                                                    onClick={() =>
                                                        toggleGameStyle(item)
                                                    }
                                                >
                                                    {item}
                                                    {selectedStyles.gameStyles.includes(
                                                        item,
                                                    ) && (
                                                        <SelectedMark>
                                                            ✓
                                                        </SelectedMark>
                                                    )}
                                                </StyleTag>
                                            ))}
                                        </StyleTagGrid>
                                    </StyleCategorySection>
                                ),
                            )}
                        </FormSection>

                        {/* 커뮤니케이션 스타일 선택 */}
                        <FormSection>
                            <SectionLabel>
                                커뮤니케이션 스타일 (선택)
                            </SectionLabel>
                            <InfoText>
                                선호하는 소통 방식을 선택해주세요 (다중 선택
                                가능)
                            </InfoText>
                            {Object.entries(communicationStyleOptions).map(
                                ([category, items]) => (
                                    <StyleCategorySection key={category}>
                                        <CategoryTitle>
                                            {category}
                                        </CategoryTitle>
                                        <StyleTagGrid>
                                            {items.map((item) => (
                                                <StyleTag
                                                    key={item}
                                                    $active={selectedStyles.communicationStyles.includes(
                                                        item,
                                                    )}
                                                    $type="communication"
                                                    onClick={() =>
                                                        toggleCommunicationStyle(
                                                            item,
                                                        )
                                                    }
                                                >
                                                    {item}
                                                    {selectedStyles.communicationStyles.includes(
                                                        item,
                                                    ) && (
                                                        <SelectedMark>
                                                            ✓
                                                        </SelectedMark>
                                                    )}
                                                </StyleTag>
                                            ))}
                                        </StyleTagGrid>
                                    </StyleCategorySection>
                                ),
                            )}
                        </FormSection>
                    </>
                )}
            </AddGameContent>

            <AddGameFooter>
                <FooterButton $variant="secondary" onClick={handleCancel}>
                    취소
                </FooterButton>
                <FooterButton $variant="primary" onClick={handleSubmit}>
                    저장
                </FooterButton>
            </AddGameFooter>
        </AddGameContainer>
    );
}

const AddGameContainer = styled.div`
    min-height: 100vh;
    background-color: #1a1a1a;
    display: flex;
    flex-direction: column;
`;

const AddGameContent = styled.main`
    flex: 1;
    padding: 0 2rem;
    padding-top: calc(10rem + env(safe-area-inset-top));
    padding-bottom: 2rem;
`;

const PageTitle = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 1rem;
    text-align: center;
`;

const PageDescription = styled.p`
    font-size: 1.6rem;
    color: #cccccc;
    text-align: center;
    line-height: 1.5;
    margin: 0 0 4rem;
`;

const FormSection = styled.section`
    margin-bottom: 4rem;
`;

const SectionLabel = styled.label`
    display: block;
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.8rem;
`;

const Required = styled.span`
    color: #ef4444;
`;

const InfoText = styled.p`
    font-size: 1.4rem;
    color: #939393;
    margin: 0 0 1.5rem;
    line-height: 1.5;
`;

const GameGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    width: 100%;
`;

const GameCard = styled.button<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    padding: 2rem 1.5rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : '#252527'};
    border: 0.2rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 1.6rem;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            background-color: rgba(66, 114, 236, 0.1);
            transform: translateY(-2px);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const GameIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: 8rem;

    img {
        object-fit: contain;
        border-radius: 1rem;
    }
`;

const GameName = styled.h3`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    margin: 0;
    line-height: 1.3;
`;

const Input = styled.input`
    width: 100%;
    padding: 1.4rem 1.6rem;
    font-size: 1.6rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
    color: #ffffff;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
        color: #939393;
    }

    &:focus {
        border-color: #4272ec;
    }
`;

const RankGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1rem;
`;

const RankButton = styled.button<{ $active: boolean }>`
    padding: 1.4rem 1.6rem;
    font-size: 1.5rem;
    font-weight: 600;
    border: 0.2rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 1.2rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : 'transparent'};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            color: #ffffff;
            transform: translateY(-2px);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const TierLabel = styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    color: #cccccc;
    margin: 2rem 0 1rem;
`;

const TierGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
`;

const TierCard = styled.button<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    padding: 1.5rem 1rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : '#252527'};
    border: 0.2rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 1.2rem;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            background-color: rgba(66, 114, 236, 0.1);
            transform: translateY(-2px);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const TierIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;

    img {
        object-fit: contain;
    }
`;

const TierName = styled.span`
    font-size: 1.3rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    line-height: 1.2;
    white-space: nowrap;
`;

const SubTierLabel = styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    color: #cccccc;
    margin: 2rem 0 1rem;
`;

const SubTierGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
`;

const SubTierButton = styled.button<{ $active: boolean }>`
    padding: 1.6rem;
    font-size: 1.8rem;
    font-weight: 700;
    border: 0.2rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 10rem;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            background-color: ${({ $active }) =>
                $active ? '#3a5fd9' : 'rgba(66, 114, 236, 0.1)'};
            color: #ffffff;
            transform: scale(1.05);
        }
    }

    &:active {
        transform: scale(0.98);
    }
`;

const PositionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
`;

const PositionCard = styled.button<{ $active: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1.5rem;
    background-color: ${({ $active }) =>
        $active ? 'rgba(66, 114, 236, 0.2)' : '#252527'};
    border: 0.2rem solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};
    border-radius: 1.2rem;
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            background-color: rgba(66, 114, 236, 0.1);
            transform: translateY(-2px);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

const PositionIconBg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
`;

const PositionName = styled.span`
    font-size: 1.3rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    line-height: 1.2;
`;

const SelectedIndicator = styled.div`
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: #4272ec;
    border-radius: 50%;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 700;
`;

const StyleCategorySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 2.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CategoryTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #cccccc;
    margin: 0;
`;

const StyleTagGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

const StyleTag = styled.button<{
    $active: boolean;
    $type: 'game' | 'communication';
}>`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 1.6rem;
    font-size: 1.3rem;
    font-weight: 500;
    border: 0.1rem solid
        ${({ $active, $type }) => {
            if ($active) {
                return $type === 'game' ? '#4272ec' : '#22c55e';
            }
            return '#3f3f41';
        }};
    border-radius: 2rem;
    background-color: ${({ $active, $type }) => {
        if ($active) {
            return $type === 'game'
                ? 'rgba(66, 114, 236, 0.2)'
                : 'rgba(34, 197, 94, 0.2)';
        }
        return 'transparent';
    }};
    color: ${({ $active, $type }) => {
        if ($active) {
            return $type === 'game' ? '#4272ec' : '#22c55e';
        }
        return '#939393';
    }};
    transition: all 0.2s ease;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: ${({ $type }) =>
                $type === 'game' ? '#4272ec' : '#22c55e'};
            background-color: ${({ $type }) =>
                $type === 'game'
                    ? 'rgba(66, 114, 236, 0.1)'
                    : 'rgba(34, 197, 94, 0.1)'};
            color: ${({ $type }) => ($type === 'game' ? '#4272ec' : '#22c55e')};
        }
    }
`;

const SelectedMark = styled.span`
    font-size: 1rem;
    font-weight: bold;
`;

const AddGameFooter = styled.footer`
    padding: 2rem;
    padding-bottom: calc(3rem + env(safe-area-inset-bottom));
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    background-color: #1a1a1a;
    border-top: 0.1rem solid #3f3f41;
`;

const FooterButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.6rem 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    border: ${({ $variant }) =>
        $variant === 'secondary' ? '0.1rem solid #3f3f41' : 'none'};
    border-radius: 1.2rem;
    transition: all 0.2s ease;
    cursor: pointer;

    background-color: ${({ $variant }) =>
        $variant === 'primary' ? '#4272ec' : 'transparent'};
    color: ${({ $variant }) =>
        $variant === 'primary' ? '#ffffff' : '#939393'};

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${({ $variant }) =>
                $variant === 'primary' ? '#3a5fd9' : 'rgba(66, 114, 236, 0.1)'};
            color: #ffffff;
            border-color: ${({ $variant }) =>
                $variant === 'secondary' ? '#4272ec' : 'none'};
        }
    }

    &:active {
        transform: scale(0.98);
    }
`;
