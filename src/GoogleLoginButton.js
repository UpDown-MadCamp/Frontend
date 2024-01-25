import React from 'react';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Login.css';
import { setFiles } from './api';

const GoogleLoginButton = () => {
    const clientId = "78372213139-32um8dhc4u3f2av15cqtssbgeu91qgvq.apps.googleusercontent.com"
    const handleLogin = async (googleData) => {
        try {
            const res = await axios.post('http://localhost:5000/google-auth/google-login', {
                token: googleData.credential
            });
            
            if (res.status === 200 && typeof res.data.token === 'string') {
                const decodedToken = jwtDecode(res.data.token);
                console.log("decodedToken: ", decodedToken);
                // 세션 스토리지에 사용자 정보와 토큰 저장
                sessionStorage.setItem('username', decodedToken.username);
                sessionStorage.setItem('email', decodedToken.email);
                sessionStorage.setItem('jwt', res.data.token);
                sessionStorage.setItem('islogged', true);
                setFiles();
                // 로그인 후 처리, 예를 들어 페이지 리디렉션
            } else {
                // 로그인 실패 처리
                alert('로그인 실패');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 오류');
        }
    };
    return (
        <div className="google-login-btn">
            <GoogleOAuthProvider clientId={clientId}>
            <div>
                <GoogleLogin
                    onSuccess={handleLogin}
                    onFailure={(err) => console.error(err)}
                />
            </div>
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleLoginButton