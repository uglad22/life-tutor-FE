import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const pathname = location.pathname;
    if(!pathname.includes('/home/')) return null;

    return(
        <SearchWrapper>
            <input type="text" placeholder='해시태그 검색'></input>
        </SearchWrapper>
        
    )
}

export default Search;

const SearchWrapper = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    
    height:60px;
    width:calc(100% - 40px);
    max-width:480px;
    /* background:blue; */
    margin:0 auto;
    
    input {
        height:90%;
        width:100%;
        border-radius:10px;
        box-sizing:border-box;
        
    }
`

const EmptyContainer = styled.div`
   height:40px; 
`