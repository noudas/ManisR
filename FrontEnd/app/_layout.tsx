import { Stack } from "expo-router";

import Colors from "./constants/Colors";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
          flex: 1,
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{
          animation: 'fade_from_bottom',
          title: 'Login'
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ title: 'Register' }}
      />
      <Stack.Screen 
        name="twoFactor" 
        options={{ title: '2FA' }}
      />
      <Stack.Screen 
        name="phoneNumber" 
        options={{ title: 'Register' }}
      />
      <Stack.Screen 
        name="underConstruction" 
        options={{ title: 'Underr Construction' }}
      />
    </Stack>
  );
}