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

### Environment Variables
Required environment variables in `.env.local`:
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here  # For AI chat features
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
- `/src/components/ClientLayout.tsx` - Client-side routing logic and conditional GNB, wraps app with QuickMatchProvider
- `/src/components/GNB.tsx` - Bottom navigation with active state management
- `/src/components/Header.tsx` - Global header with back navigation, notifications, and progress bar integration
- `/src/contexts/QuickMatchContext.tsx` - Context provider for sharing QuickMatch progress state globally
- `/src/app/tutorial/page.tsx` - Swiper-based onboarding with URL state sync
- `/src/app/match/quick/page.tsx` - Multi-step QuickMatch form with scroll behavior
- `/src/app/match/quick/results/page.tsx` - Swipeable match results with Tinder-style cards
- `/src/app/api/chat/route.ts` - AI chat API endpoint using Vercel AI SDK and Gemini
- `/src/data/` - Mock data directory with game-specific user data
- `/src/styles/button.tsx` - Common button component with consistent styling
- `/public/manifest.json` - PWA manifest with standalone display mode

### TypeScript Configuration
- **Path Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **Strict Mode**: Enabled for type safety
- **Target**: ES2017 for modern JavaScript features

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
- All mock data in `/src/data/` directory is structured for easy API replacement
- User authentication system not implemented
- Real-time chat features use AI but don't have WebSocket integration yet

## Quick Match Implementation Patterns

### Context-Based State Management
- **QuickMatchContext** (`/src/contexts/QuickMatchContext.tsx`): Shares progress state between global Header and QuickMatch pages
- **Provider Pattern**: ClientLayout wraps all components with QuickMatchProvider for context access
- **Progress Integration**: Global header displays progress bar using `env(safe-area-inset-top)` for mobile compatibility

### Multi-Step Form Patterns
- **Step Management**: Uses numbered steps (1-5) with TypeScript union types (`QuickMatchStep`)
- **Data Structure**: Centralized state object (`QuickMatchData`) passed through all step components
- **Navigation**: Automatic step progression with scroll behavior and validation checks

### Scroll Behavior Implementation
- **Mobile-First**: All scroll calculations account for header height (140px) and safe area insets
- **One-Time Scroll**: State-based tracking (`hasScrolledToDesired`, `hasScrolledToFooter`) prevents repeated scrolling
- **Smooth Scrolling**: `scrollIntoView({ behavior: 'smooth' })` with offset calculations for mobile viewport

### Toast Notification System
- **Library**: react-hot-toast with brand-consistent styling (#4272ec primary color)
- **Duplicate Prevention**: Unique toast IDs to prevent multiple identical notifications
- **Mobile Positioning**: `containerStyle` with `calc(env(safe-area-inset-top) + 20px)` for notch compatibility
- **Styling Pattern**:
```typescript
<Toaster
    position="top-center"
    containerStyle={{
        top: 'calc(env(safe-area-inset-top) + 20px)',
    }}
    toastOptions={{
        style: {
            background: 'linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%)',
            // ... other brand-consistent styles
        }
    }}
/>
```

### Animation Integration
- **Lottie Animations**: Use lottie-react for complex animations
- **File Organization**: Place Lottie JSON files in `/public/` directory
- **Import Pattern**: Use relative paths from components (`../../../../../public/animation.json`)
- **Implementation**: Loop animations with specified dimensions for loading states

### TypeScript Patterns for Dynamic Objects
- **Object.keys() Typing**: Use type assertions for dynamic object key access
```typescript
// Instead of: Object.keys(options)
const categories = Object.keys(gameStyleOptions) as Array<keyof typeof gameStyleOptions>;
```
- **Index Signature Issues**: Resolve with explicit type casting when iterating over object properties

### Mobile PWA Considerations
- **Safe Area Insets**: Always use `env(safe-area-inset-top/bottom)` for spacing near device edges
- **Progress Bars**: Integrate with global header using absolute positioning and z-index layering
- **Header Integration**: Global header can be enhanced with progress overlays without disrupting existing layout
- **Standalone Mode**: Account for `apple-mobile-web-app-status-bar-style: black-translucent` in viewport calculations

## AI Integration & API Routes

### Chat API Pattern
The application integrates AI chat functionality using the Vercel AI SDK with Google's Gemini 2.5 Flash model.

#### API Route Structure (`/src/app/api/chat/route.ts`)
```typescript
// Next.js 15 App Router API route pattern
export async function POST(req: Request) {
    const { messages } = await req.json();

    // Initialize AI provider
    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    // Stream AI responses
    const result = streamText({
        model: google('gemini-2.5-flash'),
        messages,
        system: systemPrompt,
        temperature: 0.9,
        maxRetries: 2,
    });

    return result.toTextStreamResponse();
}
```

#### Key Patterns
- **Streaming Responses**: Use `streamText()` and `.toTextStreamResponse()` for real-time chat UX
- **System Prompts**: Define AI personality and behavior constraints in Korean
- **Error Handling**: Return JSON error responses with 500 status for AI failures
- **Environment Variables**: Always use `process.env.GOOGLE_GENERATIVE_AI_API_KEY`

#### Character-Based AI Prompts
The AI chat uses a carefully crafted system prompt to simulate natural gamer conversation:
- Enforces casual Korean speech patterns matching user's formality level
- Prevents AI-sounding phrases like "도움이 필요하시면"
- Uses gaming slang and occasional typos for authenticity
- Maintains 1-2 sentence responses maximum

## Advanced Interaction Patterns

### SwipeableStack Component
A Tinder-style card swiping interface for match results (`/src/app/match/quick/results/components/SwipeableStack.tsx`).

#### Architecture
```typescript
interface SwipeableStackProps {
    users: MatchUser[];
    onSwipe: (user: MatchUser, direction: 'left' | 'right') => void;
    renderCard: (user: MatchUser, index: number, props?: Record<string, unknown>) => React.ReactNode;
}
```

#### Key Implementation Details
- **Ref-Based State Management**: Uses `dragStateRef` to avoid stale closure issues during animations
- **Dual Input Support**: Handles both mouse and touch events with unified handlers
- **Animation System**: Custom animations using `requestAnimationFrame` instead of CSS transitions
- **Performance**: Only renders top 3 cards in stack, rest are off-screen

#### Drag State Pattern
```typescript
interface DragState {
    isDragging: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    dragX: number;    // Delta from start
    dragY: number;    // Delta from start
}

// Critical: Keep ref synced with state for animation callbacks
useEffect(() => {
    dragStateRef.current = dragState;
}, [dragState]);
```

#### Swipe Detection Logic
- **Threshold**: 50px horizontal movement to trigger swipe
- **Direction**: Based purely on `dragX` sign (positive = right, negative = left)
- **Animation**: 300ms easeOut curve for swipe-out, 250ms for return
- **Callback Timing**: `onSwipe` fires only after animation completes

#### Event Handling Best Practices
```typescript
// Touch events must prevent scroll during drag
document.addEventListener('touchmove', handleTouchMove, {
    passive: false,  // Allows preventDefault()
});

// Clean up listeners on unmount
useEffect(() => {
    return () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };
}, []);
```

## Global Header System

### Header Component (`/src/components/Header.tsx`)
Unified header that adapts based on routing depth and integrates with multi-step flows.

#### Conditional Rendering Pattern
```typescript
const isDeepPage = pathname.split('/').filter(Boolean).length > 1;

return (
    <HeaderContainer>
        <ProgressOverlay $progress={progress} />  {/* From context */}
        <HeaderWrapper>
            {isDeepPage ? (
                <BackButton onClick={() => router.back()} />
            ) : (
                <BrandingSection>
                    <Logo />
                    <StatusIndicator />
                </BrandingSection>
            )}
            <ActionSection>
                {/* Notifications, game selector, etc. */}
            </ActionSection>
        </HeaderWrapper>
    </HeaderContainer>
);
```

#### Progress Integration
- **Context Source**: Reads `progress` value from `QuickMatchContext`
- **Visual Design**: 3px gradient bar at bottom of header using `ProgressOverlay`
- **Transition**: Smooth 0.3s ease transition as steps progress
- **Z-Index**: Overlay positioned above header border but below dropdown menus

#### Notification System
- **Dropdown Pattern**: Click-to-toggle with auto-close on scroll
- **Badge Styling**: Positioned absolute with border to create floating effect
- **Mobile Positioning**: Adjusted right offset on small screens
- **Unread Count**: Filters mock data and displays only if > 0

#### Safe Area Handling
```typescript
const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    padding-top: env(safe-area-inset-top);  // iOS notch support
    background: #1a1a1a;
    border-bottom: 1px solid #3f3f41;
`;
```

## Mock Data Architecture

### Data Organization (`/src/data/`)
Mock data is organized by feature and game type for easy API migration.

#### File Structure
```
src/data/
├── mockUsers.tsx              # General user profiles
├── mockGameUsers.tsx          # Game-specific user data aggregator
├── mockLOLUsers.tsx           # League of Legends users
├── mockOverwatchUsers.tsx     # Overwatch 2 users
├── mockTFTUsers.tsx           # Teamfight Tactics users
├── chatMockData.ts            # Chat rooms and messages
├── communityMockData.ts       # Community posts and comments
├── eventMockData.ts           # Events and promotions
└── mentorDetailMockData.ts    # Mentor profiles and services
```

#### Data Patterns
- **Game-Specific Users**: Each game has dedicated mock file with rank/tier systems
- **ReactNode for Icons**: SVG position icons imported as components for type safety
- **Consistent IDs**: Numeric IDs across all entities for easy relationship mapping
- **Korean Localization**: All user-facing strings in Korean

#### Example Pattern
```typescript
// Game-specific mock data exports interface-typed arrays
export const mockLOLUsers: DuoData[] = [
    {
        id: 1,
        profileImage: '/lol/profile-lol-1.png',
        position: <PositionTop />,  // Imported SVG component
        rankImage: '/lol/rank-lol-emerald.webp',
        rankText: 'E4',
        tags: ['적극적', '캐리형', '침착함'],
        // ... other fields
    },
    // ... more users
];
```

#### Migration Strategy
When replacing with real API:
1. Keep interface definitions in respective component files
2. Replace import from `/src/data/*` with API fetch
3. Transform API response to match existing interfaces
4. No component changes needed if interfaces match