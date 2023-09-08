import { Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Register } from './pages/register'
import { Login } from './pages/login'
import useAuth from './contexts/Authcontext'
import "./App.css";
import { SetPic } from './components/Features/SetPic'

function App() {

  const { token} = useAuth()

  return (
    <>
    
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route path='/' 
        // element={<HomePage/>}
        element={!token ?<Login/> :<HomePage/>}
        
        ></Route>
        <Route path='/setpic' element={<SetPic/>}></Route>
        <Route path='/register' element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
