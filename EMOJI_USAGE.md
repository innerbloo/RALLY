# EMOJI USAGE DOCUMENTATION

프로젝트에서 사용되는 이모티콘의 위치와 용도를 정리한 문서입니다.

## 📊 개요

- **총 사용 파일**: 11개
- **총 사용 위치**: 17곳
- **사용된 이모티콘 종류**: 8개

## 🎯 카테고리별 사용 현황

### 1. Empty State (빈 상태 표시) - 7곳

빈 데이터 상태를 사용자에게 친근하게 전달하기 위해 사용됩니다.

| 파일 | 줄 번호 | 이모티콘 | 메시지 |
|------|---------|----------|--------|
| `UserReviews.tsx` | 142 | 💬 | "아직 받은 리뷰가 없습니다." |
| `MentorReviews.tsx` | 136 | 💬 | "아직 받은 후기가 없습니다." |
| `GameInfoSection.tsx` | 72 | 🎮 | "등록된 게임 정보가 없습니다." |
| `ActivityTabs.tsx` | 80 | 📝 | "작성한 게시글이 없습니다." |
| `ActivityTabs.tsx` | 93 | ❤️ | "좋아요한 게시글이 없습니다." |
| `ActivityTabs.tsx` | 120 | 💬 | "작성한 댓글이 없습니다." |

### 2. Toast 알림 아이콘 - 4곳

사용자 액션에 대한 즉각적인 피드백을 제공합니다.

| 파일 | 줄 번호 | 이모티콘 | 상황 |
|------|---------|----------|------|
| `ActionButtons.tsx` | 91 | 🎮 | 매칭 신청 성공 |
| `ActionButtons.tsx` | 108 | ❤️ | 팔로우 성공 |
| `ActionButtons.tsx` | 120 | 💔 | 팔로우 취소 |
| `match/page.tsx` | 144 | 🎮 | 매칭 신청 성공 |

### 3. UI 액션/피드백 - 2곳

스와이프 제스처에 대한 시각적 피드백을 제공합니다.

| 파일 | 줄 번호 | 이모티콘 | 의미 |
|------|---------|----------|------|
| `MatchCard.tsx` | 251 | ⚡ | PICK (좋아요 스와이프) |
| `MatchCard.tsx` | 251 | 👋 | SKIP (거부 스와이프) |

### 4. 가이드/팁 섹션 - 4곳

사용자에게 도움말과 안내를 제공할 때 사용됩니다.

| 파일 | 줄 번호 | 이모티콘 | 섹션 제목 |
|------|---------|----------|-----------|
| `StyleSelection.tsx` | 252 | 💡 | "선택 가이드" |
| `MicrophoneSelection.tsx` | 122 | 💡 | "소통 방식 안내" |
| `MatchSuccessModal.tsx` | 170 | 💡 | "매칭 팁" |
| `MatchSuccessModal.tsx` | 190 | 💬 | "채팅하기" 버튼 |

## 📈 이모티콘별 사용 빈도

| 이모티콘 | 사용 횟수 | 주요 용도 |
|----------|-----------|-----------|
| 💬 | 6회 | 리뷰/댓글/채팅 관련 빈 상태 및 액션 |
| 🎮 | 3회 | 게임 정보 및 매칭 관련 |
| 💡 | 3회 | 팁/가이드 섹션 헤더 |
| ❤️ | 2회 | 좋아요/팔로우 관련 |
| ⚡ | 1회 | 매칭 PICK 액션 |
| 👋 | 1회 | 매칭 SKIP 액션 |
| 💔 | 1회 | 팔로우 취소 |
| 📝 | 1회 | 게시글 관련 빈 상태 |

## 📁 파일별 상세 목록

### Profile 관련 컴포넌트

#### `/src/app/profile/[userId]/components/UserReviews.tsx`
```typescript
// Line 142
<EmptyIcon>💬</EmptyIcon>
<EmptyText>아직 받은 리뷰가 없습니다.</EmptyText>
```

#### `/src/app/profile/[userId]/components/ActionButtons.tsx`
```typescript
// Line 91 - 매칭 신청 토스트
toast.success('🎮 매칭 신청을 보냈습니다!', { id: `match-${user.id}` });

// Line 108 - 팔로우 토스트
toast.success(`${username}님을 팔로우했습니다!`, { icon: '❤️' });

// Line 120 - 팔로우 취소 토스트
toast.success('팔로우를 취소했습니다.', { icon: '💔' });
```

#### `/src/app/profile/components/GameInfoSection.tsx`
```typescript
// Line 72
<EmptyIcon>🎮</EmptyIcon>
<EmptyText>등록된 게임 정보가 없습니다.</EmptyText>
```

#### `/src/app/profile/components/ActivityTabs.tsx`
```typescript
// Line 80 - 게시글 탭
<EmptyIcon>📝</EmptyIcon>
<EmptyText>작성한 게시글이 없습니다.</EmptyText>

// Line 93 - 좋아요 탭
<EmptyIcon>❤️</EmptyIcon>
<EmptyText>좋아요한 게시글이 없습니다.</EmptyText>

// Line 120 - 댓글 탭
<EmptyIcon>💬</EmptyIcon>
<EmptyText>작성한 댓글이 없습니다.</EmptyText>
```

### Mentor 관련 컴포넌트

#### `/src/app/mentor/[id]/components/MentorReviews.tsx`
```typescript
// Line 136
<EmptyIcon>💬</EmptyIcon>
<EmptyText>아직 받은 후기가 없습니다.</EmptyText>
```

### Match 관련 컴포넌트

#### `/src/app/match/page.tsx`
```typescript
// Line 144
const handleMatchRequest = (user: MatchUser) => {
    toast.success('🎮 매칭 신청을 보냈습니다!', { id: `match-${user.id}` });
};
```

#### `/src/app/match/quick/results/components/MatchCard.tsx`
```typescript
// Line 251 - 드래그 오버레이 아이콘
<OverlayIcon>
    {getOverlayType() === 'like' ? '⚡' : '👋'}
</OverlayIcon>
<OverlayText $type={getOverlayType()!}>
    {getOverlayType() === 'like' ? 'PICK' : 'SKIP'}
</OverlayText>
```

#### `/src/app/match/quick/components/StyleSelection.tsx`
```typescript
// Line 252
<TipTitle>💡 선택 가이드</TipTitle>
```

#### `/src/app/match/quick/components/MicrophoneSelection.tsx`
```typescript
// Line 122
<TipTitle>💡 소통 방식 안내</TipTitle>
```

#### `/src/app/match/quick/results/components/MatchSuccessModal.tsx`
```typescript
// Line 170
<TipsTitle>💡 매칭 팁</TipsTitle>

// Line 190
<ChatButton onClick={...}>
    💬 채팅하기
</ChatButton>
```

## 🎨 사용 패턴 및 가이드라인

### 일관성 있는 사용

1. **빈 상태 (Empty State)**
   - 각 콘텐츠 타입에 맞는 이모티콘 사용
   - 리뷰/댓글: 💬
   - 게임 정보: 🎮
   - 게시글: 📝
   - 좋아요: ❤️

2. **액션 피드백**
   - 긍정적 액션: 🎮, ❤️, ⚡
   - 부정적 액션: 💔, 👋

3. **정보 제공**
   - 모든 팁/가이드 섹션: 💡
   - 채팅 관련: 💬

### 추천 사항

- **새로운 Empty State 추가 시**: 해당 콘텐츠의 성격에 맞는 이모티콘 선택
- **Toast 알림 추가 시**: 액션의 성격(긍정/부정)에 맞는 이모티콘 사용
- **가이드 섹션**: 💡로 통일하여 일관성 유지
- **사용자 커뮤니케이션**: 💬로 통일

## 📝 유지보수 노트

- 이모티콘 추가/변경 시 이 문서를 함께 업데이트하세요
- 일관성을 유지하기 위해 기존 패턴을 참고하세요
- 브라우저 호환성을 고려하여 널리 지원되는 이모티콘을 사용하세요

---

**마지막 업데이트**: 2025-10-27
