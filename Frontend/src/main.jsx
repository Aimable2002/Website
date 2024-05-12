import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {NextUIProvider} from '@nextui-org/react'
import { AuthContextProvider } from './context/authContext.jsx'
import { SocketContextProvider } from './context/socketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <AuthContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </AuthContextProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
