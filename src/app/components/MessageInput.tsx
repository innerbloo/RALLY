'use client';

import { Send } from 'lucide-react';
import { forwardRef, KeyboardEvent, MouseEvent, TouchEvent, useState } from 'react';

import styled from '@emotion/styled';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
}

const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(
    ({ onSendMessage }, ref) => {
        const [message, setMessage] = useState('');
        const [isComposing, setIsComposing] = useState(false);

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleButtonMouseDown = (e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
        // iOS에서 버튼 클릭 시 input blur 방지
        e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // 한글 입력 중(조합 중)일 때는 Enter 키를 무시
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault();
            handleSend();
        }
    };

        return (
            <InputContainer>
                <InputWrapper>
                    <MessageTextarea
                        ref={ref}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                        placeholder="메시지를 입력하세요..."
                        rows={1}
                        maxLength={500}
                    />
                    <SendButton
                        onClick={handleSend}
                        onMouseDown={handleButtonMouseDown}
                        onTouchStart={handleButtonMouseDown}
                        disabled={!message.trim()}
                        $hasContent={!!message.trim()}
                    >
                        <Send size={20} />
                    </SendButton>
                </InputWrapper>
            </InputContainer>
        );
    },
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;

const InputContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 800px;
    width: 100%;
    background-color: #1a1a1a;
    border-top: 0.1rem solid #3f3f41;
    padding: 1.2rem 2rem;
    padding-bottom: calc(1.2rem + env(safe-area-inset-bottom));
    z-index: 999;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 2.4rem;
    padding: 1rem 1.6rem;
    transition: border-color 0.2s ease;

    &:focus-within {
        border-color: #4272ec;
    }
`;

const MessageTextarea = styled.textarea`
    height: 3.6rem;
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 1.5rem;
    line-height: 1.5;
    resize: none;
    min-height: 2.4rem;
    max-height: 12rem;
    overflow-y: auto;
    font-family: inherit;

    &::placeholder {
        color: #6b6b6b;
    }

    &::-webkit-scrollbar {
        width: 0.4rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #3f3f41;
        border-radius: 0.2rem;
    }
`;

const SendButton = styled.button<{ $hasContent: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
    height: 3.6rem;
    background: ${({ $hasContent }) =>
        $hasContent
            ? 'linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%)'
            : '#3f3f41'};
    border: none;
    border-radius: 50%;
    color: ${({ $hasContent }) => ($hasContent ? '#ffffff' : '#6b6b6b')};
    cursor: ${({ $hasContent }) => ($hasContent ? 'pointer' : 'not-allowed')};
    flex-shrink: 0;
    transition: all 0.2s ease;

    &:disabled {
        cursor: not-allowed;
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
            transform: scale(1.05);
        }
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }
`;
