import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomInput from "@/components/customInput"; // Assuming you have this component
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";

const Register = () => {
  const router = useRouter();
  const { telephone } = useLocalSearchParams(); // Get telephone from URL params

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    authorization_level: "user",
    telephone: telephone || "", // Use phone number if provided
  });

  const [honeypot, setHoneypot] = useState(""); // Hidden field for spam detection

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFullNameChange = (value: string) => {
    const [first_name, last_name] = value.split(" ");
    setForm((prev) => ({
      ...prev,
      first_name: first_name || "",
      last_name: last_name || "",
    }));
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleSubmit = () => {
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

    // Simulate successful registration
    console.log("Form Data:", form);
    Alert.alert("Registration Successful!", "Your account has been created.", [
      {
        text: "OK",
        onPress: () => router.push("/login"), // Redirect to login page
      },
    ]);
  };

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
          value={form.authorization_level}
          onChange={(value) => handleChange("authorization_level", value)}
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

      <SmallButton title={"אישור"} onPress={handleSubmit} />
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
