import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventCardProps = {
  event: CampusEvent;
  onPress: () => void;
};

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.cardTop}>
        <View style={styles.eventIcon}><Text style={styles.eventIconText}>{event.category === 'Sports' ? '★' : '◈'}</Text></View>
        <View style={styles.cardHeading}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Text style={styles.title}>{event.title}</Text>
        </View>
        <Text style={[styles.status, event.joined ? styles.joined : styles.open]}>{event.joined ? 'JOINED' : 'OPEN'}</Text>
      </View>
      <View style={styles.infoLine}><Text style={styles.infoIcon}>◷</Text><Text style={styles.detail}>{event.dateTime}</Text></View>
      <View style={styles.infoLine}><Text style={styles.infoIcon}>⌖</Text><Text style={styles.detail}>{event.venue}</Text></View>
      <View style={styles.footer}><Text style={styles.view}>View details</Text><Text style={styles.arrow}>→</Text></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderColor: '#E3ECF2', borderRadius: 18, borderWidth: 1, elevation: 2, marginBottom: 13, padding: 17, shadowColor: '#16324F', shadowOpacity: 0.07, shadowRadius: 10 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
  cardTop: { alignItems: 'flex-start', flexDirection: 'row', marginBottom: 14 },
  eventIcon: { alignItems: 'center', backgroundColor: '#E2F4F5', borderRadius: 13, height: 42, justifyContent: 'center', marginRight: 11, width: 42 },
  eventIconText: { color: '#177E89', fontSize: 20, fontWeight: '800' },
  cardHeading: { flex: 1 },
  category: { color: '#177E89', fontSize: 10, fontWeight: '800', letterSpacing: 0.7 },
  title: { color: '#16324F', fontSize: 17, fontWeight: '800', marginTop: 3 },
  status: { borderRadius: 9, fontSize: 10, fontWeight: '800', overflow: 'hidden', paddingHorizontal: 8, paddingVertical: 5 },
  joined: { backgroundColor: '#DDF4E6', color: '#216E45' },
  open: { backgroundColor: '#FFF0C7', color: '#925B00' },
  infoLine: { alignItems: 'center', flexDirection: 'row', marginBottom: 6 },
  infoIcon: { color: '#6C8CA5', width: 20 },
  detail: { color: '#58708A', flex: 1, fontSize: 13 },
  footer: { alignItems: 'center', borderTopColor: '#EDF2F6', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 11 },
  view: { color: '#177E89', fontSize: 13, fontWeight: '800' },
  arrow: { color: '#177E89', fontSize: 18, fontWeight: '800' },
});
