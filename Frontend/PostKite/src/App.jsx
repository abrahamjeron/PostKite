import { useState } from 'react'
import Test from "./components/test"
import UploadPost from './components/test2'
import Register from './components/register'
import Login from './components/login'
import Loader from './components/loader'
import Setup from './components/setuppage'
import Profile from './components/profilepage'
import { Route, Routes, Navigate } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/profile" element={<Login />} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/usersetup" element={<Setup />} />
      <Route path="/" element={<Profile />} />
      <Route path="/userTest" element={ <Test/>} />
      {/* <Route path="/test" element={<UploadPost />} /> */}
      {/* <Route path="/usertest" element={<Login />} /> */}
      {/* <Test/> */}
      {/* <UploadPost/> */}
    </Routes>
  )
}

export default App
