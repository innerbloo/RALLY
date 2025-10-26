'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import { GameUser } from '@/data/mockGameUsers';

interface UserGameInfoProps {
    user: GameUser;
}

export default function UserGameInfo({ user }: UserGameInfoProps) {
    const getRankImagePath = (game: string, tier: string): string => {
        const tierMap: { [key: string]: string } = {
            아이언: 'iron',
            브론즈: 'bronze',
            실버: 'silver',
            골드: 'gold',
            플래티넘: 'platinum',
            에메랄드: 'emerald',
            다이아몬드: 'diamond',
            마스터: 'master',
            그랜드마스터: 'grandmaster',
            챌린저: 'challenger',
        };

        const tierKey = tierMap[tier] || 'bronze';

        if (game === '리그오브레전드' || game === '전략적 팀 전투') {
            return `/lol/rank-lol-${tierKey}.webp`;
        } else if (game === '오버워치2') {
            return `/overwatch/rank-overwatch-${tierKey}.webp`;
        }

        return `/lol/rank-lol-bronze.webp`;
    };

    const getGameIconPath = (game: string): string => {
        const gameIconMap: { [key: string]: string } = {
            '리그오브레전드': '/game1.png',
            '전략적 팀 전투': '/game2.png',
            '발로란트': '/game3.png',
            '오버워치2': '/game4.png',
            '배틀그라운드': '/game5.png',
        };

        return gameIconMap[game] || '/game1.png';
    };

    return (
        <InfoContainer>
            <SectionTitle>게임 정보</SectionTitle>

            <GameCard>
                <GameHeader>
                    <GameTitleSection>
                        <GameIcon
                            src={getGameIconPath(user.game)}
                            width={36}
                            height={36}
                            alt={user.game}
                        />
                        <GameName>{user.game}</GameName>
                    </GameTitleSection>
                    <RankInfo>
                        <RankImage
                            src={getRankImagePath(user.game, user.tier)}
                            width={48}
                            height={48}
                            alt={`${user.tier} ${user.rank}`}
                        />
                        <RankText>
                            {/*<TierName>{user.tier}</TierName>*/}
                            <RankName>{user.rank}</RankName>
                        </RankText>
                    </RankInfo>
                </GameHeader>

                <StatsRow>
                    <StatItem>
                        <StatLabel>승률</StatLabel>
                        <StatValue
                            $color={
                                user.winRate >= 60
                                    ? '#22c55e'
                                    : user.winRate >= 50
                                      ? '#f59e0b'
                                      : '#ef4444'
                            }
                        >
                            {user.winRate}%
                        </StatValue>
                    </StatItem>
                    {user.game !== '전략적 팀 전투' && (
                        <StatItem>
                            <StatLabel>KDA</StatLabel>
                            <StatValue
                                $color={
                                    user.kda >= 3
                                        ? '#22c55e'
                                        : user.kda >= 2
                                          ? '#f59e0b'
                                          : '#ef4444'
                                }
                            >
                                {user.kda.toFixed(2)}
                            </StatValue>
                        </StatItem>
                    )}
                </StatsRow>

                {user.recentChampions && user.recentChampions.length > 0 && (
                    <ChampionSection>
                        <SubTitle>
                            {user.game === '전략적 팀 전투' ? '최근 선호 시너지' : '최근 플레이한 챔피언'}
                        </SubTitle>
                        <ChampionList>
                            {user.recentChampions.map((champion, index) => {
                                const getChampionName = (path: string) => {
                                    const fileName = path.split('/').pop() || '';
                                    const nameWithoutExtension = fileName.replace('.png', '');

                                    if (user.game === '전략적 팀 전투') {
                                        return nameWithoutExtension.replace('synergy-', '');
                                    } else if (user.game === '리그오브레전드') {
                                        // LOL 챔피언 영문명 -> 한글명 매핑
                                        const championMap: { [key: string]: string } = {
                                            'Aatrox': '아트록스',
                                            'Ahri': '아리',
                                            'Akali': '아칼리',
                                            'Akshan': '아크샨',
                                            'Alistar': '알리스타',
                                            'Amumu': '아무무',
                                            'Anivia': '애니비아',
                                            'Annie': '애니',
                                            'Aphelios': '아펠리오스',
                                            'Ashe': '애쉬',
                                            'AurelionSol': '아우렐리온 솔',
                                            'Azir': '아지르',
                                            'Bard': '바드',
                                            'Belveth': '벨베스',
                                            'Blitzcrank': '블리츠크랭크',
                                            'Brand': '브랜드',
                                            'Braum': '브라움',
                                            'Caitlyn': '케이틀린',
                                            'Camille': '카밀',
                                            'Cassiopeia': '카시오페아',
                                            'Chogath': '초가스',
                                            'Corki': '코르키',
                                            'Darius': '다리우스',
                                            'Diana': '다이애나',
                                            'Draven': '드레이븐',
                                            'DrMundo': '문도 박사',
                                            'Ekko': '에코',
                                            'Elise': '엘리스',
                                            'Evelynn': '이블린',
                                            'Ezreal': '이즈리얼',
                                            'Fiddlesticks': '피들스틱',
                                            'Fiora': '피오라',
                                            'Fizz': '피즈',
                                            'Galio': '갈리오',
                                            'Gangplank': '갱플랭크',
                                            'Garen': '가렌',
                                            'Gnar': '나르',
                                            'Gragas': '그라가스',
                                            'Graves': '그레이브즈',
                                            'Gwen': '그웬',
                                            'Hecarim': '헤카림',
                                            'Heimerdinger': '하이머딩거',
                                            'Illaoi': '일라오이',
                                            'Irelia': '이렐리아',
                                            'Ivern': '아이번',
                                            'Janna': '잔나',
                                            'JarvanIV': '자르반 4세',
                                            'Jax': '잭스',
                                            'Jayce': '제이스',
                                            'Jhin': '진',
                                            'Jinx': '징크스',
                                            'Kaisa': '카이사',
                                            'Kalista': '칼리스타',
                                            'Karma': '카르마',
                                            'Karthus': '카서스',
                                            'Kassadin': '카사딘',
                                            'Katarina': '카타리나',
                                            'Kayle': '케일',
                                            'Kayn': '케인',
                                            'Kennen': '케넨',
                                            'Khazix': '카직스',
                                            'Kindred': '킨드레드',
                                            'Kled': '클레드',
                                            'KogMaw': '코그모',
                                            'KSante': '크산테',
                                            'Leblanc': '르블랑',
                                            'LeeSin': '리 신',
                                            'Leona': '레오나',
                                            'Lillia': '릴리아',
                                            'Lissandra': '리산드라',
                                            'Lucian': '루시안',
                                            'Lulu': '룰루',
                                            'Lux': '럭스',
                                            'Malphite': '말파이트',
                                            'Malzahar': '말자하',
                                            'Maokai': '마오카이',
                                            'MasterYi': '마스터 이',
                                            'Milio': '밀리오',
                                            'MissFortune': '미스 포츈',
                                            'Mordekaiser': '모데카이저',
                                            'Morgana': '모르가나',
                                            'Naafiri': '나피리',
                                            'Nami': '나미',
                                            'Nasus': '나서스',
                                            'Nautilus': '노틸러스',
                                            'Neeko': '니코',
                                            'Nidalee': '니달리',
                                            'Nilah': '닐라',
                                            'Nocturne': '녹턴',
                                            'Nunu': '누누와 윌럼프',
                                            'Olaf': '올라프',
                                            'Orianna': '오리아나',
                                            'Ornn': '오른',
                                            'Pantheon': '판테온',
                                            'Poppy': '뽀삐',
                                            'Pyke': '파이크',
                                            'Qiyana': '키아나',
                                            'Quinn': '퀸',
                                            'Rakan': '라칸',
                                            'Rammus': '람머스',
                                            'RekSai': '렉사이',
                                            'Rell': '렐',
                                            'Renata': '레나타 글라스크',
                                            'Renekton': '레넥톤',
                                            'Rengar': '렝가',
                                            'Riven': '리븐',
                                            'Rumble': '럼블',
                                            'Ryze': '라이즈',
                                            'Samira': '사미라',
                                            'Sejuani': '세주아니',
                                            'Senna': '세나',
                                            'Seraphine': '세라핀',
                                            'Sett': '세트',
                                            'Shaco': '샤코',
                                            'Shen': '쉔',
                                            'Shyvana': '쉬바나',
                                            'Singed': '신지드',
                                            'Sion': '사이온',
                                            'Sivir': '시비르',
                                            'Skarner': '스카너',
                                            'Sona': '소나',
                                            'Soraka': '소라카',
                                            'Swain': '스웨인',
                                            'Sylas': '사일러스',
                                            'Syndra': '신드라',
                                            'TahmKench': '탐 켄치',
                                            'Taliyah': '탈리야',
                                            'Talon': '탈론',
                                            'Taric': '타릭',
                                            'Teemo': '티모',
                                            'Thresh': '쓰레쉬',
                                            'Tristana': '트리스타나',
                                            'Trundle': '트런들',
                                            'Tryndamere': '트린다미어',
                                            'TwistedFate': '트위스티드 페이트',
                                            'Twitch': '트위치',
                                            'Udyr': '우디르',
                                            'Urgot': '우르곳',
                                            'Varus': '바루스',
                                            'Vayne': '베인',
                                            'Veigar': '베이가',
                                            'Velkoz': '벨코즈',
                                            'Vex': '벡스',
                                            'Vi': '바이',
                                            'Viego': '비에고',
                                            'Viktor': '빅토르',
                                            'Vladimir': '블라디미르',
                                            'Volibear': '볼리베어',
                                            'Warwick': '워윅',
                                            'Xayah': '자야',
                                            'Xerath': '제라스',
                                            'XinZhao': '신 짜오',
                                            'Yasuo': '야스오',
                                            'Yone': '요네',
                                            'Yorick': '요릭',
                                            'Yuumi': '유미',
                                            'Zac': '자크',
                                            'Zed': '제드',
                                            'Zeri': '제리',
                                            'Ziggs': '직스',
                                            'Zilean': '질리언',
                                            'Zoe': '조이',
                                            'Zyra': '자이라',
                                        };

                                        const englishName = nameWithoutExtension.split('-')[1] || nameWithoutExtension;
                                        return championMap[englishName] || englishName;
                                    } else if (user.game === '오버워치2') {
                                        // /overwatch/돌격-디바.png -> 디바
                                        return nameWithoutExtension.split('-')[1] || nameWithoutExtension;
                                    }

                                    return nameWithoutExtension;
                                };

                                return (
                                    <ChampionItem key={index}>
                                        <ChampionImage
                                            src={champion}
                                            width={40}
                                            height={40}
                                            alt={user.game === '전략적 팀 전투' ? '시너지' : '챔피언'}
                                            $isSynergy={user.game === '전략적 팀 전투'}
                                        />
                                        <ChampionName>{getChampionName(champion)}</ChampionName>
                                    </ChampionItem>
                                );
                            })}
                        </ChampionList>
                    </ChampionSection>
                )}

                {'position' in user && user.position && (
                    <PositionSection>
                        <SubTitle>
                            {user.game === '오버워치2' ? '주 역할' : '주 포지션'}
                        </SubTitle>
                        <PositionBadge>
                            {user.position}
                            <PositionText>
                                {'positionId' in user &&
                                    user.positionId === 'top' &&
                                    '탑'}
                                {'positionId' in user &&
                                    user.positionId === 'jungle' &&
                                    '정글'}
                                {'positionId' in user &&
                                    user.positionId === 'mid' &&
                                    '미드'}
                                {'positionId' in user &&
                                    user.positionId === 'adc' &&
                                    '원딜'}
                                {'positionId' in user &&
                                    user.positionId === 'support' &&
                                    '서포터'}
                                {'roleId' in user &&
                                    user.roleId === 'tank' &&
                                    '탱커'}
                                {'roleId' in user &&
                                    user.roleId === 'damage' &&
                                    '딜러'}
                                {'roleId' in user &&
                                    user.roleId === 'support' &&
                                    '지원'}
                            </PositionText>
                        </PositionBadge>
                    </PositionSection>
                )}
            </GameCard>
        </InfoContainer>
    );
}

const InfoContainer = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 1.2rem 0.5rem;
`;

const GameCard = styled.div`
    background-color: #252527;
    border-radius: 1.6rem;
    padding: 2rem;
    border: 0.1rem solid #3f3f41;
`;

const GameHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const GameTitleSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const GameIcon = styled(Image)`
    border-radius: 0.8rem;
    object-fit: contain;
    flex-shrink: 0;
`;

const GameName = styled.h4`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
`;

const RankInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    //gap: 1rem;
`;

const RankImage = styled(Image)`
    object-fit: contain;
`;

const RankText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const TierName = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
`;

const RankName = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const StatsRow = styled.div`
    display: flex;
    gap: 3rem;
    margin-bottom: 2rem;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const StatLabel = styled.span`
    font-size: 1.3rem;
    color: #939393;
`;

const StatValue = styled.span<{ $color: string }>`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
`;

const ChampionSection = styled.div`
    margin-bottom: 2rem;
`;

const SubTitle = styled.h5`
    font-size: 1.4rem;
    font-weight: 500;
    color: #939393;
    margin: 0 0 1rem;
`;

const ChampionList = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const ChampionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

const ChampionImage = styled(Image, {
    shouldForwardProp: (prop) => prop !== '$isSynergy',
})<{ $isSynergy?: boolean }>`
    border-radius: ${({ $isSynergy }) => ($isSynergy ? '50%' : '0.8rem')};
    border: 0.1rem solid #3f3f41;
    padding: ${({ $isSynergy }) => ($isSynergy ? '0.5rem' : '0')};
    background-color: ${({ $isSynergy }) =>
        $isSynergy ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
`;

const ChampionName = styled.span`
    font-size: 1.1rem;
    color: #cccccc;
    font-weight: 500;
    text-align: center;
`;

const PositionSection = styled.div``;

const PositionBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1.6rem;
    background-color: #1a1a1a;
    border-radius: 1rem;

    svg {
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
    }
`;

const PositionText = styled.span`
    font-size: 1.4rem;
    font-weight: 500;
    color: #ffffff;
`;
