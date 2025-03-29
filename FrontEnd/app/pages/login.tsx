import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Logo from "@/components/Logo";
import { useRouter } from "expo-router";
import BigButton from "@/components/bigButton";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";

const Login = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
        <Text style={styles.brandText}>Rמניש</Text>
      </View>

      <View style={styles.buttonContainer}>
      <BigButton title="הרשמה" onPress={() => router.push("/registerphone")} variant="primary" />
        <BigButton title="יש לי כבר חשבון" onPress={() => router.push("/underconstruction")} variant="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },

  brandText: {
    paddingTop: 35,
    fontSize: Typography.fontSize.huge,
    fontWeight: "700",
    fontFamily: Typography.fontFamily.bold_weight_700,
    color: Colors.text,
  },

  buttonContainer: {
    gap: 16,
    alignItems: "center",
  },
});

export default Login;
