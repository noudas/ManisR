import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomInput from "@/components/customInput";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", form);
  };

  return (
    <View style={styles.container}>
    <Header/>

    <View style={styles.inputs}>

        <CustomInput
            type="writable"
            label="מה השם שלך?"
            placeholder="ישראלה ישראלי"
            value={form.fullName}
            onChange={(value) => handleChange("fullName", value)}
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
            placeholder=""
            value={form.password}
            onChange={(value) => handleChange("password", value)}
        />
        
      </View>
        <Text style={styles.passwordtext}>* הסיסמה חייבת לכלול 8 תווים, לפחות ספרה אחת ולפחות אות אחת</Text>
        <SmallButton title={"אישור"} onPress={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  inputs: {
    width:'100%',
    gap: 32,
  },
  passwordtext: {
    fontSize: Typography.fontSize.small,
    fontWeight: "400",
    paddingBottom: 24,
  },
});

export default Register;