import React, { useContext } from 'react';
import styled from 'styled-components';
import instance from '../shared/axios';
import kakao_login from '../components/images/kakao_login.png';
import LogoReversal from '../components/images/LogoReversal.png';
import { Link, useNavigate } from "react-router-dom";

import { userContext } from '../components/context/UserProvider';
import { Helmet } from 'react-helmet'


const Login = () => {

    const email_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    const navigate = useNavigate();

    const context = useContext(userContext);
    const { setUserInfo } = context.actions;


    const submitLogin = async () => {

        const login_data = {
            username : email_ref.current.value,
            password : pw_ref.current.value
        }

        //공란이면 알럿 띄우기
        if (email_ref || pw_ref === null) {
            alert ('ID 또는 비밀번호를 입력하세요!')
        } else {

            try {
                const res = await instance.post('/api/login', login_data);
                const token = res.headers.authorization;
                const { username, nickname, user_type, kakao } = res.data;
                const userData = {username, nickname, user_type, kakao};
                setUserInfo(userData);
                localStorage.setItem("Authorization", token);
                alert('환영합니다!');
                navigate('/viewer/posting/list');
            } catch (err) {
                console.log(err);
                alert('로그인에 문제가 생겼어요!');
            }
        }
    }



    return (
        <LoginWrapper>

            <Logo
            style={{backgroundImage:`url(${LogoReversal})`}}
            onClick={()=>navigate("/viewer/posting/list")}
            />

            <Helmet>
                <title>IT-ing</title>
                <link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
            </Helmet>

            <Inputarea>
                <input
                    placeholder="ID"
                    ref={email_ref}
                    type='email'
                />
                <input
                    placeholder="PW"
                    ref={pw_ref}
                    type="password"
                />
            </Inputarea>
            <Buttonarea>
                <button className="btn-login" onClick={submitLogin}>로그인</button>
                    <a
                        rel="noreferrer"
                        href="https://api.it-ing.co.kr/oauth2/authorization/kakao">
                        <button type="button" className="btn-kakao">
                        <img src={kakao_login} alt="" />
                        </button>
                    </a>
            </Buttonarea>
            <Singuparea>
                <Link to='/signup'><p>아직 회원이 아니신가요?</p></Link>
                <hr />
            </Singuparea>

        </LoginWrapper>

    )

}

export default Login;


const LoginWrapper = styled.div`
    padding-top : 80px;
    background-color : #FFFFFF;
    display : flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    input {
        margin-bottom : 20px;
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16px;
        gap: 4px;

        width: 327px;
        height: 58px;
        left: 24px;
        top: 268px;
        border : none;
        border-bottom: 2px solid #3549FF;
    }
`

const Logo = styled.div`
    height:80px;
    width:140px;
    background-size:140px 80px;
    background-position:cover;
    margin-bottom : 60px;
    cursor:pointer;
`

const Inputarea = styled.div`
    display : flex;
    flex-direction: column;
    margin-bottom : 38px;
`

const Buttonarea = styled.div`
    display : flex;
    flex-direction: column;
    align-items: center;
    
    .btn-login {
        margin-bottom : 20px;
        justify-content: center;
        padding: 18px 0px;
        gap: 8px;

        width: 335px;
        height: 60px;
        // left: 20px;
        // top: 427px;

        background: #3549FF;
        border-radius: 40px;
        border : none;

        font-family: 'Apple SD Gothic Neo';
        font-style: normal;
        // font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -0.3px;
        color: #FFFFFF;

    }

    .btn-kakao {

        margin-top : 100px;
        margin-bottom : 18px;
        border : none;
        background-color : none;


    }

    img {
        width: 335px;
    }

`

const Singuparea = styled.div`

    p {
        margin-bottom : 4px;
        color: #717171;
        font-size: 14px;
    }

    hr {
        width : 135px;
        margin-bottom : 43px;
    }

    a {
        color : black;
        text-decoration:none;
    }
`