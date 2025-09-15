'use client';

import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

interface MatchUser {
    id: number;
    profileImage: string;
    username: string;
    gameId: string;
    position?: React.ReactNode;
    tier: string;
    rank: string;
    winRate: number;
    kda: number;
    recentChampions: string[];
    gameStyles: string[];
    communicationStyles: string[];
    description: string;
    game: string;
}

interface SwipeableStackProps {
    users: MatchUser[];
    onSwipe: (user: MatchUser, direction: 'left' | 'right') => void;
    renderCard: (user: MatchUser, index: number) => React.ReactNode;
}

interface DragState {
    isDragging: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    dragX: number;
    dragY: number;
}

export default function SwipeableStack({
    users,
    onSwipe,
    renderCard,
}: SwipeableStackProps) {
    const [dragState, setDragState] = useState<DragState>({
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        dragX: 0,
        dragY: 0,
    });

    const stackRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // 현재 최상위 카드
    const currentUser = users[0];

    // users 배열이 변경될 때 상태 초기화
    useEffect(() => {
        console.log('Users changed:', users.map(u => u.username));
        setIsAnimating(false);
        setDragState({
            isDragging: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            dragX: 0,
            dragY: 0,
        });
    }, [users.length]);

    // 드래그 시작
    const handleStart = (clientX: number, clientY: number) => {
        if (isAnimating || !currentUser) return;

        console.log('Drag started:', { clientX, clientY });
        setDragState({
            isDragging: true,
            startX: clientX,
            startY: clientY,
            currentX: clientX,
            currentY: clientY,
            dragX: 0,
            dragY: 0,
        });
    };

    // 드래그 중
    const handleMove = (clientX: number, clientY: number) => {
        if (!dragState.isDragging || isAnimating) return;

        const dragX = clientX - dragState.startX;
        const dragY = clientY - dragState.startY;

        console.log('handleMove:', { clientX, clientY, startX: dragState.startX, startY: dragState.startY, dragX, dragY });

        setDragState((prev) => ({
            ...prev,
            currentX: clientX,
            currentY: clientY,
            dragX,
            dragY,
        }));
    };

    // 드래그 종료
    const handleEnd = () => {
        console.log('handleEnd called:', { isDragging: dragState.isDragging, isAnimating, currentUser: !!currentUser });

        if (!dragState.isDragging || isAnimating || !currentUser) return;

        const { dragX, dragY } = dragState;
        const threshold = 10; // 스와이프 인식 최소 거리 (더 민감하게)

        let shouldSwipe = false;
        let direction: 'left' | 'right' | null = null;

        // 디버깅용 로그
        console.log('Swipe debug:', { dragX, dragY, threshold });

        // 단순한 조건: 수평 이동이 임계값을 넘으면 스와이프
        if (dragX > threshold) {
            shouldSwipe = true;
            direction = 'right';
            console.log('Swipe detected: RIGHT, dragX:', dragX);
        } else if (dragX < -threshold) {
            shouldSwipe = true;
            direction = 'left';
            console.log('Swipe detected: LEFT, dragX:', dragX);
        } else {
            console.log('Swipe rejected: insufficient movement, dragX:', dragX, 'threshold:', threshold);
        }

        console.log('Final check:', { shouldSwipe, direction });

        if (shouldSwipe && direction) {
            console.log('Calling animateSwipeOut with direction:', direction);
            // 스와이프 애니메이션
            animateSwipeOut(direction);
        } else {
            // 원래 위치로 돌아가기
            animateReturn();
        }
    };

    // 스와이프 아웃 애니메이션
    const animateSwipeOut = (direction: 'left' | 'right') => {
        if (!currentUser) return;

        setIsAnimating(true);
        const targetX =
            direction === 'right' ? window.innerWidth : -window.innerWidth;
        const targetRotation = direction === 'right' ? 30 : -30;

        const startTime = Date.now();
        const duration = 300;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOut 곡선
            const eased = 1 - Math.pow(1 - progress, 3);

            const currentX =
                dragState.dragX + (targetX - dragState.dragX) * eased;
            const currentRotation =
                dragState.dragX * 0.1 +
                (targetRotation - dragState.dragX * 0.1) * eased;

            setDragState((prev) => ({
                ...prev,
                dragX: currentX,
                dragY: prev.dragY * (1 - eased),
            }));

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                // 애니메이션 완료
                setIsAnimating(false);
                setDragState({
                    isDragging: false,
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    dragX: 0,
                    dragY: 0,
                });
                onSwipe(currentUser, direction);
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    };

    // 원래 위치로 돌아가는 애니메이션
    const animateReturn = () => {
        setIsAnimating(true);
        const startTime = Date.now();
        const duration = 250;
        const startX = dragState.dragX;
        const startY = dragState.dragY;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOut 곡선
            const eased = 1 - Math.pow(1 - progress, 3);

            const currentX = startX * (1 - eased);
            const currentY = startY * (1 - eased);

            setDragState((prev) => ({
                ...prev,
                dragX: currentX,
                dragY: currentY,
            }));

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                // 애니메이션 완료
                setIsAnimating(false);
                setDragState({
                    isDragging: false,
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    dragX: 0,
                    dragY: 0,
                });
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    };

    // 마우스 이벤트 핸들러
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
        handleEnd();
    };

    // 터치 이벤트 핸들러
    const handleTouchStart = (e: React.TouchEvent) => {
        console.log('Touch start');
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault(); // 스크롤 방지
        const touch = e.touches[0];
        if (touch) {
            handleMove(touch.clientX, touch.clientY);
        }
    };

    const handleTouchEnd = () => {
        console.log('Touch end');
        handleEnd();
    };

    // 이벤트 리스너 설정
    useEffect(() => {
        if (dragState.isDragging) {
            console.log('Adding event listeners');
            // 마우스 이벤트
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            // 터치 이벤트 (passive: false로 preventDefault 가능하게)
            document.addEventListener('touchmove', handleTouchMove, {
                passive: false,
            });
            document.addEventListener('touchend', handleTouchEnd);

            return () => {
                console.log('Removing event listeners');
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [dragState.isDragging]);

    // 컴포넌트 언마운트 시 애니메이션 정리
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    if (!currentUser) {
        return <StackContainer ref={stackRef} />;
    }

    console.log('SwipeableStack render - users.length:', users.length);
    console.log('SwipeableStack render - currentUser:', currentUser?.username);
    console.log('SwipeableStack render - dragState:', dragState);

    return (
        <StackContainer ref={stackRef}>
            {users.slice(0, 3).map((user, index) => {
                const uniqueKey = `${user.id}-${users.length}-${index}`;
                console.log('Rendering card:', { userId: user.id, username: user.username, index, key: uniqueKey });

                const cardProps = {
                    key: uniqueKey,
                    index,
                    isDragging: index === 0 ? dragState.isDragging : false,
                    dragX: index === 0 ? dragState.dragX : 0,
                    dragY: index === 0 ? dragState.dragY : 0,
                    onMouseDown: index === 0 ? handleMouseDown : undefined,
                    onTouchStart: index === 0 ? handleTouchStart : undefined,
                };

                console.log('Card props for index', index, ':', {
                    ...cardProps,
                    onMouseDown: cardProps.onMouseDown ? 'function' : undefined,
                    onTouchStart: cardProps.onTouchStart ? 'function' : undefined,
                });

                const renderedCard = renderCard(user, index);
                console.log('renderCard result:', renderedCard);

                return React.cloneElement(
                    renderedCard as React.ReactElement,
                    cardProps,
                );
            })}
        </StackContainer>
    );
}

const StackContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    overflow: hidden;
`;
