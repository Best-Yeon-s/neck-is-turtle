import { get, post, put, destroy } from './AxiosCreate';

class UserApi {
    /**
    * user info를 통해 로그인 또는 회원가입 진행
    * 
    * @ param 유저의 이메일, 이름, 프로필 사진
    * @ return 로그인 성공 여부
    */
    loginHandler = async (email, name, picture) => {
        const exist = await this.findUser(email);
        let token;
        if (exist) { // 존재하는 유저일 경우
            token = await this.signIn(email);
        } else { // 존재하지 않는 유저일 경우
            token = await this.signUp(email, name, picture);
        }

        // localStorage.setItem('token', token);

        return true;
    }

    findUser = async (email) => {
        return true;
    }

    signIn = async (email) => { // 로그인

    }

    signUp = async (email, name, picture) => { // 회원가입
        
    }
}
export default UserApi;