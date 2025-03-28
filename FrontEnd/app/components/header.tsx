import { View } from "react-native";
import Logo from "./Logo";

const Header = () => {
  return (
    <View style={{ 
      width: "100%", 
      height: 60, 
      justifyContent: "center", 
      alignItems: "center",
      paddingTop: 16,
      paddingBottom:90,
       }}>
      <Logo width={36} height={36} />
    </View>
  );
};

export default Header;
