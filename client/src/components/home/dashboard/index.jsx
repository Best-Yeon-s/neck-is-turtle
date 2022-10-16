import { TodayChart } from './TodayChart';
import './index.scss';
import MeasuerPose from '../../MeasurePose';
import PoseGraph from './PoseGraph';
import PostureCalendar from './PostureCalendar';
import MyResponsivePie from './TodayPieChart';
import MyResponsiveTimeRange from './CalendarChart';

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