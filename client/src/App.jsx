
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import FaceLogin from './pages/FaceLogin';
function App() {

  return (
  
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/login" element={<Login />} /> */}
   
        <Route path="/" element={<Home />} />
        <Route path="/facelogin" element={<FaceLogin />} />
    </Routes>
  </BrowserRouter>
      );
    }
 

export default App
