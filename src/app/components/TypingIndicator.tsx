'use client';

import styled from '@emotion/styled';

export default function TypingIndicator() {
    return (
        <TypingContainer>
            <Dot $delay={0} />
            <Dot $delay={0.2} />
            <Dot $delay={0.4} />
        </TypingContainer>
    );
}

const TypingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 1.2rem 1.6rem;
    background-color: #252527;
    border-radius: 1.8rem;
    width: fit-content;
`;

const Dot = styled.div<{ $delay: number }>`
    width: 0.8rem;
    height: 0.8rem;
    background-color: #939393;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
    animation-delay: ${({ $delay }) => $delay}s;

    @keyframes typing {
        0%,
        60%,
        100% {
            opacity: 0.3;
            transform: scale(0.8);
        }
        30% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
