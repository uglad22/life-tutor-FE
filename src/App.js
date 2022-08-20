import React, { useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Detail from "./pages/Detail";
import Post from './pages/Post';
// import CreateRoom from './pages/CreateRoom';
// import ChatRoom from './pages/ChatRoom';
import Navigation from './components/nav/Navigation';
import { Routes, Route } from 'react-router-dom';
import instance from './shared/axios';
import Signup from './pages/Signup';
import Login from './pages/Login';
import KakaoLogin from './components/KakaoLogin';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import { userContext } from './components/context/UserProvider';


function App() {

  const context = useContext(userContext);
  const { userInfo } = context.state;
  const { setUserInfo } = context.actions;

  useEffect(()=> {
    const getUserInfo = async () => {
      const token = localStorage.getItem("Authorization");
      if(!token) {
        setUserInfo({username:"", nickname:"", user_type:""})
        return;
      }
      else if(token) {
        const res = await instance.get('/api/user/info');
        const data = res.data;
        setUserInfo({...data});
      }
    }

    getUserInfo().catch(console.error);
  }, []);
  
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
            <Route
            path="/oauth2/redirect/:token"
            element={<KakaoLogin />}
             />
            <Route path="/posting" element={<Post/>}/>
            {/* <Route path="/create/room" element={<CreateRoom/>}/>
            <Route path="/detail/room/chat" element={<ChatRoom/>}/> */}
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
