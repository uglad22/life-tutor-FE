import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LogoReversal from '../images/LogoReversal.png';


const Loading = () => {

    return(
        <LoadingWrapper>
            {/* <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box> */}
            <LogoDiv style={{backgroundImage:`url(${LogoReversal})`}}/>
        </LoadingWrapper>
    )
}

export default Loading;



const LoadingWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    width:100vw;
    max-width:480px;
    height:100vh;
    top:0;
    left:0;
    background:rgba(250,250,250,0.8);
    left:50%;
    transform:translate(-50%, 0);
`

const LogoDiv = styled.div`
    width:140px;
    height:90px;
    background-position:cover;
    background-size:140px 90px;
`