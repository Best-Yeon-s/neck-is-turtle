import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import defaultProfile from '../../assets/images/default_profile.png';
import './Sidebar.scss';

function Sidebar() {

    return (
        <div className="sidebar">
            <Logo className="logo"/>
            <img className="user-profile" src={defaultProfile}/>
            <div className="user-name-wrapper">
                <div className="user-name">방울토망토</div>
                <div className="user-title">바른 자세 전문가</div>
            </div>
        </div>
    )
}
export default Sidebar;