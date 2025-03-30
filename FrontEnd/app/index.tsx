import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "./constants/Colors";
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

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (token) {
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setUserLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkUserLogin();
  }, []);

  if (!fontsLoaded || isCheckingAuth) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return <Redirect href={userLoggedIn ? "/underconstruction" : "/login"} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
