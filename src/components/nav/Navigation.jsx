import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { BiHomeAlt, BiEdit } from 'react-icons/bi';
import { BsChatLeft, BsPerson } from 'react-icons/bs';

const Navigation = () => {
    const navContentRef = useRef(null);

    const navigate = useNavigate();

    const iconClickHandler = (e) => {
        const childNodes = navContentRef.current.children;
        for(let i of childNodes) {
            i.classList.remove('clicked');
        }
        e.currentTarget.classList.add('clicked');
        navigate(e.currentTarget.dataset.url);
    }


    return(
        <NavigationWrapper>
            <NavigationContent ref={navContentRef}>
                <p className="clicked" data-url="/home/postings" onClick={iconClickHandler}><BiHomeAlt></BiHomeAlt></p>
                <p data-url="home/rooms" onClick={iconClickHandler}><BsChatLeft></BsChatLeft></p>
                <p data-url="/posting" onClick={iconClickHandler}><BiEdit></BiEdit></p>
                <p data-url="/mypage" onClick={iconClickHandler}><BsPerson></BsPerson></p>
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
    max-width:480px;
    height:100%;
    border-top:2px solid lightgray;
    background:white;

    p {
        cursor:pointer;
        font-size:1.5rem;
    }

    .clicked {
        color:blue;
    }
`