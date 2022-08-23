
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Detail from "./pages/Detail";
import Header from './components/header/Header';
import Post from './pages/Post';
import Navigation from './components/nav/Navigation';
import { Routes, Route } from 'react-router-dom';
import instance from './shared/axios';
import Signup from './pages/Signup';
import Login from './pages/Login';
import KakaoLogin from './components/KakaoLogin';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import Mypage from './pages/Mypage';

function App() {

  return (
    // TODO: 로그인 유무에 따라 url 직접 접근 차단 또는 허용하는 기능 구현(react-router로)
    <ThemeProvider theme={theme}>
    <div className="App">
        <GlobalStyle/>
        <Content>
          <Routes>
            <Route path="/home/:category" element={<Home/>}></Route>
            <Route path="/detail/:postingId" element={<Detail />} />
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/mypage" element={<Mypage />} />
            <Route
            path="/oauth2/redirect/:token"
            element={<KakaoLogin />}
             />
            <Route path="/posting" element={<Post/>}/>
          </Routes>
        </Content>
        <Navigation/>
    </div>
    </ThemeProvider>
  );
}

export default App;

const Content = styled.div`
  width:100vw;
  max-width:480px;
  margin:0 auto;
`
