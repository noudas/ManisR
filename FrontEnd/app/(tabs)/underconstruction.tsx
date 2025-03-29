import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import UnderConstruction from "@/pages/underConstruction"; // Importing the UnderConstruction page
import Colors from "@/constants/Colors"; // Ensure you import Colors

const UnderConstructionTab = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <UnderConstruction />
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

export default UnderConstructionTab;
