import React, { useEffect, useState } from 'react';
import { useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { roomsAPI, postingsAPI } from '../shared/api';
import styled from 'styled-components';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import PostingCard from '../components/PostingCard';
import instance from '../shared/axios';



const Home = () => {
  const queryClient = useQueryClient();
  // const fetchPostingsList = async (pageParam) => {
  //   const res = await instance.get(
  //     `/api/main/postings?page=${pageParam}&size=3`
  //   )
  //   console.log(res.data.content)
  //   const { content } = res.data;
  //   const { last } = res.data;
  //   return { posts:content, nextPage: pageParam + 1, isLast:last}
  // }


    const { ref, inView} = useInView();

    // const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    //   ['posts'],
    //   ({ pageParam = 1 }) => fetchPostList(pageParam),
    //   {
    //     // lastPage >> 저번 페이지에서 가져온 정보
    //     // 저번 페이지의 isLast 값이 false라면 undefined를 반환하고
    //     // hasNextPage를 false로 설정
    //     getNextPageParam: (lastPage) =>
    //       !lastPage.isLast ? lastPage.nextPage : undefined,
    //   },
    // );
    const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
      ['postList'],
      ({ pageParam = 0 }) => postingsAPI.fetchPostingsListWithScroll(pageParam),
      {
        getNextPageParam: (lastPage) =>
          !lastPage.isLast ? lastPage.nextPage : undefined,

        onSuccess:(data) => {
          console.log(data);
        },
      },
    );

    useEffect(()=> {
      if(inView){
        fetchNextPage();
      } 
    }, [inView])    
  
    return (
      <HomeWrapper>
        <div >
            {data.pages?.map((page, index) => (
              <div key={index} >
                  {page.posts.map((post) => (
                    <PostingCard key={post.posting_id} post={post}></PostingCard>
                  ))}
              </div>
            ))}
        </div>
        {isFetchingNextPage ? <div>로딩중입니다1!!!!</div>: <div ref={ref} style={{height:"100px"}}></div>}
        </HomeWrapper>
    );
}

export default Home;

const HomeWrapper = styled.div`
  width:100%;
  margin:0 auto;
`