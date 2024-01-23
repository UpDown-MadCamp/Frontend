import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import './Login.css';

const GoogleLoginButton = () => {
    const clientId = "78372213139-32um8dhc4u3f2av15cqtssbgeu91qgvq.apps.googleusercontent.com"
    return (
        <div className="google-login-btn">
            <GoogleOAuthProvider clientId={clientId}>
            <div>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res.credential);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
                </div>
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleLoginButton