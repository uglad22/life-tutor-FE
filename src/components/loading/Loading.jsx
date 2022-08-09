import React from 'react';
import styled from 'styled-components';


const Loading = () => {

    return(
        <LoadingWrapper>
            <div>로딩중입니다...🙄</div>
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
    height:100vh;
    top:0;
    left:0;
`