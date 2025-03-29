import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import LoadingScreen from "@/pages/loadingScreen";

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Rubik_300Light: require("@/assets/fonts/static/Normal/Rubik-Light.ttf"),
    Rubik_400Regular: require("@/assets/fonts/static/Normal/Rubik-Regular.ttf"),
    Rubik_500Medium: require("@/assets/fonts/static/Normal/Rubik-Medium.ttf"),
    Rubik_600SemiBold: require("@/assets/fonts/static/Normal/Rubik-SemiBold.ttf"),
    Rubik_700Bold: require("@/assets/fonts/static/Normal/Rubik-Bold.ttf"),
    Rubik_800ExtraBold: require("@/assets/fonts/static/Normal/Rubik-ExtraBold.ttf"),
    Rubik_900Black: require("@/assets/fonts/static/Normal/Rubik-Black.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Tabs screenOptions={{ headerStyle: { backgroundColor: Colors.background } }}>
        <Tabs.Screen name="login" options={{ title: "Login" }} />
        <Tabs.Screen name="register" options={{ title: "Register" }} />
        <Tabs.Screen name="registerphone" options={{ title: "Register Phone" }} />
        <Tabs.Screen name="underconstruction" options={{ title: "Page Under Construction" }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
