'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import styled from '@emotion/styled';

import CommunityList from '@/app/components/CommunityList';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface CommunityPost {
    id: number;
    image: string;
    username: string;
    title: string;
    createAt: string;
    comment: number;
    game: string;
    category: string;
}

interface UserComment {
    postId: number;
    postTitle: string;
    comment: string;
    createAt: string;
}

interface ActivityTabsProps {
    myPosts: CommunityPost[];
    likedPosts: CommunityPost[];
    myComments: UserComment[];
}

type TabType = 'posts' | 'likes' | 'comments';

export default function ActivityTabs({
    myPosts,
    likedPosts,
    myComments,
}: ActivityTabsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('posts');

    return (
        <TabContainer>
            <SectionTitle>활동 내역</SectionTitle>

            <TabButtons>
                <TabButton
                    $active={activeTab === 'posts'}
                    onClick={() => setActiveTab('posts')}
                >
                    게시글 ({myPosts.length})
                </TabButton>
                <TabButton
                    $active={activeTab === 'likes'}
                    onClick={() => setActiveTab('likes')}
                >
                    좋아요 ({likedPosts.length})
                </TabButton>
                <TabButton
                    $active={activeTab === 'comments'}
                    onClick={() => setActiveTab('comments')}
                >
                    댓글 ({myComments.length})
                </TabButton>
            </TabButtons>

            <TabContent>
                {activeTab === 'posts' && (
                    <>
                        {myPosts.length > 0 ? (
                            <CommunityList list={myPosts} />
                        ) : (
                            <EmptyState>
                                <EmptyIcon>📝</EmptyIcon>
                                <EmptyText>작성한 게시글이 없습니다.</EmptyText>
                            </EmptyState>
                        )}
                    </>
                )}

                {activeTab === 'likes' && (
                    <>
                        {likedPosts.length > 0 ? (
                            <CommunityList list={likedPosts} />
                        ) : (
                            <EmptyState>
                                <EmptyIcon>❤️</EmptyIcon>
                                <EmptyText>좋아요한 게시글이 없습니다.</EmptyText>
                            </EmptyState>
                        )}
                    </>
                )}

                {activeTab === 'comments' && (
                    <>
                        {myComments.length > 0 ? (
                            <CommentList>
                                {myComments.map((comment, index) => (
                                    <CommentItem key={index}>
                                        <CommentPostTitle>
                                            {comment.postTitle}
                                        </CommentPostTitle>
                                        <CommentText>
                                            {comment.comment}
                                        </CommentText>
                                        <CommentDate>
                                            {dayjs(comment.createAt).fromNow()}
                                        </CommentDate>
                                    </CommentItem>
                                ))}
                            </CommentList>
                        ) : (
                            <EmptyState>
                                <EmptyIcon>💬</EmptyIcon>
                                <EmptyText>작성한 댓글이 없습니다.</EmptyText>
                            </EmptyState>
                        )}
                    </>
                )}
            </TabContent>
        </TabContainer>
    );
}

const TabContainer = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 1.2rem;
    padding: 0 0.5rem;
`;

const TabButtons = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.6rem;
    border-bottom: 0.1rem solid #3f3f41;
`;

const TabButton = styled.button<{ $active: boolean }>`
    padding: 1.2rem 1.6rem;
    font-size: 1.5rem;
    font-weight: ${({ $active }) => ($active ? '600' : '400')};
    color: ${({ $active }) => ($active ? '#4272ec' : '#939393')};
    background-color: transparent;
    border: none;
    border-bottom: 0.2rem solid
        ${({ $active }) => ($active ? '#4272ec' : 'transparent')};
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: -0.1rem;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            color: #4272ec;
        }
    }
`;

const TabContent = styled.div``;

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CommentItem = styled.div`
    padding: 1.6rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.2rem;
`;

const CommentPostTitle = styled.h4`
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 0.8rem;
`;

const CommentText = styled.p`
    font-size: 1.4rem;
    color: #e0e0e0;
    line-height: 1.5;
    margin: 0 0 0.8rem;
`;

const CommentDate = styled.span`
    font-size: 1.2rem;
    color: #939393;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    background-color: #252527;
    border: 0.1rem solid #3f3f41;
    border-radius: 1.6rem;
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
`;

const EmptyText = styled.p`
    font-size: 1.5rem;
    color: #939393;
    margin: 0;
`;
