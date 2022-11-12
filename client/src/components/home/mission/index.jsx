import MissionElem from "./MissionElem";
import './index.scss';
import { useSelector } from "react-redux";

function Mission({ missionList }) {
    const completedMissionList = useSelector(state=>state.mission.completedMissionList);

    return (
        <div className="mission-container">
            <div className="mission-container-title">일일 미션</div>
            <div className="mission-wrapper">
            {
                missionList.map((mission, idx)=>(
                    <MissionElem mission={mission} completed={completedMissionList.includes(idx)}/>
                ))
            }
            </div>
        </div>
    )
}
export default Mission;