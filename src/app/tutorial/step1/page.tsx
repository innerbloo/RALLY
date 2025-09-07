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
                    src={'/tutorial1.png'}
                    width={200}
                    height={200}
                    alt={'튜토리얼 이미지1'}
                />
                <p>정교한 매칭 시스템</p>
                <span>
                    게임 성향과 플레이 스타일 기반으로
                    <br />잘 맞는 듀오를 추천해드려요.
                </span>
            </div>
            <div>
                <Indicator active={1} />
                <CommonButton
                    onClick={() => {
                        router.push('/tutorial/step2');
                    }}
                >
                    다음
                </CommonButton>
            </div>
        </>
    );
}
