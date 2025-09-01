import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  address: string;
  emergency_person_name: string;
  emergency_person_number: string;
  emergency_person_email: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    emergency_person_name: "",
    emergency_person_number: "",
    emergency_person_email: "",
  });

  const handleChange = (name: string, value: string) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = () => {
    console.log("User Details:", userDetails);
    router.push("/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Complete Your Profile</Text>
        {Object.keys(userDetails).map((key) => (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={key.replace(/_/g, " ")}
            value={userDetails[key as keyof UserDetails]}
            onChangeText={(value) => handleChange(key, value)}
            keyboardType={key.includes("email") ? "email-address" : key.includes("phone") ? "phone-pad" : "default"}
          />
        ))}
        <Button title="Submit" onPress={handleSubmit} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 20 },
  box: { width: "100%", maxWidth: 400, backgroundColor: "#fff", padding: 20, borderRadius: 10, elevation: 3 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10, width: "100%" },
});
