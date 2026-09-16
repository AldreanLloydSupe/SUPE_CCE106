import { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { events as sharedEvents } from '../../data/events';

const events = [
  {
    id: 'career-fair',
    title: 'Campus Career Fair',
    category: 'Academic',
    dateTime: 'October 8, 2026 - 9:00 AM',
    venue: 'Student Center Hall',
    description: 'Meet partner companies, explore internships, and get resume feedback from recruiters.',
    available: true,
    joined: false,
  },
  {
    id: 'basketball-finals',
    title: 'Intercollege Basketball Finals',
    category: 'Sports',
    dateTime: 'October 10, 2026 - 3:00 PM',
    venue: 'University Gym',
    description: 'Cheer for the finalists in the last game of the college league.',
    available: true,
    joined: true,
  },
  {
    id: 'art-workshop',
    title: 'Watercolor Workshop',
    category: 'Arts',
    dateTime: 'October 12, 2026 - 1:30 PM',
    venue: 'Fine Arts Studio',
    description: 'A beginner-friendly guided workshop. Materials are provided.',
    available: true,
    joined: false,
  },
  {
    id: 'research-forum',
    title: 'Student Research Forum',
    category: 'Academic',
    dateTime: 'October 15, 2026 - 10:00 AM',
    venue: 'Innovation Lab',
    description: 'Listen to student research presentations and vote for the audience choice award.',
    available: false,
    joined: true,
  },
  {
    id: 'music-night',
    title: 'Open Mic Music Night',
    category: 'Arts',
    dateTime: 'October 18, 2026 - 6:00 PM',
    venue: 'Campus Amphitheater',
    description: 'Live performances from campus musicians, poets, and storytellers.',
    available: true,
    joined: false,
  },
];

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = sharedEvents.find((item) => item.id === id);
  const [joined, setJoined] = useState(event?.joined ?? false);

  if (!event) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: 'Event not found' }} />
        <Text style={styles.missingTitle}>Event not found.</Text>
        <Text style={styles.missingText}>The event link may be incorrect.</Text>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const buttonDisabled = !event.available && !joined;

  function changeJoinedStatus() {
    setJoined(!joined);
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.category}>{event.category.toUpperCase()}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.detail}>Date: {event.dateTime}</Text>
      <Text style={styles.detail}>Venue: {event.venue}</Text>

      <View style={styles.line} />

      <Text style={styles.section}>About this event</Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={[styles.notice, joined && styles.joinedNotice]}>
        <Text style={styles.noticeText}>
          {joined
            ? 'You have a spot reserved for this event.'
            : event.available
              ? 'Spaces are currently available.'
              : 'This event is currently full.'}
        </Text>
      </View>

      <Pressable
        disabled={buttonDisabled}
        onPress={changeJoinedStatus}
        style={({ pressed }) => [
          styles.button,
          buttonDisabled && styles.disabled,
          pressed && styles.pressed,
        ]}>
        <Text style={styles.buttonText}>
          {joined ? 'Leave event' : 'Join event'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7FAFC',
    flexGrow: 1,
    padding: 23,
  },
  category: {
    color: '#177E89',
    fontWeight: '800',
    fontSize: 12,
    marginTop: 8,
  },
  title: {
    color: '#16324F',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 9,
    marginBottom: 20,
  },
  detail: {
    color: '#46627C',
    fontSize: 15,
    marginBottom: 9,
  },
  line: {
    height: 1,
    backgroundColor: '#D8E2EA',
    marginVertical: 24,
  },
  section: {
    color: '#16324F',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 9,
  },
  description: {
    color: '#58708A',
    lineHeight: 23,
    fontSize: 15,
  },
  notice: {
    marginTop: 24,
    marginBottom: 14,
    backgroundColor: '#FFF0C7',
    padding: 13,
    borderRadius: 10,
  },
  joinedNotice: {
    backgroundColor: '#DDF4E6',
  },
  noticeText: {
    color: '#46627C',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#177E89',
    borderRadius: 11,
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  disabled: {
    backgroundColor: '#99AAB8',
  },
  pressed: {
    opacity: 0.76,
  },
  missing: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 30,
  },
  missingTitle: {
    color: '#16324F',
    fontSize: 24,
    fontWeight: '800',
  },
  missingText: {
    color: '#58708A',
    textAlign: 'center',
    marginVertical: 12,
  },
});
