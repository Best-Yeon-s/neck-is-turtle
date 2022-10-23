import { useDispatch } from 'react-redux';
import { setShowLoginModal } from '../../redux/modal/modalAction';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import UserApi from '../../apis/UserApi';
import Modal from '../modal/Modal';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { BsFillHexagonFill } from 'react-icons/bs';
import './index.scss';

function LoginModal() {
    const dispatch = useDispatch();
    const userApi = new UserApi();

    const loginSuccess = (res) => {
        const userInfo = jwt_decode(res.credential);
        const { email, name, picture } = userInfo;
        userApi.loginHandler(email, name, picture);
    }

    return (
        <Modal displayType={"center"} closeModal={()=>{dispatch(setShowLoginModal(false))}}>
            <div className="login-modal modal-wrapper">
                <div className="modal-header">
                    <Logo id="logo"/>
                    <div className="modal-title">시작하기</div>
                    <div className="modal-description">
                        목이 거북해와 함께 바른 자세 습관을 길러보세요
                    </div>
                </div>
                <div className="modal-content">
                    {/* <button onClick={()=>{login()}}>구글 로그인</button> */}
                <GoogleLogin
                    onSuccess={loginSuccess}
                    onFailure={(res)=>console.log("login fail", res)}
                />
                </div>
                <div className="hexagon-wrapper">
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                    <BsFillHexagonFill />
                </div>
            </div>
        </Modal>
    )
}
export default LoginModal;