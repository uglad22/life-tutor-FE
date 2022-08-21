import React, { useRef } from "react";
import instance from "../shared/axios";
import styled from "styled-components";
import NomalBadge from '../components/hashtag/NomalBadge';
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsChevronLeft } from "react-icons/bs";
import axios from "axios";
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { BiRightArrowCircle } from 'react-icons/bi';


// TODO:
// FIXME: 작성날짜시간 ex. ~시간전, ~일전
// 좋아요 했던 게시글 표시 (스테이트) ? 옵셔널체이닝
// https://mockapi.io/

// useState 함수형
// const [isLike, setIsLike] = useState(() => {
//   if(data.isLike) return true;
//   else return false;
// })


const Detail = () => {
  const params = useParams();
  const comment_ref = useRef();
  const navigate = useNavigate();
  const postingId = params.postingId;
  const queryClient = useQueryClient();
  const loginNickname = window.localStorage.getItem("nickname");

  const getPost = async () => {
    // const res = await instance.get(`/api/board/detail/${postingId}`);
    const res = await axios.get(`https://62ff3c5934344b6431f5091f.mockapi.io/posting/${postingId}`);
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
    const result = window.confirm("게시글을 삭제하시겠습니까?");
    if (result) {
      await instance.delete(`/api/board/${postingId}`);
      return navigate("/");
    }
  };

  const contentLike = async () => {
    if (data.isLike === true) {
    return await instance.delete(`/api/board/${postingId}/likes`);
    } else {
    return await instance.post(`/api/board/${postingId}/likes`);
    }
  }

  const { mutate : contentlikeHandler } = useMutation(contentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    }
  })

  const addComment = async (comment) => {
    console.log(comment);
    return await instance.post(`/api/board/${postingId}/comment`, comment);
  }

  const { mutate : commentAddHandler } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
      comment_ref.current.value = "";
    }
  })



  const commentEditHandler = async (commentId) => {
    // FIXME: 코멘트 content 데이터 넣어서 put
    // 댓글 수정 > 유튜브, 페이스북처럼 수정하는 댓글 밑에 인풋박스 생성
    // await axios.put(`/api/board/${postingId}/comment/${commentId}`);
    console.log(commentId);
    console.log("댓글 수정버튼");
  };

  const deleteComment = async (commentId) => {
    await instance.delete(`/api/board/${postingId}/comment/${commentId}`);
    console.log(commentId);
    console.log("댓글 삭제버튼");
  }

  const { mutate : commentDelHandler } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
      comment_ref.current.value = "";
    }
  })


  const commentLike = async (commentIdx) => {
    console.log(commentIdx);
    if (data.comments[commentIdx].isLike === true) {
      return await instance.delete(`/api/comment/${data.comments[commentIdx].id}/likes`);
    } else {
      return await instance.post(`/api/comment/${data.comments[commentIdx].id}/likes`);
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
        <TitleAndWriterBox>
          <Title>
            <p>{data.title}</p>
          </Title>
          <WriterAndTimeBox>
            <Writer>
              <p>{data.nickname}</p>
              <p>{data.user_type}</p>
            </Writer>
            <TimeBox>{data.date.substr(0, 10)}</TimeBox>
          </WriterAndTimeBox>
        </TitleAndWriterBox>
        <ContentAndHashtagBox>
          <Content>
            <p>{data.posting_content}</p>
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
        {data.nickname && loginNickname ? (
          <>
            <ContentLikeFalseBtn><AiOutlineLike />{data.like_count}</ContentLikeFalseBtn>
          </>
        ) : (
          data.isLike ? (
          <>
            <ContentLikeTrueBtn onClick={() => {
                contentlikeHandler();
              }}>
              <AiOutlineLike />{data.like_count}
            </ContentLikeTrueBtn>
          </>
          ):(
          <>
            <ContentLikeFalseBtn onClick={() => {
                contentlikeHandler();
              }}>
              <AiOutlineLike />{data.like_count}
            </ContentLikeFalseBtn>
          </>
          )
        )}
        </CommentCountAndLikeCountBox>
      </ContentBox>

      <CommentBox>
        <CommentListBox>
          {data.comments.map((d, idx) => (
            <Comment key={idx}>
              <CommentWriter>
                <p>{d.nickname}닉네임</p>
                <p>{d.user_type}유저타입</p>
              </CommentWriter>
              <CommentContent>{d.content}댓글내용</CommentContent>
              <CommentLikeAndEditDelBox>
                {d.nickname && loginNickname ? (
                  <>
                  <CommentDateAndLikeBox>
                    <p>{d.date}</p>
                    <CommentLikeFalseBtn><AiOutlineLike />{d.like_count}</CommentLikeFalseBtn>
                  </CommentDateAndLikeBox>
                  <CommentEditAndDelBox>
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
                    </CommentEditAndDelBox>
                  </>
                ) : (
                  d.isLike === true ? (
                  <>
                    <CommentDateAndLikeBox>
                      <p>{d.date}</p>
                      <CommentLikeTrueBtn onClick={() => {
                        commentlikeHandler(`${d.id}`);
                      }}><AiOutlineLike />{d.like_count}</CommentLikeTrueBtn>
                    </CommentDateAndLikeBox>
                  </>
                  ) : (
                  <>
                    <CommentDateAndLikeBox>
                      <p>{d.date}</p>
                      <CommentLikeFalseBtn onClick={() => {
                        commentlikeHandler(`${d.id}`);
                        }}><AiOutlineLike />{d.like_count}</CommentLikeFalseBtn>
                    </CommentDateAndLikeBox>
                  </>)
                  
                )}
              </CommentLikeAndEditDelBox>
            </Comment>
          ))}
        </CommentListBox>
      </CommentBox>
      
      <CommentAddBox>
        <CommentInputBox>
          <input type="text" placeholder="댓글을 남겨주세요." ref={comment_ref} />
          <CommentAddBtn
            onClick={() => {
              const comment = { "content": comment_ref.current.value };
              commentAddHandler(comment);
            }}
          >
            <BiRightArrowCircle />
          </CommentAddBtn>
        </CommentInputBox>
        </CommentAddBox>
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
  box-sizing: border-box;
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
  cursor: pointer;
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
`;

const DelBtn = styled.div`
  cursor: pointer;
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
`;

const ContentBox = styled.div`
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
    margin: 25px 20px;
    padding: 0;
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
  gap: 10px;
  font-weight: bold;
  p:last-child {
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
  gap: 7px;
  margin: 20px;
  font-size: 25px;
`;

const CommentCountAndLikeCountBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  gap: 30px;
  font-size: 20px;
  color: #656565;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentLikeTrueBtn = styled.div`
  padding: 0.3rem;
  color: #3549FF;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentLikeFalseBtn = styled.div`
  padding: 0.3rem;
  color: #656565;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CommentBox = styled.div`
  background: white;
  border-top: 9px solid #EEEEEE;
  margin-bottom: 63px;
`;

const CommentListBox = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Comment = styled.div`
  width: 100%;
  text-align: left;
  line-height: 2rem;
  margin: 1rem auto;
  box-sizing: border-box;
`;

const CommentWriter = styled.div`
  display: flex;
  gap: 7px;
  font-weight: bold;
  font-size: 15px;
  color: #656565;
  p:last-child {
    color: #3549FF;
  }
`;

const CommentContent = styled.div`
  font-size: 16px;
`;

const CommentLikeAndEditDelBox = styled.div`
  display: flex;
  justify-content: space-between;  
`;

const CommentDateAndLikeBox = styled.div`
  display: flex;
  gap: 10px;
  color: #656565;
  p:last-child {
    display:flex;
    align-items: center;
    gap: 3px;
  }
`;


const CommentEditAndDelBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #3549FF;
`;

const CommentEdit = styled.div`
`;

const CommentDel = styled.div`
`;

const CommentLikeFalseBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const CommentLikeTrueBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  color: #3549FF;
`;

const CommentAddBox = styled.div`
  background: #EFEFEF;
  width: 100%;
  height: 63px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const CommentInputBox = styled.div`
  width: 90%;
  height: 44px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #D8D8D8;
  border-radius: 30px;
  gap: 5px;
  background: white;
  input {
    border: none;
    width: 80%;
    height: 30px;
    background: transparent;
  }
`;

const CommentAddBtn = styled.div`
  margin-top: 5px;
  cursor: pointer;
  color: #3549FF;
  font-size: 30px;
`;
