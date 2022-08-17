import React, { useState } from 'react';
import styled from 'styled-components';
import instance from '../shared/axios';

const Signup = () => {

    //ref로 input값 받아오기
    const email_ref = React.useRef(null);
    const nickname_ref = React.useRef(null);
    const pw_ref = React.useRef(null);
    const pwcheck_ref = React.useRef(null);

    //input값 제한 조건 충족에 따른 p태그 반환
    const [emailcheck, setEmailCheck] = useState(null);
    const [nicknamecheck, setNickNameCheck] = useState(null);
    const [pwcheck, setPwCheck] = useState(null);
    const [pwrecheck, setPwReCheck] = useState(null);
    const [userType, setUserType] = useState(null);

    //아이디(이메일) 제한 조건 : 이메일 형식
    const email_limit = (email) => {
        let _reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return _reg.test(email);
    };

    //아이디 형식이 맞지 않을 경우
    const idCheck = () => {
        if (!email_limit(email_ref.current.value)) {
            setEmailCheck(false);
        } else {
            setEmailCheck(true);
        }
    }

    // 닉네임 제한 조건 : 2자리 이상 5자리 이하 한글
    const nickname_limit = (nickname) => {
        let _reg = /^(?=.*[ㄱ-ㅎ가-힣])[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,5}$/;
        return _reg.test(nickname);
    };

    //닉네임 형식이 맞지 않을 경우
    const nickNameCheck = () => {
        if (!nickname_limit(nickname_ref.current.value)) {
            setNickNameCheck(false);
        } else {
            setNickNameCheck(true);
        }
    }

    // 비밀번호 제한 조건 : 8자리 이상 20자리 이하
    const password_limit = (password) => {
        let _reg = /^[0-9a-zA-Z!@#$%^&.*]{8,20}$/;
        return _reg.test(password);
    };

    //비밀번호 형식이 맞지 않을 경우
    const pwCheck = () => {
        if (!password_limit(pw_ref.current.value)) {
            setPwCheck(false);
        } else {
            setPwCheck(true);
        }
    }

    // 유저 비밀번호 확인 일치 체크
    const pwReCheck = () => {
        if (pw_ref.current.value !== pwcheck_ref.current.value) {
            setPwReCheck(false);
        } else {
            setPwReCheck(true);
        }
    }

    // 유저 타입 가져오기
    const selectUserType  = (e) => {
        setUserType(e.target.value);
    }

    const submitId = async () => {
        if (emailcheck !== '') {
            try {
                const res = await instance.get(`/api/users/email/${email_ref.current.value}`);
                console.log(res);
                alert('사용 가능한 ID 입니다!');
            //   navigate('/login');
            } catch (err) {
                console.log(err);
                alert('이미 사용된 ID 입니다!');
            }
        }

    }

    const submitNickName = async () => {
        if (nicknamecheck !== '') {
            try {
                const res = await instance.get(`/api/users/nickname/${nickname_ref.current.value}`);
                console.log(res);
                alert('사용 가능한 닉네임 입니다!');
            //   navigate('/login');
            } catch (err) {
                console.log(err);
                alert('이미 사용된 닉네임 입니다!');
            }
        }
    }
    
    const submitSignup = async () => {

        //input 값에 공란이 있으면 알럿 띄우기
        if (email_ref.current.value === '') {
            alert ('아이디를 입력하세요!')
        } else if (nickname_ref.current.value === '') {
            alert ('닉네임을 입력하세요!')
        } else if (pw_ref.current.value === '') {
            alert ('비밀번호를 입력하세요!')
        } else if (pwcheck_ref.current.value === '') {
            alert ('비밀번호를 다시 입력하세요!')
        } else if (userType === null) {
            alert ('유저 타입을 선택해주세요!')
        }

        //회원가입 성공시 db는 서버로 보내고 알럿띄우고 login 페이지로 이동
        if (emailcheck && nicknamecheck && pwcheck && pwrecheck === true && userType !==null) {

            //보내줄 데이터 모아서 변수에 담기!
            const user_data = {
                username : email_ref.current.value,
                nickname : nickname_ref.current.value,
                password : pw_ref.current.value,
                checkPassword : pwcheck_ref.current.value,
                user_type : userType
            }

            console.log(user_data);
            // alert('가입을 축하드려요!')

            try {
                const res = await instance.post('/api/signup', user_data);
                console.log(res);
                alert('회원가입이 완료되었습니다!');
            //   navigate('/login');
            } catch (err) {
                console.log(err);
                alert('회원가입에 문제가 생겼어요!');
            }
      }

  }

    return(
        <SignupWrapper>
            <h1>회원가입</h1>

            <p>ID</p>
            <input
                placeholder="이메일 형식"
                ref={email_ref}
                onBlur={idCheck}
            />
            <button onClick={submitId}>ID 중복확인</button>

            <p>닉네임</p>
            <input
                placeholder="2자리 이상 5자리 이하 한글"
                ref={nickname_ref}
                onBlur={nickNameCheck}
            />
            <button onClick={submitNickName}>닉네임 중복확인</button>

            <p>PW</p>
            <input 
                type="password"
                placeholder="영문 8-20자, 특수문자(!@#$%^&.*)포함 "
                ref={pw_ref}
                onBlur={pwCheck}
            />

            <p>PW 확인</p>
            <input
                type="password"
                placeholder="비밀번호 확인"
                ref={pwcheck_ref}
                onBlur={pwReCheck}
            />

            <p>User Type</p>
                <div onChange={selectUserType}>
                    <input type="radio" id="contactChoice1"
                    name="userType" value="SEEKER" />
                    <label htmlFor="취준생">취준생</label>

                    <input type="radio" id="contactChoice2"
                    name="userType" value="JUNIOR" />
                    <label htmlFor="주니어">주니어</label>

                    <input type="radio" id="contactChoice3"
                    name="userType" value="SENIOR" />
                    <label htmlFor="시니어">시니어</label>
                </div>
                <br />
            <button
                type="submit"
                onClick={submitSignup}
            >가입하기</button>
            <p>회원이시라면?</p>

        </SignupWrapper>
    )
}

export default Signup;

const SignupWrapper =styled.div`


`