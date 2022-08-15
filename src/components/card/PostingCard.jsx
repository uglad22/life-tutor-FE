import React from 'react';
import styled from 'styled-components';

const PostingCard = ({post}) => {

    return(
        <PostingCardWrapper>
            <PostingCardTitle>{post.title}</PostingCardTitle>
            <PostingCardContent>{post.posting_content}</PostingCardContent>
            <PostingCardUserInfo>
                <p>{post.nickname}</p><p>주니어</p>
            </PostingCardUserInfo>
            <hr></hr>
            <PostingCardFooter>
                <div className='posting-actions-icon'><p>100</p><p>100</p></div>
                <div className='posting-time'><p>1시간 전</p></div>
            </PostingCardFooter>
        </PostingCardWrapper>
    )
}

export default PostingCard;

const PostingCardWrapper = styled.div`
    width:calc(100% - 40px);
    border-radius:10px;
    background:lightgray;
    padding:20px;
    box-sizing:border-box;
    border:1px solid gray;
    margin:0 auto;
`

const PostingCardTitle = styled.h2`
    margin:0;
`

const PostingCardContent = styled.p`
    color:gray;
    margin-bottom:40px;
`

const PostingCardUserInfo = styled.div`
    display:flex;
    gap:10px;
    width:100%;
    margin-bottom:20px;
    p {
        margin:0;
        color:gray;
        font-weight:bold;
    }
`

const PostingCardFooter = styled.div`
    display:flex;
    p {
        margin:0;
        color:gray;
    }
    .posting-actions-icon {
        display:flex;
        gap:10px;
        flex:1;
    }

`