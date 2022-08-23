import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import RoomCard from '../components/card/RoomCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { chatroomAPI } from '../shared/api';


const RoomViewer = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const hashtagParam = useParams().hashtag;
    const { ref, inView } = useInView();

    const { data:listData, fetchNextPage:listFetchNextPage, isFetchingNextPage:isListFetchingNextPage } = useInfiniteQuery(
        ["rooms"],
        ({ pageParam = 1 }) => chatroomAPI.fetchRoomsListWithScroll(pageParam),
        {
            enabled:!!(!hashtagParam),
            getNextPageParam: (lastPage) =>
            !lastPage.isLast ? lastPage.nextPage : undefined,
            
            onSuccess:(data) => {
                console.log(data);
            },
            staleTime:3000,
            retry:false
        }
    )

    const {data:searchData, fetchNextPage:searchFetchNextPage, isFetchingNextPage:isSearchFetchingNextPage, refetch } = useInfiniteQuery(
        ["rooms", 'search', hashtagParam],
        ({ pageParam = 1}) => chatroomAPI.fetchSearchRoomsListWithScroll(pageParam, hashtagParam),
        {
            enabled:!!hashtagParam,
            getNextPageParam: (lastPage) =>
            !lastPage.isLast ? lastPage.nextPage : undefined,
            onSuccess:(data) => {
                console.log(data);
            },
            
            staleTime:3000,
            retry:false
        }
    )

    useEffect(()=> {
        if(inView) {
            listFetchNextPage();
        }
    }, [inView])

    return(   
        <RoomViewerWrapper>
            <Header title={"채팅 리스트"} isAction={true}/>
            {hashtagParam||listData.pages?.map((page, index) => (
                <Page key={index}>
                    {page.rooms.map((room) => (
                        <RoomCard key={room.roomId} room={room}></RoomCard>
                    ))}
                </Page>
            ))}
             {hashtagParam&&searchData.pages?.map((page, index) => (
                <Page key={index}>
                    {page.rooms.map((room) => (
                         <RoomCard key={room.roomId} room={room}></RoomCard>
                    ))}
                </Page>
            ))}
        </RoomViewerWrapper>
    )
}

export default RoomViewer;

const RoomViewerWrapper = styled.div`
    display:flex;
    flex-direction: column;
    gap:0.5px;
    width:100%;
    /* background:red; */
    padding-top:119px;
    /* box-sizing:border-box; */
    padding-bottom:71px;
`

const Page = styled.div`
  display:flex;
  flex-direction:column;
  /* gap:10px; */
`