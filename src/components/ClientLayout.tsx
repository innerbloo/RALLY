'use client';

import { usePathname } from 'next/navigation';

import GNB from '@/components/GNB';
import Header from '@/components/Header';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();
    
    // 튜토리얼 페이지에서는 Header와 GNB 숨김
    const hideNavigation = pathname.startsWith('/tutorial');

    return (
        <>
            {!hideNavigation && <Header />}
            {children}
            {!hideNavigation && <GNB />}
        </>
    );
}