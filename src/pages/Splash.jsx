import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AnimationPage from '../components/animation/AnimationPage';

const Splash = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        setTimeout(()=> {
            navigate("/home/postings");
        }, 4000)
    }, [])
    return (
        <AnimationPage>
        <SplashWrapper>
            <h1>IT-ING</h1>
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

    h1 {
        color:white;
        font-size:60px;
        font-weight:bold;
    }
`