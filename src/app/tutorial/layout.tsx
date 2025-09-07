'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import styled from '@emotion/styled';

export default function Layout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    console.log(pathname);

    return (
        <TutorialLayout>
            <TutorialSkip>
                <Link href={'/'}>Skip</Link>
            </TutorialSkip>
            <TutorialContent>
                <TutorialWrapper>{children}</TutorialWrapper>
            </TutorialContent>
        </TutorialLayout>
    );
}

const TutorialLayout = styled.div`
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const TutorialSkip = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0 0 4.5rem;
`;

const TutorialContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const TutorialWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    p {
        font-size: 2.4rem;
        font-weight: 700;
        margin: 0 0 1.2rem;
    }

    span {
        text-align: center;
        color: #d6d6d6;
    }

    > div:first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    > div:last-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding-bottom: 2rem;
    }
`;
