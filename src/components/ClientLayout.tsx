'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import GNB from '@/components/GNB';
import Header from '@/components/Header';
import { QuickMatchProvider } from '@/contexts/QuickMatchContext';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();

    // 튜토리얼 페이지에서는 Header와 GNB 숨김
    const hideNavigation = pathname.startsWith('/tutorial');

    // 2depth 이상 페이지 체크
    const isDeepPage = pathname.split('/').filter(Boolean).length > 1;

    // Viewport 높이 동적 추적 (모바일 브라우저 UI 대응)
    useEffect(() => {
        // 실제 viewport 높이를 CSS 변수로 저장
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            // 모바일 브라우저 UI 높이 계산
            const visualHeight = window.visualViewport?.height || window.innerHeight;
            const browserUIHeight = window.innerHeight - visualHeight;
            document.documentElement.style.setProperty('--browser-ui-height', `${browserUIHeight}px`);
        };

        // 초기 설정
        setViewportHeight();

        // viewport 변화 감지
        const handleResize = () => {
            setViewportHeight();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
        window.visualViewport?.addEventListener('resize', handleResize);

        // 스크롤 시에도 체크 (모바일 브라우저 UI 숨김/표시)
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(setViewportHeight, 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            window.visualViewport?.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    // 입력창 포커스 시 스크롤 고정 (모바일 키보드 대응) - 비활성화됨
    // 이 로직은 포커스 아웃 후 스크롤 문제를 일으켜 주석 처리
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollY = window.scrollY;

    //         // 디버그 정보 업데이트
    //         setDebugInfo({
    //             scrollY: currentScrollY,
    //             viewportHeight: window.innerHeight,
    //             visualViewportHeight: window.visualViewport?.height || 0,
    //         });

    //         if (isInputFocused) {
    //             if (!initialScrollYRef.current) {
    //                 initialScrollYRef.current = currentScrollY;
    //             } else if (currentScrollY > initialScrollYRef.current) {
    //                 window.scrollTo(0, initialScrollYRef.current);
    //             }
    //         } else {
    //             initialScrollYRef.current = 0;
    //         }
    //     };

    //     // 초기값 설정
    //     handleScroll();

    //     window.visualViewport?.addEventListener('resize', handleScroll);
    //     window.addEventListener('scroll', handleScroll, { passive: true });

    //     return () => {
    //         window.visualViewport?.removeEventListener('resize', handleScroll);
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [isInputFocused]);

    return (
        <QuickMatchProvider>
            {!hideNavigation && <Header />}
            {children}
            {!hideNavigation && !isDeepPage && <GNB />}
        </QuickMatchProvider>
    );
}
