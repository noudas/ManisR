import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Typography from "@/constants/Typography";
import Colors from "@/constants/Colors";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";

const OnBoard = () => {
  const { width, height } = useWindowDimensions(); // Get screen dimensions

  // Dynamically adjust font sizes based on screen width
  const titleFontSize = width > 600 ? Typography.fontSize.huge : Typography.fontSize.large;
  const descriptionFontSize = width > 600 ? Typography.fontSize.medium : Typography.fontSize.small;
  const signatureFontSize = width > 600 ? Typography.fontSize.medium : Typography.fontSize.small;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View>
        <Text style={[styles.titleText, { fontSize: titleFontSize }]}>Rברוכים הבאים למניש</Text>
        <Text style={[styles.descriptionText, { fontSize: descriptionFontSize }]}>
          מנישR הוא מיזם חברתי-סביבתי שמטרתו לצמצם זריקת מזון. החזון שלנו הוא להציל כל מנה או מוצר, כל עוד הם במצב טוב וראויים לאכילה. באמצעות האפליקציה ניתן הן למסור מזון והן לאסוף מזון בקרבתכם.
          מקווים שתמצאו את האפליקציה שימושית ונעימה. עם זאת, אנחנו תמיד שמחים לשמוע הצעות לשיפור, הערות והארות :)
        </Text>
      </View>

      <View style={styles.signatureContainer}>
        <Text style={[styles.signatureText, { fontSize: signatureFontSize }]}>שלכם, </Text>
        <Text style={[styles.signatureText, { fontSize: signatureFontSize }]}>צוות מנישR</Text>
      </View>

      <View style={styles.buttonContainer}>
        <SmallButton title={"אישור"} onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingHorizontal: 16, // Adding padding to left/right for smaller screens
  },
  headerContainer: {
    marginTop: 0,
    paddingTop: 16,
    marginBottom: 90,
  },
  titleText: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  descriptionText: {
    fontWeight: "400",
    lineHeight: Typography.lineHeight.tight(18),
    textAlign: "right",
    marginBottom: 32,
  },
  signatureContainer: {
    marginBottom: 100,
  },
  signatureText: {
    fontWeight: "400",
    lineHeight: Typography.lineHeight.tight(18),
    textAlign: "center",
  },
  buttonContainer: {
    paddingBottom: 80,
  },
});

export default OnBoard;
