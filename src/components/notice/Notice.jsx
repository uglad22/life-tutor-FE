import React from 'react';
import styled from 'styled-components';

const Notice = ({ title, text }) => {

    return (
        <NoticeWrapper>
            <ContentArea>
                <p className='notice-title'>{ title }</p>
                <p className='notice-text'>{ text }</p>
            </ContentArea>
            <ImageArea>
                sfdasdf
            </ImageArea>
        </NoticeWrapper>
    );
}

export default Notice;

const NoticeWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:100%;
    height:70vh;
    padding-top:50px;
    box-sizing:border-box;
    gap:10px;
`

const ContentArea = styled.div`
    width:100%;
    color:${({theme}) => theme.colors.mainBlue};
    p {
        text-align:center;
    }
    .notice-title {
        font-weight:700;
        font-size:30px;
        letter-spacing:-0.3px;
    }
    .notice-text {
        font-weight:600;
        font-size:16px;
        letter-spacing:-0.3px;
    }
`


const ImageArea = styled.div`
    width:100%;
`