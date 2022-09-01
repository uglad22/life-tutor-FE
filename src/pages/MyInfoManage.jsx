import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../shared/axios';

import Header from '../components/header/Header';
import { userContext } from '../components/context/UserProvider';
import { userTypeTrans } from '../shared/sharedFn';

const MyInfoManage = () => {
    const navigate = useNavigate();
    const context = useContext(userContext);
    const { userInfo } = context.state;
    const [ nicknameCheck, setNicknameCheck ] = useState(false);

    const _reg = /^(?=.*[ㄱ-ㅎ가-힣])[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,5}$/;

    const nickname_ref = useRef();
    const usertype_ref = useRef();

    const nicknameCheckHandler = async () => {
        if (!_reg.test(nickname_ref.current.value)) {
            return alert('닉네임은 2자 이상 5자 이하 한글로 해주세요.');
        }
        try {
            const res = await instance.get(`/api/users/nickname/${nickname_ref.current.value}`);
            console.log(res);
            setNicknameCheck(true);
            alert('사용 가능한 닉네임입니다.');
        } catch (err) {
            console.log(err);
            setNicknameCheck(false);
            alert('이미 사용된 닉네임입니다.');
        }
    }

    const myInfoChangeHandler = async () => {
        if (nicknameCheck === false) {
            return alert('닉네임 중복확인을 해주세요.');
        };
        const data = {
            "nickname": nickname_ref.current.value,
            "user_type": usertype_ref.current.value
        };
        console.log(data);
        try {
            const res = await instance.put("/api/mypage/user/info", data);
            console.log("성공", res);
            alert('개인정보가 변경되었습니다.');
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
            <input ref={nickname_ref}></input>
            <NicknameCheckBtn onClick={() => {nicknameCheckHandler()}}>중복 확인</NicknameCheckBtn>
          </NicknameInputBox>
        </NicknameBox>
        <UserTypeBox>
            <select ref={usertype_ref} defaultValue={userTypeTrans(userInfo.user_type)}>
                <option value="SEEKER">취준생</option>
                <option value="JUNIOR">주니어</option>
                <option value="SENIOR">시니어</option>
            </select>
        </UserTypeBox>
        <ChangeMyInfoBtn onClick={() => {myInfoChangeHandler()}}>변경하기</ChangeMyInfoBtn>
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
  max-width:480px;
  left:50%;
  transform:translate(-50%, 0);
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

const NicknameCheckBtn = styled.div`
  width: 128px;
  height: 46px;
  background: #3549ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const UserTypeBox = styled.div`
  width: 336px;
  margin: 41px auto 0px;
  select {
    box-sizing: border-box;
    width: 100%;
    height: 46px;
    color: #8D8D8D;
    background: #ffffff;
    border: 1.5px solid #d8d8d8;
    border-radius: 8px;
    padding: 14px;
  }
`;

const ChangeMyInfoBtn = styled.button`
    width: 335px;
    margin: 379px auto 0px;
    background: #3549FF;
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