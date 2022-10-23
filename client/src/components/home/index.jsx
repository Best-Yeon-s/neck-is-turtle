import Sidebar from './Sidebar';
import Dashboard from './dashboard/index';
import MeasuerPose from '../MeasurePose';
import './index.scss';
import LoginModal from '../login';

function Home() {
  
    return (
        <div className="home">
            <LoginModal />
            <Sidebar />
            <Dashboard />
            {/* <MeasuerPose /> */}
        </div>
    )
}
export default Home;