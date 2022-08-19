import React, { useEffect } from "react";
import { useParams } from "react-router";

function KakaoLogin() {
  const params = useParams();
  
  useEffect(() => {
  if(params.token == "fail"){
  alert("로그인에 실패했습니다ㅠㅠ 카카오 이메일 제공 동의가 필요합니다!")
  window.location.replace("/login");
  } else {
    localStorage.clear();
    localStorage.setItem("token", `BEARER ${params.token}`);
    
    // 사용하려면 App.js에서 /로 라우팅해야 한다
    window.location.replace("/home");}
  

  }, []);
  
  return <></>;
  }

export default KakaoLogin;