'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import GNB from '@/components/GNB';
import Header from '@/components/Header';
import { QuickMatchProvider } from '@/contexts/QuickMatchContext';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();
    const [isInputFocused, setIsInputFocused] = useState(false);
    const initialScrollYRef = useRef(0);
    const [debugInfo, setDebugInfo] = useState({
        scrollY: 0,
        viewportHeight: 0,
        visualViewportHeight: 0,
    });

    // 브라우저 뒤로가기 시 스크롤 위치 복원
    useScrollRestoration();

    // 튜토리얼 페이지에서는 Header와 GNB 숨김
    const hideNavigation = pathname.startsWith('/tutorial');

    // 2depth 이상 페이지 체크
    const isDeepPage = pathname.split('/').filter(Boolean).length > 1;

    // 모든 input/textarea 포커스 감지
    useEffect(() => {
        const handleFocusIn = (e: FocusEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            ) {
                setIsInputFocused(true);
            }
        };

        const handleFocusOut = (e: FocusEvent) => {
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            ) {
                setIsInputFocused(false);
            }
        };

        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);

        return () => {
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
        };
    }, []);

    // Visual Viewport 높이 고정 (iOS 툴바 변화 방지)
    useEffect(() => {
        const initialHeight =
            window.visualViewport?.height || window.innerHeight;

        const lockViewportHeight = () => {
            if (window.visualViewport) {
                const currentHeight = window.visualViewport.height;
                // Visual Viewport가 줄어들면 강제로 원래 높이로 복원
                if (currentHeight < initialHeight) {
                    document.documentElement.style.height = `${initialHeight}px`;
                    document.body.style.height = `${initialHeight}px`;
                }
            }
        };

        window.visualViewport?.addEventListener('resize', lockViewportHeight);

        return () => {
            window.visualViewport?.removeEventListener(
                'resize',
                lockViewportHeight,
            );
            document.documentElement.style.height = '';
            document.body.style.height = '';
        };
    }, []);

    // 입력창 포커스 시 스크롤 고정 (모바일 키보드 대응)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 디버그 정보 업데이트
            setDebugInfo({
                scrollY: currentScrollY,
                viewportHeight: window.innerHeight,
                visualViewportHeight: window.visualViewport?.height || 0,
            });

            if (isInputFocused) {
                if (!initialScrollYRef.current) {
                    initialScrollYRef.current = currentScrollY;
                } else if (currentScrollY > initialScrollYRef.current) {
                    window.scrollTo(0, initialScrollYRef.current);
                }
            } else {
                initialScrollYRef.current = 0;
            }
        };

        // 초기값 설정
        handleScroll();

        window.visualViewport?.addEventListener('resize', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.visualViewport?.removeEventListener('resize', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isInputFocused]);

    return (
        <QuickMatchProvider>
            {/*<DebugPanel>*/}
            {/*    <DebugTitle>🔍 Scroll Lock Debug</DebugTitle>*/}
            {/*    <DebugItem>*/}
            {/*        <DebugLabel>Input Focused:</DebugLabel>*/}
            {/*        <DebugValue $active={isInputFocused}>*/}
            {/*            {isInputFocused ? '✅ YES' : '❌ NO'}*/}
            {/*        </DebugValue>*/}
            {/*    </DebugItem>*/}
            {/*    <DebugItem>*/}
            {/*        <DebugLabel>Initial ScrollY:</DebugLabel>*/}
            {/*        <DebugValue>{initialScrollYRef.current}px</DebugValue>*/}
            {/*    </DebugItem>*/}
            {/*    <DebugItem>*/}
            {/*        <DebugLabel>Current ScrollY:</DebugLabel>*/}
            {/*        <DebugValue>{debugInfo.scrollY}px</DebugValue>*/}
            {/*    </DebugItem>*/}
            {/*    <DebugItem>*/}
            {/*        <DebugLabel>Window Height:</DebugLabel>*/}
            {/*        <DebugValue>{debugInfo.viewportHeight}px</DebugValue>*/}
            {/*    </DebugItem>*/}
            {/*    <DebugItem>*/}
            {/*        <DebugLabel>Visual Viewport:</DebugLabel>*/}
            {/*        <DebugValue>{debugInfo.visualViewportHeight}px</DebugValue>*/}
            {/*    </DebugItem>*/}
            {/*</DebugPanel>*/}
            {!hideNavigation && <Header />}
            {children}
            {!hideNavigation && !isDeepPage && <GNB />}
        </QuickMatchProvider>
    );
}

const DebugPanel = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    color: #ffffff;
    padding: 1rem;
    font-size: 1.1rem;
    z-index: 9999;
    border-bottom: 2px solid #4272ec;
    font-family: 'Courier New', monospace;
`;

const DebugTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #4272ec;
`;

const DebugItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
    border-bottom: 1px solid #3f3f41;

    &:last-child {
        border-bottom: none;
    }
`;

const DebugLabel = styled.span`
    color: #939393;
`;

const DebugValue = styled.span<{ $active?: boolean }>`
    font-weight: 700;
    color: ${({ $active }) => ($active ? '#22c55e' : '#ffffff')};
`;
