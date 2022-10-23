import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import defaultProfile from '../../assets/images/default_profile.png';
import './Sidebar.scss';
import { useEffect } from 'react';

function Sidebar() {
    const auth = useSelector(state=>state.userData.auth);
    const userPicture = useSelector(state=>state.userData.picture);
    const userName = useSelector(state=>state.userData.name);

    useEffect(()=>{
        console.log(auth, userPicture, userName)
    }, [auth, userPicture, userName])

    return (
        <div className="sidebar">
            <Logo className="logo"/>
            <img className="user-profile" src={auth ? userPicture : defaultProfile}/>
            <div className="user-name-wrapper">
                <div className="user-name">{ auth ? userName : "방울토망토" }</div>
                {/* <div className="user-title">바른 자세 전문가</div> */}
            </div>
        </div>
    )
}
export default Sidebar;