'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { GameUser } from '@/data/mockGameUsers';

interface UserProfileHeaderProps {
    user: GameUser & { bio?: string };
}

export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'online':
                return '#22c55e';
            case 'in-game':
                return '#f59e0b';
            case 'matching':
                return '#4272ec';
            default:
                return '#6b7280';
        }
    };

    const getStatusText = (status?: string) => {
        switch (status) {
            case 'online':
                return '온라인';
            case 'in-game':
                return '게임 중';
            case 'matching':
                return '매칭 중';
            default:
                return '오프라인';
        }
    };

    return (
        <HeaderContainer>
            <ProfileImageWrapper>
                <ProfileImage
                    src={user.profileImage}
                    width={100}
                    height={100}
                    alt={`${user.username} 프로필`}
                />
                <OnlineStatus $color={getStatusColor('status' in user ? user.status : undefined)}>
                    <StatusDot />
                </OnlineStatus>
            </ProfileImageWrapper>

            <ProfileInfo>
                <TopRow>
                    <Username>{user.username}</Username>
                    {'position' in user && user.position && (
                        <PositionIcon>{user.position}</PositionIcon>
                    )}
                </TopRow>

                <GameIdRow>
                    <GameId>{user.gameId}</GameId>
                    <StatusText $color={getStatusColor('status' in user ? user.status : undefined)}>
                        {getStatusText('status' in user ? user.status : undefined)}
                    </StatusText>
                </GameIdRow>

                <GameBadge>
                    <GameImage src={`/game${user.game === '리그오브레전드' ? '1' : user.game === '전략적 팀 전투' ? '2' : user.game === '발로란트' ? '3' : user.game === '오버워치2' ? '4' : '5'}.png`} width={16} height={16} alt={user.game} />
                    {user.game}
                </GameBadge>

                <Bio>{user.bio || user.description}</Bio>

                <TagList>
                    {user.gameStyles && user.gameStyles.map((style, index) => (
                        <Tag key={`game-${index}`} $type="game">{style}</Tag>
                    ))}
                    {user.communicationStyles && user.communicationStyles.map((style, index) => (
                        <Tag key={`comm-${index}`} $type="comm">{style}</Tag>
                    ))}
                </TagList>
            </ProfileInfo>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem;
    background-color: #252527;
    border-radius: 1.6rem;
    margin-top: 1rem;
`;

const ProfileImageWrapper = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
    cursor: pointer;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    object-fit: cover;
    border: 0.3rem solid #4272ec;
`;

const OnlineStatus = styled.div<{ $color: string }>`
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    width: 2.4rem;
    height: 2.4rem;
    background-color: #252527;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.2rem solid #252527;

    &::after {
        content: '';
        width: 1.4rem;
        height: 1.4rem;
        background-color: ${({ $color }) => $color};
        border-radius: 50%;
        animation: ${({ $color }) => $color === '#22c55e' ? 'pulse 2s infinite' : 'none'};
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
        }
    }
`;

const StatusDot = styled.div``;

const ProfileInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    width: 100%;
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
`;

const Username = styled.h2`
    font-size: 2.4rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const PositionIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: #1a1a1a;
    border-radius: 0.8rem;

    svg {
        width: 2rem;
        height: 2rem;
    }
`;

const GameIdRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    justify-content: center;
`;

const GameId = styled.span`
    font-size: 1.4rem;
    color: #939393;
`;

const StatusText = styled.span<{ $color: string }>`
    font-size: 1.3rem;
    font-weight: 500;
    color: ${({ $color }) => $color};
`;

const GameBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.2rem;
    background-color: #1a1a1a;
    border-radius: 2rem;
    font-size: 1.3rem;
    color: #ffffff;
    align-self: center;
`;

const GameImage = styled(Image)`
    border-radius: 0.4rem;
`;

const Bio = styled.p`
    font-size: 1.5rem;
    color: #e0e0e0;
    line-height: 1.7;
    margin: 0;
    word-break: break-word;
`;

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    justify-content: center;
`;

const Tag = styled.span<{ $type: 'game' | 'comm' }>`
    padding: 0.6rem 1.2rem;
    border-radius: 2rem;
    font-size: 1.3rem;
    font-weight: 500;
    background-color: ${({ $type }) => $type === 'game' ? '#4272ec20' : '#22c55e20'};
    color: ${({ $type }) => $type === 'game' ? '#4272ec' : '#22c55e'};
    border: 0.1rem solid ${({ $type }) => $type === 'game' ? '#4272ec40' : '#22c55e40'};
`;