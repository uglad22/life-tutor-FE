import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import * as StompJS from 'stompjs'
import axios from 'axios';
import instance from '../shared/axios';
import { userContext } from '../components/context/UserProvider';

const ChatRoom = () => {
    const [userNickname, setUserNickname] = useState("");
    const context = useContext(userContext);
    const { userInfo } = context.state;
    const navigate = useNavigate();
    const sock = new SockJS(`${process.env.REACT_APP_API_URL}/iting`) //TODO: url 넣기
    const client= StompJS.over(sock);


    console.log(userInfo);
    const headers = {} // TODO: 토큰 말고 어떤걸 넣을지?
    useEffect(()=> {
        const enterRoom = async () => {
            const res = await instance.put(`/api/chat/room/1/enter`);
            const data = res.data;
            console.log(data);
            setUserNickname(data);
        }

        enterRoom().catch(console.error);
       
        client.connect(headers, ()=> {
            
            client.send('/api/pub/1', {}, JSON.stringify({
                "enter":"ENTER",
                "messageType":"TEXT",
                "nickname":"king1", // FIXME: 여기다가 nickname 넣기
            }))

            client.subscribe('/api/sub/1', (data) => {
                const newMessage = JSON.parse(data.body);
                console.log(newMessage);
                
            })
        })
       

    //    function connect() {
    //     const socket = new SockJS('http://15.164.226.110/iting');
    //     stompClient = Stomp.over(socket);
    //     stompClient.connect({}, function (frame) {
    //     setConnected(true);
    //     stompClient.send(`/api/pub/${roomId}`,{},JSON.stringify(
    //     {'messageType':'TEXT','enter':'ENTER','nickname':'visitor'}
    //     ));
    //     stompClient.subscribe(`/api/sub/${roomId}`, function (greeting) {
    //     const recv = JSON.parse(greeting.body);
    //     if(recv.enter === 'ENTER') showGreeting(recv.message);
    //     else showGreeting(recv.nickname + "("+recv.time+"): " + recv.message);
    //     });
    //     });
    //     }



    //    stompClient.subscribe(`/api/sub/${roomId}`, function (greeting) {
    //     const recv = JSON.parse(greeting.body);
    //     if(recv.enter === 'ENTER') showGreeting(recv.message);
    //     else showGreeting(recv.nickname + "("+recv.time+"): " + recv.message);
    //     });
        // enterRoom().catch(console.error);
        // connect();
       


        return(()=> {
            disConnect();
        })
    }, []);

    const disConnect = () => {
        client.disconnect(() => {
            client.unsubscribe();
        });
        // navigate('/viewer/posting/list');
    }

    const firstSendMsg = () => {
        // TODO: context api 에서 nickname 가져오기
        client.send('/api/pub/1', {}, JSON.stringify({
            "enter":"ENTER",
            "messageType":"TEXT",
            "nickname":"king1", // FIXME: 여기다가 nickname 넣기
        }))
    }

    const sendMsg = () => {
        client.send('/api/pub/1', {}, JSON.stringify({
            "enter":"COMM",
            "messageType":"TEXT",
            "nickname":"king1",
            "message":"안녕하세요"
        }))
    }


    return (
        <>
        <button onClick={sendMsg}>보내기</button>
        </>
    );
}

export default ChatRoom;