import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// TODO:
// 작성자 본인이면 게시글, 댓글 수정/삭제 버튼 보이게 > 닉네임으로 비교?
// 대나무숲 상세페이지 response > imgUrl, username?
// 댓글 작성날짜시간 ? response 추가요청 : 시간표시없이
// 대나무숲 상세페이지 불러올때 댓글 id가 유저 id 인지 댓글 아이디인지
// 만약 댓글 아이디이면 유저네임은 댓글에 표시를? or 유저 아이디이면 댓글 아이디는?
// 댓글 공감기능?

const Detail = () => {
  const params = useParams();
  const comment_ref = useRef();
  const navigate = useNavigate();
  const postingId = params.postingId;
  const [addComment, setAddComment] = useState(null);

  const getPost = async () => {
    // const res = await axios.get(`/api/board/detail/${postingId}`);
    const res = await axios.get(`http://localhost:5001/board/${postingId}`);
    return res.data;
  };

  const { data } = useQuery(["post"], getPost, {
    refetchOnWindowFocus: false,
  });

  console.log(data);

//   FIXME: 본인확인후 게시글, 댓글 수정 삭제버튼 렌더링
  const editPostingHandler = async () => {
    await axios.put(`/api/board/${postingId}`);
    // FIXME: 수정버튼 클릭시 수정할 페이지 이동
    // navigate("");
  };

  const deletePostingHandler = async () => {
    // await axios.delete(`/api/board/${postingId}`);
    navigate("/");
  };

  const contentlikeHandler = async () => {
    // await axios.post(`/adi/board/${postingId}/likes`);
  }

  const commentAddHandler = async () => {
    let comment = { content: comment_ref.current.value };
    // await axios.post(`/api/board/${postingId}/comment`, comment);
    setAddComment(comment_ref.current.value);
    comment_ref.current.value = "";
  };

  const commentEditHandler = async () => {
    // FIXME: commentId 붙여서 API url 수정
    // await axios.put(`/api/board/${postingId}/comment/${코멘트아이디}`);
    alert("댓글이 수정되었습니다.");
  };

  const commentDelHandler = async () => {
    // await axios.delete(`/api/board/${postingId}/comment/${코멘트아이디}`);
    alert("댓글이 삭제되었습니다.");
  };

  const commentlikeHandler = async () => {
    console.log("댓글공감");
  };

  useEffect(() => {}, [addComment]);

  return (
    <>
      <HeaderBox>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </BackBtn>
        <EditAndDelBtn>
          <EditBtn
            onClick={() => {
              editPostingHandler();
            }}
          >
            수정
          </EditBtn>
          <DelBtn
            onClick={() => {
              deletePostingHandler();
            }}
          >
            삭제
          </DelBtn>
        </EditAndDelBtn>
      </HeaderBox>
      <ContentBox>
        <Title>
          <h3>제목</h3>
          <p>{data.title}</p>
        </Title>
        <Content>
          <h3>내용</h3>
          {data.imgUrl && <p>{data.imgUrl}</p>}
          <p>{data.content}</p>
          {/* <p>{data.hashtag.map = (d) => {
                return 
            }}</p> */}
        </Content>
        <ContentLikeBtn onClick={() => {contentlikeHandler()}}>좋아요</ContentLikeBtn>
      </ContentBox>

      <CommentBox>
        <CommentAddBox>
          <input type="text" ref={comment_ref} />
          <CommentAddBtn
            onClick={() => {
              commentAddHandler();
            }}
          >
            댓글 추가
          </CommentAddBtn>
        </CommentAddBox>
        <CommentListBox>
          {data.comments.map((d, idx) => (
            <Comment key={idx}>
              <CommentIdAndLike>
                <CommentId>{d.id}</CommentId>
                <CommentEditDelAndLike>
                  <CommentEdit
                    onClick={() => {
                      commentEditHandler();
                    }}
                  >
                    수정
                  </CommentEdit>
                  <CommentDel
                    onClick={() => {
                      commentDelHandler();
                    }}
                  >
                    삭제
                  </CommentDel>
                  <CommentLikeBtn
                    onClick={() => {
                        commentlikeHandler();
                    }}
                  >
                    공감하기
                  </CommentLikeBtn>
                </CommentEditDelAndLike>
              </CommentIdAndLike>
              <div>{d.content}</div>
            </Comment>
          ))}
        </CommentListBox>
      </CommentBox>
    </>
  );
};

export default Detail;

const HeaderBox = styled.div`
  width: 100%;
  height: 3rem;
  background: #f1f1f1;
  display: flex;
  justify-content: space-between;
`;

const BackBtn = styled.div`
  width: 20%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #e1e1e1;
`;

const EditAndDelBtn = styled.div`
  width: 30%;
  height: 3rem;
  display: flex;
`;

const EditBtn = styled.div`
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e1e1e1;
  justify-content: center;
`;

const DelBtn = styled.div`
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e1e1e1;
  justify-content: center;
`;

const ContentBox = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.div`
  width: calc(100% - 1rem);
  text-align: left;
  padding: 0.5rem;
  h3 {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const Content = styled.div`
  width: calc(100% - 1rem);
  text-align: left;
  padding: 0.5rem;
  h3 {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const ContentLikeBtn = styled.div`
  width: 4rem;
  padding: 0.3rem;
  border: 1px solid #aaa;
  box-sizing: border-box;
`;

const CommentBox = styled.div`
  width: 90%;
  margin: 1rem auto;
`;

const CommentAddBox = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    width: 70vw;
  }
`;

const CommentAddBtn = styled.div`
  border: 1px solid #bbb;
  box-sizing: border-box;
  width: 30vw;
`;

const CommentListBox = styled.div`
  width: 90%;
  height: 10rem;
  margin: 0 auto;
`;

const Comment = styled.div`
  width: 100%;
  text-align: left;
  margin: 1rem auto;
  border: 1px solid #eee;
  box-sizing: border-box;
`;

const CommentIdAndLike = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentId = styled.div`
  font-weight: 600;
`;

const CommentEditDelAndLike = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const CommentEdit = styled.div`
  box-sizing: border-box;
  border: 1px solid #eee;
`;

const CommentDel = styled.div`
  box-sizing: border-box;
  border: 1px solid #eee;
`;

const CommentLikeBtn = styled.div`
  box-sizing: border-box;
  border: 1px solid #eee;
`;
