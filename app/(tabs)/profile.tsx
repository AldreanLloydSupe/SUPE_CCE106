import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>PROFILE</Text>
        <Text style={styles.title}>Student profile</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AL</Text>
        </View>
        <Text style={styles.name}>Aldrean Lloyd Supe</Text>
        <Text style={styles.email}>mahhnieigah@gmail.com</Text>

        <View style={styles.infoCard}>
          <Info label="Student ID" value="143998" />
          <Info label="Program" value="Information Technology" />
          <Info label="Year" value="3rd" />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/student/143998")}
          style={styles.detailLink}
        >
          <Text style={styles.detailLinkText}>Open student detail</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f7f9fc" },
  container: { padding: 24, alignItems: "center" },
  eyebrow: {
    color: "#3f77d4",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  title: {
    color: "#13233f",
    fontSize: 30,
    fontWeight: "800",
    alignSelf: "flex-start",
    marginTop: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#dceaff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },
  avatarText: { color: "#2667c7", fontSize: 40, fontWeight: "800" },
  name: { color: "#1a2b49", fontSize: 22, fontWeight: "800", marginTop: 14 },
  email: { color: "#74839b", fontSize: 14, marginTop: 5 },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    width: "100%",
    padding: 20,
    marginTop: 30,
  },
  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#edf0f5",
    paddingVertical: 13,
  },
  label: { color: "#8390a3", fontSize: 12, fontWeight: "700" },
  value: { color: "#1f3354", fontSize: 16, fontWeight: "700", marginTop: 5 },
  detailLink: {
    marginTop: 26,
  },
  detailLinkText: { color: "#2d6dcc", fontSize: 15, fontWeight: "700" },
});
