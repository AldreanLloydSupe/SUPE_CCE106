import { useEffect, useMemo, useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type AttendanceStatus = 'present' | 'absent' | null;

type Student = {
  id: number;
  name: string;
};

const students: Student[] = [
  { id: 1, name: 'Viany Jones Capirig' },
  { id: 2, name: 'Jay Ar Am-is' },
  { id: 3, name: 'Johnrie Lagumbay' },
  { id: 4, name: 'John Allen Latoza' },
  { id: 5, name: 'Thystle Emata' },
];

export default function Lab08Screen() {
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>(
    () => Object.fromEntries(students.map((student) => [student.id, null])),
  );
  const [lastUpdated, setLastUpdated] = useState('No attendance recorded yet');

  const totals = useMemo(() => {
    const statuses = Object.values(attendance);
    return {
      present: statuses.filter((status) => status === 'present').length,
      absent: statuses.filter((status) => status === 'absent').length,
    };
  }, [attendance]);

  useEffect(() => {
    if (totals.present + totals.absent > 0) {
      setLastUpdated(`Last updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    }
  }, [attendance, totals.absent, totals.present]);

  const markAttendance = (studentId: number, status: Exclude<AttendanceStatus, null>) => {
    setAttendance((current) => ({ ...current, [studentId]: status }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Attendance List</Text>
        <Text style={styles.subtitle}>Mark each student as present or absent.</Text>

        <View style={styles.summaryRow}>
          <SummaryCard label="Present" value={totals.present} color="#137a45" />
          <SummaryCard label="Absent" value={totals.absent} color="#be2d3b" />
        </View>

        <Text style={styles.sectionTitle}>Students</Text>
        <View style={styles.list}>
          {students.map((student) => {
            const status = attendance[student.id];
            return (
              <View key={student.id} style={styles.studentRow}>
                <View style={styles.studentInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.statusText}>
                      {status === 'present' ? 'Present' : status === 'absent' ? 'Absent' : 'Not marked'}
                    </Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <AttendanceButton
                    label="P"
                    active={status === 'present'}
                    activeColor="#137a45"
                    onPress={() => markAttendance(student.id, 'present')}
                  />
                  <AttendanceButton
                    label="A"
                    active={status === 'absent'}
                    activeColor="#be2d3b"
                    onPress={() => markAttendance(student.id, 'absent')}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.updatedText}>{lastUpdated}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function AttendanceButton({
  label,
  active,
  activeColor,
  onPress,
}: {
  label: string;
  active: boolean;
  activeColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Mark ${label === 'P' ? 'present' : 'absent'}`}
      onPress={onPress}
      style={[styles.actionButton, active && { backgroundColor: activeColor, borderColor: activeColor }]}
    >
      <Text style={[styles.actionLabel, active && styles.activeActionLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f7fb' },
  container: { padding: 24, paddingBottom: 40 },
  eyebrow: { color: '#64748b', fontSize: 12, fontWeight: '700', letterSpacing: 0.7 },
  title: { color: '#172033', fontSize: 32, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#64748b', fontSize: 16, marginTop: 6, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', gap: 14 },
  summaryCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 18,
  },
  summaryValue: { fontSize: 30, fontWeight: '800' },
  summaryLabel: { color: '#64748b', fontSize: 14, fontWeight: '600', marginTop: 3 },
  sectionTitle: { color: '#172033', fontSize: 19, fontWeight: '700', marginTop: 30, marginBottom: 12 },
  list: { backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  studentRow: {
    alignItems: 'center',
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  studentInfo: { alignItems: 'center', flexDirection: 'row', flex: 1 },
  avatar: { alignItems: 'center', backgroundColor: '#e8efff', borderRadius: 20, height: 40, justifyContent: 'center', marginRight: 12, width: 40 },
  avatarText: { color: '#315cbd', fontSize: 16, fontWeight: '800' },
  studentName: { color: '#172033', fontSize: 16, fontWeight: '700' },
  statusText: { color: '#64748b', fontSize: 13, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 8 },
  actionButton: { alignItems: 'center', borderColor: '#cbd5e1', borderRadius: 10, borderWidth: 1, height: 42, justifyContent: 'center', width: 42 },
  actionLabel: { color: '#475569', fontSize: 16, fontWeight: '800' },
  activeActionLabel: { color: '#ffffff' },
  updatedText: { color: '#94a3b8', fontSize: 13, marginTop: 16, textAlign: 'center' },
});
