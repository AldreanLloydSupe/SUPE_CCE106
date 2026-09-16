import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Tabs } from 'expo-router';

function AppNavigation({ state, navigation }: any) {
  const labels: Record<string, string> = {
    index: 'Home',
    events: 'Events',
    profile: 'Profile',
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: { key: string; name: string }, index: number) => {
        const focused = state.index === index;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={({ pressed }) => [
              styles.tabButton,
              focused && styles.tabButtonActive,
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.tabText, focused && styles.tabTextActive]}>
              {labels[route.name]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <AppNavigation {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#F7FAFC' },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen name="index" options={{ title: 'EventMate' }} />
      <Tabs.Screen name="events" options={{ title: 'Browse events' }} />
      <Tabs.Screen name="profile" options={{ title: 'My profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#DCE7EF',
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  tabButtonActive: {
    backgroundColor: '#E5F4F5',
  },
  tabText: {
    color: '#6F8497',
    fontSize: 12,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#177E89',
  },
  pressed: {
    opacity: 0.7,
  },
});
