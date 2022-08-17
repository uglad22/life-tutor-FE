import React from 'react';
import styled from 'styled-components';
import instance from '../shared/axios';
import kakao_login from '../components/images/kakao_login.png';

const Login = () => {

    const email_ref = React.useRef(null);
    const pw_ref = React.useRef(null);


    const submitLogin = async () => {

        const login_data = {
            username : email_ref.current.value,
            password : pw_ref.current.value
        }

        //공란이면 알럿 띄우기
        // if (login_data.username || login_data.password === '') {
        //     alert ('ID 또는 비밀번호를 입력하세요!')
        // } else {

            try {
                const res = await instance.post('/api/login', login_data);
                console.log(res);
                alert('환영합니다!');
            //   navigate('/main');
            } catch (err) {
                console.log(err);
                alert('로그인에 문제가 생겼어요!');
            }

        // }

    }



    return (
        <LoginWrapper>
            <Logo> LOGO </Logo>
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
                <button onClick={submitLogin}>로그인</button>
                    <a
                        rel="noreferrer"
                        href="http://15.164.226.110/oauth2/authorization/kakao">
                        <button type="button" className="btn-kakao">
                        <img src={kakao_login} alt="" />
                        </button>
                    </a>
            </Buttonarea>
            <Singuparea>
                <p>아직 회원이 아니신가요?</p>
            </Singuparea>

        </LoginWrapper>

    )

}

export default Login;


const LoginWrapper = styled.div`
    height: 60vh;
    margin-top : 80px;

    display : flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    input {
        margin-bottom : 20px;
    }

    button {
        margin-bottom : 20px;
    }

`

const Logo = styled.div`


`

const Inputarea = styled.div`
    display : flex;
    flex-direction: column;

`

const Buttonarea = styled.div`
    display : flex;
    flex-direction: column;

`

const Singuparea = styled.div`

`