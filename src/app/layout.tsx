import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';

import './globals.css';

import ClientLayout from '@/components/ClientLayout';
import GNB from '@/components/GNB';

const pretendard = localFont({
    src: '../fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: 'Rally - 듀오 매칭의 새로운 기준',
    description: '실시간 듀오 매칭 서비스',
    manifest: '/manifest.json',
    openGraph: {
        title: 'Rally - 듀오 매칭의 새로운 기준',
        description: '실시간 듀오 매칭 서비스',
        url: 'https://rally.com',
        siteName: 'Rally',
        images: [
            {
                url: '/og_image.png',
                width: 1200,
                height: 630,
                alt: 'Rally - 듀오 매칭의 새로운 기준',
            },
        ],
        locale: 'ko_KR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rally - 듀오 매칭의 새로운 기준',
        description: '실시간 듀오 매칭 서비스',
        images: ['/og_image.png'],
    },
    other: {
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'apple-mobile-web-app-title': 'Rally',
        'theme-color': '#000000',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    interactiveWidget: 'overlays-content',
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body
                className={`${pretendard.variable} font-sans antialiased`}
                style={{ fontFamily: 'var(--font-pretendard)' }}
            >
                <ClientLayout>{children}</ClientLayout>
                <Toaster
                    position="top-center"
                    gutter={8}
                    containerStyle={{
                        top: 'calc(env(safe-area-inset-top) + 20px)',
                    }}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background:
                                'linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%)',
                            color: '#ffffff',
                            borderRadius: '16px',
                            padding: '16px 24px',
                            fontSize: '15px',
                            fontWeight: '600',
                            border: 'none',
                            boxShadow:
                                '0 8px 32px rgba(66, 114, 236, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(10px)',
                            minWidth: '280px',
                            textAlign: 'center',
                        },
                        success: {
                            iconTheme: {
                                primary: '#ffffff',
                                secondary: '#4272ec',
                            },
                        },
                        error: {
                            style: {
                                background:
                                    'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: '#ffffff',
                                boxShadow:
                                    '0 8px 32px rgba(239, 68, 68, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)',
                            },
                            iconTheme: {
                                primary: '#ffffff',
                                secondary: '#ef4444',
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}
