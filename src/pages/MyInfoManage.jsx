import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../shared/axios';

import Header from '../components/header/Header';
import { userContext } from '../components/context/UserProvider';

const MyInfoManage = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { userInfo } = context.state;
  const { setUserInfo } = context.actions;
  const [ nicknameCheck, setNicknameCheck ] = useState(true);

  const [ dupCheckBtnState, setDupCheckBtnState ] = useState(false);
  const [ changeBtnState, setChangeBtnState ] = useState(false);

  const _nickReg = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,10}$/;

  const nickname_ref = useRef();
  const usertype_ref = useRef();

  const nicknameCheckHandler = async () => {
    try {
      const res = await instance.get(
        `/api/users/nickname/${nickname_ref.current.value}`
      );
      console.log(res);
      setChangeBtnState(true);
      alert("사용 가능한 닉네임입니다.");
    } catch (err) {
      console.log(err);
      setChangeBtnState(false);
      alert(err.response.data);
    }
  };

  const nicknameHandler = () => {
    if (nickname_ref.current.value === userInfo.nickname) {
      setNicknameCheck(true);
      setChangeBtnState(true);
    } else {
      setNicknameCheck(false);
      setChangeBtnState(false);
    };

    if (_nickReg.test(nickname_ref.current.value) && nickname_ref.current.value !== '' && nickname_ref.current.value !== userInfo.nickname) {
      return setDupCheckBtnState(true);
    } else {
      return setDupCheckBtnState(false);
    };
  }

  console.log(nicknameCheck);

  const userTypeHandler = () => {
    if (usertype_ref.current.value !== userInfo.user_type && nicknameCheck) {
      return setChangeBtnState(true);
    } else {
      return setChangeBtnState(false);
    }
  }

  const myInfoChangeHandler = async () => {
    const data = {
      nickname: nickname_ref.current.value,
      user_type: usertype_ref.current.value,
    };
    try {
      const res = await instance.put("/api/mypage/user/info", data);
      console.log("성공", res);
      alert("개인정보가 변경되었습니다.");
      const { nickname, user_type } = data;
      const { username, kakao } = userInfo;
      const userData = { username, nickname, user_type, kakao };
      setUserInfo(userData);
      navigate("/mypage");
    } catch (err) {
      console.log("실패", err);
    }
  };

  return (
    <>
      <Header title="개인정보 변경" isAction={true} />
      <MyInfoWrapper>
        <NicknameBox>
          <p>닉네임</p>
          <NicknameInputBox>
            <input ref={nickname_ref} defaultValue={userInfo.nickname} onChange={nicknameHandler}></input>
            <NicknameCheckBtn onClick={nicknameCheckHandler} disabled={!dupCheckBtnState}> 중복 확인 </NicknameCheckBtn>
          </NicknameInputBox>
        </NicknameBox>
        <UserTypeBox>
          <select ref={usertype_ref} onChange={userTypeHandler} defaultValue={userInfo.user_type}>
            <option value="SEEKER">취준생</option>
            <option value="JUNIOR">주니어</option>
            <option value="SENIOR">시니어</option>
          </select>
        </UserTypeBox>
        <ChangeMyInfoBtn onClick={myInfoChangeHandler} disabled={!changeBtnState} > 변경하기 </ChangeMyInfoBtn>
      </MyInfoWrapper>
    </>
  );
};

export default MyInfoManage;

const MyInfoWrapper = styled.div`
  margin-top: 60px;
  background: white;
  width: 100%;
  height: calc(100% - 60px - 71px);
  position: fixed;
  color: #757575;
  max-width: 480px;
  left: 50%;
  transform: translate(-50%, 0);
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

const NicknameBox = styled.div`
  width: 336px;
  margin: 0 auto;
  margin-top: 27.5px;
  p {
    margin-bottom: 8px;
  }
`;

const NicknameInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  input {
    width: 203px;
  }
`;

const NicknameCheckBtn = styled.button`
  width: 128px;
  height: 46px;
  background: ${(props) => (props.disabled ? "#757575" : "#3549FF")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  font-weight: bold;
`;

const UserTypeBox = styled.div`
  width: 336px;
  margin: 41px auto 0px;
  select {
    box-sizing: border-box;
    width: 100%;
    height: 46px;
    color: #8d8d8d;
    background: #ffffff;
    border: 1.5px solid #d8d8d8;
    border-radius: 8px;
    padding: 14px;
  }
`;

const ChangeMyInfoBtn = styled.button`
  width: 335px;
  margin: 35px auto 0px;
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
  border: none;
`;
