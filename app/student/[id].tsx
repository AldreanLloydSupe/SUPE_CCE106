import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  if (id !== '143998') {
    return <SafeAreaView style={styles.safeArea}><Stack.Screen options={{ title: 'Student not found', headerShown: true }} /><View style={styles.container}><Text style={styles.eyebrow}>STUDENT NOT FOUND</Text><Text style={styles.title}>We couldn’t find that student.</Text><Text style={styles.subtitle}>The student ID may be invalid or unavailable.</Text><Link href="/(tabs)/profile" style={styles.backLink}>Return to profile</Link></View></SafeAreaView>;
  }
  return <SafeAreaView style={styles.safeArea}><Stack.Screen options={{ title: 'Student details', headerShown: true }} /><View style={styles.container}><Text style={styles.eyebrow}>STUDENT DETAIL</Text><Text style={styles.title}>Aldrean Lloyd Supe</Text><Text style={styles.subtitle}>Dynamic student ID route</Text><View style={styles.card}><Text style={styles.label}>STUDENT ID</Text><Text style={styles.id}>{id}</Text><Text style={styles.label}>PROGRAM</Text><Text style={styles.value}>Information Technology</Text><Text style={styles.label}>YEAR</Text><Text style={styles.value}>3rd</Text><Text style={styles.label}>STATUS</Text><Text style={styles.value}>Active student</Text></View></View></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: '#f7f9fc' }, container: { padding: 24 }, eyebrow: { color: '#3f77d4', fontSize: 12, fontWeight: '800', letterSpacing: 1.2, marginTop: 24 }, title: { color: '#13233f', fontSize: 32, fontWeight: '800', marginTop: 12 }, subtitle: { color: '#687994', fontSize: 16, marginTop: 6 }, card: { backgroundColor: '#fff', borderRadius: 18, padding: 22, marginTop: 28 }, label: { color: '#8390a3', fontSize: 12, fontWeight: '800', marginTop: 16 }, id: { color: '#2d6dcc', fontSize: 24, fontWeight: '800', marginTop: 5 }, value: { color: '#1f3354', fontSize: 17, fontWeight: '700', marginTop: 5 }, backLink: { color: '#2d6dcc', fontSize: 16, fontWeight: '700', marginTop: 28 } });
