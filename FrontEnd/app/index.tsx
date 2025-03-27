import React from "react";
import { Text, View, StyleSheet, Dimensions, useWindowDimensions  } from "react-native";
import Login from "./pages/login";
import OnBoard from "./pages/onBoard";
import Colors from "./constants/Colors";
import LoadingScreen from "./pages/loadingScreen";
import CustomInput from "./components/customInput";

// Get screen dimensions
const { width, height } = useWindowDimensions(); 

export default function Index() {
  return (
    <View style={styles.container}>
      <CustomInput
        type="writable"
        label="Username"
        placeholder="Enter your username"
        value={'username'}
        onChange={(value: string) => console.log('test', value)}
      />
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
