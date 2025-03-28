import React, { useState, forwardRef } from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";

// Define the props for the component
interface DigitInputProps {
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  size?: "small" | "large";
}

// Use forwardRef to forward the ref from parent to TextInput
const DigitInput = forwardRef<TextInput, DigitInputProps>(({
  value = "",
  onChange,
  autoFocus = false,
  size = "large",
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (text: string) => {
    // Only allow a single digit (0-9)
    const digit = text.replace(/[^0-9]/g, "").slice(0, 1);
    if (onChange) onChange(digit);
  };

  const isLarge = size === "large";

  return (
    <TextInput
      ref={ref} // Attach the ref here
      style={[
        styles.input,
        isLarge ? styles.large : styles.small,
        isFocused && { borderBottomColor: Colors.primary },
      ]}
      keyboardType="numeric"
      value={value}
      maxLength={1}
      onChangeText={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      autoFocus={autoFocus}
    />
  );
});

// Add displayName for debugging purposes
DigitInput.displayName = "DigitInput";

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    fontSize: Typography.fontSize.regular,
    fontWeight: "400",
    borderBottomWidth: 2,
    borderBottomColor: Colors.text,
    color: Colors.text,
  },
  large: {
    width: 50,
    height: 60,
    paddingTop: 0,
    fontSize: Typography.fontSize.large,
  },
  small: {
    width: 27,
    height: 31,
    padding: 0,
    fontSize: Typography.fontSize.small,
  },
});

export default DigitInput;
