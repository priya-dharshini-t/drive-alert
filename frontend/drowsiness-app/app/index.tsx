import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Welcome to the Driver Drowsiness App!
      </Text>
      <Button title="Login" onPress={() => router.push("/login")} />
      <Button title="Register" onPress={() => router.push("/register")} />
      <Button title="Go to Home" onPress={() => router.push("/home")} />
      <Button title="Start Detection" onPress={() => router.push("/DetectionScreen")} />
    </View>
  );
}
