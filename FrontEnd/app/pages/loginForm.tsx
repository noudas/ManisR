import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import CustomInput from "@/components/customInput";
import Colors from "@/constants/Colors";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";
import useLogin from "@/hooks/useLogin";
import LoadingScreen from "../pages/loadingScreen";

const LoginForm = () => {
  const router = useRouter();
  const { loginUser, loading, error } = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    try {
      const response = await loginUser({
        username: form.email,
        password: form.password,
        twoFactorCode: "",
      });
      if (response) {
        Alert.alert("Login Successful!", "Welcome back!", [
          {
            text: "OK",
            onPress: () => router.push("/underconstruction"),
          },
        ]);
      }
    } catch (err) {
      Alert.alert("Login Failed", error || "Invalid email or password.");
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
          label="בחר/י שם משתמש?"
          placeholder="ישראלה"
          value={form.email}
          onChange={(value) => handleChange("email", value)}
        />
        <CustomInput
          type="writable"
          label="הזן/י סיסמה"
          placeholder="********"
          secureTextEntry
          value={form.password}
          onChange={(value) => handleChange("password", value)}
        />
      </View>
      <SmallButton title="כניסה" onPress={handleSubmit} />
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
});

export default LoginForm;
