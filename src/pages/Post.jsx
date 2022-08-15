import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';

const Post = () => {
    return(
        <PostWrapper>
            <Header title="글쓰기"/>
        </PostWrapper>
    )
}

export default Post;

const PostWrapper = styled.div`
    padding-top:80px;
    width:calc(100% - 40px);
    margin:0 auto;
    background:blue;
`