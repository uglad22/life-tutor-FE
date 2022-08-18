import React from 'react';
import styled from 'styled-components';

const PostingCard = ({post}) => {

    return(
        <PostingCardWrapper>
            <PostingCardBody>
            <PostingCardTitle>{post.title}</PostingCardTitle>
            <PostingCardContent>{post.posting_content}</PostingCardContent>
            <PostingCardHashtagArea>
                {post.hashtag.map((item, index) => <p key={index}>{item}</p>)}
            </PostingCardHashtagArea>
            <PostingCardUserInfo>
                <p>{post.nickname}</p><p style={{color:"#3549FF"}}>주니어</p>
            </PostingCardUserInfo>
            </PostingCardBody>
            <HRDiv/>
            <PostingCardFooter>
                <div className='posting-actions-icon'><p>100</p><p>100</p></div>
                <div className='posting-time'><p>1시간 전</p></div>
            </PostingCardFooter>
        </PostingCardWrapper>
    )
}

export default PostingCard;

const PostingCardWrapper = styled.div`
    width:100%;
    border-radius:10px;
    background:white;
    /* padding:20px; */
    box-sizing:border-box;
    margin:0 auto;
    box-shadow: 1px 1px 1px lightgray;
`

const PostingCardBody = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
    padding:20px;
    box-sizing:border-box;
`

const PostingCardTitle = styled.div`
    font-size:18px;
    
    font-weight:500;
    line-height: 22px;
`

const PostingCardContent = styled.p`
    font-weight:500;
    font-size:11px;
    
    letter-spacing: -0.3px;
    line-height: 16px;
    color:${({ theme }) => theme.colors.lightGray};
`

const PostingCardHashtagArea = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    gap:5px;
`

const HRDiv = styled.div`
    width:100%;
    height:1px;
    border:1px solid;
    border-color:${({theme}) => theme.colors.hrGray};
    box-sizing:border-box;
    margin-bottom:15px;

`

const PostingCardUserInfo = styled.div`
    display:flex;
    gap:10px;
    width:100%;
    p {
        margin:0;
        color:gray;
        font-weight:bold;
    }
`

const PostingCardFooter = styled.div`
    display:flex;
    padding:0 20px 20px 20px;
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