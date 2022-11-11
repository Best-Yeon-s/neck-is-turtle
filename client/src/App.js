import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MeasuerPose from './MeasurePoseTest';
import Home from './components/home';
import UserApi from './apis/UserApi';
import LoginModal from './components/login';
import './App.css';
import Stretching from './components/stretching';

function App() {
  const userApi = new UserApi();
  const showLogin = useSelector(state=>state.modal.showLogin);

  useEffect(()=>{
    userApi.getUserInfo();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/stretching" element={<Stretching />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
      { showLogin && <LoginModal /> }
      {/* <MeasuerPose /> */}
    </div>
  );
}

export default App;
