import { useEffect } from "react";
import { useSelector } from "react-redux";
import MissionElem from "./MissionElem";
import './index.scss';
import MissionApi from "../../../apis/MissionApi";

function Mission() {
    const missionApi = new MissionApi();
    const auth = useSelector(state=>state.userData.auth);
    const completedMissionList = useSelector(state=>state.mission.completedMissionList);
    
    const missionList = [
        { id: 1, name: '출석 체크 하기' },
        { id: 2, name: '바른자세 연속 15분 달성하기' },
        { id: 3, name: '바른 자세 시간 30분 이상 채우기' },
        { id: 4, name: '스트레칭 하기' },
    ];

    // mission 1. 출석체크 미션 로직
    useEffect(()=>{
        if (auth) {
            if (!completedMissionList.includes(1)) {
                missionApi.completeMission(1);
            }
        }
    }, [auth, completedMissionList])

    return (
        <div className="mission-container">
            <div className="mission-container-title">일일 미션</div>
            <div className="mission-wrapper">
            {
                missionList.map((mission)=>(
                    <MissionElem mission={mission} completed={completedMissionList.includes(mission.id)}/>
                ))
            }
            </div>
        </div>
    )
}
export default Mission;