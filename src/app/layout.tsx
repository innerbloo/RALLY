import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const pretendard = localFont({
    src: '../fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: 'RALLY',
    description: '실시간 듀오 매칭 서비스',
    manifest: '/manifest.json',
    other: {
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': 'RALLY',
        'theme-color': '#000000',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={`${pretendard.variable} font-sans antialiased`} style={{ fontFamily: 'var(--font-pretendard)' }}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
