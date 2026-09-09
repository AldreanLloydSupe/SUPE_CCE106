import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>SETTINGS</Text>
        <Text style={styles.title}>Preferences</Text>
        <View style={styles.card}>
          <SettingRow title="Push notifications" description="Get reminders about your courses." value={notifications} onChange={setNotifications} />
          <SettingRow title="Dark mode" description="Use a darker appearance." value={darkMode} onChange={setDarkMode} />
        </View>
        <Text style={styles.sectionTitle}>Account</Text>
        <Pressable style={styles.action}><Text style={styles.actionText}>Edit profile</Text><Text style={styles.chevron}>›</Text></Pressable>
        <Pressable style={styles.action}><Text style={styles.actionText}>Sign out</Text><Text style={styles.chevron}>›</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ title, description, value, onChange }: { title: string; description: string; value: boolean; onChange: (value: boolean) => void }) {
  return <View style={styles.settingRow}><View style={styles.settingCopy}><Text style={styles.settingTitle}>{title}</Text><Text style={styles.description}>{description}</Text></View><Switch value={value} onValueChange={onChange} trackColor={{ false: '#d6dce5', true: '#9bc0f5' }} thumbColor={value ? '#2873dc' : '#fff'} /></View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f9fc' },
  container: { padding: 24 },
  eyebrow: { color: '#3f77d4', fontSize: 12, fontWeight: '800', letterSpacing: 1.2, marginTop: 12 },
  title: { color: '#13233f', fontSize: 30, fontWeight: '800', marginTop: 12 },
  card: { backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 18, marginTop: 28 },
  settingRow: { minHeight: 82, borderBottomWidth: 1, borderBottomColor: '#edf0f5', flexDirection: 'row', alignItems: 'center' },
  settingCopy: { flex: 1 },
  settingTitle: { color: '#1f3354', fontSize: 16, fontWeight: '700' },
  description: { color: '#74839b', fontSize: 13, marginTop: 4 },
  sectionTitle: { color: '#172a4b', fontSize: 20, fontWeight: '800', marginTop: 32, marginBottom: 12 },
  action: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  actionText: { color: '#2d66bd', fontSize: 15, fontWeight: '700' },
  chevron: { color: '#3975cf', fontSize: 26, lineHeight: 22 },
});
