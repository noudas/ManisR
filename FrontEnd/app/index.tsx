import React from "react";
import { Text, View, StyleSheet, Dimensions, useWindowDimensions, ScrollView } from "react-native";
import Login from "./pages/login";
import OnBoard from "./pages/onBoard";
import Colors from "./constants/Colors";
import LoadingScreen from "./pages/loadingScreen";
import CustomInput from "./components/customInput";
import Register from "./pages/register";
import Typography from "./constants/Typography";

const { width, height } = useWindowDimensions();

export default function Index() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Register/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});