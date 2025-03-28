import React from "react";
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import Login from "./pages/login";
import Colors from "./constants/Colors";

export default function Index() {
  // Load the Rubik font
  const [fontsLoaded] = useFonts({
    Rubik_300Light: require("./assets/fonts/static/Normal/Rubik-Light.ttf"),
    Rubik_400Regular: require("./assets/fonts/static/Normal/Rubik-Regular.ttf"),
    Rubik_500Medium: require("./assets/fonts/static/Normal/Rubik-Medium.ttf"),
    Rubik_600SemiBold: require("./assets/fonts/static/Normal/Rubik-SemiBold.ttf"),
    Rubik_700Bold: require("./assets/fonts/static/Normal/Rubik-Bold.ttf"),
    Rubik_800ExtraBold: require("./assets/fonts/static/Normal/Rubik-ExtraBold.ttf"),
    Rubik_900Black: require("./assets/fonts/static/Normal/Rubik-Black.ttf"),
  });

  // Wait until the fonts are loaded
  if (!fontsLoaded) {
    return <View style={styles.loading}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Login />
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
