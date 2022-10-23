import Modal from '../modal/Modal';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { BsFillHexagonFill } from 'react-icons/bs';
import './index.scss';

function LoginModal() {
    const findUser = (res) => {
        let userInfo = jwt_decode(res.credential);
        console.log(userInfo);
    }

    return (
        <Modal displayType={"center"} closeModal={console.log("hi")}>
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
                    onSuccess={findUser}
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