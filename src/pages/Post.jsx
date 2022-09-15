import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams,useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WhiteBackground, HRLineDiv } from '../style/sharedStyle';
import { userContext } from "../context/UserProvider";
import { submitDataContext } from '../context/SubmitDataProvider';
import Header from '../components/header/Header';
import DeletableBadge from '../components/hashtag/DeletableBadge';
import { hashtagValidation } from '../shared/sharedFn';

import instance from '../shared/axios';
import { Helmet } from 'react-helmet'

const Post = () => {
    const [hashInput, setHashInput] = useState('');
    const context = useContext(submitDataContext);
    const userInfoContext = useContext(userContext);
    const { userInfo } = userInfoContext.state;
    const { postData } = context.state;
    const { title, posting_content, hashtag } = postData;
    const { setPostData } = context.actions;
    const hashRef = useRef(null);

    const pathname = useLocation().pathname;
    const params = useParams();
    const postingId = params.postingId;
    const navigate = useNavigate();

    const changeHashInput = (e) => {
        setHashInput(e.target.value);
    }

    const changeTextData = (e) => {
        // context의 state를 변경
        // 글을 등록할 때 context의 state를 서버에 request body로 보내기 때문
        setPostData({...postData, [e.target.name]:e.target.value});
    }

    // velog 처럼 해시태그 추가할 때 스페이스바 누르면 추가되는 기능
    const keyupSpace = (e) => {
        if(e.code === "Space") {
            if(!hashInput.trim()) {
                setHashInput("");
                return;
            }
            else  {
              const result = hashInput.replace(/[/!@#$%^&*~)(/?><\s]/g, "");
              const valid = hashtagValidation(result, hashtag);
              if(!valid) return;
              else {
                setPostData({...postData, hashtag:[...postData.hashtag, result]})
                setHashInput("");
              }  
            }
        }
    }

    // 해시태그 추가
    const hashtagSubmit = (e) => {
        e.preventDefault();
        if(!hashInput) {
            return;
        }
        else  {
            const result = hashInput.replace(/[/!@#$%^&*~)(/?><\s]/g, "");
            const valid = hashtagValidation(result, hashtag);
            if(!valid) return;
            else {
                setPostData({...postData, hashtag:[...postData.hashtag, result]})
                setHashInput('');
            }

        }
    }

    useEffect(() => {
        if (postingId) {
            const setPost = async () => {
                const postInfo = await instance.get(`/api/board/detail/${postingId}`);
                const data = postInfo.data;

                if(data.nickname !== userInfo.nickname) {
                    alert('수정 권한이 없습니다.');
                    navigate(-1);
                    return;
                }

                setPostData({
                    title: data.title,
                    posting_content: data.posting_content,
                    hashtag: data.hashtag,
                })
            }
            setPost();
        }

        return(() => {
            setPostData({title:'', posting_content:'', hashtag:[]})
        })
    }, [])

    useEffect(()=> {
        if(!hashtag.length) return;
        hashRef.current.scrollIntoView({ behavior: "smooth" });
    }, [hashtag])
    return(
        <WhiteBackground>
            <Helmet>
                <title>IT-ing</title>
                <link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
            </Helmet>
        <PostWrapper>
            {pathname === '/posting' && <Header title="글쓰기" isAction={true}/>}
            {pathname === `/posting/edit/${postingId}` && <Header title="수정하기" isAction={true}/>}
            
            <PostContent>
                <input 
                type="text" placeholder='제목을 입력해주세요.' value={title}
                name="title" onChange={changeTextData}></input>
                <HRLineDiv/>
                <textarea placeholder="내용을 입력해주세요." value={posting_content}
                name="posting_content" onChange={changeTextData}></textarea>
                {/* <hr></hr> */}
                <HashTagForm onSubmit={hashtagSubmit}>
                    <button className='hashtag-submit-button' type="submit">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <g clipPath="url(#clip0_106_11725)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.5625 0.5625C9.5625 0.25184 9.31066 0 9 0C8.68934 0 8.4375 0.25184 8.4375 0.5625V8.4375H0.5625C0.25184 8.4375 0 8.68934 0 9C0 9.31066 0.25184 9.5625 0.5625 9.5625H8.4375V17.4375C8.4375 17.7482 8.68934 18 9 18C9.31066 18 9.5625 17.7482 9.5625 17.4375V9.5625H17.4375C17.7482 9.5625 18 9.31066 18 9C18 8.68934 17.7482 8.4375 17.4375 8.4375H9.5625V0.5625Z"
                            fill="black" stroke="#3549FF" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_106_11725">
                                <rect width="18" height="18" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    </button>
                    
                    <input type="text" placeholder="해시태그를 입력하세요.(6자리 이하)"
                    onChange={changeHashInput} value={hashInput} onKeyUp={keyupSpace}></input>
                </HashTagForm>
                <HashtagViewer ref={hashRef}>
                        {postData.hashtag.map((tag, index) => <DeletableBadge key={index} idx={index}>{tag}</DeletableBadge>)}
                    </HashtagViewer>
            </PostContent>
        </PostWrapper>
          </WhiteBackground>
    )
}

export default Post;

const PostWrapper = styled.div`
    // app.js의 content가 480px로 limit
    padding-top:60px;
    width:calc(100% - 40px);
    margin:0 auto;

    hr {
        max-width:480px;
        margin:0 auto;
    }
`

const PostContent = styled.div`
    display:flex;
    flex-direction:column;
    /* gap:10px; */
    & > input {
        width:100%;
        height:58px;
        box-sizing:border-box;
        font-weight:bold;
        font-size:20px;
        outline:none;
        border:none;
        font-weight:500;
        letter-spacing:-0.03em;
        
    }
    & > input::placeholder {color:#373737;}
    & > input::-webkit-input-placeholder {color:#373737;}
    & > input::-ms-input-placeholder {color:#373737;}
    hr {
        width:100%;
    }
    textarea {
        resize:none;
        outline:none;
        border:none;
        font-size:15px;
        font-weight:500;
        line-height:18px;
        height:40vh;
        margin-bottom:10px;
        /* background:blue; */
    }
`

const HashTagForm = styled.form`
    position:relative;
    width:100%;
    border:1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    display:flex;
    box-sizing:border-box;
    align-items:center;
    overflow-x:auto;
    margin-bottom:10px;
    
    input {
        width:100%;
        height:52px;
        box-sizing:border-box;
        outline:none;
        border:none;
        padding: 8px 12px;
    }
    .hashtag-viewer {
        display:flex;
    }

    .hashtag-submit-button {
        position:absolute;
        height:100%;
        top:0;
        right:0;
        margin-right:10px;
        background:none;
        border:none;
    }
`

const HashtagViewer = styled.div`
    display:flex;
    /* gap:10px; */
    flex-wrap:wrap;
    width:100%;
    margin-bottom:100px;
    div {
        margin-right: 5px;
    }
`