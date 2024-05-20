import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/home/home';
import Account from './pages/account/account';
import Chat from './pages/chat/chat';
import Reg from './regForm/reg';
import { useAuthContext } from './context/authContext';
import Upload from './pages/upload.jsx'
import SmHome from './pages/smdevice/smHome.jsx'
import SmPost from './pages/smdevice/smPost.jsx'
import SmChat from './pages/smdevice/smChat.jsx';
import SmReg from './pages/smReg/smReg.jsx';
function App() {
const {AuthUser} = useAuthContext();
  return (
    <Routes>
      <Route path='sign' element={AuthUser ? <Navigate to='/'/> : <Reg />} />
      <Route path='/' element={AuthUser ? <Home /> : <Navigate to='sign'/>} />
      <Route path='/home' element={AuthUser ? <Chat /> : <Navigate to='sign'/>} />
      <Route path='account' element={AuthUser ? <Account /> : <Navigate to='sign' />} />
      <Route path= '/upload' element={<Upload />} />
      <Route path='/smHome' element={<SmHome />} />
      <Route path='/smPost' element={<SmPost />} />
      <Route path='/smChat/:id' element={<SmChat />} />
      <Route path='/smReg' element={<SmReg />} />
    </Routes>
  )
}

export default App
