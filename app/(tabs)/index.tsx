import { Link, type RelativePathString } from "expo-router";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const courses = [
  {
    id: "expo-router",
    title: "Expo Router",
    detail: "Build multi-screen apps with file-based navigation.",
  },
  {
    id: "react-native",
    title: "React Native",
    detail: "Create beautiful native interfaces with JavaScript.",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>STUDENT PORTAL</Text>
        <Text style={styles.title}>Welcome back, Aldrean!</Text>
        <Text style={styles.subtitle}>
          Keep learning and stay on track with your courses.
        </Text>

        <Link href="/(tabs)/profile" asChild>
          <Pressable style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.profileCopy}>
              <Text style={styles.profileLabel}>YOUR PROFILE</Text>
              <Text style={styles.profileName}>Aldrean Lloyd Supe</Text>
              <Text style={styles.profileDetail}>Information Technology · 3rd year</Text>
            </View>
          </Pressable>
        </Link>

        <Text style={styles.sectionTitle}>Student information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoLabel}>STUDENT ID</Text>
              <Text style={styles.infoValue}>143998</Text>
            </View>
            <View style={styles.infoRight}>
              <Text style={styles.infoLabel}>SUBJECTS</Text>
              <Text style={styles.infoValue}>6</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoLabel}>PROGRAM</Text>
              <Text style={styles.infoValue}>Information Technology</Text>
            </View>
            <View style={styles.infoRight}>
              <Text style={styles.infoLabel}>YEAR</Text>
              <Text style={styles.infoValue}>3rd</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Continue learning</Text>
        {courses.map((course) => (
          <Link
            key={course.id}
            href={{
              pathname: "/course/[id]" as RelativePathString,
              params: { id: course.id },
            }}
            asChild
          >
            <Pressable style={styles.courseCard}>
              <View style={styles.courseIcon}>
                <Text style={styles.bookIcon}>▣</Text>
              </View>
              <View style={styles.courseCopy}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDetail}>{course.detail}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          </Link>
        ))}

        <Text style={styles.sectionTitle}>Quick links</Text>
        <Link href={"/student/143998" as RelativePathString} asChild>
          <Pressable style={styles.linkRow}>
            <Text style={styles.linkText}>View your student profile</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f7f9fc" },
  container: { padding: 24, paddingBottom: 40 },
  eyebrow: {
    color: "#3f77d4",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginTop: 12,
  },
  title: { color: "#13233f", fontSize: 32, fontWeight: "800", marginTop: 12 },
  subtitle: { color: "#687994", fontSize: 16, lineHeight: 24, marginTop: 8 },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#1d3960",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#dceaff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#2667c7", fontSize: 24, fontWeight: "800" },
  profileCopy: { flex: 1, marginLeft: 14 },
  profileLabel: {
    color: "#3f77d4",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  profileName: {
    color: "#1a2b49",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 3,
  },
  profileDetail: { color: "#74839b", fontSize: 13, marginTop: 3 },
  sectionTitle: {
    color: "#172a4b",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 14,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 18,
    shadowColor: "#1d3960",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  infoRow: {
    minHeight: 76,
    borderBottomWidth: 1,
    borderBottomColor: "#edf0f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoRight: { minWidth: 82 },
  infoLabel: {
    color: "#8390a3",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  infoValue: { color: "#1f3354", fontSize: 15, fontWeight: "700", marginTop: 5 },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#1d3960",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#e6f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
  bookIcon: { color: "#2873dc", fontSize: 25 },
  courseCopy: { flex: 1, marginLeft: 14 },
  courseTitle: { color: "#1a2b49", fontSize: 16, fontWeight: "800" },
  courseDetail: {
    color: "#74839b",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  chevron: { color: "#3975cf", fontSize: 30, fontWeight: "300", marginLeft: 8 },
  linkRow: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkText: { color: "#2d66bd", fontSize: 15, fontWeight: "700" },
});
