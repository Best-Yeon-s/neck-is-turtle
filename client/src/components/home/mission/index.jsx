import MissionElem from "./MissionElem";
import './index.scss';

function Mission({ missionList }) {


    return (
        <div className="mission-container">
            <div className="mission-container-title">일일 미션</div>
            <div className="mission-wrapper">
            {
                missionList.map((mission)=>(
                    <MissionElem mission={mission}/>
                ))
            }
            </div>
        </div>
    )
}
export default Mission;