import React from 'react';
import styled from 'styled-components';
import { MdArrowBackIosNew } from 'react-icons/md';

const PageTitle = () => {
    

    return(
        <PageTitleWrapper>
            <PageTitleContent>
                <div><p><MdArrowBackIosNew/></p></div>
                <h2>본문 상세</h2>
                <div className='header-actions'>
                    <p>수정</p>
                </div>
            </PageTitleContent>
        </PageTitleWrapper>
    )
}

export default PageTitle;

const PageTitleWrapper = styled.div`
    width:100%;
    max-width:400px;
    margin:0 auto;
    /* background:blue; */
    /* display:flex; */
    height:60px;
    border-bottom:1px solid lightgray;
    p {
        margin:0;
    }
`

const PageTitleContent = styled.div`
    width:calc(100% - 40px);
    margin:0 auto;
    /* background:red; */
    height:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    
`