import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const title = id === 'react-native' ? 'React Native' : id === 'expo-router' ? 'Expo Router' : null;

  if (!title) {
    return <SafeAreaView style={styles.safeArea}><Stack.Screen options={{ title: 'Course not found', headerShown: true }} /><View style={styles.container}><Text style={styles.eyebrow}>COURSE NOT FOUND</Text><Text style={styles.title}>We couldn’t find that course.</Text><Text style={styles.description}>The course link may be invalid or unavailable.</Text><Link href="/" style={styles.backLink}>Return to home</Link></View></SafeAreaView>;
  }

  return <SafeAreaView style={styles.safeArea}><Stack.Screen options={{ title, headerShown: true }} /><View style={styles.container}><Text style={styles.eyebrow}>COURSE DETAIL</Text><Text style={styles.title}>{title}</Text><Text style={styles.description}>This screen is opened by the stack above the bottom tabs. Keep exploring the lessons to continue your progress.</Text><View style={styles.lesson}><Text style={styles.lessonNumber}>LESSON 01</Text><Text style={styles.lessonTitle}>Getting started</Text><Text style={styles.lessonText}>Learn the fundamentals and build your first screen.</Text></View></View></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: '#f7f9fc' }, container: { padding: 24 }, eyebrow: { color: '#3f77d4', fontSize: 12, fontWeight: '800', letterSpacing: 1.2, marginTop: 24 }, title: { color: '#13233f', fontSize: 32, fontWeight: '800', marginTop: 12 }, description: { color: '#687994', fontSize: 16, lineHeight: 25, marginTop: 14 }, lesson: { backgroundColor: '#fff', borderRadius: 18, padding: 20, marginTop: 30 }, lessonNumber: { color: '#3f77d4', fontSize: 12, fontWeight: '800' }, lessonTitle: { color: '#1a2b49', fontSize: 20, fontWeight: '800', marginTop: 10 }, lessonText: { color: '#74839b', fontSize: 14, marginTop: 6 }, backLink: { color: '#2d6dcc', fontSize: 16, fontWeight: '700', marginTop: 28 } });
