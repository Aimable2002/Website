import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home/home';
import Account from './pages/account/account';
import Chat from './pages/chat/chat';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='home' element={<Chat />} />
      <Route path='account' element={<Account />} />
    </Routes>
  )
}

export default App
