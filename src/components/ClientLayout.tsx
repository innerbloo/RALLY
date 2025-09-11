'use client';

import { usePathname } from 'next/navigation';

import GNB from '@/components/GNB';

interface ClientLayoutProps {
    children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();
    
    // 튜토리얼 페이지에서는 GNB 숨김
    const hideGNB = pathname.startsWith('/tutorial');

    return (
        <>
            {children}
            {!hideGNB && <GNB />}
        </>
    );
}