import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { BiHomeAlt, BiEdit } from 'react-icons/bi';
import { BsChatLeft, BsPerson } from 'react-icons/bs';

const Navigation = () => {

    const navigate = useNavigate();

    const iconClickEventByLoginUser = (e) => {
        navigate(e.currentTarget.dataset.url);
    }


    return(
        <NavigationWrapper>
            <NavigationContent>
                <Link to="/home/postings"><BiHomeAlt></BiHomeAlt></Link>
                <Link to="/home/rooms"><BsChatLeft></BsChatLeft></Link>
                <BiEdit data-url="/posting" onClick={iconClickEventByLoginUser}></BiEdit>
                <BsPerson data-url="/mypage" onClick={iconClickEventByLoginUser}></BsPerson>
            </NavigationContent>
        </NavigationWrapper>
    )
}

export default Navigation;

const NavigationWrapper = styled.div`
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    margin:0 auto;
    height:60px;
    
`

const NavigationContent = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:0 auto;
    width:calc(100% - 40px);
    max-width:400px;
    height:100%;
    border-top:2px solid lightgray;
    background:white;
`