import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Header from "@/components/header";
import DigitInput from "@/components/digitInput";
import SmallButton from "@/components/smallButton";

const TwoFactor = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(TextInput | null)[]>([]); // Ref to manage focus on inputs

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to the next input if a digit is entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

    function handleSubmit(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <React.Fragment key={index}>
            <DigitInput
              value={digit}
              onChange={(value) => handleChange(index, value)}
              ref={(ref) => (inputsRef.current[index] = ref)}
              autoFocus={index === 0}
              size="large"
            />
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
  codeInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingBottom: 80,
  },
});

export default TwoFactor;
