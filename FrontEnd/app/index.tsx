import { Text, View } from "react-native";
import { LoadingScreen } from "./pages/loadingScreen";
import { BigButton } from "@components/bigButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BigButton title="Hello World" onPress={() => console.log("Hello World")} />
      <BigButton variant="secondary" title="Hello World" onPress={() => console.log("Hello World")} />
      <LoadingScreen />
    </View>
  );
}
