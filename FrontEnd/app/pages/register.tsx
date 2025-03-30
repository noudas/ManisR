import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomInput from "@/components/customInput";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";
import useRegister from "@/hooks/useRegister";
import LoadingScreen from "../pages/loadingScreen";

const Register = () => {
  const router = useRouter();
  const { telephone } = useLocalSearchParams();
  const { registerUser, loading, error } = useRegister();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    authorization_level: "user",
    gender: "",
    telephone: Array.isArray(telephone) ? telephone[0] : telephone || "",
  });

  const [fullName, setFullName] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFullNameChange = (value: React.SetStateAction<string>) => {
    setFullName(value);
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

    // Process full name when submitting
    const [first_name, ...lastNameArray] = fullName.trim().split(" ");
    const last_name = lastNameArray.join(" ");

    try {
      const response = await registerUser({
        ...form,
        first_name: first_name || "",
        last_name: last_name || "",
      });

      if (response) {
        Alert.alert("Registration Successful!", "Your account has been created.", [
          {
            text: "OK",
            onPress: () => router.push("/login"),
          },
        ]);
      }
    } catch (err) {
      Alert.alert("Registration Failed", error || "An error occurred during registration.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.inputs}>
        <CustomInput
          type="writable"
          label="מה השם שלך?"
          placeholder="ישראלה ישראלי"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <CustomInput
          type="writable"
          label="בחר/י שם משתמש"
          placeholder="ישראלה"
          value={form.username}
          onChange={(value) => handleChange("username", value)}
        />
        <CustomInput
          type="writable"
          label="מה המייל שלך?"
          placeholder="israela123@example.com"
          value={form.email}
          onChange={(value) => handleChange("email", value)}
        />
        <CustomInput
          type="radio"
          label="מה המגדר שלך?"
          options={["אחר", "אישה", "גבר"]}
          value={form.gender}
          onChange={(value) => handleChange("gender", value)}
        />
        <CustomInput
          type="writable"
          label="בחר/י סיסמה"
          placeholder="********"
          value={form.password}
          onChange={(value) => handleChange("password", value)}
        />
      </View>
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
      <SmallButton title="אישור" onPress={handleSubmit} />
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
