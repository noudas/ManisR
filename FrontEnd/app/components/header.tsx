import { View } from "react-native";
import Logo from "./Logo";

const Header = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 16,
        position: "absolute", // Fixes the header to the top
        top: 0, // Ensures it stays at the top
        left: 0, // Ensures it starts from the left
        right: 0, // Ensures it stretches across the screen
        zIndex: 1000, // Ensures it stays on top of other content
      }}
    >
      <Logo width={36} height={36} />
    </View>
  );
};

export default Header;
