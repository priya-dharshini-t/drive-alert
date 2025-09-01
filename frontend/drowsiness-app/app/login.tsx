import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";

const Login: React.FC = () => {
  const router = useRouter();

  const handleGoogleLogin = (response: CredentialResponse) => {
    if (response.credential) {
      console.log("Google login successful", response.credential);
      router.push("/register");
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <View style={styles.container}>
        <View style={styles.authCard}>
          <Text style={styles.title}>Welcome to Drive Alert</Text>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
            useOneTap
            text="signin"
          />

          <Text style={styles.divider}>OR</Text>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.signupText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GoogleOAuthProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F5F5" },
  authCard: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10, elevation: 3, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  divider: { marginVertical: 15, fontSize: 16, color: "#777" },
  signupText: { fontSize: 16, color: "#007AFF", marginTop: 10 },
});
