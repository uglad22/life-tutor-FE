import React from 'react';
import styled from 'styled-components';

const Search = () => {


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
    margin-top:20px;
    height:60px;
    width:calc(100% - 40px);
    /* background:blue; */
    margin:0 auto;
    
    input {
        height:90%;
        width:100%;
        border-radius:10px;
        box-sizing:border-box;
        
    }
`