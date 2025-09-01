import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = (response) => {
    if (response.credential) {
      console.log("Google login successful", response.credential);
      // Navigate to the register page after Google login
      navigate("/register");
    }
  };

  return (
    <GoogleOAuthProvider clientId="262244681520-fi4qsjev4ijepf5al347le4lt4ckh1vq.apps.googleusercontent.com">
      <div className="login-container">
        <div className="auth-card">
          <h2 className="login-title">Welcome to Drive Alert</h2>

          {/* Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
            useOneTap
            text="Log in with Google" // Changed text
          /> <br></br>
          <div className="divider">OR</div>
          
          

          
          {/* Sign Up Link */}
          <p>
            Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
