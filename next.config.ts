import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    experimental: {
        // 개발 중에만 표시되는 요소들 비활성화
        optimizePackageImports: ['react-icons'],
    },
    // 프로덕션에서 개발도구 비활성화
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    },
};

export default nextConfig;
