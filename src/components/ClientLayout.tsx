'use client';

import { usePathname } from 'next/navigation';

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

    return (
        <QuickMatchProvider>
            {!hideNavigation && <Header />}
            {children}
            {!hideNavigation && !isDeepPage && <GNB />}
        </QuickMatchProvider>
    );
}
