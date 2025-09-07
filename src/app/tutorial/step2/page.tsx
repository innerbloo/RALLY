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
                    src={'/tutorial2.png'}
                    width={200}
                    height={200}
                    alt={'튜토리얼 이미지2'}
                />
                <p>멘토-멘티 연결</p>
                <span>
                    초보자와 숙련자를 연결해
                    <br />
                    함께 성장할 수 있어요.
                </span>
            </div>
            <div>
                <Indicator active={2} />
                <CommonButton
                    onClick={() => {
                        router.push('/tutorial/step3');
                    }}
                >
                    다음
                </CommonButton>
            </div>
        </>
    );
}
