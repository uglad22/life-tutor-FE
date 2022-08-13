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
    width:calc(100% - 40px);
    
    background:yellow;
    padding:20px;
    box-sizing:border-box;
    border:1px solid gray;
    margin:0 auto;
`