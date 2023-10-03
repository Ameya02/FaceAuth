
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import FaceLogin from './pages/FaceLogin';
function App() {

  return (
  
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/login2" element={<Loginf2 />} />
        <Route path="/login3" element={<Loginf3 />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/facelogin" element={<FaceLogin />} />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
      );
    }
 

export default App
