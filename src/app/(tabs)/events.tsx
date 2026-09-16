import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { EventCard } from '../../components/EventCard';
import { events } from '../../data/events';

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const filters = ['All', 'School Events', 'Sports', 'Department Event'];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const shownEvents = events.filter((event) => {
    const matchesFilter = filter === 'All' || event.category === filter;
    const searchableEvent = `${event.title} ${event.category} ${event.venue}`.toLowerCase();
    return matchesFilter && searchableEvent.includes(normalizedQuery);
  });

  return (
    <View style={styles.page}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search events, categories, or venues"
          placeholderTextColor="#7890A4"
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>CAMPUS CALENDAR</Text>
        <Text style={styles.heroTitle}>Discover events</Text>
        <Text style={styles.heroText}>Find activities, meet people, and make your campus life memorable.</Text>
      </View>
      <View style={styles.filterRow}>
        {filters.map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.selected]}>
            <Text style={[styles.filterText, filter === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.resultText}>{shownEvents.length} event{shownEvents.length === 1 ? '' : 's'} found</Text>
      <FlatList data={shownEvents} keyExtractor={(item) => item.id} renderItem={({ item }) => <EventCard event={item} onPress={() => router.push({ pathname: '/event/[id]', params: { id: item.id } })} />} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F8FB', paddingHorizontal: 18 },
  searchContainer: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#D4E0E9', borderRadius: 14, borderWidth: 1, flexDirection: 'row', marginTop: 16, paddingHorizontal: 14 },
  searchIcon: { color: '#177E89', fontSize: 23, lineHeight: 24, marginRight: 9 },
  searchInput: { color: '#16324F', flex: 1, fontSize: 14, minHeight: 46 },
  hero: { backgroundColor: '#12355B', borderRadius: 20, padding: 20, marginTop: 14, shadowColor: '#12355B', shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 },
  heroLabel: { color: '#74D4DC', fontSize: 11, letterSpacing: 1.2, fontWeight: '800' },
  heroTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', marginTop: 6 },
  heroText: { color: '#D5E8F3', fontSize: 14, lineHeight: 20, marginTop: 5 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18, marginBottom: 10 },
  filter: { backgroundColor: '#FFFFFF', borderColor: '#D4E0E9', borderWidth: 1, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
  selected: { backgroundColor: '#177E89', borderColor: '#177E89' },
  filterText: { color: '#4C6680', fontSize: 12, fontWeight: '700' },
  selectedText: { color: '#FFFFFF' },
  resultText: { color: '#6A8197', fontSize: 12, fontWeight: '700', marginBottom: 10 },
  list: { paddingBottom: 26 },
  eventCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 17, marginBottom: 13, borderWidth: 1, borderColor: '#E3ECF2', shadowColor: '#16324F', shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  eventIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#E2F4F5', justifyContent: 'center', alignItems: 'center', marginRight: 11 },
  eventIconText: { color: '#177E89', fontSize: 20, fontWeight: '800' },
  cardHeading: { flex: 1 },
  category: { color: '#177E89', fontWeight: '800', fontSize: 10, letterSpacing: 0.7 },
  eventTitle: { color: '#16324F', fontSize: 17, fontWeight: '800', marginTop: 3 },
  status: { fontSize: 10, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 9, overflow: 'hidden' },
  joined: { color: '#216E45', backgroundColor: '#DDF4E6' },
  open: { color: '#925B00', backgroundColor: '#FFF0C7' },
  infoLine: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  infoIcon: { color: '#6C8CA5', width: 20 },
  detail: { color: '#58708A', fontSize: 13, flex: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EDF2F6', marginTop: 10, paddingTop: 11 },
  view: { color: '#177E89', fontSize: 13, fontWeight: '800' },
  arrow: { color: '#177E89', fontSize: 18, fontWeight: '800' },
});
