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
      <LoadingScreen />
      <BigButton title="Hello World" onPress={() => console.log("Hello World")} />
    </View>
  );
}
