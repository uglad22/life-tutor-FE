import React, { useEffect } from "react";
import { useParams } from "react-router";

function KakaoLogin() {
  const params = useParams();

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("token", `BEARER ${params.token}`);

    // 사용하려면 App.js에서 /로 라우팅해야 한다
    window.location.replace("/home");
  }, []);

  return <></>;
}

export default KakaoLogin;