import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomInput from "@/components/customInput"; // Assuming you have this component
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";
import useRegister from "@/hooks/useRegister"; // Import the useRegister hook
import LoadingScreen from "../pages/loadingScreen"; // Import the LoadingScreen component

const Register = () => {
  const router = useRouter();
  const { telephone } = useLocalSearchParams(); // Get telephone from URL params

  const { registerUser, loading, error } = useRegister(); // Use the hook for registration

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    authorization_level: "user",
    gender: "", // Make sure gender is stored here
    telephone: Array.isArray(telephone) ? telephone[0] : telephone || "", // Ensure telephone is a string
  });

  const [honeypot, setHoneypot] = useState(""); // Hidden field for spam detection

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFullNameChange = (value: string) => {
    // Split the input based on space
    const [first_name, ...lastNameArray] = value.split(" ");
    const last_name = lastNameArray.join(" "); // To account for cases where the last name contains spaces
  
    setForm((prev) => ({
      ...prev,
      first_name: first_name || "", // If no first name, set empty string
      last_name: last_name || "",   // If no last name, set empty string
    }));
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleSubmit = async () => {
    if (honeypot) {
      Alert.alert("Security Check Failed", "Suspicious activity detected.");
      return;
    }

    if (!validatePassword(form.password)) {
      Alert.alert(
        "Invalid Password",
        "הסיסמה חייבת לכלול 8 תווים, לפחות ספרה אחת ולפחות אות אחת"
      );
      return;
    }

    try {
      const response = await registerUser({
        ...form,
        telephone: form.telephone as string,
        gender: form.gender // Ensure gender is passed correctly here
      });

      if (response) {
        // On successful registration
        Alert.alert("Registration Successful!", "Your account has been created.", [
          {
            text: "OK",
            onPress: () => router.push("/login"), // Redirect to login page
          },
        ]);
      }
    } catch (err) {
      // Handle error
      Alert.alert("Registration Failed", error || "An error occurred during registration.");
    }
  };

  if (loading) {
    return <LoadingScreen />; // Show loading screen while the registration is in progress
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.inputs}>
        <CustomInput
          type="writable"
          label="מה השם שלך?" // "What is your name?"
          placeholder="ישראלה ישראלי" // Placeholder with both first and last names
          value={`${form.first_name} ${form.last_name}`}
          onChange={handleFullNameChange}
        />

        <CustomInput
          type="writable"
          label="בחר/י שם משתמש" // "Choose Username"
          placeholder="ישראלה"
          value={form.username}
          onChange={(value) => handleChange("username", value)}
        />

        <CustomInput
          type="writable"
          label="מה המייל שלך?" // "What is your email?"
          placeholder="israela123@example.com"
          value={form.email}
          onChange={(value) => handleChange("email", value)}
        />

        <CustomInput
          type="radio"
          label="מה המגדר שלך?" // "What is your gender?"
          options={["אחר", "אישה", "גבר"]} // "Other", "Female", "Male"
          value={form.gender} // Bind the value to the `gender` field
          onChange={(value) => handleChange("gender", value)} // Update gender
        />

        <CustomInput
          type="writable"
          label="בחר/י סיסמה" // "Choose a password"
          placeholder=""
          value={form.password}
          onChange={(value) => handleChange("password", value)}
        />
      </View>

      {/* Honeypot Field (Hidden) */}
      <View style={{ height: 0, overflow: "hidden" }}>
        <CustomInput
          type="writable"
          label="Honeypot (Leave Empty)"
          value={honeypot}
          onChange={(value) => setHoneypot(value)}
        />
      </View>

      <Text style={styles.passwordtext}>
        * הסיסמה חייבת לכלול 8 תווים, לפחות ספרה אחת ולפחות אות אחת
      </Text>

      <SmallButton
        title="אישור"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  inputs: {
    width: "100%",
    gap: 32,
    paddingTop: 90,
  },
  passwordtext: {
    fontSize: Typography.fontSize.small,
    fontWeight: "400",
    paddingBottom: 24,
  },
});

export default Register;
