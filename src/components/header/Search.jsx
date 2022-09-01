import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserProvider';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const context = useContext(userContext);
    const { username } = context.state.userInfo;
    const [searchInput, setSearchInput] = useState("");

    const searchChangeHandler = (e) => {
        setSearchInput(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!username) {
            alert("로그인이 필요합니다.");
            return;
        }
        if(!searchInput) return;
        if(pathname.includes("/posting")) {
            navigate(`/viewer/posting/search/${searchInput}`);
        }
        else {
            navigate(`/viewer/room/search/${searchInput}`);
        }
    }

    if(!pathname.includes('/viewer/')) return null;
    else if(pathname === "/viewer/posting/mypostings") return null;

    return(
        <SearchWrapper onSubmit={submitHandler}>
            <div className='search-wrapper'>
            <div className='search-icon'>
            <svg width="30" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6715 16.0839L14.1874 12.5986C16.7944 9.11501 16.0835 4.17776 12.5996 1.57096C9.11577 -1.03583 4.17811 -0.325041 1.5711 3.15854C-1.03592 6.64213 -0.325068 11.5794 3.15881 14.1862C5.95734 16.2802 9.80107 16.2802 12.5996 14.1862L16.0853 17.6715C16.5233 18.1095 17.2335 18.1095 17.6715 17.6715C18.1095 17.2335 18.1095 16.5234 17.6715 16.0854L17.6715 16.0839ZM7.90827 13.5135C4.81197 13.5135 2.30195 11.0037 2.30195 7.90761C2.30195 4.81157 4.81197 2.30176 7.90827 2.30176C11.0046 2.30176 13.5146 4.81157 13.5146 7.90761C13.5113 11.0023 11.0032 13.5102 7.90827 13.5135Z"
                fill="#3549FF" fillOpacity="0.6"/>
            </svg>
            </div>
                <input type="text" placeholder='ex) 개발자' value={searchInput}
                 onChange={searchChangeHandler}></input>
            </div>
        </SearchWrapper>
        
    )
}

export default Search;

const SearchWrapper = styled.form`
    /* position:relative; */
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    
    height:60px;
    width:calc(100% - 40px);
    max-width:480px;
    /* background:blue; */
    margin:0 auto;

    .search-wrapper {
        position:relative;
    }

    .search-icon {
        display:flex;
        align-items:center;
        /* background:red; */
        position:absolute;
        height:46px;
        top:0;
        left:25px;
        /* background: ${({ theme }) => theme.colors.searchBlue}; */
    }
    
    input {
        height:46px;
        width:100%;
        border-radius:30px;
        box-sizing:border-box;
        /* font-weight:600; */
        background: ${({ theme }) => theme.colors.searchBlue};
        color:${({ theme }) => theme.colors.darkGray};
        border:2px solid lightgray;
        padding-left:65px;
        font-size:17px;
    }

    // placeholder 색상 변경
    input::placeholder {color:#CBCBCB;}
    input::-webkit-input-placeholder {color:#CBCBCB;}
    input::-ms-input-placeholder {color:#CBCBCB;}
`