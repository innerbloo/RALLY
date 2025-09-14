'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

import styled from '@emotion/styled';

function LayoutContent({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const step = searchParams.get('step');
    const isStep3 = step === '3';

    return (
        <TutorialLayout>
            <TutorialSkip>
                {!isStep3 && <Link href={'/'}>Skip</Link>}
            </TutorialSkip>
            <TutorialContent>{children}</TutorialContent>
        </TutorialLayout>
    );
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={null}>
            <LayoutContent>{children}</LayoutContent>
        </Suspense>
    );
}

const TutorialLayout = styled.div`
    height: 100dvh;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const TutorialSkip = styled.div`
    display: flex;
    justify-content: flex-end;
    min-height: 2.4rem;
`;

const TutorialContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
