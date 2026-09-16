import { Link } from "expo-router";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const courses = [
  { title: "Mobile Development", subtitle: "React Native fundamentals", progress: 82, color: "#4F7DF3", icon: "phone-iphone" as const },
  { title: "Database Systems", subtitle: "SQL and data modelling", progress: 46, color: "#20B39C", icon: "storage" as const },
  { title: "Web Development", subtitle: "Modern frontend patterns", progress: 64, color: "#F19A4A", icon: "language" as const },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>THURSDAY, SEPTEMBER 10</Text>
            <Text style={styles.title}>Good morning, Aldrean</Text>
            <Text style={styles.subtitle}>Let&apos;s make today count.</Text>
          </View>
          <Link href="/(tabs)/profile" asChild>
            <Pressable style={styles.avatar} accessibilityLabel="Open profile">
              <Text style={styles.avatarText}>AL</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.overviewCard}>
          <View style={styles.overviewTop}>
            <View>
              <Text style={styles.overviewLabel}>YOUR LEARNING OVERVIEW</Text>
              <Text style={styles.overviewTitle}>You&apos;re doing great</Text>
            </View>
            <View style={styles.streakBadge}>
              <MaterialIcons name="local-fire-department" size={17} color="#F19A4A" />
              <Text style={styles.streakText}>7 day streak</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <Stat value="3.82" label="Current GPA" />
            <Stat value="68%" label="Avg. progress" />
            <Stat value="6" label="Subjects" />
          </View>
        </View>

        <SectionHeading title="Continue learning" action="View all" href="/(tabs)/explore" />
        {courses.slice(0, 2).map((course) => (
          <Link key={course.title} href={{ pathname: "/course/[id]", params: { id: course.title.toLowerCase().replaceAll(" ", "-") } }} asChild>
            <Pressable style={styles.courseCard}>
              <View style={[styles.courseIcon, { backgroundColor: `${course.color}18` }]}>
                <MaterialIcons name={course.icon} size={23} color={course.color} />
              </View>
              <View style={styles.courseCopy}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
                <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${course.progress}%`, backgroundColor: course.color }]} /></View>
                <Text style={styles.progressText}>{course.progress}% complete</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#A1AEC1" />
            </Pressable>
          </Link>
        ))}

        <SectionHeading title="Up next" action="See schedule" />
        <View style={styles.scheduleCard}>
          <View style={styles.dateBox}><Text style={styles.dateDay}>12</Text><Text style={styles.dateMonth}>SEP</Text></View>
          <View style={styles.scheduleCopy}><Text style={styles.scheduleTitle}>Database Systems quiz</Text><Text style={styles.scheduleSubtitle}>Saturday · 10:00 AM · Room 204</Text></View>
          <View style={styles.dueBadge}><Text style={styles.dueText}>Due soon</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickGrid}>
          <QuickAction icon="calendar-month" label="Schedule" />
          <QuickAction icon="bar-chart" label="Grades" />
          <QuickAction icon="badge" label="Student ID" />
          <QuickAction icon="support-agent" label="Help desk" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

function SectionHeading({ title, action, href }: { title: string; action: string; href?: "/(tabs)/explore" }) {
  return <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{title}</Text>{href ? <Link href={href} style={styles.sectionAction}>{action}</Link> : <Text style={styles.sectionAction}>{action}</Text>}</View>;
}

function QuickAction({ icon, label }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; label: string }) {
  return <Pressable style={styles.quickAction}><View style={styles.quickIcon}><MaterialIcons name={icon} size={21} color="#4F7DF3" /></View><Text style={styles.quickLabel}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FB" },
  container: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  kicker: { color: "#8491A7", fontSize: 11, fontWeight: "800", letterSpacing: 1.1 },
  title: { color: "#14213D", fontSize: 26, fontWeight: "800", marginTop: 8 },
  subtitle: { color: "#718096", fontSize: 15, marginTop: 5 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#DDE7FF", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#3567D6", fontSize: 15, fontWeight: "800" },
  overviewCard: { backgroundColor: "#182A50", borderRadius: 22, padding: 20, shadowColor: "#172B50", shadowOpacity: 0.18, shadowRadius: 14, elevation: 5 },
  overviewTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  overviewLabel: { color: "#AFC2EC", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  overviewTitle: { color: "#FFF", fontSize: 19, fontWeight: "800", marginTop: 7 },
  streakBadge: { backgroundColor: "#FFFFFF18", borderRadius: 14, paddingHorizontal: 9, paddingVertical: 7, flexDirection: "row", alignItems: "center", gap: 4 },
  streakText: { color: "#FFF", fontSize: 11, fontWeight: "700" },
  statsRow: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#FFFFFF1A", marginTop: 20, paddingTop: 16 },
  stat: { flex: 1 }, statValue: { color: "#FFF", fontSize: 22, fontWeight: "800" }, statLabel: { color: "#AFC2EC", fontSize: 11, marginTop: 4 },
  sectionHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 28, marginBottom: 12 },
  sectionTitle: { color: "#172A4B", fontSize: 18, fontWeight: "800" }, sectionAction: { color: "#4F7DF3", fontSize: 13, fontWeight: "700" },
  courseCard: { backgroundColor: "#FFF", borderRadius: 18, padding: 15, marginBottom: 11, flexDirection: "row", alignItems: "center", shadowColor: "#21365C", shadowOpacity: 0.05, shadowRadius: 9, elevation: 2 },
  courseIcon: { width: 47, height: 47, borderRadius: 14, alignItems: "center", justifyContent: "center" }, courseCopy: { flex: 1, marginLeft: 13 }, courseTitle: { color: "#1B2E50", fontSize: 15, fontWeight: "800" }, courseSubtitle: { color: "#8793A7", fontSize: 12, marginTop: 3 },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: "#EDF0F5", marginTop: 10, overflow: "hidden" }, progressFill: { height: 6, borderRadius: 3 }, progressText: { color: "#8793A7", fontSize: 10, marginTop: 5 },
  scheduleCard: { backgroundColor: "#FFF", borderRadius: 18, padding: 15, flexDirection: "row", alignItems: "center", shadowColor: "#21365C", shadowOpacity: 0.05, shadowRadius: 9, elevation: 2 }, dateBox: { backgroundColor: "#FFF1E4", borderRadius: 13, width: 49, height: 53, alignItems: "center", justifyContent: "center" }, dateDay: { color: "#E17C2C", fontSize: 20, fontWeight: "800" }, dateMonth: { color: "#E17C2C", fontSize: 10, fontWeight: "800", marginTop: 1 }, scheduleCopy: { flex: 1, marginLeft: 13 }, scheduleTitle: { color: "#1B2E50", fontSize: 14, fontWeight: "800" }, scheduleSubtitle: { color: "#8793A7", fontSize: 11, marginTop: 5 }, dueBadge: { backgroundColor: "#FFF1E4", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 }, dueText: { color: "#E17C2C", fontSize: 10, fontWeight: "800" },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, quickAction: { width: "48%", backgroundColor: "#FFF", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center" }, quickIcon: { width: 35, height: 35, borderRadius: 11, backgroundColor: "#EEF3FF", alignItems: "center", justifyContent: "center" }, quickLabel: { color: "#304466", fontSize: 13, fontWeight: "700", marginLeft: 10 },
});
