import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkAuth } from './utils/CheckAuth';
import Home from './components/home';
import LoginModal from './components/login';
import Stretching from './components/stretching';

function App() {
  const showLogin = useSelector(state=>state.modal.showLogin);

  useEffect(()=>{
    checkAuth();
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
