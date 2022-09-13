import React, { useEffect } from 'react'
import styled from 'styled-components';
import { postingsAPI } from '../shared/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Loading from '../components/loading/Loading';
import Notice from '../components/notice/Notice';
import { Helmet } from 'react-helmet'
import Header from '../components/header/Header';

const CommentInPost = () => {
    const { ref, inView} = useInView();

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ["commentInPost"],
        ({ pageParam = 0 }) => postingsAPI.fetchCommentInPostListWithScroll(pageParam),
        {
        staleTime:3000,
        getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
        retry:false,
    },
    );

    useEffect(()=> {
    if(inView){
        fetchNextPage();
    } 
    }, [inView])

    console.log(data.pages[0].posts);

    return (
    <CommentInPostWrapper>
    <Helmet>
        <title>IT-ing</title>
        <link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
    </Helmet>
    <Header title="댓글 단 글" isAction={true}/>
        {/* data.pages[0].posts[0].nickname */}
        <CardList>
            <CommentInPostCard>
                <p>댓글 내용</p>
                <p>날짜</p>
                <p>게시글 내용</p>
            </CommentInPostCard>
        </CardList>
        {isFetchingNextPage ? <Loading/>: <div ref={ref} style={{height:"70px"}}></div>}
    </CommentInPostWrapper>
    )
}

export default CommentInPost;

const CommentInPostWrapper = styled.div`

`;

const CardList = styled.div`
    margin-top: 60px;
`;

const CommentInPostCard = styled.div`
    background: white;
    color: #979797;
    overflow:hidden;
    p {
        margin: 12px;
    }
    p:first-child {
        color: black;
        font-weight: bold;
        font-size: 18px;
    }
`;