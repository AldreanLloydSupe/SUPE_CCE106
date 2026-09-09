import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      // Keep the active icon readable against the white tab bar in either
      // system appearance. The screens currently use a light tab bar.
      tabBarActiveTintColor: '#2873dc',
      tabBarInactiveTintColor: '#8b98aa',
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarStyle: { height: 72, paddingTop: 8, paddingBottom: 10, backgroundColor: '#fff', borderTopColor: '#e6ebf2' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => <TabIcon name="house.fill" color={color} focused={focused} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, focused }) => <TabIcon name="person.fill" color={color} focused={focused} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, focused }) => <TabIcon name="gearshape.fill" color={color} focused={focused} /> }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

function TabIcon({ name, color, focused }: { name: 'house.fill' | 'person.fill' | 'gearshape.fill'; color: string; focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
      <IconSymbol size={23} name={name} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#e6f0ff',
  },
});
