import React from 'react';
import styled from 'styled-components';

const PostingCard = ({post}) => {

    return(
        <PostingCardWrapper>
            <p>{post.nickname}</p>
            <p>{post.title}</p>
            <p>{post.posting_content}</p>
        </PostingCardWrapper>
    )
}

export default PostingCard;

const PostingCardWrapper = styled.div`
    width:70vw;
    height:50vh;
    background:yellow;
    padding:20px;
    box-sizing:border-box;
    border:1px solid gray;
`