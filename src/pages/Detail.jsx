import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';


import instance from "../shared/axios";
import NomalBadge from '../components/hashtag/NomalBadge';
import { userContext } from "../context/UserProvider";

import { userTypeTrans } from "../shared/sharedFn";
import CommentCard from "../components/card/CommentCard";
import SubmitForm from "../components/submitForm/SubmitForm";
import Header from "../components/header/Header";
import { Helmet } from 'react-helmet'
import { editPostingTime } from "../shared/sharedFn";

const Detail = () => {
  const params = useParams();
  const postingId = params.postingId;
  const queryClient = useQueryClient();
  const [ commentEditStateForSubmit, setCommentEditStateForSubmit ] = useState(false);
  
  // 로그인한 유저의 닉네임 가져오기
  const context = useContext(userContext);
  const { userInfo } = context.state;
  const loginNickname = userInfo.nickname;


  // 게시글 불러오기
  const getPost = async () => {
    const res = await instance.get(`/api/board/detail/${postingId}`);
    return res.data;
  };

  const { data } = useQuery(["post", postingId], getPost, {
    refetchOnWindowFocus: false,
  });

  // console.log(data);

  // 게시글 기능관련

  const contentLike = async () => {
    if (data.like === true) {
    return await instance.delete(`/api/board/${postingId}/likes`);
    } else {
    return await instance.post(`/api/board/${postingId}/likes`);
    }
  }

  const { mutate : contentlikeHandler } = useMutation(contentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    }
  })

  return (
    <>
      {data.nickname === loginNickname && <Header title="본문 상세" isAction={true}/>}
      {data.nickname !== loginNickname && <Header title="본문 상세" isAction={false}/>}
      <ContentBox>
        <Helmet>
            <title>IT-ing</title>
            <link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
            <link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
        </Helmet>
        <TitleAndWriterBox>
          <Title>
            <p>{data.title}</p>
          </Title>
          <WriterAndTimeBox>
            <Writer>
              <p>{data.nickname}</p>
              <p>{userTypeTrans(data.user_type)}</p>
            </Writer>
            <TimeBox>{editPostingTime(data.date)}</TimeBox>
          </WriterAndTimeBox>
        </TitleAndWriterBox>
        <ContentAndHashtagBox>
          <Content>
            {data.posting_content.split('\n').map((line, idx) => {
              return <p key={idx}>{line}</p>
            })}
          </Content>
          <Hashtag>
            {data.hashtag.map((d, idx) => (
              <NomalBadge key={idx}>#{d}</NomalBadge>
            ))}
          </Hashtag>
        </ContentAndHashtagBox>
        <CommentCountAndLikeCountBox>
          <CommentCount>
            <IoChatboxEllipsesOutline />{data.comments.length}
          </CommentCount>
          <ContentLikeBtn onClick={contentlikeHandler} isLike={data.like}>
            <AiOutlineLike />{data.like_count}
          </ContentLikeBtn>
        </CommentCountAndLikeCountBox>
      </ContentBox>

      <CommentBox>
        <CommentListBox>
          {data.comments.map((data, idx) => (
            <CommentCard key={idx} data={data} postingId={postingId} commentEditStateForSubmit={commentEditStateForSubmit} setCommentEditStateForSubmit={setCommentEditStateForSubmit} />
          ))}
        </CommentListBox>
      </CommentBox>

      <SubmitForm postingId={postingId} placeholderText="댓글을 남겨주세요." commentEditStateForSubmit={commentEditStateForSubmit} />
    </>
  );
};

export default Detail;

const ContentBox = styled.div`
  margin-top: 60px;
  background: white;
  width: 100%;
  border-bottom: 2px solid #D3D3D3;
`;

const TitleAndWriterBox = styled.div`
  border-bottom: 0.5px solid #E6E6E6;
  padding-bottom: 20px;
`;

const Title = styled.div`
  text-align: left;
  p {
    padding: 25px 20px;
    font-weight:500;
    font-size:20px;
  }
`;

const WriterAndTimeBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 20px;
  color: #656565;
`;

const Writer = styled.div`
  display: flex;
  font-weight: bold;
  p:last-child {
    margin-left: 10px;
    color: #3549FF;
  }
`;

const TimeBox = styled.div`
`;

const ContentAndHashtagBox = styled.div`
  text-align: left;
  border-bottom: 0.5px solid #E6E6E6;
  padding-bottom: 15px;
  box-sizing: border-box;
  p {
    margin: 0;
    padding: 0;
  }
`;

const Content = styled.div`
  margin: 20px;
  min-height: 200px;
`;

const Hashtag = styled.div`
  display: flex;
  margin: 20px;
  font-size: 25px;
  div{
    margin-right: 5px;
  }
`;

const CommentCountAndLikeCountBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  font-size: 20px;
  color: #656565;
  div {
    margin-right: 24px;
  }
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const ContentLikeBtn = styled.div`
  padding: 0.3rem;
  color: ${(props) => (props.isLike ? "#3549FF" : "#656565")};
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    cursor:pointer;
  }
`;


const CommentBox = styled.div`
  background: white;
  border-top: 9px solid #EEEEEE;
  margin-bottom: 63px;
`;

const CommentListBox = styled.div`
  width: 100%;
  margin: 0 auto;
`;
