import React from 'react';
import styled from 'styled-components';
import { BiHomeAlt, BiEdit } from 'react-icons/bi';
import { BsChatLeft, BsPerson } from 'react-icons/bs';

const Navigation = () => {


    return(
        <NavigationWrapper>
            <NavigationContent>
                <BiHomeAlt></BiHomeAlt>
                <BsChatLeft></BsChatLeft>
                <BiEdit></BiEdit>
                <BsPerson></BsPerson>
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
    max-width:400px;
    margin:0 auto;
    height:60px;
    background:white;
    border-top:2px solid lightgray;
`

const NavigationContent = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:0 auto;
    width:calc(100% - 40px);
    height:100%;
`