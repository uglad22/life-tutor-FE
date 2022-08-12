import React from 'react';
import Home from './pages/Home';
import instance from './shared/axios';

function App() {

  const tempLogin = async () => {
    // const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {username:"a@a.a", password:"1234"});
    // const data = res.headers;

    // console.log(data);
    localStorage.setItem("Authorization", "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2NjA1NjMwNzUsImlzcyI6InNwYXJ0YSIsIlVTRVJfTkFNRSI6ImFAYS5hIn0.nFnnhFIj3Qq_nh8ATFUwNMC0aJ8h5EddHjjj95baebE")
  }
  
  return (
    <div className="App">
        <button onClick={tempLogin}>임시 로그인하기</button>
        <Home></Home>
    </div>
  );
}

export default App;
