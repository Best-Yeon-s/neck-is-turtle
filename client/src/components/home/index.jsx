import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Dashboard from './dashboard/index';
import PoseApi from '../../apis/PoseApi';
import './index.scss';


function Home() {
    const poseApi = new PoseApi();
    const straightTime = useSelector(state=>state.pose.straightTime);
    const turtleTime = useSelector(state=>state.pose.turtleTime);

    const savePoseTime = async (e) => {
        poseApi.savePoseTime(straightTime, turtleTime);
    }

    useEffect(()=>{
        window.addEventListener('beforeunload', savePoseTime);
        return () => window.removeEventListener('beforeunload', savePoseTime);
    }, [straightTime, turtleTime])
  
    return (
        <div className="home">
            <Sidebar />
            <Dashboard />
        </div>
    )
}
export default Home;