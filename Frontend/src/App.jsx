import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/home/home';
import Account from './pages/account/account';
import Chat from './pages/chat/chat';
import Reg from './regForm/reg';
import { useAuthContext } from './context/authContext';

function App() {
const {AuthUser} = useAuthContext();
  return (
    <Routes>
      <Route path='sign' element={AuthUser ? <Navigate to='/'/> : <Reg />} />
      <Route path='/' element={AuthUser ? <Home /> : <Navigate to='sign'/>} />
      <Route path='home' element={AuthUser ? <Chat /> : <Navigate to='sign'/>} />
      <Route path='account' element={AuthUser ? <Account /> : <Navigate to='sign' />} />
    </Routes>
  )
}

export default App
