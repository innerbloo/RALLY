'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

/**
 * URL 쿼리 파라미터를 관리하는 Hook (클라이언트 전용)
 *
 * 사용 예시:
 * const { getParam, updateParams } = useQueryParams();
 *
 * // 파라미터 읽기
 * const game = getParam('game') || '전체';
 *
 * // 파라미터 업데이트 (여러 개 동시 가능)
 * updateParams({ game: '리그오브레전드', search: '홍길동' });
 *
 * // 파라미터 삭제 (undefined나 빈 문자열 전달)
 * updateParams({ game: undefined });
 */
export function useQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchParams, setSearchParams] = useState<URLSearchParams>(
        new URLSearchParams(),
    );

    // 클라이언트에서만 URL 파라미터 초기화
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSearchParams(new URLSearchParams(window.location.search));
        }
    }, []);

    /**
     * 특정 파라미터 값 가져오기
     */
    const getParam = useCallback(
        (key: string): string | null => {
            if (typeof window === 'undefined') return null;
            const params = new URLSearchParams(window.location.search);
            return params.get(key);
        },
        [],
    );

    /**
     * 여러 파라미터를 동시에 업데이트
     * - value가 undefined나 빈 문자열이면 해당 파라미터 삭제
     * - 기존 파라미터는 유지하고 업데이트된 것만 변경
     */
    const updateParams = useCallback(
        (updates: Record<string, string | undefined | null>) => {
            if (typeof window === 'undefined') return;

            const current = new URLSearchParams(window.location.search);

            Object.entries(updates).forEach(([key, value]) => {
                if (value === undefined || value === null || value === '') {
                    current.delete(key);
                } else {
                    current.set(key, value);
                }
            });

            const queryString = current.toString();
            const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(newUrl, { scroll: false });
            setSearchParams(current);
        },
        [pathname, router],
    );

    /**
     * 모든 파라미터 초기화
     */
    const clearParams = useCallback(() => {
        if (typeof window === 'undefined') return;
        router.push(pathname, { scroll: false });
        setSearchParams(new URLSearchParams());
    }, [pathname, router]);

    return {
        getParam,
        updateParams,
        clearParams,
        searchParams,
    };
}
