import { FiSquare, FiCheck } from 'react-icons/fi';

function MissionElem({ mission, completed }) {

    return (
        <div className="mission-elem" id={completed ? "completed" : null}>
            <div className="check-box">
                <FiSquare />
                {
                    completed && <FiCheck id="check"/>
                }
            </div>
            <div className="mission-name">{ mission.name }</div>
        </div>
    )
}
export default MissionElem;