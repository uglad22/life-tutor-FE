import React, { useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsChevronLeft } from "react-icons/bs";

// TODO:
// 2. 댓글 작성날짜시간

const Detail = () => {
  const params = useParams();
  const comment_ref = useRef();
  const navigate = useNavigate();
  const postingId = params.postingId;
  const queryClient = useQueryClient();
  const loginNickname = window.localStorage.getItem("nickname");

  const getPost = async () => {
    // const res = await axios.get(`/api/board/detail/${postingId}`);
    const res = await axios.get(`http://localhost:5001/board/${postingId}`);
    return res.data;
  };

  const { data } = useQuery(["post"], getPost, {
    refetchOnWindowFocus: false,
  });

  console.log(data);



  const editPostingHandler = async () => {
    // navigate(`/edit/${postingId}`);
  };

  const deletePostingHandler = async () => {
    await axios.delete(`/api/board/${postingId}`);
    navigate("/");
  };



  // const contentlikeHandler = async () => {
    // if (data.isLike === true) {
    // await axios.delete(`/api/board/${postingId}/likes`);
    // } else {
    // await axios.post(`/api/board/${postingId}/likes`);
    // }
  //   alert("게시글 좋아요 버튼");
  // };

  const contentLike = async () => {
    if (data.isLike === true) {
    return await axios.delete(`/api/board/${postingId}/likes`);
    } else {
    return await axios.post(`/api/board/${postingId}/likes`);
    }
  }

  const { mutate : contentlikeHandler } = useMutation(contentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    }
  })


  
  // const commentAddHandler = async (comment) => {
    //   // await axios.post(`/api/board/${postingId}/comment`, comment);
    //   comment_ref.current.value = "";
    // };

  const addComment = async (comment) => {
    console.log(comment);
    return await axios.post(`/api/board/${postingId}/comment`, comment);
  }

  const { mutate : commentAddHandler } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
      comment_ref.current.value = "";
    }
  })



  const commentEditHandler = async (commentId) => {
    // FIXME: 코멘트 content 데이터 넣어서 put
    // 댓글 수정 어떻게?
    // await axios.put(`/api/board/${postingId}/comment/${commentId}`);
    console.log(commentId);
    console.log("댓글 수정버튼");
  };

  const commentDelHandler = async (commentId) => {
    await axios.delete(`/api/board/${postingId}/comment/${commentId}`);
    console.log(commentId);
    console.log("댓글 삭제버튼");
  };



  // const commentlikeHandler = async (commentIdx) => {
    // if (data.comments[commentIdx].isLike === true) {
    //   await axios.delete(`/api/comment/${data.comments[commentIdx].id}/likes`);
    // } else {
    //   await axios.post(`/api/comment/${data.comments[commentIdx].id}/likes`);
    // }
  //   console.log(commentIdx);
  //   console.log("댓글공감");
  // };

  const commentLike = async (commentIdx) => {
    console.log(commentIdx);
    if (data.comments[commentIdx].isLike === true) {
      return await axios.delete(`/api/comment/${data.comments[commentIdx].id}/likes`);
    } else {
      return await axios.post(`/api/comment/${data.comments[commentIdx].id}/likes`);
    }
  }

  const { mutate:commentlikeHandler } = useMutation(commentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    }
  })

  return (
    <>
      <HeaderBox>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          <BsChevronLeft />
        </BackBtn>
        <HeaderInfo>본문 상세</HeaderInfo>
        <EditAndDelBtn>
          {data.nickname && loginNickname ? (
            <>
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
            </>
          ) : null}
        </EditAndDelBtn>
      </HeaderBox>
      <ContentBox>
        <Title>
          <h3>{data.title}</h3>
          <p></p>
        </Title>
        <Content>
          <h3>내용</h3>
          {data.imgUrl && <img src={data.imgUrl} alt="userimage" />}
          <p>{data.content}</p>
          {data.hashtag.map((d, idx) => (
            <p key={idx}>{d}</p>
          ))}
        </Content>
        {data.nickname && loginNickname ? (
          <>
            <ContentLikeBtn>좋아요</ContentLikeBtn>
          </>
        ) : (
          <>
            <ContentLikeBtn
              onClick={() => {
                contentlikeHandler();
              }}
            >
              좋아요
            </ContentLikeBtn>
          </>
        )}
      </ContentBox>

      <CommentBox>
        <CommentListBox>
          {data.comments.map((d, idx) => (
            <Comment key={idx}>
              <CommentIdAndLike>
                <CommentId>{d.nickname}</CommentId>
                <CommentEditDelAndLike>
                  {d.nickname && loginNickname ? (
                    <>
                      <CommentEdit
                        onClick={() => {
                          commentEditHandler(`${d.id}`);
                        }}
                      >
                        수정
                      </CommentEdit>
                      <CommentDel
                        onClick={() => {
                          commentDelHandler(`${d.id}`);
                        }}
                      >
                        삭제
                      </CommentDel>
                    </>
                  ) : (
                    <>
                      <CommentLikeBtn
                        onClick={() => {
                          commentlikeHandler(`${idx}`);
                        }}
                      >
                        공감하기
                      </CommentLikeBtn>
                    </>
                  )}
                </CommentEditDelAndLike>
              </CommentIdAndLike>
              <div>{d.content}</div>
            </Comment>
          ))}
        </CommentListBox>
        <CommentAddBox>
          <input type="text" ref={comment_ref} />
          <CommentAddBtn
            onClick={() => {
              const comment = { "content": comment_ref.current.value };
              commentAddHandler(comment);
            }}
          >
            댓글 추가
          </CommentAddBtn>
        </CommentAddBox>
      </CommentBox>
    </>
  );
};

export default Detail;

const HeaderBox = styled.div`
  width: 100%;
  height: 95px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 0.5px solid #d3d3d3;
`;

const BackBtn = styled.div`
  margin: 0 0 16px 20px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const HeaderInfo = styled.div`
  position: absolute;
  left: 159px;
  top: 57px;
  width: 69px;
  height: 27px;
`;

const EditAndDelBtn = styled.div`
  margin: 0 20px 16px 0;
  gap: 10px;
  display: flex;
`;

const EditBtn = styled.div`
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
`;

const DelBtn = styled.div`
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
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
