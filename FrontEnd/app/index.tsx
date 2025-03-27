import { Text, View } from "react-native";
import { Logo } from "./components/Logo";
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
      <Text>Test</Text>
      <Logo />
      <LoadingScreen />
    </View>
  );
}
