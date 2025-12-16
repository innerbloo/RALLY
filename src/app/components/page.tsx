'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { Star, MessageCircle, Bell, Home, Search } from 'lucide-react';

// ============================================
// 디자인 시스템 페이지
// ============================================

export default function DesignSystemPage() {
    const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'buttons' | 'cards' | 'spacing' | 'components'>('colors');

    // body의 max-width 제거 (이 페이지에서만)
    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'design-system-body-override';
        style.textContent = `
            html, body {
                max-width: none !important;
                margin: 0 !important;
                box-shadow: none !important;
            }
            aside {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const existingStyle = document.getElementById('design-system-body-override');
            if (existingStyle) {
                existingStyle.remove();
            }
        };
    }, []);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>RALLY Design System</PageTitle>
                <PageSubtitle>디자인 가이드라인</PageSubtitle>
            </PageHeader>

            <TabContainer>
                <Tab $active={activeTab === 'colors'} onClick={() => setActiveTab('colors')}>Colors</Tab>
                <Tab $active={activeTab === 'typography'} onClick={() => setActiveTab('typography')}>Typography</Tab>
                <Tab $active={activeTab === 'buttons'} onClick={() => setActiveTab('buttons')}>Buttons</Tab>
                <Tab $active={activeTab === 'cards'} onClick={() => setActiveTab('cards')}>Cards</Tab>
                <Tab $active={activeTab === 'spacing'} onClick={() => setActiveTab('spacing')}>Spacing</Tab>
                <Tab $active={activeTab === 'components'} onClick={() => setActiveTab('components')}>Components</Tab>
            </TabContainer>

            <ContentArea>
                {activeTab === 'colors' && <ColorsSection />}
                {activeTab === 'typography' && <TypographySection />}
                {activeTab === 'buttons' && <ButtonsSection />}
                {activeTab === 'cards' && <CardsSection />}
                {activeTab === 'spacing' && <SpacingSection />}
                {activeTab === 'components' && <ComponentsSection />}
            </ContentArea>
        </PageContainer>
    );
}

// ============================================
// Colors Section
// ============================================
function ColorsSection() {
    const backgroundColors = [
        { name: 'Primary BG', value: '#1a1a1a', usage: '메인 페이지 배경' },
        { name: 'Secondary BG', value: '#252527', usage: '카드, 모달 배경' },
        { name: 'Tertiary BG', value: '#1f1f21', usage: 'HTML 배경' },
        { name: 'Border', value: '#3f3f41', usage: '구분선, 테두리' },
    ];

    const textColors = [
        { name: 'Primary Text', value: '#ffffff', usage: '주요 텍스트' },
        { name: 'Secondary Text', value: '#939393', usage: '보조 텍스트' },
        { name: 'Tertiary Text', value: '#6b7280', usage: '비활성 텍스트' },
    ];

    const brandColors = [
        { name: 'Primary Blue', value: '#4272ec', usage: '버튼, 아이콘, 배지' },
        { name: 'Primary Hover', value: '#315fbb', usage: '버튼 호버 상태' },
        { name: 'Secondary Blue', value: '#3a5fd9', usage: '그래디언트 종료색' },
    ];

    const statusColors = [
        { name: 'Available', value: '#22c55e', usage: '매칭 가능' },
        { name: 'Matching', value: '#f59e0b', usage: '매칭 중' },
        { name: 'In-Game', value: '#ef4444', usage: '게임 중' },
        { name: 'Online', value: '#4CAF50', usage: '온라인' },
    ];

    const categoryColors = [
        { name: '공략', value: '#4272ec' },
        { name: '자유', value: '#9C27B0' },
        { name: '질문', value: '#FF9800' },
        { name: '팁', value: '#4CAF50' },
    ];

    return (
        <Section>
            <SectionTitle>배경 색상</SectionTitle>
            <ColorGrid>
                {backgroundColors.map((color) => (
                    <ColorCard key={color.name}>
                        <ColorSwatch $color={color.value} $light={false} />
                        <ColorInfo>
                            <ColorName>{color.name}</ColorName>
                            <ColorValue>{color.value}</ColorValue>
                            <ColorUsage>{color.usage}</ColorUsage>
                        </ColorInfo>
                    </ColorCard>
                ))}
            </ColorGrid>

            <SectionTitle>텍스트 색상</SectionTitle>
            <ColorGrid>
                {textColors.map((color) => (
                    <ColorCard key={color.name}>
                        <ColorSwatch $color={color.value} $light={color.value === '#ffffff'} />
                        <ColorInfo>
                            <ColorName>{color.name}</ColorName>
                            <ColorValue>{color.value}</ColorValue>
                            <ColorUsage>{color.usage}</ColorUsage>
                        </ColorInfo>
                    </ColorCard>
                ))}
            </ColorGrid>

            <SectionTitle>브랜드 색상</SectionTitle>
            <ColorGrid>
                {brandColors.map((color) => (
                    <ColorCard key={color.name}>
                        <ColorSwatch $color={color.value} $light={false} />
                        <ColorInfo>
                            <ColorName>{color.name}</ColorName>
                            <ColorValue>{color.value}</ColorValue>
                            <ColorUsage>{color.usage}</ColorUsage>
                        </ColorInfo>
                    </ColorCard>
                ))}
            </ColorGrid>

            <SectionTitle>그래디언트</SectionTitle>
            <GradientShowcase>
                <GradientSwatch />
                <ColorInfo>
                    <ColorName>Primary Gradient</ColorName>
                    <ColorValue>#4272ec → #3a5fd9 (135도)</ColorValue>
                    <ColorUsage>메시지 버블, 토스트, 읽지 않은 배지</ColorUsage>
                </ColorInfo>
            </GradientShowcase>

            <SectionTitle>상태 색상</SectionTitle>
            <ColorGrid>
                {statusColors.map((color) => (
                    <ColorCard key={color.name}>
                        <ColorSwatch $color={color.value} $light={false} />
                        <ColorInfo>
                            <ColorName>{color.name}</ColorName>
                            <ColorValue>{color.value}</ColorValue>
                            <ColorUsage>{color.usage}</ColorUsage>
                        </ColorInfo>
                    </ColorCard>
                ))}
            </ColorGrid>

            <SectionTitle>카테고리 배지 색상</SectionTitle>
            <BadgeGrid>
                {categoryColors.map((color) => (
                    <CategoryBadgeItem key={color.name}>
                        <CategoryBadge $color={color.value}>
                            {color.name}
                        </CategoryBadge>
                        <ColorValue>{color.value}</ColorValue>
                    </CategoryBadgeItem>
                ))}
            </BadgeGrid>
        </Section>
    );
}

// ============================================
// Typography Section
// ============================================
function TypographySection() {
    return (
        <Section>
            <SectionTitle>폰트</SectionTitle>
            <FontFamilyBox>
                <FontFamilyName>Pretendard Variable</FontFamilyName>
                <FontFamilyDesc>한국어 최적화 가변 폰트</FontFamilyDesc>
            </FontFamilyBox>

            <SectionTitle>타입 스케일</SectionTitle>
            <TypeScaleList>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '2rem', fontWeight: 700 }}>로고 텍스트</TypeSample>
                    <TypeInfo>20px / Bold</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1.6rem', fontWeight: 600 }}>섹션 제목</TypeSample>
                    <TypeInfo>16px / SemiBold</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1.6rem', fontWeight: 500 }}>사용자명</TypeSample>
                    <TypeInfo>16px / Medium</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1.5rem', fontWeight: 400 }}>메시지 버블</TypeSample>
                    <TypeInfo>15px / Regular</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1.4rem', fontWeight: 400 }}>서브 텍스트</TypeSample>
                    <TypeInfo>14px / Regular</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1.3rem', fontWeight: 400 }}>본문 텍스트</TypeSample>
                    <TypeInfo>13px / Regular</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1.2rem', fontWeight: 400 }}>메타 정보</TypeSample>
                    <TypeInfo>12px / Regular</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1.1rem', fontWeight: 500 }}>타임스탬프</TypeSample>
                    <TypeInfo>11px / Medium</TypeInfo>
                </TypeScaleItem>
                <TypeScaleItem>
                    <TypeSample style={{ fontSize: '1rem', fontWeight: 500 }}>배지</TypeSample>
                    <TypeInfo>10px / Medium</TypeInfo>
                </TypeScaleItem>
            </TypeScaleList>

            <SectionTitle>폰트 굵기</SectionTitle>
            <WeightGrid>
                <WeightItem>
                    <WeightSample style={{ fontWeight: 300 }}>Light</WeightSample>
                    <WeightValue>300</WeightValue>
                </WeightItem>
                <WeightItem>
                    <WeightSample style={{ fontWeight: 400 }}>Regular</WeightSample>
                    <WeightValue>400</WeightValue>
                </WeightItem>
                <WeightItem>
                    <WeightSample style={{ fontWeight: 500 }}>Medium</WeightSample>
                    <WeightValue>500</WeightValue>
                </WeightItem>
                <WeightItem>
                    <WeightSample style={{ fontWeight: 600 }}>SemiBold</WeightSample>
                    <WeightValue>600</WeightValue>
                </WeightItem>
                <WeightItem>
                    <WeightSample style={{ fontWeight: 700 }}>Bold</WeightSample>
                    <WeightValue>700</WeightValue>
                </WeightItem>
            </WeightGrid>
        </Section>
    );
}

// ============================================
// Buttons Section
// ============================================
function ButtonsSection() {
    return (
        <Section>
            <SectionTitle>Primary 버튼</SectionTitle>
            <ButtonShowcase>
                <PrimaryButton>시작하기</PrimaryButton>
                <ButtonSpec>
                    <SpecItem><SpecLabel>배경</SpecLabel><SpecValue>#4272ec</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>호버</SpecLabel><SpecValue>#315fbb</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>패딩</SpecLabel><SpecValue>13px 40px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>모서리</SpecLabel><SpecValue>38px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>글자 굵기</SpecLabel><SpecValue>SemiBold</SpecValue></SpecItem>
                </ButtonSpec>
            </ButtonShowcase>

            <SectionTitle>Secondary 버튼</SectionTitle>
            <ButtonShowcase>
                <SecondaryButton>취소</SecondaryButton>
                <ButtonSpec>
                    <SpecItem><SpecLabel>배경</SpecLabel><SpecValue>투명</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>테두리</SpecLabel><SpecValue>#3f3f41</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>호버 배경</SpecLabel><SpecValue>#252527</SpecValue></SpecItem>
                </ButtonSpec>
            </ButtonShowcase>

            <SectionTitle>아이콘 버튼</SectionTitle>
            <ButtonShowcase>
                <IconButtonGroup>
                    <IconButton><Bell size={20} /></IconButton>
                    <IconButton><Search size={20} /></IconButton>
                    <IconButton $active><Home size={20} /></IconButton>
                </IconButtonGroup>
                <ButtonSpec>
                    <SpecItem><SpecLabel>크기</SpecLabel><SpecValue>44 x 44px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>모서리</SpecLabel><SpecValue>원형</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>호버 배경</SpecLabel><SpecValue>#252527</SpecValue></SpecItem>
                </ButtonSpec>
            </ButtonShowcase>

            <SectionTitle>태그</SectionTitle>
            <ButtonShowcase>
                <TagGroup>
                    <GameStyleTag>적극적</GameStyleTag>
                    <GameStyleTag>캐리형</GameStyleTag>
                    <CommStyleTag>마이크 가능</CommStyleTag>
                    <CommStyleTag>침착함</CommStyleTag>
                </TagGroup>
                <ButtonSpec>
                    <SpecItem><SpecLabel>게임 스타일</SpecLabel><SpecValue>#4272ec</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>커뮤니케이션</SpecLabel><SpecValue>#22c55e</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>패딩</SpecLabel><SpecValue>5px 10px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>모서리</SpecLabel><SpecValue>8px</SpecValue></SpecItem>
                </ButtonSpec>
            </ButtonShowcase>
        </Section>
    );
}

// ============================================
// Cards Section
// ============================================
function CardsSection() {
    return (
        <Section>
            <SectionTitle>듀오 추천 카드</SectionTitle>
            <CardShowcase>
                <DuoCard>
                    <DuoCardTop>
                        <DuoProfile>
                            <ProfileImage />
                            <ProfileInfo>
                                <ProfileName>플레이어명</ProfileName>
                                <ProfileDesc>함께 즐겁게 게임해요!</ProfileDesc>
                            </ProfileInfo>
                        </DuoProfile>
                        <RankBadge>E4</RankBadge>
                    </DuoCardTop>
                    <DuoCardBottom>
                        <TagGroup>
                            <GameStyleTag>적극적</GameStyleTag>
                            <CommStyleTag>마이크 가능</CommStyleTag>
                        </TagGroup>
                        <GameIcon />
                    </DuoCardBottom>
                </DuoCard>
                <CardSpec>
                    <SpecItem><SpecLabel>배경</SpecLabel><SpecValue>#252527</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>테두리</SpecLabel><SpecValue>1px #3f3f41</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>모서리</SpecLabel><SpecValue>16px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>패딩</SpecLabel><SpecValue>12px 15px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>호버 테두리</SpecLabel><SpecValue>#4272ec</SpecValue></SpecItem>
                </CardSpec>
            </CardShowcase>

            <SectionTitle>멘토 카드</SectionTitle>
            <CardShowcase>
                <MentorCard>
                    <ProfileImage $size="large" />
                    <MentorName>멘토닉네임</MentorName>
                    <MentorRating>
                        <Star size={14} fill="#FFD700" color="#FFD700" />
                        <span>4.8</span>
                        <span className="reviews">(128)</span>
                    </MentorRating>
                    <MentorDesc>실력 향상을 도와드립니다</MentorDesc>
                </MentorCard>
                <CardSpec>
                    <SpecItem><SpecLabel>정렬</SpecLabel><SpecValue>수직 중앙</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>패딩</SpecLabel><SpecValue>20px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>프로필 크기</SpecLabel><SpecValue>40 x 40px</SpecValue></SpecItem>
                </CardSpec>
            </CardShowcase>

            <SectionTitle>커뮤니티 카드</SectionTitle>
            <CardShowcase>
                <CommunityCard>
                    <CommunityContent>
                        <CommunityMeta>
                            <CategoryBadge $color="#4272ec">공략</CategoryBadge>
                            <span>리그오브레전드</span>
                        </CommunityMeta>
                        <CommunityTitle>시즌 15 원딜 공략법</CommunityTitle>
                        <CommunityFooter>
                            <span>작성자명</span>
                            <span>•</span>
                            <MessageCircle size={12} />
                            <span>24</span>
                        </CommunityFooter>
                    </CommunityContent>
                    <CommunityThumbnail />
                </CommunityCard>
                <CardSpec>
                    <SpecItem><SpecLabel>패딩</SpecLabel><SpecValue>18px 20px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>하단 테두리</SpecLabel><SpecValue>1px #3f3f41</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>썸네일 크기</SpecLabel><SpecValue>50 x 50px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>썸네일 모서리</SpecLabel><SpecValue>12px</SpecValue></SpecItem>
                </CardSpec>
            </CardShowcase>

            <SectionTitle>채팅방 카드</SectionTitle>
            <CardShowcase>
                <ChatCard>
                    <ChatGameIcon />
                    <ChatProfile>
                        <ProfileImage />
                        <OnlineIndicator />
                    </ChatProfile>
                    <ChatContent>
                        <ChatHeader>
                            <ChatName>플레이어명</ChatName>
                            <ChatTime>오후 3:24</ChatTime>
                        </ChatHeader>
                        <ChatMessage>안녕하세요! 게임 하실래요?</ChatMessage>
                    </ChatContent>
                    <UnreadBadge>3</UnreadBadge>
                </ChatCard>
                <CardSpec>
                    <SpecItem><SpecLabel>패딩</SpecLabel><SpecValue>16px 20px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>프로필 크기</SpecLabel><SpecValue>56 x 56px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>온라인 표시</SpecLabel><SpecValue>12px, 테두리 2px</SpecValue></SpecItem>
                    <SpecItem><SpecLabel>읽지 않음 배지</SpecLabel><SpecValue>최소 너비 20px</SpecValue></SpecItem>
                </CardSpec>
            </CardShowcase>
        </Section>
    );
}

// ============================================
// Spacing Section
// ============================================
function SpacingSection() {
    const spacingScale = [
        { px: '1px', usage: '테두리' },
        { px: '2px', usage: '아이콘 간격' },
        { px: '4px', usage: '아이콘-텍스트 간격' },
        { px: '5px', usage: '태그 간격' },
        { px: '8px', usage: '기본 간격' },
        { px: '10px', usage: '텍스트 간격' },
        { px: '12px', usage: '하단 네비게이션 간격' },
        { px: '15px', usage: '카드 가로 패딩' },
        { px: '16px', usage: '일반 패딩' },
        { px: '18px', usage: '카드 패딩' },
        { px: '20px', usage: '섹션 패딩' },
        { px: '40px', usage: '섹션 간격' },
    ];

    const radiusScale = [
        { px: '8px', usage: '태그, 작은 배지' },
        { px: '10px', usage: '배지' },
        { px: '12px', usage: '썸네일' },
        { px: '16px', usage: '카드' },
        { px: '20px', usage: '아이콘 버튼' },
        { px: '24px', usage: '하단 네비게이션' },
        { px: '38px', usage: '메인 버튼' },
        { px: '원형', usage: '프로필 이미지' },
    ];

    return (
        <Section>
            <SectionTitle>간격</SectionTitle>
            <SpacingGrid>
                {spacingScale.map((item) => (
                    <SpacingItem key={item.px}>
                        <SpacingVisual $size={item.px} />
                        <SpacingInfo>
                            <SpacingValue>{item.px}</SpacingValue>
                            <SpacingUsage>{item.usage}</SpacingUsage>
                        </SpacingInfo>
                    </SpacingItem>
                ))}
            </SpacingGrid>

            <SectionTitle>모서리 둥글기</SectionTitle>
            <RadiusGrid>
                {radiusScale.map((item) => (
                    <RadiusItem key={item.px}>
                        <RadiusVisual $radius={item.px === '원형' ? '50%' : item.px} />
                        <SpacingInfo>
                            <SpacingValue>{item.px}</SpacingValue>
                            <SpacingUsage>{item.usage}</SpacingUsage>
                        </SpacingInfo>
                    </RadiusItem>
                ))}
            </RadiusGrid>
        </Section>
    );
}

// ============================================
// Components Section
// ============================================
function ComponentsSection() {
    const layoutComponents = [
        { name: 'Header', desc: '상단 고정 네비게이션 (진행 바, 알림, 뒤로가기)' },
        { name: 'GNB', desc: '하단 고정 네비게이션 (5개 탭, 글래스 효과)' },
    ];

    const cardComponents = [
        { name: '듀오 추천 카드', desc: '프로필, 랭크, 태그가 포함된 사용자 카드' },
        { name: '멘토 추천 카드', desc: '프로필, 별점, 설명이 포함된 멘토 카드' },
        { name: '커뮤니티 카드', desc: '카테고리, 제목, 썸네일이 포함된 게시글 카드' },
        { name: '채팅방 카드', desc: '게임 아이콘, 프로필, 마지막 메시지가 포함된 채팅 카드' },
        { name: '온라인 사용자 카드', desc: '현재 접속 중인 사용자 정보 카드' },
        { name: '이벤트 카드', desc: '이벤트 정보와 참여자 수가 포함된 카드' },
        { name: '추천 콘텐츠 카드', desc: '난이도, 제목, 통계가 포함된 콘텐츠 카드' },
    ];

    const utilityComponents = [
        { name: '메시지 버블', desc: '채팅 메시지 (내 메시지/상대 메시지/시스템)' },
        { name: '메시지 입력창', desc: '텍스트 입력 필드와 전송 버튼' },
        { name: '타이핑 표시', desc: '상대방이 입력 중임을 나타내는 애니메이션' },
        { name: '배너 슬라이더', desc: '자동/수동 슬라이드 이미지 배너' },
        { name: '진행 표시', desc: '단계별 진행 상황 인디케이터' },
    ];

    return (
        <Section>
            <SectionTitle>레이아웃</SectionTitle>
            <ComponentList>
                {layoutComponents.map((comp) => (
                    <ComponentItem key={comp.name}>
                        <ComponentName>{comp.name}</ComponentName>
                        <ComponentDesc>{comp.desc}</ComponentDesc>
                    </ComponentItem>
                ))}
            </ComponentList>

            <SectionTitle>카드</SectionTitle>
            <ComponentList>
                {cardComponents.map((comp) => (
                    <ComponentItem key={comp.name}>
                        <ComponentName>{comp.name}</ComponentName>
                        <ComponentDesc>{comp.desc}</ComponentDesc>
                    </ComponentItem>
                ))}
            </ComponentList>

            <SectionTitle>유틸리티</SectionTitle>
            <ComponentList>
                {utilityComponents.map((comp) => (
                    <ComponentItem key={comp.name}>
                        <ComponentName>{comp.name}</ComponentName>
                        <ComponentDesc>{comp.desc}</ComponentDesc>
                    </ComponentItem>
                ))}
            </ComponentList>
        </Section>
    );
}

// ============================================
// Styled Components
// ============================================

const PageContainer = styled.div`
    min-height: 100vh;
    background-color: #1a1a1a;
    padding: 4rem 6rem;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 1200px) {
        padding: 3rem 4rem;
    }

    @media (max-width: 768px) {
        padding: 2rem;
    }
`;

const PageHeader = styled.header`
    margin-bottom: 4rem;
    text-align: left;
    border-bottom: 1px solid #3f3f41;
    padding-bottom: 2rem;
`;

const PageTitle = styled.h1`
    font-size: 3.2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.8rem;
`;

const PageSubtitle = styled.p`
    font-size: 1.6rem;
    color: #939393;
`;

const TabContainer = styled.nav`
    display: flex;
    gap: 1rem;
    margin-bottom: 4rem;
    flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
    padding: 1.2rem 2.4rem;
    border-radius: 0.8rem;
    font-size: 1.5rem;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#939393')};
    border: 1px solid ${({ $active }) => ($active ? '#4272ec' : '#3f3f41')};

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: ${({ $active }) => ($active ? '#315fbb' : '#252527')};
            border-color: ${({ $active }) => ($active ? '#315fbb' : '#4272ec')};
        }
    }
`;

const ContentArea = styled.main``;

const Section = styled.section`
    margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #3f3f41;
`;

// Colors
const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
`;

const ColorCard = styled.div`
    background-color: #252527;
    border-radius: 1.2rem;
    overflow: hidden;
`;

const ColorSwatch = styled.div<{ $color: string; $light: boolean }>`
    height: 10rem;
    background-color: ${({ $color }) => $color};
    border: ${({ $light }) => ($light ? '1px solid #3f3f41' : 'none')};
`;

const ColorInfo = styled.div`
    padding: 1.6rem;
`;

const ColorName = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.4rem;
`;

const ColorValue = styled.div`
    font-size: 1.4rem;
    color: #4272ec;
    margin-bottom: 0.5rem;
`;

const ColorUsage = styled.div`
    font-size: 1.3rem;
    color: #939393;
`;

const GradientShowcase = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
    margin-bottom: 4rem;
`;

const GradientSwatch = styled.div`
    width: 28rem;
    height: 10rem;
    border-radius: 1.2rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
`;

const BadgeGrid = styled.div`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 4rem;
`;

const CategoryBadgeItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
`;

const CategoryBadge = styled.span<{ $color: string }>`
    padding: 0.5rem 1.2rem;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    background-color: ${({ $color }) => $color};
`;

// Typography
const FontFamilyBox = styled.div`
    background-color: #252527;
    border-radius: 1.2rem;
    padding: 2.5rem;
    margin-bottom: 4rem;
`;

const FontFamilyName = styled.div`
    font-size: 2.4rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
`;

const FontFamilyDesc = styled.div`
    font-size: 1.4rem;
    color: #939393;
`;

const TypeScaleList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 4rem;
`;

const TypeScaleItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2.5rem;
    background-color: #252527;
    border-radius: 1rem;
`;

const TypeSample = styled.span`
    color: #ffffff;
`;

const TypeInfo = styled.span`
    font-size: 1.4rem;
    color: #939393;
`;

const WeightGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const WeightItem = styled.div`
    background-color: #252527;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
`;

const WeightSample = styled.span`
    font-size: 1.8rem;
    color: #ffffff;
    display: block;
    margin-bottom: 0.5rem;
`;

const WeightValue = styled.span`
    font-size: 1.3rem;
    color: #939393;
`;

// Buttons
const ButtonShowcase = styled.div`
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    margin-bottom: 4rem;
    flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
    background-color: #4272ec;
    color: #ffffff;
    padding: 1.3rem 4rem;
    border-radius: 3.8rem;
    font-size: 1.6rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #315fbb;
        }
    }
`;

const SecondaryButton = styled.button`
    background-color: transparent;
    color: #ffffff;
    padding: 1.3rem 4rem;
    border-radius: 3.8rem;
    font-size: 1.6rem;
    font-weight: 600;
    border: 1px solid #3f3f41;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const ButtonSpec = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const SpecItem = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const SpecLabel = styled.span`
    font-size: 1.4rem;
    color: #939393;
    min-width: 80px;
`;

const SpecValue = styled.span`
    font-size: 1.4rem;
    color: #ffffff;
`;

const IconButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

const IconButton = styled.button<{ $active?: boolean }>`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    color: ${({ $active }) => ($active ? '#4272ec' : '#939393')};
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const QuickMatchButton = styled.button`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #4272ec;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const TagGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
`;

const GameStyleTag = styled.span`
    padding: 0.5rem 1rem;
    border-radius: 0.8rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #ffffff;
    background-color: #4272ec;
`;

const CommStyleTag = styled.span`
    padding: 0.5rem 1rem;
    border-radius: 0.8rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #ffffff;
    background-color: #22c55e;
`;

// Cards
const CardShowcase = styled.div`
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    margin-bottom: 4rem;
    flex-wrap: wrap;
`;

const CardSpec = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    min-width: 250px;
`;

const DuoCard = styled.div`
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    padding: 1.2rem 1.5rem;
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            transform: translateY(-0.2rem);
        }
    }
`;

const DuoCardTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const DuoProfile = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const ProfileImage = styled.div<{ $size?: 'large' }>`
    width: ${({ $size }) => ($size === 'large' ? '56px' : '40px')};
    height: ${({ $size }) => ($size === 'large' ? '56px' : '40px')};
    border-radius: 50%;
    background-color: #3f3f41;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const ProfileName = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
`;

const ProfileDesc = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const RankBadge = styled.span`
    background-color: #3f3f41;
    padding: 0.3rem 0.8rem;
    border-radius: 0.6rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
`;

const DuoCardBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const GameIcon = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 0.4rem;
    background-color: #3f3f41;
`;

const MentorCard = styled.div`
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
    padding: 2rem;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
            transform: translateY(-0.2rem);
        }
    }
`;

const MentorName = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
`;

const MentorRating = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 1.2rem;
    color: #ffffff;

    .reviews {
        color: #939393;
    }
`;

const MentorDesc = styled.p`
    font-size: 1.2rem;
    color: #939393;
    text-align: center;
`;

const CommunityCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.8rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
    width: 100%;
    max-width: 400px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const CommunityContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CommunityMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.1rem;
    color: #939393;
`;

const CommunityTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 500;
    color: #ffffff;
`;

const CommunityFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    color: #939393;
`;

const CommunityThumbnail = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 1.2rem;
    background-color: #3f3f41;
    flex-shrink: 0;
`;

const ChatCard = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.6rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
    width: 100%;
    max-width: 400px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: #252527;
        }
    }
`;

const ChatGameIcon = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 0.6rem;
    background-color: #3f3f41;
`;

const ChatProfile = styled.div`
    position: relative;
`;

const OnlineIndicator = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: #22c55e;
    border: 2px solid #1a1a1a;
`;

const ChatContent = styled.div`
    flex: 1;
    min-width: 0;
`;

const ChatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
`;

const ChatName = styled.span`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
`;

const ChatTime = styled.span`
    font-size: 1.1rem;
    color: #939393;
`;

const ChatMessage = styled.p`
    font-size: 1.3rem;
    color: #939393;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const UnreadBadge = styled.span`
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.6rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Spacing
const SpacingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
`;

const SpacingItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background-color: #252527;
    border-radius: 1rem;
    padding: 1.5rem;
`;

const SpacingVisual = styled.div<{ $size: string }>`
    width: ${({ $size }) => $size};
    height: 2rem;
    background-color: #4272ec;
    border-radius: 0.2rem;
    min-width: 4px;
`;

const SpacingInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;

const SpacingValue = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
`;

const SpacingUsage = styled.span`
    font-size: 1.3rem;
    color: #939393;
`;

const RadiusGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
`;

const RadiusItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background-color: #252527;
    border-radius: 1rem;
    padding: 1.5rem;
`;

const RadiusVisual = styled.div<{ $radius: string }>`
    width: 4rem;
    height: 4rem;
    background-color: #4272ec;
    border-radius: ${({ $radius }) => $radius};
`;

// Components
const ComponentList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
`;

const ComponentItem = styled.div`
    background-color: #252527;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    border: 1px solid #3f3f41;
    transition: border-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            border-color: #4272ec;
        }
    }
`;

const ComponentName = styled.span`
    font-size: 1.6rem;
    font-weight: 600;
    color: #4272ec;
`;

const ComponentDesc = styled.span`
    font-size: 1.4rem;
    color: #ffffff;
`;
