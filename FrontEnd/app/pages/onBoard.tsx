import { View, Text, StyleSheet } from "react-native";
import Typography from "@/constants/Typography";
import Colors from "@/constants/Colors";
import Header from "@/components/header";
import SmallButton from "@/components/smallButton";

const OnBoard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      
      <View>
        <Text style={styles.titleText}>Rברוכים הבאים למניש</Text>
        <Text style={styles.descriptionText}>
          מנישR הוא מיזם חברתי-סביבתי שמטרתו לצמצם זריקת מזון. החזון שלנו הוא להציל כל מנה או מוצר, כל עוד הם במצב טוב וראויים לאכילה. באמצעות האפליקציה ניתן הן למסור מזון והן לאסוף מזון בקרבתכם.
          מקווים שתמצאו את האפליקציה שימושית ונעימה. עם זאת, אנחנו תמיד שמחים לשמוע הצעות לשיפור, הערות והארות :)
        </Text>
      </View>

      <View style={styles.signatureContainer}>
        <Text style={styles.signatureText}>שלכם, </Text>
        <Text style={styles.signatureText}>צוות מנישR</Text>
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
  },
  headerContainer: {
    marginBottom: 64,
  },
  titleText: {
    fontSize: Typography.fontSize.large,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: Typography.fontSize.medium,
    fontWeight: "400",
    lineHeight: Typography.lineHeight.tight(18),
    textAlign: "right",
    marginBottom: 32,
  },
  signatureContainer: {
    marginBottom: 121,
  },
  signatureText: {
    fontSize: Typography.fontSize.medium,
    fontWeight: "400",
    lineHeight: Typography.lineHeight.tight(18),
    textAlign: "center",
  },
  buttonContainer: {
    paddingBottom:80,
  }
});

export default OnBoard;
