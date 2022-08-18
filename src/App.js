import React from 'react';
import styled from 'styled-components';
import Home from './pages/Home';
import Header from './components/header/Header';
import Post from './pages/Post';
import Navigation from './components/nav/Navigation';
import { Routes, Route } from 'react-router-dom';
import instance from './shared/axios';
import axios from 'axios';

function App() {

  const tempLogin = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {username:"a@a.a", password:"1234"});
    localStorage.setItem("Authorization", res.headers.authorization);
  }
  
  return (
    // TODO: 로그인 유무에 따라 url 직접 접근 차단 또는 허용하는 기능 구현(react-router로)
    <div className="App">
        <button onClick={tempLogin} style={{paddingTop:"200px"}}>임시 로그인하기</button>
        {/* <Header/> */}
        <Content>
          <Routes>
            <Route path="/home/:category" element={<Home/>}></Route>
            <Route path="/posting" element={<Post/>}/>
          </Routes>
        </Content>
        <Navigation/>
        
    </div>
  );
}

export default App;

const Content = styled.div`
  width:100vw;
  max-width:480px;
  margin:0 auto;
`
