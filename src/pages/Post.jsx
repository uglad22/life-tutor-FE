import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';

const validation = (hashtagInput) => {
    if(!hashtagInput) return false;
    return true;
}

const Post = () => {
    const [hashInput, setHashInput] = useState('');
    const [hashtags, setHashtags] = useState([]);

    const changeHashInput = (e) => {
        setHashInput(e.target.value);
    }

    const keyupSpace = (e) => {
        if(e.code === "Space") {
            const valid = validation(hashInput.trim());
            if(!valid) {
                setHashInput('');
                return;
            }
            else {
                setHashtags([...hashtags, hashInput]);
                setHashInput('');
            }
            
        }
        else return;
    }

    const hashtagSubmit = (e) => {
        e.preventDefault();
        const valid = validation(hashInput);
        if(!valid) return;
        setHashtags([...hashtags, hashInput]);
        setHashInput('');
    }
    return(
        <PostWrapper>
            <Header title="글쓰기"/>
            <PostContent>
                <input type="text" placeholder='제목을 입력해주세요.'></input>
                <hr></hr>
                <textarea placeholder="내용을 입력해주세요."></textarea>
                {/* <hr></hr> */}
                <HashTagForm onSubmit={hashtagSubmit}>
                    <input type="text" placeholder="해시태그 입력 후 엔터 또는 스페이스" onChange={changeHashInput} value={hashInput} onKeyUp={keyupSpace}></input>
                    <div className='hashtag-viewer'>
                        {hashtags.map((tag, index) => <p key={index} idx={index}>{tag}</p>)}
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