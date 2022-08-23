import React, { useEffect, useState } from 'react';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { postingsAPI } from '../shared/api';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import PostingCard from '../components/card/PostingCard';
import Header from '../components/header/Header';




const PostingViewer = () => {
    const paramCategory = useParams().category;
    const { ref, inView} = useInView();

    const { data:listData, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
      ['postings', paramCategory],
      ({ pageParam = 0 }) => postingsAPI.fetchPostingsListWithScroll(pageParam),
      {
        enabled:!!(paramCategory === "list"),
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

    useEffect(()=> {
      if(inView){
        fetchNextPage();
      } 
    }, [inView])    
  
    return (
      <PostingViewerWrapper>
        <Header/>
            {listData.pages?.map((page, index) => (
              <Page key={index} >
                  {page.posts.map((post) => (
                    <PostingCard key={post.posting_id} post={post}></PostingCard> //FIXME: 채팅방 리스트 불러오기 API가 구현되면 null 대신에 ChatroomCard 컴포넌트로 렌더링
                  ))}
              </Page>
            ))}
        {isFetchingNextPage ? <div>로딩중입니다1!!!!</div>: <div ref={ref} style={{height:"50px"}}></div>}
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