// 게임별 목업 데이터 통합 관리 파일
import { mockLOLUsers, type LOLUser } from './mockLOLUsers';
import { mockTFTUsers, type TFTUser } from './mockTFTUsers';
import { mockOverwatchUsers, type OverwatchUser } from './mockOverwatchUsers';

// 공통 인터페이스 정의
export interface BaseUser {
    id: number;
    profileImage: string;
    username: string;
    gameId: string;
    position?: React.ReactNode;
    tier: string;
    rank: string;
    winRate: number;
    kda: number;
    recentChampions: string[];
    gameStyles: string[];
    communicationStyles: string[];
    description: string;
    game: string;
}

// 게임별 사용자 타입 유니온
export type GameUser = LOLUser | TFTUser | OverwatchUser;

// 게임 타입 정의
export type GameType = '리그오브레전드' | '전략적 팀 전투' | '오버워치2';

// 게임별 데이터 맵핑
export const gameUsersMap = {
    '리그오브레전드': mockLOLUsers,
    '전략적 팀 전투': mockTFTUsers,
    '오버워치2': mockOverwatchUsers,
} as const;

// 게임 ID로 게임명 변환
export const getGameNameById = (gameId: string): GameType => {
    const gameMap: { [key: string]: GameType } = {
        lol: '리그오브레전드',
        tft: '전략적 팀 전투',
        overwatch: '오버워치2',
    };
    return gameMap[gameId] || '리그오브레전드';
};

// 특정 게임의 사용자 데이터 가져오기
export const getUsersByGame = (gameType: GameType): GameUser[] => {
    return gameUsersMap[gameType] || [];
};

// 모든 게임의 사용자 데이터 가져오기
export const getAllUsers = (): GameUser[] => {
    return [
        ...mockLOLUsers,
        ...mockTFTUsers,
        ...mockOverwatchUsers,
    ];
};

// 게임별 사용자 수 통계
export const getUserCountByGame = () => {
    return {
        '리그오브레전드': mockLOLUsers.length,
        '전략적 팀 전투': mockTFTUsers.length,
        '오버워치2': mockOverwatchUsers.length,
        total: getAllUsers().length,
    };
};

// 기본 내보내기 (하위 호환성을 위해)
export { mockLOLUsers, mockTFTUsers, mockOverwatchUsers };