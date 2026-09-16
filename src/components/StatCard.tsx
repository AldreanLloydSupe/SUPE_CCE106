import { StyleSheet, Text, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: number;
  color: string;
  compact?: boolean;
};

export function StatCard({ label, value, color, compact = false }: StatCardProps) {
  return (
    <View style={[styles.card, compact && styles.compact, { borderTopColor: color }]}>
      <Text style={styles.number}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, borderTopWidth: 4, elevation: 2, flexGrow: 1, minWidth: 145, padding: 16 },
  compact: { alignSelf: 'stretch', flexGrow: 0, width: '100%' },
  number: { color: '#12355B', fontSize: 27, fontWeight: '800' },
  label: { color: '#55708B', fontSize: 13, fontWeight: '600', marginTop: 4 },
});
