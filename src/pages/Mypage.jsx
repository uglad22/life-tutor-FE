import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import ManagementCard from "../components/card/ManagementCard";
import { userContext } from "../components/context/UserProvider";
import { userTypeTrans } from "../shared/sharedFn";

const Mypage = () => {
  const context = useContext(userContext);
  const { userInfo } = context.state;
  return (
    <>
      <Header title="마이페이지" isAction={true}/>
      <MemberInfoAndCategoryBox>
        <MemberInfo>
          <ProfilePicture>
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34 38V34.1111C34 32.0483 33.1835 30.07 31.7301 28.6114C30.2767 27.1528 28.3054 26.3333 26.25 26.3333H10.75C8.69457 26.3333 6.72333 27.1528 5.26992 28.6114C3.81652 30.07 3 32.0483 3 34.1111V38M26.25 10.7778C26.25 15.0733 22.7802 18.5556 18.5 18.5556C14.2198 18.5556 10.75 15.0733 10.75 10.7778C10.75 6.48223 14.2198 3 18.5 3C22.7802 3 26.25 6.48223 26.25 10.7778Z"
                stroke="#C8C8C8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ProfilePicture>
          <MemberNameTypeAndEmail>
            <MemberNameAndType>
              <MemberName>{userInfo.nickname}</MemberName>
              <MemberType>{userTypeTrans(userInfo.user_type)}</MemberType>
            </MemberNameAndType>
            <MemberEmail>{userInfo.username}</MemberEmail>
          </MemberNameTypeAndEmail>
        </MemberInfo>
        <CategoryBox>
          <Mypostings>
            <CategoryIcon>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 29.1668H30.625M24.0625 5.10433C24.6427 4.52417 25.4295 4.19824 26.25 4.19824C26.6563 4.19824 27.0585 4.27826 27.4339 4.43373C27.8092 4.5892 28.1502 4.81707 28.4375 5.10433C28.7248 5.3916 28.9526 5.73264 29.1081 6.10797C29.2636 6.4833 29.3436 6.88558 29.3436 7.29183C29.3436 7.69809 29.2636 8.10037 29.1081 8.4757C28.9526 8.85103 28.7248 9.19207 28.4375 9.47933L10.2083 27.7085L4.375 29.1668L5.83333 23.3335L24.0625 5.10433Z"
                  stroke="#3549FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CategoryIcon>
            <p>내가 쓴 글</p>
          </Mypostings>

          <MyCommentsInPost>
            <CategoryIcon>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3333 16.042V10.2087M30.625 2.91699H4.375V26.2503H11.6667V32.0837L17.5 26.2503H24.7917L30.625 20.417V2.91699ZM16.0417 16.042V10.2087V16.042Z"
                  stroke="#3549FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CategoryIcon>
            <p>댓글 단 글</p>
          </MyCommentsInPost>
        </CategoryBox>
      </MemberInfoAndCategoryBox>
      <MemberManagementBox>
        <ManagementCard
          managementType="개인정보 변경"
          svg={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z"
                stroke="#656565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <ManagementCard
          managementType="비밀번호 변경"
          svg={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z"
                stroke="#656565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <ManagementCard
          managementType="피드백 남기기"
          svg={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="#656565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </MemberManagementBox>
    </>
  );
};

export default Mypage;

const MemberInfoAndCategoryBox = styled.div`
  margin-top: 60px;
  padding: 20px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid #d3d3d3;
  margin-bottom: 5px;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 130px;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
`;

const ProfilePicture = styled.div`
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  font-size: 45px;
  justify-content: center;
  background: #ebebeb;
  color: #c8c8c8;
  border-radius: 78px;
`;

const MemberNameTypeAndEmail = styled.div``;

const MemberNameAndType = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const MemberName = styled.div`
  color: #656565;
  font-weight: bold;
`;

const MemberType = styled.div`
  color: #3549ff;
  font-weight: bold;
  font-size: 13px;
`;

const MemberEmail = styled.div`
  color: #979797;
  font-size: 13px;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
  padding: 7px 0;
`;

const Mypostings = styled.div`
  margin-top: 25px;
  display: block;
  color: #3549ff;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
`;

const CategoryIcon = styled.div`
    width: 62px;
    height: 62px;
    background: #E8EAFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 10px;
`;

const MyCommentsInPost = styled.div`
  margin-top: 25px;
  display: block;
  color: #3549ff;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
`;

const MemberManagementBox = styled.div`
  background: white;
  height: 300px;
`;
