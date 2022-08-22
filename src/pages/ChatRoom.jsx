import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import * as StompJS from 'stompjs'
import axios from 'axios';

const ChatRoom = () => {
    const navigate = useNavigate();
    const sock = new SockJS("https://3a8f-222-103-252-197.jp.ngrok.io/iting") //TODO: url 넣기
    const client= StompJS.over(sock);


    const headers = {} // TODO: 토큰 말고 어떤걸 넣을지?
    useEffect(()=> {
        const enterRoom = async () => {
            const res = await axios.put("https://3a8f-222-103-252-197.jp.ngrok.io/api/chat/room/82/enter", {
                headers: {
                    "Authorization":`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZSIsImV4cCI6MzU1MzE0MjMzNn0.SLm6jefNBbDTTxKI00yM00U_j4___Rj_PZdvc9tF5gI`
                }
            });
            const data = res.data;
            console.log(data);
        }

        // enterRoom().catch(console.error);

       const connect = () => {
        client.connect({}, ()=> {
            client.subscribe('/api/sub/82', (data) => {
                const newMessage = JSON.parse(data.body);
                if(newMessage.enter!=="ENTER") console.log(newMessage);
                
            })
        })
       }

    //    stompClient.subscribe(`/api/sub/${roomId}`, function (greeting) {
    //     const recv = JSON.parse(greeting.body);
    //     if(recv.enter === 'ENTER') showGreeting(recv.message);
    //     else showGreeting(recv.nickname + "("+recv.time+"): " + recv.message);
    //     });

       connect();
    //    firstSendMsg()


        return(()=> {
            disConnect();
        })
    }, []);

    const disConnect = () => {
        client.disconnect(() => {
            client.unsubscribe();
        });
        navigate('/viewer/posting/list');
    }

    const firstSendMsg = () => {
        const nickname = localStorage.getItem('user_nickname');
        client.send('api/pub/82', {}, JSON.stringify({
            "enter":"ENTER",
            "messageType":"TEXT",
            "nickname":"nickname",
        }))
    }

    const sendMsg = () => {
        client.send('/api/pub/82', {}, JSON.stringify({
            "enter":"COMM",
            "messageType":"TEXT",
            "nickname":"nickname",
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