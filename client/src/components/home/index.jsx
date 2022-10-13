import Sidebar from './Sidebar';
import MeasuerPose from '../MeasurePose';
import './index.scss';

function Home() {

    return (
        <div className="home">
            <Sidebar />
            <MeasuerPose />
        </div>
    )
}
export default Home;