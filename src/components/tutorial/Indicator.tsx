'use client';

import styled from '@emotion/styled';

export default function Indicator({ active }: { active: number }) {
    return (
        <Container>
            <Dot isActive={active === 1} />
            <Dot isActive={active === 2} />
            <Dot isActive={active === 3} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin: 2rem 0;
`;

const Dot = styled.div<{ isActive: boolean }>`
    width: ${({ isActive }) => (isActive ? '2.6rem' : '0.8rem')};
    height: 0.8rem;
    border-radius: ${({ isActive }) => (isActive ? '0.6rem' : '50%')};
    background-color: ${({ isActive }) => (isActive ? '#4272EC' : '#E9E9E9')};
    transition: background-color 0.3s ease;
`;
