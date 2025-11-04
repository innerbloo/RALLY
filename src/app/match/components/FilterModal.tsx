'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import StyleFilter from './StyleFilter';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedFilters: string[];
    onApply: (filters: string[]) => void;
}

export default function FilterModal({
    isOpen,
    onClose,
    selectedFilters,
    onApply,
}: FilterModalProps) {
    const [tempFilters, setTempFilters] = useState<string[]>(selectedFilters);

    // 모달이 열릴 때 현재 필터를 temp에 복사
    useEffect(() => {
        if (isOpen) {
            setTempFilters(selectedFilters);
        }
    }, [isOpen, selectedFilters]);

    // ESC 키로 닫기
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // 모달 열릴 때 body 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleApply = () => {
        onApply(tempFilters);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={handleOverlayClick} $isOpen={isOpen}>
            <ModalSheet $isOpen={isOpen}>
                <DragHandle />

                <ModalHeader>
                    <ModalTitle>성향 및 커뮤니케이션 필터</ModalTitle>
                </ModalHeader>

                <ModalContent>
                    <StyleFilter
                        selectedFilters={tempFilters}
                        onFilterChange={setTempFilters}
                        isInModal={true}
                    />
                </ModalContent>

                <ModalFooter>
                    <ApplyButton onClick={handleApply}>
                        적용
                        {tempFilters.length > 0 && (
                            <span> ({tempFilters.length}개)</span>
                        )}
                    </ApplyButton>
                </ModalFooter>
            </ModalSheet>
        </ModalOverlay>
    );
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    animation: ${({ $isOpen }) => ($isOpen ? 'fadeIn' : 'fadeOut')} 0.3s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

const ModalSheet = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 430px;
    width: 100%;
    max-height: 80vh;
    background: #1a1a1a;
    border-radius: 2.4rem 2.4rem 0 0;
    box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.5);
    animation: ${({ $isOpen }) => ($isOpen ? 'slideUp' : 'slideDown')} 0.3s ease;
    display: flex;
    flex-direction: column;

    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100%);
        }
        to {
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
        }
        to {
            transform: translateX(-50%) translateY(100%);
        }
    }
`;

const DragHandle = styled.div`
    width: 4rem;
    height: 0.4rem;
    background: #3f3f41;
    border-radius: 0.2rem;
    margin: 1.2rem auto 0.8rem;
    cursor: grab;
`;

const ModalHeader = styled.div`
    padding: 1.5rem 2rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const ModalTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
`;

const ModalContent = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 2rem;

    /* 스크롤바 숨기기 */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ModalFooter = styled.div`
    padding: 1.5rem 2rem calc(1.5rem + env(safe-area-inset-bottom));
    border-top: 0.1rem solid #3f3f41;
    background: #1a1a1a;

    /* PWA 모드에서는 하단 safe-area 무시 */
    @media (display-mode: standalone) {
        padding: 1.5rem 2rem 1.5rem;
    }
`;

const ApplyButton = styled.button`
    width: 100%;
    padding: 1.6rem;
    font-size: 1.6rem;
    font-weight: 600;
    background: linear-gradient(135deg, #4272ec 0%, #3a5fd9 100%);
    color: #ffffff;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 114, 236, 0.4);
        }
    }

    &:active {
        transform: translateY(0);
    }
`;
