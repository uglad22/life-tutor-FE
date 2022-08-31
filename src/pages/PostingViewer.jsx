import React, { useEffect, useState } from 'react';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { postingsAPI } from '../shared/api';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import PostingCard from '../components/card/PostingCard';
import Header from '../components/header/Header';
import Notice from '../components/notice/Notice';

const PostingViewer = () => {
    const paramCategory = useParams().category;
    const paramHashtag = useParams().hashtag;
    const { ref, inView} = useInView();
    // const { aref, ainView} = useInView();

    const { data:listData, fetchNextPage:fetchListNextPage, isFetchingNextPage:isListFetching } = useInfiniteQuery(
      ["postings", paramCategory],
      ({ pageParam = 0 }) => postingsAPI.fetchPostingsListWithScroll(pageParam),
      {
        enabled:!!(!paramHashtag),
        staleTime:3000,
        getNextPageParam: (lastPage) =>
          !lastPage.isLast ? lastPage.nextPage : undefined,

        onSuccess:(data) => {
          console.log(data);
        },
        retry:false,
        keepPreviousData:true
      },
    );

    const { data:searchListData, fetchNextPage:fetchSearchListNextPage, isFetchingNextPage:isSearchListFetching} = useInfiniteQuery(
      ["postings", "search", paramHashtag],
      ({ pageParam = 0}) => postingsAPI.fetchSearchPostingsListWithScroll(pageParam, paramHashtag),
      {
        enabled:!!paramHashtag,
        staleTime:3000,
        getNextPageParam: (lastPage) =>
        !lastPage.isLast? lastPage.nextPage : undefined,
        onSuccess:(data) => {
          console.log(data);
        },
        retry:false,
        keepPreviousData:true
      }
    )

    useEffect(()=> {
      if(inView){
        !paramHashtag?fetchListNextPage():fetchSearchListNextPage();
      } 
    }, [inView])    
  
    return (
      <PostingViewerWrapper>
        <Header/>
            {!paramHashtag&&(listData.pages[0]?.posts?.length===0?<Notice title={"게시글이 없습니다!"} text={"첫 게시글을 등록해보세요!"}/>:listData.pages?.map((page, index) => (
              <Page key={index}>
                  {page.posts.map((post) => (
                    <PostingCard key={post.posting_id} post={post}></PostingCard> 
                  ))}
              </Page>
            )))}
            {!paramHashtag||(searchListData.pages[0]?.posts?.length===0?<Notice/>:searchListData.pages?.map((page, index) => (
              <Page key={index} >
                  {page.posts.map((post) => (
                    <PostingCard key={post.posting_id} post={post}></PostingCard> 
                  ))}
              </Page>
            )))}
        {!paramHashtag&&(isListFetching ? <div>로딩중입니다!!!!</div>: <div ref={ref} style={{height:"100px"}}></div>)}
        {!paramHashtag||(isSearchListFetching ? <div>로딩중입니다!!!!</div>: <div ref={ref} style={{height:"100px"}}></div>)}
        </PostingViewerWrapper>
    );
}

export default PostingViewer;

const PostingViewerWrapper = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
  width:100%;
  margin:0 auto;
  padding-top:87px;
  //TODO: 헤더의 개수에 따라 padding-top값 조정하기
`

const Page = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
`