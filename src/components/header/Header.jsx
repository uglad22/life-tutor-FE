import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import PageTitle from './PageTitle';

const Header = ({ title, isAction}) => {


    return(
        <HeaderWrapper>
            <PageTitle title={title} isAction={isAction}></PageTitle>
            <Search></Search>
        </HeaderWrapper>
    )
}

export default Header;

const HeaderWrapper = styled.div`
    position:fixed;
    top:0;
    left:0;
    /* height:60px; */
    width:100%;
    background:white;
    
`