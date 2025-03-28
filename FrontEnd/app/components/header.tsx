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
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Logo width={36} height={36} />
    </View>
  );
};

export default Header;
