import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import axios from 'axios';
import { WhiteBackground } from '../style/sharedStyle'

const CreateRoom = () => {

    return(
        <WhiteBackground>
            <Header title={"채팅 만들기"} isAcion={false}/>
        <CreateRoomWrapper>
        <CreateRoomForm>
            <p>채팅방 제목</p>
            <input type="text" placeholder='제목을 입력하세요.'></input>
        </CreateRoomForm>
        <CreateRoomForm>
            <p>해시태그 입력</p>
            <input type="text" placeholder='해시태그를 입력 후 엔터 또는 스페이스.'></input>
        </CreateRoomForm>
        </CreateRoomWrapper>
        </WhiteBackground>
    );
}

export default CreateRoom;

const CreateRoomWrapper = styled.div`
    width:calc(100% - 40px);
    max-width:480px;
    padding-top:100px;
    /* background:red; */
    margin:0 auto;
`

const CreateRoomForm = styled.div`
    display:flex;
    flex-direction:column;
    gap:8px;
    margin-bottom:20px;

    p {
        font-weight:600;
        font-size:14px;
        letter-spacing:-0.3px;
    }

    input {
        border: 1.5px solid #D8D8D8;
        border-radius:8px;
        height:46px;
        width:100%;
        box-sizing:border-box;
    }
`