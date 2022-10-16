import { TodayChart } from './TodayChart';
import MeasuerPose from '../../MeasurePose';
import PoseGraph from './PoseGraph';
import PostureCalendar from './PostureCalendar';
import './index.scss';

function Dashboard() {

    return (
        <div className="dashboard">
            <div className="today-webcam-wrapper">
                <TodayChart />

                <MeasuerPose />
            </div>
            <div className="posture-transition-wrapper">
                <PostureCalendar />
                <PoseGraph />
            </div>

        </div>
    )
}
export default Dashboard;