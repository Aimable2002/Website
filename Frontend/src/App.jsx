import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import Home from './pages/home/home';
import Account from './pages/account/account';
// import Chat from './pages/chat/chat';
import Reg from './regForm/reg';
import { useAuthContext } from './context/authContext';
import Upload from './pages/upload.jsx'
import SmHome from './pages/smdevice/smHome.jsx'
import SmPost from './pages/smdevice/smPost.jsx'
import SmChat from './pages/smdevice/smChat.jsx';
import SmReg from './pages/smReg/smReg.jsx';
import useScreenSize from './resize/resize.jsx';

function App() {
const {AuthUser} = useAuthContext();
const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    // <Routes>
    //   <Route path='sign' element={AuthUser ? <Navigate to='/'/> : <Reg />} />
    //   <Route path='/' element={AuthUser ? <Home /> : <Navigate to='sign'/>} />
    //   <Route path='/home' element={AuthUser ? <Chat /> : <Navigate to='sign'/>} />
    //   <Route path='account' element={AuthUser ? <Account /> : <Navigate to='sign' />} />
    //   <Route path= '/upload' element={AuthUser ? <Upload /> : <Navigate to='sign' />} />
    //   <Route path='/smHome' element={<SmHome />} />
    //   <Route path='/smPost' element={<SmPost />} />
    //   <Route path='/smChat/:id' element={<SmChat />} />
    //   <Route path='/smReg' element={<SmReg />} />
    // </Routes>


    <div>
      {isSmallScreen ? (
        <Routes>
          <Route path='sign' element={AuthUser ? <Navigate to='/' /> : <SmReg />} />
          <Route path='/' element={AuthUser ? <SmHome /> : <Navigate to='sign' />} />
          {/* <Route path='/home' element={AuthUser ? <SmChat /> : <Navigate to='sign' />} /> */}
          <Route path='account' element={AuthUser ? <Account /> : <Navigate to='sign' />} />
          <Route path='/upload' element={AuthUser ? <Upload /> : <Navigate to='sign' />} />
          {/* <Route path='/smHome' element={AuthUser ? <SmHome /> : <Navigate to='sign' />} /> */}
          <Route path='/smPost' element={AuthUser ? <SmPost /> : <Navigate to='sign' />} />
          <Route path='/smChat/:id' element={AuthUser ? <SmChat /> : <Navigate to='sign' />} />
          {/* <Route path='/smReg' element={AuthUser ? <Navigate to='/' /> : <SmReg />} /> */}
        </Routes>
      ) : (
        <Routes>
          <Route path='sign' element={AuthUser ? <Navigate to='/' /> : <Reg />} />
          <Route path='/' element={AuthUser ? <Home /> : <Navigate to='sign' />} />
          {/* <Route path='/home' element={AuthUser ? <Chat /> : <Navigate to='sign' />} /> */}
          <Route path='account' element={AuthUser ? <Account /> : <Navigate to='sign' />} />
          <Route path='/upload' element={<Upload />} />
        </Routes>
      )}
    </div>
  )
}

export default App

