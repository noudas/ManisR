import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import LoginForm from "@/pages/loginForm";
import Colors from "@/constants/Colors";

const LoginFormTab = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.contentContainer}
    >
      <LoginForm />
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

export default LoginFormTab;
