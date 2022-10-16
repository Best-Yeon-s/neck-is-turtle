import Sidebar from './Sidebar';
import Dashboard from './dashboard/index';
import MeasuerPose from '../MeasurePose';
import './index.scss';

function Home() {
  
    return (
        <div className="home">
            <Sidebar />
            <Dashboard />
            {/* <MeasuerPose /> */}
        </div>
    )
}
export default Home;