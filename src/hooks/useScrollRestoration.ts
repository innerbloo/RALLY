'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollPosition {
    scrollY: number;
    timestamp: number;
}

/**
 * 브라우저 뒤로가기 시 스크롤 위치를 복원하는 Hook
 *
 * 동작:
 * - 페이지 진입 시: Session Storage에서 이전 스크롤 위치 복원
 * - 페이지 떠날 때: 현재 스크롤 위치 저장
 * - 쿼리 파라미터는 무시하고 pathname만 사용
 *
 * 사용 예시:
 * useScrollRestoration();
 */
export function useScrollRestoration() {
    const pathname = usePathname();
    const restoredRef = useRef(false);

    // Session Storage 키 생성 (쿼리 파라미터 제외)
    const getStorageKey = (path: string): string => {
        return `scroll_${path}`;
    };

    // 스크롤 위치 저장
    const saveScrollPosition = (path: string) => {
        if (typeof window === 'undefined') return;

        const position: ScrollPosition = {
            scrollY: window.scrollY,
            timestamp: Date.now(),
        };

        try {
            sessionStorage.setItem(
                getStorageKey(path),
                JSON.stringify(position),
            );
        } catch (error) {
            // Session Storage 용량 초과 시 오래된 항목 정리
            clearOldScrollPositions();
        }
    };

    // 스크롤 위치 복원
    const restoreScrollPosition = (path: string) => {
        if (typeof window === 'undefined') return;

        try {
            const saved = sessionStorage.getItem(getStorageKey(path));
            if (!saved) return;

            const position: ScrollPosition = JSON.parse(saved);

            // 30분 이상 지난 데이터는 무시
            const maxAge = 30 * 60 * 1000; // 30분
            if (Date.now() - position.timestamp > maxAge) {
                sessionStorage.removeItem(getStorageKey(path));
                return;
            }

            // 스크롤 복원 (약간의 딜레이로 레이아웃 시프트 방지)
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: position.scrollY,
                    behavior: 'instant' as ScrollBehavior,
                });
                restoredRef.current = true;
            });
        } catch (error) {
            console.error('Failed to restore scroll position:', error);
        }
    };

    // 오래된 스크롤 위치 정리
    const clearOldScrollPositions = () => {
        if (typeof window === 'undefined') return;

        const maxAge = 30 * 60 * 1000; // 30분
        const now = Date.now();

        try {
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (!key?.startsWith('scroll_')) continue;

                const saved = sessionStorage.getItem(key);
                if (!saved) continue;

                const position: ScrollPosition = JSON.parse(saved);
                if (now - position.timestamp > maxAge) {
                    sessionStorage.removeItem(key);
                }
            }
        } catch (error) {
            console.error('Failed to clear old scroll positions:', error);
        }
    };

    // pathname 변경 시 스크롤 위치 복원
    useEffect(() => {
        // 페이지 진입 시 스크롤 복원
        if (!restoredRef.current) {
            restoreScrollPosition(pathname);
        }

        // 페이지 떠날 때 스크롤 위치 저장
        return () => {
            saveScrollPosition(pathname);
        };
    }, [pathname]);

    // 스크롤 이벤트 감지하여 주기적으로 저장 (옵션)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            // 디바운스로 성능 최적화
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                saveScrollPosition(pathname);
            }, 200);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    // 컴포넌트 마운트 시 오래된 항목 정리
    useEffect(() => {
        clearOldScrollPositions();
    }, []);
}
