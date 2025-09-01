import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function DetectionScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>🚨 Detection Starting!</Text>
      <Text>This feature is under development.</Text>
      <Button title="Back to Home" onPress={() => router.push("/home")} />
    </View>
  );
}
