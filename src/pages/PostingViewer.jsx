import React, { useEffect, useState } from 'react';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { postingsAPI } from '../shared/api';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import PostingCard from '../components/card/PostingCard';
import Header from '../components/header/Header';




const Home = () => {
    const paramCategory = useParams().category;
    const { ref, inView} = useInView();

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
      ['cardList', paramCategory],
      ({ pageParam = 0 }) => postingsAPI.fetchPostingsListWithScroll(pageParam, paramCategory),
      {
        getNextPageParam: (lastPage) =>
          !lastPage.isLast ? lastPage.nextPage : undefined,

        onSuccess:(data) => {
          console.log(data);
        },
        retry:false
      },
    );

    useEffect(()=> {
      if(inView){
        fetchNextPage();
      } 
    }, [inView])    
  
    return (
      <HomeWrapper>
        <Header/>
            {data.pages?.map((page, index) => (
              <Page key={index} >
                  {page.posts.map((post) => (
                    paramCategory==='postings'?<PostingCard key={post.posting_id} post={post}></PostingCard>:null //FIXME: 채팅방 리스트 불러오기 API가 구현되면 null 대신에 ChatroomCard 컴포넌트로 렌더링
                  ))}
              </Page>
            ))}
        {isFetchingNextPage ? <div>로딩중입니다1!!!!</div>: <div ref={ref} style={{height:"100px"}}></div>}
        </HomeWrapper>
    );
}

export default Home;

const HomeWrapper = styled.div`
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