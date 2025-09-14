export interface QuickMatchData {
  game: 'lol' | 'tft' | 'overwatch' | null;
  myPosition: string[] | null;
  desiredPositions: string[];
  myTier: { main: string; sub?: string } | null;
  desiredTierRange: { min: string; max: string } | null;
  microphonePreference: 'required' | 'optional' | 'chat' | null;
  desiredStyles: {
    gameStyles: string[];
    communicationStyles: string[];
  };
}

export interface GameOption {
  id: 'lol' | 'tft' | 'overwatch' | 'valorant' | 'pubg' | 'lostark' | 'apex' | 'fortnite';
  name: string;
  icon: string;
  available: boolean;
}

export interface PositionOption {
  id: string;
  name: string;
  icon: string;
}

export interface TierOption {
  id: string;
  name: string;
  icon: string;
  subTiers: string[];
}

export interface MicrophoneOption {
  id: 'required' | 'optional' | 'chat';
  name: string;
  description: string;
  icon: string;
}

export type QuickMatchStep = 1 | 2 | 3 | 4 | 5;