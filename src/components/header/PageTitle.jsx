import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

const PageTitle = ({ title, isAction }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    if(pathname === '/home/postings') return <PageTitleEmpty/>;

    return(
        <PageTitleWrapper>
            <PageTitleContent>
                <div onClick={()=>navigate(-1)}><p><MdArrowBackIosNew/></p></div>
                <h2>{title}</h2>
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
    .header-actions {
        visibility:hidden;
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

const PageTitleEmpty = styled.div`
    height:20px;
`