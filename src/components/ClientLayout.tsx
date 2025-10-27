'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import GNB from '@/components/GNB';
import Header from '@/components/Header';
import { QuickMatchProvider } from '@/contexts/QuickMatchContext';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [initialScrollY, setInitialScrollY] = useState(0);

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

    // 입력창 포커스 시 스크롤 고정 (모바일 키보드 대응)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (isInputFocused) {
                if (initialScrollY === 0) {
                    setInitialScrollY(currentScrollY);
                } else if (currentScrollY > initialScrollY) {
                    window.scrollTo(0, initialScrollY);
                }
            } else {
                setInitialScrollY(0);
            }
        };

        window.visualViewport?.addEventListener('resize', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.visualViewport?.removeEventListener('resize', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isInputFocused, initialScrollY]);

    return (
        <QuickMatchProvider>
            {!hideNavigation && <Header />}
            {children}
            {!hideNavigation && !isDeepPage && <GNB />}
        </QuickMatchProvider>
    );
}
