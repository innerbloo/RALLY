'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

const SidebarContainer = styled.aside`
    display: none;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: calc((100vw - 500px) / 2);
        background: #1f1f21;
        padding: 40px;
        z-index: 100;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    max-width: 320px;
`;

const LogoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const AppIconWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(66, 114, 236, 0.3);
`;

const BrandText = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const Tagline = styled.p`
    font-size: 15px;
    color: #939393;
    text-align: center;
    margin: 0;
    line-height: 1.5;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
`;

const DownloadButton = styled.a<{ $variant: 'apple' | 'google' }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 12px;
    border-radius: 12px;
    background: ${({ $variant }) =>
        $variant === 'apple' ? '#ffffff' : 'transparent'};
    border: 1px solid
        ${({ $variant }) => ($variant === 'apple' ? '#ffffff' : '#3f3f41')};
    color: ${({ $variant }) => ($variant === 'apple' ? '#000000' : '#ffffff')};
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    width: 300px;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-2px);
            box-shadow: ${({ $variant }) =>
                $variant === 'apple'
                    ? '0 8px 24px rgba(255, 255, 255, 0.2)'
                    : '0 8px 24px rgba(66, 114, 236, 0.3)'};
            border-color: ${({ $variant }) =>
                $variant === 'apple' ? '#ffffff' : '#4272ec'};
        }
    }

    &:active {
        transform: scale(0.98);
    }
`;

const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
`;

const QRSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
`;

const QRLabel = styled.span`
    font-size: 13px;
    color: #6b6b6b;
`;

const QRImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
`;

export default function AppDownloadBanner() {
    return (
        <SidebarContainer>
            <ContentWrapper>
                <LogoSection>
                    <AppIconWrapper>
                        <Image
                            src="/symbol-b.png"
                            alt="Rally App Icon"
                            width={80}
                            height={80}
                            style={{ objectFit: 'cover' }}
                        />
                    </AppIconWrapper>
                    <BrandText>Rally</BrandText>
                    <Tagline>
                        듀오 매칭의 새로운 기준
                        <br />
                        지금 바로 시작하세요
                    </Tagline>
                </LogoSection>

                <ButtonGroup>
                    <DownloadButton
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toast('앱 출시는 준비 중이에요!', {
                                id: 'app-store',
                            });
                        }}
                        $variant="apple"
                    >
                        <IconWrapper>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                        </IconWrapper>
                        App Store
                    </DownloadButton>
                    <DownloadButton
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toast('앱 출시는 준비 중이에요!', {
                                id: 'google-play',
                            });
                        }}
                        $variant="google"
                    >
                        <IconWrapper>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                            </svg>
                        </IconWrapper>
                        Google Play
                    </DownloadButton>
                </ButtonGroup>

                <QRSection>
                    <QRLabel>QR 코드로 다운로드</QRLabel>
                    <QRImageWrapper>
                        <Image
                            src="/qr.png"
                            alt="QR 코드"
                            width={100}
                            height={100}
                        />
                    </QRImageWrapper>
                </QRSection>
            </ContentWrapper>
        </SidebarContainer>
    );
}
