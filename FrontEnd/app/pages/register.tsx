import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "@/components/customInput";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";
import RequestTypes from "@/types/requestTypes";

type RegisterRequest = Omit<typeof RequestTypes.RegisterRequest, "telephone">; // Excluding telephone

const Register = () => {
  const [form, setForm] = useState<RegisterRequest>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    authorization_level: "user",
  });

  const [honeypot, setHoneypot] = useState(""); // Hidden field for spam detection

  const handleChange = (field: keyof RegisterRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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

    console.log("Form Data:", form);
    Alert.alert("Registration Successful!", "Your account has been created.");
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.inputs}>
        <CustomInput
          type="writable"
          label="מה השם שלך?"
          placeholder="ישראלה ישראלי"
          value={form.first_name}
          onChange={(value) => handleChange("first_name", value)}
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
          value={form.authorization_level}
          onChange={(value) => handleChange("authorization_level", value)}
        />

        <CustomInput
          type="writable"
          label="בחר/י סיסמה"
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
  },
  passwordtext: {
    fontSize: Typography.fontSize.small,
    fontWeight: "400",
    paddingBottom: 24,
  },
});

export default Register;
