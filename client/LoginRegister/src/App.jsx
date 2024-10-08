import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
    <Navbar/>
    <Toaster position='bottom-right' toastOption={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </UserContextProvider>
  )
}

export default App
