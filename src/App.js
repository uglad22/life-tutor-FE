import React, { useEffect, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PostingViewer from './pages/PostingViewer';
import Detail from "./pages/Detail";
import Post from './pages/Post';
import CreateRoom from './pages/CreateRoom';
import ChatRoom from './pages/ChatRoom';
import Navigation from './components/nav/Navigation';
import { Routes, Route, useLocation } from 'react-router-dom';
import instance from './shared/axios';
import Signup from './pages/Signup';
import Login from './pages/Login';
import KakaoLogin from './components/KakaoLogin';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';
import Mypage from './pages/Mypage';
import { userContext } from './components/context/UserProvider';
import Splash from './pages/Splash';
import { AnimatePresence } from 'framer-motion';
import RoomViewer from './pages/RoomViewer';
import MyInfoManage from './pages/MyInfoManage';
import MyPwManage from './pages/MyPwManage';


function App() {

  const context = useContext(userContext);
  const location = useLocation();
  const { userInfo } = context.state;
  const { setUserInfo } = context.actions;

  useEffect(()=> {
    const getUserInfo = async () => {
      const token = localStorage.getItem("Authorization");
      /* 토큰이 웹 스토리지에 없는 경우(로그인 X) */
      if(!token) {
        // 혹시나 context에 저장되어 있을 경우를 방지 default 값으로 초기화
        return;
      }
      /*토큰이 웹 스토리지에 있는 경우(로그인 O) */ 
      else if(token) {
        const res = await instance.get('/api/user/info');
        const data = res.data;
        // user 정보 저장
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
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Splash/>}/>
            <Route path="/viewer/posting/:category" element={<PostingViewer/>}></Route>
            <Route path="/viewer/posting/search/:hashtag" element={<PostingViewer/>}></Route>
            <Route path="/viewer/room" element={<RoomViewer/>}/>
            <Route path="/viewer/room/search/:hashtag" element={<RoomViewer/>}/>
            <Route path="/detail/posting/:postingId" element={<Detail />} />
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/myinfomanage" element={<MyInfoManage />} />
            <Route path="/mypage/mypwmanage" element={<MyPwManage />} />
            <Route
            path="/oauth2/redirect/:token"
            element={<KakaoLogin />}
             />
            <Route path="/posting" element={<Post/>}/>
            <Route path="/posting/edit/:postingId" element={<Post/>}/>
            <Route path="/create/room" element={<CreateRoom/>}/>
            <Route path="/detail/room/chat/:roomId" element={<ChatRoom/>}/>
          </Routes>
          </AnimatePresence>  
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
