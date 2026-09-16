import { Link } from 'expo-router';
import { StatCard } from '../../components/StatCard';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

function StudentDetail({ value, label, compact }: { value: string; label: string; compact: boolean }) {
  return (
    <View style={[styles.detailCard, compact && styles.detailCardCompact]}>
      <Text style={styles.detailValue}>{value}</Text>
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
  );
}

export default function Home() {
  const { width } = useWindowDimensions();
  const narrowScreen = width < 520;

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.smallTitle}>CAMPUS LIFE, ORGANIZED</Text>
      <Text style={styles.title}>Hello, Aldrean Lloyd Supe!</Text>
      <Text style={styles.subtitle}>Find something worth showing up for this week.</Text>

      <View style={styles.infoGrid}>
        <StudentDetail value="5" label="Subjects" compact={narrowScreen} />
        <StudentDetail value="3rd" label="Year Level" compact={narrowScreen} />
        <StudentDetail value="BSIT" label="Program" compact={narrowScreen} />
        <StudentDetail value="UMTC" label="Campus" compact={narrowScreen} />
      </View>

      <Text style={styles.sectionTitle}>Event overview</Text>
      <View style={[styles.cards, narrowScreen && styles.cardsSmall]}>
        <StatCard label="Total Events" value={6} color="#177E89" compact={narrowScreen} />
        <StatCard label="Joined Events" value={1} color="#F4A261" compact={narrowScreen} />
        <StatCard label="Upcoming Events" value={6} color="#5B8C5A" compact={narrowScreen} />
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Ready to discover?</Text>
        <Text style={styles.boxText}>Browse campus activities, workshops, games, and more.</Text>
        <Link href="/events" style={styles.link}>Explore all events →</Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7FAFC',
    flexGrow: 1,
    padding: 22,
  },
  smallTitle: {
    color: '#177E89',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 10,
  },
  title: {
    color: '#16324F',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: '#58708A',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 18,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailCard: {
    backgroundColor: '#E5F4F5',
    borderRadius: 14,
    flexGrow: 1,
    minWidth: 120,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  detailCardCompact: {
    flexGrow: 0,
    flexBasis: '48%',
    minWidth: 0,
  },
  detailValue: {
    color: '#12355B',
    fontSize: 21,
    fontWeight: '800',
  },
  detailLabel: {
    color: '#477187',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  sectionTitle: {
    color: '#16324F',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 23,
    marginBottom: 10,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11,
  },
  cardsSmall: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderTopWidth: 4,
    padding: 16,
    minWidth: 145,
    flexGrow: 1,
    elevation: 2,
  },
  cardCompact: {
    alignSelf: 'stretch',
    flexGrow: 0,
    width: '100%',
  },
  number: {
    color: '#12355B',
    fontSize: 27,
    fontWeight: '800',
  },
  label: {
    color: '#55708B',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  box: {
    backgroundColor: '#16324F',
    borderRadius: 18,
    padding: 22,
    marginTop: 20,
  },
  boxTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  boxText: {
    color: '#D7E5F2',
    marginTop: 7,
    marginBottom: 16,
  },
  link: {
    color: '#8BE0E7',
    fontWeight: '800',
  },
});

