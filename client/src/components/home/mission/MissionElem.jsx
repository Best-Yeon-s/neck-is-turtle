import { FiSquare, FiCheck } from 'react-icons/fi';

function MissionElem({ mission }) {

    return (
        <div className="mission-elem" id={mission.complete ? "completed" : null}>
            <div className="check-box">
                <FiSquare />
                {
                    mission.complete && <FiCheck id="check"/>
                }
            </div>
            <div className="mission-name">{ mission.name }</div>
        </div>
    )
}
export default MissionElem;