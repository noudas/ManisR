import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/header";
import DigitInput from "@/components/digitInput";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import SmallButton from "@/components/smallButton";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState(["0", "5", "", "", "", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters in one input

    const newPhoneNumber = [...phoneNumber];

    // Ensure first two numbers remain unchanged
    if (index < 2) return; 

    // Handle backspace behavior
    if (value === "") {
        newPhoneNumber[index] = ""; // Clear current input
        setPhoneNumber(newPhoneNumber);
        
        // Move focus back only if the previous input is not fixed
        if (index > 2) {
            setTimeout(() => inputRefs.current[index - 1]?.focus(), 10);
        }
        return;
    }

    // Handle normal input
    newPhoneNumber[index] = value;
    setPhoneNumber(newPhoneNumber);

    // Move to next input if a number is entered
    if (index < 9) {
        setTimeout(() => inputRefs.current[index + 1]?.focus(), 10);
    }
};


  const handleSubmit = () => {
    const phone = phoneNumber.join(""); // Join digits into a full phone number
    if (phone.length !== 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
      return;
    }
    router.push({ pathname: "/register", params: { telephone: phone } });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.phoneInputContainer}>
        {phoneNumber.map((digit, index) => (
          <React.Fragment key={index}>
            <DigitInput
              ref={(ref) => (inputRefs.current[index] = ref!)}
              value={digit}
              onChange={(value) => handleChange(index, value)}
              autoFocus={index === 2}
              size="small"
              keyboardType="numeric"
            />
            {index === 2 ? <Text style={styles.separator}>-</Text> : null}
          </React.Fragment>
        ))}
      </View>
      <SmallButton title={"אישור"} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingBottom: 80,
  },
  separator: {
    fontSize: Typography.fontSize.large,
    fontWeight: "600",
    marginHorizontal: 3,
    color: Colors.text,
  },
});

export default PhoneNumber;
