import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = (response) => {
    if (response.credential) {
      console.log("Google login successful", response.credential);
      // After successful login, redirect to Home
      navigate("/home");
    }
  };

  return (
    <GoogleOAuthProvider clientId="262244681520-fi4qsjev4ijepf5al347le4lt4ckh1vq.apps.googleusercontent.com">
      <div className="login-container">
        <h2>Login</h2>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google Login Failed")}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
