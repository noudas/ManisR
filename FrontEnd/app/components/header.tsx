import { View } from "react-native"
import { Logo } from "./Logo"

export const Header = () => {
    return(
        <View style={{ width: "100%", height: 60, justifyContent: "center", alignItems: "center" }}>
            <Logo width={36} height={36} />
        </View>
    )
}