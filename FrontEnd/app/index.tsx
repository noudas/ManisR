import React from "react";
import { Text, View, StyleSheet, Dimensions, useWindowDimensions  } from "react-native";
import Login from "./pages/login";
import OnBoard from "./pages/onBoard";
import Colors from "./constants/Colors";
import LoadingScreen from "./pages/loadingScreen";

// Get screen dimensions
const { width, height } = useWindowDimensions(); 

export default function Index() {
  return (
    <View style={styles.container}>
      <OnBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: height,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
});
