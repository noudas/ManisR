import { Text, View } from "react-native";
import { LoadingScreen } from "./pages/loadingScreen";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingScreen />
    </View>
  );
}
