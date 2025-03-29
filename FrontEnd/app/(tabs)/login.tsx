import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Login from "@/pages/login"; // Assuming this is where the actual Login page is
import Colors from "@/constants/Colors";

const LoginTab = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.contentContainer}
    >
      <Login />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
      },
      contentContainer: {
        flexGrow: 1,
        padding: 20,
        fontFamily: 'Rubik_400Regular',
      },
});

export default LoginTab;
