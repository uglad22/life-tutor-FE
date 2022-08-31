import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AnimationPage from '../components/animation/AnimationPage';
import mainLogo from '../components/images/mainLogo.png';

const Splash = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        setTimeout(()=> {
            navigate("/viewer/posting/list");
        }, 3500)
    }, [])
    return (
        <AnimationPage>
        <SplashWrapper>
            <LogoDiv style={{backgroundImage:`url(${mainLogo})`}}/>
        </SplashWrapper>
        </AnimationPage>
    )
}

export default Splash;

const SplashWrapper = styled.div`
    position:fixed;
    left:0;
    top:0;
    z-index:10000;
    width:100%;
    max-width:480px;
    height:100vh;
    left:50%;
    transform:translate(-50%, 0);
    background:${({theme})=> theme.colors.mainBlue};
    display:flex;
    justify-content: center;
    align-items:center;
    padding:0 20px;
    box-sizing:border-box;

    h1 {
        color:white;
        font-size:60px;
        font-weight:bold;
    }
`

const LogoDiv = styled.div`
    width:200px;
    height:200px;
    background-position:cover;
    background-size: 200px 200px;
`