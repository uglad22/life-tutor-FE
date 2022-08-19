import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { submitDataContext } from '../components/context/SubmitDataProvider';
import Header from '../components/header/Header';

const validation = (hashtagInput) => {
    if(!hashtagInput) return false;
    return true;
}

const Post = () => {
    const [hashInput, setHashInput] = useState('');
    const context = useContext(submitDataContext);
    const { postData } = context.state;
    const { title, posting_content } = postData;
    const { setPostData } = context.actions;

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
            const valid = validation(hashInput.trim());
            if(!valid) {
                setHashInput('');
                return;
            }
            else {
                // 스페이스바로 추가하면 공백문자가 포함되기 때문에 trim()을 해줌
                setPostData({...postData, hashtag:[...postData.hashtag, hashInput.trim()]})
                setHashInput('');
            }
            
        }
        else return;
    }

    // 해시태그 추가
    const hashtagSubmit = (e) => {
        e.preventDefault();
        const valid = validation(hashInput);
        if(!valid) return;
        setPostData({...postData, hashtag:[...postData.hashtag, hashInput.trim()]})
        setHashInput('');
    }
    return(
        <PostWrapper>
            <Header title="글쓰기" isAction={true}/>
            <PostContent>
                <input 
                type="text" placeholder='제목을 입력해주세요.' value={title}
                name="title" onChange={changeTextData}></input>
                <hr></hr>
                <textarea placeholder="내용을 입력해주세요." value={posting_content}
                name="posting_content" onChange={changeTextData}></textarea>
                {/* <hr></hr> */}
                <HashTagForm onSubmit={hashtagSubmit}>
                    <input type="text" placeholder="해시태그 입력 후 엔터 또는 스페이스"
                    onChange={changeHashInput} value={hashInput} onKeyUp={keyupSpace}></input>
                    <div className='hashtag-viewer'>
                        {postData.hashtag.map((tag, index) => <p key={index} idx={index}>{tag}</p>)}
                    </div>
                </HashTagForm>
            </PostContent>
        </PostWrapper>
    )
}

export default Post;

const PostWrapper = styled.div`
    // app.js의 content가 480px로 limit
    padding-top:80px;
    width:calc(100% - 40px);
    margin:0 auto;
    /* background:blue; */

    hr {
        max-width:480px;
        margin:0 auto;
    }
`

const PostContent = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    & > input {
        width:100%;
        height:40px;
        box-sizing:border-box;
        font-weight:bold;
        font-size:1.4rem;
        outline:none;
        border:none;
    }
    hr {
        width:100%;
    }
    textarea {
        resize:none;
        outline:none;
        border:none;
        font-size:1.3rem;
        height:40vh;
        /* background:blue; */
    }
`

const HashTagForm = styled.form`
    width:100%;
    /* background:red; */
    input {
        width:100%;
        height:40px;
        box-sizing:border-box;
        border-radius: 10px;
    }
    .hashtag-viewer {
        display:flex;
        flex-wrap:wrap;
        gap:5px;
    }
`