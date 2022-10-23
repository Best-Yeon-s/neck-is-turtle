import { useDispatch, useSelector } from 'react-redux';
import { setShowLoginModal } from '../../redux/modal/modalAction';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import defaultProfile from '../../assets/images/default_profile.png';
import './Sidebar.scss';

function Sidebar() {
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.userData.auth);
    const userPicture = useSelector(state=>state.userData.picture);
    const userName = useSelector(state=>state.userData.name);

    return (
        <div className="sidebar">
            <Logo className="logo"/>
            {
                auth
                ? <>
                <img className="user-profile" src={auth ? userPicture : defaultProfile}/>
                <div className="user-name-wrapper">
                    <div className="user-name">{ auth ? userName : "방울토망토" }</div>
                    {/* <div className="user-title">바른 자세 전문가</div> */}
                </div>
                </>
                : <button onClick={()=>{dispatch(setShowLoginModal(true))}}>
                    로그인 하러 가기
                </button>
            }

        </div>
    )
}
export default Sidebar;