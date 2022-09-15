import React, { useState, useEffect, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserProvider';
import AutoCompleteCard from '../card/AutoCompleteCard';
import { chatroomAPI, postingsAPI } from '../../shared/api'
import _ from 'lodash';

const Search = () => {
    const [completedList, setCompletedList] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const context = useContext(userContext);
    const { username } = context.state.userInfo;
    const [searchInput, setSearchInput] = useState("");

    const searchPostDebounce = useMemo(() => _.debounce((value) => {
        postingsAPI.fetchAutoCompletePostingList(value).then((res) => {
            setCompletedList(res.data)
        }).catch((err) => {
            if(err.response && err.response.status === 500) {
                alert("로그인이 필요합니다.");
                setSearchInput("");
                navigate("/login");
                return;
            }
        });
    }, 400), [completedList])

    const searchRoomDebounce = useMemo(() => _.debounce((value) => {
        chatroomAPI.fetchAutoCompleteRoomList(value).then((res) => {
            setCompletedList(res.data);
        }).catch((err) => {
            if(err.response && err.response.status === 500) {
                alert("로그인이 필요합니다.");
                setSearchInput("");
                navigate("/login");
                return;
            }
        });
    }, 400), [completedList])

    const searchChangeHandler = async (e) => {
        setSearchInput(e.target.value);
        if(!e.target.value || e.target.value.length <= 1) {
            setCompletedList([]);
            return;
        }
        else {
            if(!username) return;
            else {
                if(pathname.includes("/viewer/room")) {
                    searchRoomDebounce(e.target.value);
                }
                else if(pathname.includes("/viewer/posting")) {
                    searchPostDebounce(e.target.value);
                }
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!username) {
            alert("로그인이 필요합니다.");
            return navigate("/login");
        }
        if(!searchInput) return;

        const inputResult = searchInput.replace(/[/!@#$%^&*~)(/?><,.\s]/g, "");
        if(!inputResult) {
            alert("특수문자 입력은 안 돼요!");
            setSearchInput("");
            return;
        }
        else if(inputResult.length === 1 || searchInput.length === 1) {
            alert("한 글자 이상으로 검색해주세요!");
            return;
        }

        if(pathname.includes("/posting")) {
            navigate(`/viewer/posting/search/${inputResult}`);
        }
        else {
            navigate(`/viewer/room/search/${inputResult}`);
        }
    }

    if(!pathname.includes('/viewer/')) return null;
    else if(pathname === "/viewer/posting/mypostings") return null;
    else if(pathname === '/viewer/commentinpost') return null;

    return(
        <SearchWrapper onSubmit={submitHandler}>
            <div className='search-wrapper'>
                <AutoComplete isShow={searchInput?"show":"notshow"}>
                    {(completedList?.length === 0 && searchInput) && <NoData>{!username?"로그인 후 이용해주세요" : "검색결과가 없습니다."}</NoData>}
                    {(!completedList&&completedList?.length < 2) || completedList?.map((value, index) => {
                         return <AutoCompleteCard key={index} value={value}/>
                    })}
                </AutoComplete>
            <div className='search-icon'>
            <svg width="30" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6715 16.0839L14.1874 12.5986C16.7944 9.11501 16.0835 4.17776 12.5996 1.57096C9.11577 -1.03583 4.17811 -0.325041 1.5711 3.15854C-1.03592 6.64213 -0.325068 11.5794 3.15881 14.1862C5.95734 16.2802 9.80107 16.2802 12.5996 14.1862L16.0853 17.6715C16.5233 18.1095 17.2335 18.1095 17.6715 17.6715C18.1095 17.2335 18.1095 16.5234 17.6715 16.0854L17.6715 16.0839ZM7.90827 13.5135C4.81197 13.5135 2.30195 11.0037 2.30195 7.90761C2.30195 4.81157 4.81197 2.30176 7.90827 2.30176C11.0046 2.30176 13.5146 4.81157 13.5146 7.90761C13.5113 11.0023 11.0032 13.5102 7.90827 13.5135Z"
                fill="#3549FF" fillOpacity="0.6"/>
            </svg>
            </div>
                <input type="text" placeholder='ex) 해시태그 검색' value={searchInput}
                 onChange={searchChangeHandler} maxLength="6"></input>
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
        z-index:10;
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

const AutoComplete = styled.div`
    position:absolute;
    top:50%;
    left:0;
    z-index:-10;
    width:100%;
    max-height:160px;
    background:#F6F7FF;
    box-sizing:border-box;
    padding-top:20px;
    border-radius: 0px 0px 10px 10px;
    overflow-y:auto;
    border: 2px solid lightgray;
    display:${props => props.isShow !== "show"?"none":null};

    &::-webkit-scrollbar {
        width:5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color:${({theme}) => theme.colors.mainBlue}; /*스크롤바의 색상*/
        border-radius: 50px;
    }
    &::-webkit-scrollbar-track {
        background-color:lightgray;
        border-radius: 50px;
    }
`

const NoData = styled.div`
    height:35px;
    display:flex;
    align-items:center;
    justify-content:center;
    color: gray;
`