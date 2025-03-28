import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";

interface CustomInputProps {
  type: "writable" | "radio";
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: string[]; // Only for radio type
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  options = [],
}) => {
  const [selectedRadio, setSelectedRadio] = useState<string | null>(value || "");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {type === "writable" ? (
        <TextInput
          style={[
            styles.input,
            isFocused && { backgroundColor: Colors.lightText },
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightText} 
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <View style={styles.radioContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.radioButton,
                selectedRadio === option && styles.radioSelected,
              ]}
              onPress={() => {
                setSelectedRadio(option);
                if (onChange) onChange(option);
              }}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedRadio === option && styles.radioTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    textAlign: 'right',
    alignItems: "flex-end",
    marginBottom: 16,
  },
  label: {
    textAlign: 'right',
    fontSize: Typography.fontSize.medium,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.text,
  },
  input: {
    textAlign: 'right',
    width:'100%',
    borderBottomWidth: 2,
    borderBottomColor: Colors.text,
    paddingVertical: 8,
    fontSize: Typography.fontSize.medium,
    color: Colors.text,
  },
  radioContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 24,
  },
  radioButton: {
    flexDirection: "row-reverse",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",

  },
  radioSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  radioText: {
    fontSize: Typography.fontSize.medium,
    color: Colors.text,
  },
  radioTextSelected: {
    color: Colors.background,
    fontWeight: "600",
  },
});

export default CustomInput;
