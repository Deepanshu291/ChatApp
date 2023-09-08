
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/Authcontext.tsx'
import { ToastContainer } from 'react-toastify'
import { APIProvider } from './contexts/APiContext.tsx'
import { ChatProvider } from './contexts/ChatContext.tsx'
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
    <ChakraProvider >
    <AuthProvider>
    <APIProvider> 
    <ChatProvider>    
    <App />
    </ChatProvider>   
    </APIProvider>    
    <ToastContainer />
    </AuthProvider>
    </ChakraProvider>
    </BrowserRouter>
)
