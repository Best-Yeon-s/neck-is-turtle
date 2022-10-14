import { TodayChart } from './TodayChart';
import './index.scss';
import MeasuerPose from '../../MeasurePose';
import PoseGraph from './PoseGraph';

function Dashboard() {

    return (
        <div className="dashboard">
            <div className="today-webcam-wrapper">
                <TodayChart />
                <MeasuerPose />
            </div>
            <PoseGraph />
        </div>
    )
}
export default Dashboard;