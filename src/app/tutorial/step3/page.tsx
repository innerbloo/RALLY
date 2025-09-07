'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Indicator from '@/components/tutorial/Indicator';
import { CommonButton } from '@/styles/button';

export default function Page() {
    const router = useRouter();

    return (
        <>
            <div>
                <Image
                    src={'/tutorial3.png'}
                    width={200}
                    height={200}
                    alt={'튜토리얼 이미지3'}
                />
                <p>게임별 커뮤니티</p>
                <span>
                    게임별 전용 공간에서
                    <br />
                    전략도 소통도 자유롭게.
                </span>
            </div>
            <div>
                <Indicator active={3} />
                <CommonButton
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    시작
                </CommonButton>
            </div>
        </>
    );
}
