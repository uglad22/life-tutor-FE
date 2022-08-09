import React, { useEffect, useState } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { roomsAPI, postingsAPI } from '../shared/api';
import styled from 'styled-components';

const Home = () => {
    const [isPosting, setIsPosting] = useState(false);
    
    const queryClient = useQueryClient();
    const queryfetch = useQuery(['fetch_postings'], postingsAPI.fetchPostingsList, {
      onSuccess: ({data}) => {
        console.log(data);
      },
      onError: () => {
        alert('error')
      },
      enabled:!isPosting,
      staleTime:10000
    })
  
    const fetchQuery = useQuery(['fetch_rooms'], roomsAPI.fetchRoomsList, {
      onSuccess:({data}) => {
        console.log(data);
      },
      enabled:isPosting,
      staleTime:10000
    })
    return (
      <div className="App">
        <button onClick={()=>setIsPosting(true)}>rooms</button>
        <button onClick={()=>setIsPosting(false)}>postings</button>
        <input type="text"></input>
        <button>제출</button>
        {!isPosting?queryfetch.data?.data.map((item, index) => <div key={index}>{item.title}</div>):null}
        {isPosting?fetchQuery.data?.data.map((item, index) => <div key={index}>{item.title}</div>):null}
      </div>
    );
}

export default Home;