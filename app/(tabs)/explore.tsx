import { Link } from "expo-router";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const courses = [
  { id: "mobile-development", title: "Mobile Development", detail: "React Native fundamentals", progress: 82, icon: "phone-iphone" as const, color: "#4F7DF3" },
  { id: "database-systems", title: "Database Systems", detail: "SQL and data modelling", progress: 46, icon: "storage" as const, color: "#20B39C" },
  { id: "web-development", title: "Web Development", detail: "Modern frontend patterns", progress: 64, icon: "language" as const, color: "#F19A4A" },
  { id: "expo-router", title: "Expo Router", detail: "File-based navigation", progress: 28, icon: "alt-route" as const, color: "#9B6FE8" },
];

export default function CoursesScreen() {
  const [query, setQuery] = useState("");
  const filtered = courses.filter((course) => course.title.toLowerCase().includes(query.toLowerCase()));

  return <SafeAreaView style={styles.safeArea}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
    <Text style={styles.kicker}>LEARNING HUB</Text><Text style={styles.title}>My courses</Text><Text style={styles.subtitle}>Keep building your skills, one lesson at a time.</Text>
    <View style={styles.search}><MaterialIcons name="search" size={21} color="#8C98AA" /><TextInput value={query} onChangeText={setQuery} placeholder="Search courses" placeholderTextColor="#9AA6B8" style={styles.searchInput} /></View>
    <View style={styles.filterRow}><Text style={styles.activeFilter}>All courses</Text><Text style={styles.filter}>In progress</Text><Text style={styles.filter}>Completed</Text></View>
    {filtered.map((course) => <Link key={course.id} href={{ pathname: "/course/[id]", params: { id: course.id } }} asChild><Pressable style={styles.card}><View style={[styles.icon, { backgroundColor: `${course.color}18` }]}><MaterialIcons name={course.icon} size={26} color={course.color} /></View><View style={styles.copy}><View style={styles.titleRow}><Text style={styles.cardTitle}>{course.title}</Text><MaterialIcons name="chevron-right" size={22} color="#A1AEC1" /></View><Text style={styles.detail}>{course.detail}</Text><View style={styles.progressRow}><View style={styles.track}><View style={[styles.fill, { width: `${course.progress}%`, backgroundColor: course.color }]} /></View><Text style={styles.percent}>{course.progress}%</Text></View><Text style={styles.lesson}>12 lessons · Next: Continue learning</Text></View></Pressable></Link>)}
    {filtered.length === 0 && <View style={styles.empty}><MaterialIcons name="search-off" size={40} color="#A1AEC1" /><Text style={styles.emptyTitle}>No courses found</Text><Text style={styles.emptyText}>Try a different search term.</Text></View>}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: "#F5F7FB" }, container: { padding: 20, paddingBottom: 40 }, kicker: { color: "#8491A7", fontSize: 11, fontWeight: "800", letterSpacing: 1.1, marginTop: 8 }, title: { color: "#14213D", fontSize: 30, fontWeight: "800", marginTop: 8 }, subtitle: { color: "#718096", fontSize: 15, lineHeight: 22, marginTop: 5 }, search: { backgroundColor: "#FFF", height: 48, borderRadius: 14, marginTop: 24, paddingHorizontal: 14, flexDirection: "row", alignItems: "center" }, searchInput: { flex: 1, color: "#24395D", fontSize: 14, marginLeft: 9 }, filterRow: { flexDirection: "row", gap: 23, marginTop: 24, marginBottom: 14 }, activeFilter: { color: "#4F7DF3", fontSize: 13, fontWeight: "800", borderBottomWidth: 2, borderBottomColor: "#4F7DF3", paddingBottom: 8 }, filter: { color: "#8793A7", fontSize: 13, fontWeight: "700", paddingBottom: 8 }, card: { backgroundColor: "#FFF", borderRadius: 18, padding: 15, marginBottom: 12, flexDirection: "row" }, icon: { width: 54, height: 54, borderRadius: 16, alignItems: "center", justifyContent: "center" }, copy: { flex: 1, marginLeft: 14 }, titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, cardTitle: { color: "#1B2E50", fontSize: 16, fontWeight: "800" }, detail: { color: "#8793A7", fontSize: 12, marginTop: 3 }, progressRow: { flexDirection: "row", alignItems: "center", marginTop: 13 }, track: { flex: 1, height: 6, borderRadius: 3, backgroundColor: "#EDF0F5", overflow: "hidden" }, fill: { height: 6, borderRadius: 3 }, percent: { color: "#64748B", fontSize: 11, fontWeight: "800", marginLeft: 9 }, lesson: { color: "#9AA6B8", fontSize: 10, marginTop: 6 }, empty: { alignItems: "center", paddingTop: 80 }, emptyTitle: { color: "#304466", fontSize: 17, fontWeight: "800", marginTop: 12 }, emptyText: { color: "#8793A7", fontSize: 13, marginTop: 5 } });
