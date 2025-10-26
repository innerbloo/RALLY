import { useEffect, useRef, useState } from 'react';

export const useDragScroll = <T extends HTMLElement = HTMLDivElement>() => {
    const scrollRef = useRef<T>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragState = useRef({
        startX: 0,
        scrollLeft: 0,
        moved: false,
        isMouseDown: false,
    });

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (!scrollElement) return;
            dragState.current.isMouseDown = true;
            dragState.current.startX = e.pageX - scrollElement.offsetLeft;
            dragState.current.scrollLeft = scrollElement.scrollLeft;
            dragState.current.moved = false;
            scrollElement.style.scrollBehavior = 'auto';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!dragState.current.isMouseDown || !scrollElement) return;

            const x = e.pageX - scrollElement.offsetLeft;
            const walk = (x - dragState.current.startX) * 1.5;

            // 5px 이상 이동하면 드래그로 간주
            if (Math.abs(walk) > 5) {
                if (!dragState.current.moved) {
                    dragState.current.moved = true;
                    setIsDragging(true);
                }
                e.preventDefault();
                scrollElement.scrollLeft = dragState.current.scrollLeft - walk;
            }
        };

        const handleMouseUp = () => {
            dragState.current.isMouseDown = false;
            // 약간의 딜레이 후 isDragging 해제 (클릭 이벤트가 먼저 처리되도록)
            setTimeout(() => {
                setIsDragging(false);
            }, 10);
            if (scrollElement) {
                scrollElement.style.scrollBehavior = '';
            }
        };

        const handleMouseLeave = () => {
            if (!dragState.current.isMouseDown) return;
            dragState.current.isMouseDown = false;
            setIsDragging(false);
            if (scrollElement) {
                scrollElement.style.scrollBehavior = '';
            }
        };

        // 버튼 클릭 이벤트 방지 (드래그로 판단된 경우)
        const handleClick = (e: MouseEvent) => {
            if (dragState.current.moved) {
                e.preventDefault();
                e.stopPropagation();
                dragState.current.moved = false;
            }
        };

        scrollElement.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        scrollElement.addEventListener('mouseleave', handleMouseLeave);
        scrollElement.addEventListener('click', handleClick, true);

        return () => {
            scrollElement.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            scrollElement.removeEventListener('mouseleave', handleMouseLeave);
            scrollElement.removeEventListener('click', handleClick, true);
        };
    }, []);

    return { scrollRef, isDragging };
};
