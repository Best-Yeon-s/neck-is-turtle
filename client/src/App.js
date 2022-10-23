import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MeasuerPose from './MeasurePoseTest';
import Home from './components/home';
import UserApi from './apis/UserApi';
import LoginModal from './components/login';

function App() {
  const userApi = new UserApi();
  const auth = useSelector(state=>state.userData.auth);
  const showLogin = useSelector(state=>state.modal.showLogin);

  useEffect(()=>{
    userApi.getUserInfo();
  }, [])

  useEffect(()=>{
    console.log("auth", auth)
  },[auth])

  useEffect(()=>{
    console.log(showLogin);
  }, [showLogin])

  return (
    <div className="App">
      { showLogin && <LoginModal /> }
      {/* <MeasuerPose /> */}
      <Home />
    </div>
  );
}

export default App;
