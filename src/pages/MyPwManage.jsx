import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { userContext } from "../components/context/UserProvider";
import Header from '../components/header/Header';
import instance from '../shared/axios';

const MyPwManage = () => {
    const _pwcheck = /^(?=.*[!@#$%^&.*])[0-9a-zA-Z!@#$%^&.*]{8,20}$/;
    const nowPw_ref = useRef();
    const newPw_ref = useRef();
    const newConfirmPw_ref = useRef();
    const navigate = useNavigate();

    const context = useContext(userContext);
    const { userInfo } = context.state;

    const [ changeBtnState, setChangeBtnState ] = useState(false);

    const pwCheckHandler = () => {
      if(_pwcheck.test(nowPw_ref.current.value) && _pwcheck.test(newPw_ref.current.value) && newPw_ref.current.value.length === newConfirmPw_ref.current.value.length) {
        return setChangeBtnState(true);
      } else {
        return setChangeBtnState(false);
      }
    };

    const myPwChangeHandler = async () => {
      const data = {
          password: nowPw_ref.current.value,
          changePassword: newPw_ref.current.value,
          confirmChangePassword: newConfirmPw_ref.current.value
      }
      try {
          const res = await instance.put("/api/mypage/user/password", data);
          // console.log(res);
          alert('비밀번호를 변경하였습니다.');
          navigate("/mypage");
      } catch (err) {
          // console.log(err.response.data);
          alert(err.response.data);
      }
    };

    useEffect(() => {
      if (userInfo.kakao) {
        alert("카카오회원은 비밀번호 변경을 할 수 없습니다.");
        return navigate("/mypage");
      }
    }, []);

  return (
    <>
      <Header title="비밀번호 변경" isAction={true} />
      <MyPwWrapper>
        <NowPwBox>
          <p>현재 비밀번호</p>
          <input ref={nowPw_ref} type="password" onChange={pwCheckHandler} autoComplete="off"></input>
        </NowPwBox>
        <NewPwBox>
          <p>신규 비밀번호</p>
          <input ref={newPw_ref} type="password" placeholder="영문이나 숫자, 특수문자(!@#$%^&.*)포함 8~20자" onChange={pwCheckHandler} autoComplete="off"></input>
          <input ref={newConfirmPw_ref} type="password" placeholder="비밀번호 확인" onChange={pwCheckHandler} autoComplete="off"></input>
        </NewPwBox>
        <ChangeMyPwBtn onClick={() => {myPwChangeHandler()}} disabled={!changeBtnState}>변경하기</ChangeMyPwBtn>
      </MyPwWrapper>
    </>
  );
};

export default MyPwManage;

const MyPwWrapper = styled.div`
  margin-top: 60px;
  background: white;
  width: 100%;
  height: calc(100% - 60px - 71px);
  position: fixed;
  left:50%;
  transform:translate(-50%, 0);
  top:0;
  color: #757575;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width:480px;
  input {
    box-sizing: border-box;
    height: 46px;
    background: #ffffff;
    border: 1.5px solid #d8d8d8;
    border-radius: 8px;
    padding: 14px;
    ::placeholder {
      color: #757575;
    }
  }
`;

const NowPwBox = styled.div`
  width: 336px;
  margin: 27.5px auto 0px;
  display: flex;
  flex-direction: column;
  p {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

const NewPwBox = styled.div`
  width: 336px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  p {
    font-size: 12px;
    margin-bottom: 8px;
  }
  input {
    margin-bottom: 8px;
  }
`;

const ChangeMyPwBtn = styled.button`
    width: 335px;
    margin: 20px auto 0px;
    background: ${(props) => (props.disabled ? "#757575" : "#3549FF")};
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
    color: white;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    border-radius: 40px;
    border:none;
`;