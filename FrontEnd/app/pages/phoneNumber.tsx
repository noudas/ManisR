import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import Header from "@/components/header";
import DigitInput from "@/components/digitInput";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
import SmallButton from "@/components/smallButton";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState(["0", "5", "", "", "", "", "", "", "", ""]);
  const inputRefs = Array(10).fill(null);

  const handleChange = (index: number, value: string) => {
    const newPhoneNumber = [...phoneNumber];
    newPhoneNumber[index] = value;
    setPhoneNumber(newPhoneNumber);

    if (value && index < 9) {
      inputRefs[index + 1]?.focus();
    }
  };

    function handleSubmit(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.phoneInputContainer}>
        {phoneNumber.map((digit, index) => (
          <React.Fragment key={index}>
            <DigitInput
              ref={(ref) => (inputRefs[index] = ref)}
              value={digit}
              onChange={(value) => handleChange(index, value)}
              autoFocus={index === 0}
              size="small"
            />
            {index === 2 ? (
              <Text style={styles.separator}>-</Text>
            ) : null}
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
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  phoneInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
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
