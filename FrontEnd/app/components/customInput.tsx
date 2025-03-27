import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Colors from "@/constants/Colors";

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
            isFocused && { borderBottomColor: Colors.primary },
          ]}
          placeholder={placeholder}
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
    marginBottom: 16,
  },
  label: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.text,
  },
  input: {
    textAlign: 'right',
    width:'auto',
    borderBottomWidth: 2,
    borderBottomColor: Colors.text,
    paddingVertical: 8,
    fontSize: 16,
    color: Colors.text,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  radioButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
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
    fontSize: 16,
    color: Colors.text,
  },
  radioTextSelected: {
    color: Colors.background,
    fontWeight: "600",
  },
});

export default CustomInput;
