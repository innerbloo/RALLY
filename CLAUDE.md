# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RALLY is a real-time duo matching service for gamers built with Next.js 15, React 19, and TypeScript. The application focuses on connecting players for popular games like League of Legends, Overwatch 2, Valorant, TFT, and PUBG. It serves as a mobile-first PWA with comprehensive gaming community features.

## Architecture

### Frontend Structure
- **Next.js App Router**: Uses the new app directory structure with server and client components
- **Styling**: Emotion CSS-in-JS for styled components with TypeScript props
- **Component Organization**: 
  - `/src/app/components/` - Page-specific components (home page sections)
  - `/src/components/` - Shared components (GNB, ClientLayout)
  - `/src/styles/` - Shared styling utilities and common button components

### Key Components & Patterns

#### Layout System
- **ClientLayout** (`/src/components/ClientLayout.tsx`): Conditionally renders GNB based on pathname (hides on `/tutorial` routes)
- **RootLayout** (`/src/app/layout.tsx`): Contains PWA metadata, viewport settings, and global font configuration
- **Tutorial Layout** (`/src/app/tutorial/layout.tsx`): Separate layout for onboarding flow

#### Component Architecture
- **Card Pattern**: Consistent card-based UI across all sections (DuoRecommendCard, MentorRecommendCard, etc.)
- **List Pattern**: Container components that map data to card components
- **SVG Integration**: Game position icons imported as React components from `/public/`

#### Navigation
- **GNB** (`/src/components/GNB.tsx`): Fixed bottom navigation with Lucide React icons
- **Routes**: Home, Match, Chat, Community, Profile (most routes not implemented yet)

### Data Models & Interfaces

#### Core Data Types
```typescript
// Duo Matching
interface DuoData {
    id: number;
    profileImage: string;
    username: string;
    position?: ReactNode; // SVG component for game position
    userCode: string; // Game-specific identifier
    description: string;
    rankImage: string; // Game rank badge
    rankText: string; // Rank abbreviation (e.g., "E4", "D2")
    tags: string[]; // Personality/playstyle tags
    gameImage: string;
    gameAlt: string;
}

// Mentor System
interface MentorData {
    id: number;
    profileImage: string;
    username: string;
    rate: number; // Star rating (1-5)
    reviews: number; // Review count
    description: string; // Mentor introduction
    gameImage: string;
    gameAlt: string;
}

// Community Posts
interface CommunityPost {
    id: number;
    image: string;
    username: string;
    title: string;
    createAt: string; // ISO date string
    comment: number; // Comment count
    game: string; // Game name in Korean
}
```

## Development Commands & Patterns

### Commands
```bash
# Development
npm run dev        # Start development server on localhost:3000
yarn dev           # Alternative with yarn

# Production
npm run build      # Build for production
npm start          # Start production server

# Code Quality
npm run lint       # Run ESLint (configured for Next.js + TypeScript)
```

### Asset Organization
```
public/
├── game1.png, game2.png, ... (main game icons)
├── lol/ (League of Legends assets)
│   ├── position-lol-top2.svg, position-lol-jungle2.svg, etc.
│   ├── rank-lol-bronze.webp, rank-lol-silver.webp, etc.
│   └── profile-lol-1.png, profile-lol-2.png, etc.
├── overwatch/ (Overwatch 2 assets)
├── mentor/ (mentor profile images and rating icons)
├── community/ (community post thumbnails)
└── content/ (recommended content images)
```

## Important Files

- `/src/app/layout.tsx` - Root layout with PWA metadata and global styles
- `/src/app/page.tsx` - Main home page with embedded mock data for all sections
- `/src/components/ClientLayout.tsx` - Client-side routing logic and conditional GNB
- `/src/components/GNB.tsx` - Bottom navigation with active state management
- `/src/app/tutorial/page.tsx` - Swiper-based onboarding with URL state sync
- `/src/styles/button.tsx` - Common button component with consistent styling
- `/public/manifest.json` - PWA manifest with standalone display mode

## Styling System

### Design System
- **Color Palette**: Dark theme with `#1a1a1a` backgrounds, `#252527` cards, `#4272EC` primary blue
- **Typography**: Pretendard Variable font (Korean-optimized), rem-based sizing
- **Spacing**: Consistent 2rem, 4rem patterns for sections
- **Border Radius**: 1.6rem for cards, 3.8rem for buttons

### Styled Components Pattern
```typescript
const StyledComponent = styled.div<{ $active: boolean }>`
    // Transient props use $ prefix
    color: ${({ $active }) => ($active ? '#4272EC' : '#939393')};
`;
```

### Hover Effects
- **Desktop Only**: All hover effects must be wrapped in `@media (hover: hover) and (pointer: fine)` media query
- **No Mobile Hover**: Avoid hover effects on touch devices to prevent sticky hover states
- **Pattern**:
```typescript
const InteractiveComponent = styled.div`
    cursor: pointer;
    
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: #2a2a2c;
        }
    }
`;
```

## Special Features & Considerations

### PWA Configuration
- Standalone display mode hides browser UI when installed
- Viewport configured for safe area insets
- Mobile-first responsive design

### Animation System
- Tutorial page uses complex Swiper integration with custom animations
- CSS keyframes for fadeInUp and float effects
- State-based animation triggers

### Korean Localization
- All UI text and content in Korean
- Game names use official Korean translations
- Date formatting should use Korean locale

### Development Notes
- Components use 'use client' directive extensively
- Mock data is embedded directly in page components (ready for API integration)
- Image optimization via Next.js Image component
- TypeScript strict mode enabled

### Future API Integration Points
- All mock data arrays in `/src/app/page.tsx` are structured for easy API replacement
- User authentication system not implemented
- Real-time features (chat, matching) not implemented