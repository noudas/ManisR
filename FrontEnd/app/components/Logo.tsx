import React from "react";
import { Image, View, StyleSheet } from "react-native";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 200, height = 200 }) => {
  return (
    <View style={[styles.logoContainer, { width, height }]}>
      <Image source={require("@assets/images/logo.svg")} style={[styles.logo, { width, height }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
  },
});

export default Logo;
