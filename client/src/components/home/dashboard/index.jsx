import { TodayChart } from './TodayChart';
import MeasurePose from '../../MeasurePose';
import MeasureNeckDegree from '../../MeasureNeckDegree';
import PoseGraph from './PoseGraph';
import PostureCalendar from './PostureCalendar';
import './index.scss';

function Dashboard() {

    return (
        <div className="dashboard">
            <div className="today-webcam-wrapper">
                <TodayChart />

                {/* <MeasuerPose /> */}
                <MeasureNeckDegree />
            </div>
            <div className="posture-transition-wrapper">
                <PostureCalendar />
                <PoseGraph />
            </div>

        </div>
    )
}
export default Dashboard;