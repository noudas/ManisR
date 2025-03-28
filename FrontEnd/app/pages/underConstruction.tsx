import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "@/components/header";
import Colors from "@/constants/Colors";
import Typography from "@/constants/Typography";

const UnderConstruction = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Page Under Construction</Text>
        <Text style={styles.description}>
          We are working hard to bring this page to you. 
          Please check back later!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: Colors.background,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: Typography.fontSize.large,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: Typography.fontSize.regular,
    fontWeight: "400",
    color: Colors.text,
    marginTop: 8,
  },
});

export default UnderConstruction;
