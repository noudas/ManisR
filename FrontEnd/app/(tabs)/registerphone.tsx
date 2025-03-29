import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PhoneNumber from "@/pages/phoneNumber"; // Importing the PhoneNumber page
import Colors from "@/constants/Colors"; // Ensure you import Colors

const RegisterPhoneTab = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <PhoneNumber />
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

export default RegisterPhoneTab;
