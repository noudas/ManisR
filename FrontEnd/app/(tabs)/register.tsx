import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Register from "@/pages/register";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";
const RegisterTab = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Register />
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

export default RegisterTab;
