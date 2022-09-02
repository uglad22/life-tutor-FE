import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import DeletableBadge from '../components/hashtag/DeletableBadge';
import { WhiteBackground } from '../style/sharedStyle'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { chatroomAPI } from '../shared/api';
import { hashtagValidation } from '../shared/sharedFn';
import { Helmet } from 'react-helmet'

const CreateRoom = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        titleInput:"",
        hashtagInput:""
    })
    const [hashtag, setHashtag] = useState([]);

    const { mutate:createRoom, isError:createRoomError } = useMutation(chatroomAPI.createChatRoom, {
        onSuccess:(data)=> {
            navigate(`/detail/room/chat/${data}`, {state:{isHost:true}});
        }
    })

    const InputsChangeHandler = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const keyupSpace = (e) => {
        if(e.code === "Space") {
            const valid = hashtagValidation(inputs.hashtagInput.trim());
            if(!valid) {
                setInputs({...inputs, hashtagInput:""});
                return;
            }
            else if(hashtag.length === 3) {
                alert('해시태그는 3개까지 등록 가능합니다.');
                setInputs({...inputs, hashtagInput:""});
                return;
            }
            else if(inputs.hashtagInput.length > 6) {
                alert("해시태그는 6자리까지 설정 할 수 있습니다.");
            }
            else {
                const result = inputs.hashtagInput.replace(/[/!@#$%^&*~)(/?><\s]/g, "");
                setHashtag([...hashtag, result]);
                setInputs({...inputs, hashtagInput:""});
            }
        }
    }

    const hashtagSubmitHandler = (e) => {
        e.preventDefault();
        const valid = hashtagValidation(inputs.hashtagInput);
        if(!valid) {
            setInputs({...inputs, hashtagInput:""});
            return;
        }
        else if(hashtag.length === 3) {
            alert('해시태그는 3개까지 등록 가능합니다.');
            setInputs({...inputs, hashtagInput:""});
            return;
        }
        else if(inputs.hashtagInput.length > 6) {
            alert("해시태그는 6자리까지 설정 할 수 있습니다.");
        }
        else {
            const result = inputs.hashtagInput.replace(/[/!@#$%^&*~)(/?><\s]/g, "");
            setHashtag([...hashtag, result]);
            setInputs({...inputs, hashtagInput:""});
        }
        
    }

    const createButtonClickHandler = () => {
        if(!inputs.titleInput) {
            alert("제목을 입력해주세요!");
            return;
        }
        createRoom({title:inputs.titleInput, hashtag});
    }

    useEffect(()=> {
        return(()=> {
            setInputs({titleInput:"", hashtagInput:""});
            setHashtag([]);
        })
    }, [])

    if(createRoomError) return <p>에러</p>
    return(
        <WhiteBackground>
            <Helmet>
                <title>IT-ing</title>
                <link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
            </Helmet>
            <Header title={"채팅 만들기"} isAction={false}/>
        <CreateRoomWrapper>
        <CreateRoomForm onSubmit={(e)=> e.preventDefault()}>
            <p>채팅방 제목</p>
            <input type="text" placeholder='제목을 입력하세요.'
            value={inputs.titleInput} onChange={InputsChangeHandler} name="titleInput"></input>
        </CreateRoomForm>
        <CreateRoomForm onSubmit={hashtagSubmitHandler}>
            <p>해시태그 입력</p>
            <input type="text" placeholder='해시태그를 입력하세요.(6자리 이하)'
            value={inputs.hashtagInput} onChange={InputsChangeHandler} name="hashtagInput" onKeyUp={keyupSpace}></input>
        </CreateRoomForm>
        <HashtagArea>
            {hashtag.map((tag, index) => <DeletableBadge key={index} hashtag={hashtag} setHashtag={setHashtag} idx={index}>{tag}</DeletableBadge> )}
        </HashtagArea>
        <CreateButton onClick={createButtonClickHandler}>만들기</CreateButton>
        </CreateRoomWrapper>
        </WhiteBackground>
    );
}

export default CreateRoom;

const CreateRoomWrapper = styled.div`
    /* position:relative; */
    width:calc(100% - 40px);
    max-width:480px;
    padding-top:100px;
    /* background:red; */
    margin:0 auto;
`

const CreateRoomForm = styled.form`
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
        padding:0 10px;
    }
`

const HashtagArea = styled.div`
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    width:100%;
`

const CreateButton = styled.button`
    width:100%;
    background:blue;
    border-radius:40px;
    height:60px;
    background:${({ theme })=> theme.colors.mainBlue};
    color:white;
    font-size:18px;
    font-weight:600;
    margin-top:15vh;
    cursor:pointer;
    border:none;

`