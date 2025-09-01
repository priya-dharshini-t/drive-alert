import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View>
      <Text>Welcome to the Landing Page</Text>
      <Button title="Go to Home" onPress={() => router.push("/home")} />
    </View>
  );
}
