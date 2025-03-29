// (tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="login" options={{ title: 'Login' }} />
      <Tabs.Screen name="register" options={{ title: 'Register' }} />
      <Tabs.Screen name="registerphone" options={{ title: 'Register Phone' }} />
      <Tabs.Screen name="underconstruction" options={{ title: 'Page Under Construction' }} />
    </Tabs>
  );
}