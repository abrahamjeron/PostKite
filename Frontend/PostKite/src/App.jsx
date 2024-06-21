import { useState , useEffect } from 'react'
import Test from "./components/test"
import UploadPost from './components/test2'
import Register from './components/register'
import Login from './components/login'
import Loader from './components/loader'
import Setup from './components/setuppage'
import Profile from './components/profilepage'
import Home from './components/homepage'
import { Route, Routes, Navigate } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    setIsLoggedIn(!!cookies);
  }, []);

  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={isLoggedIn? <Home/> :<Login />} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/usersetup" element={<Setup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/userTest" element={ <Test/>} />
      <Route path="/home" element={ <Home/>} />
      <Route path="/test" element={<UploadPost />} /> 
      {/* <Route path="/usertest" element={<Login />} /> */}
      {/* <Test/> */}
      {/* <UploadPost/> */}
    </Routes>
  )
}

export default App
