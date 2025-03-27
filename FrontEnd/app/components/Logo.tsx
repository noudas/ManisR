import SvgComponent from "@/assets/images/logo";
import React from "react";
import { Image, View, StyleSheet } from "react-native";


interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 200, height = 200 }) => {
  return (
    <View style={[styles.logoContainer, { width, height }]}>
      <SvgComponent width={width} height={height} />
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
