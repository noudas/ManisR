import React from "react";
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import Login from "./pages/login";
import Colors from "./constants/Colors";
import LoadingScreen from "./pages/loadingScreen";
import Register from "./pages/register";
import TwoFactor from "./pages/twoFactor";
import PhoneNumber from "./pages/phoneNumber";
import UnderConstruction from "./pages/underConstruction";
import { Redirect } from "expo-router";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Rubik_300Light: require("./assets/fonts/static/Normal/Rubik-Light.ttf"),
    Rubik_400Regular: require("./assets/fonts/static/Normal/Rubik-Regular.ttf"),
    Rubik_500Medium: require("./assets/fonts/static/Normal/Rubik-Medium.ttf"),
    Rubik_600SemiBold: require("./assets/fonts/static/Normal/Rubik-SemiBold.ttf"),
    Rubik_700Bold: require("./assets/fonts/static/Normal/Rubik-Bold.ttf"),
    Rubik_800ExtraBold: require("./assets/fonts/static/Normal/Rubik-ExtraBold.ttf"),
    Rubik_900Black: require("./assets/fonts/static/Normal/Rubik-Black.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingScreen/>;
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Redirect href={'/pages/login'}/>
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
    fontFamily: 'Rubik_400Regular',
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
