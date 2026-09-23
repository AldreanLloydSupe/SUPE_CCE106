import Constants from 'expo-constants';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Quote = {
  id: number;
  quote: string;
  author: string;
};

const developmentHost =
  Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
const API_URL = `http://${developmentHost}:3000/api/quotes/random`;

export default function QuotesScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('The quote server returned an error.');
      }

      const data: Quote = await response.json();

      if (!data.quote?.trim() || !data.author?.trim()) {
        setQuote(null);
        return;
      }

      setQuote(data);
    } catch {
      setError(
        'Could not connect to the quote server. Make sure it is running and try again.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>A LITTLE INSPIRATION</Text>
          <Text style={styles.title}>Quote of the Day</Text>
          <Text style={styles.subtitle}>
            A fresh thought to carry with you.
          </Text>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.cardLabel}>QUOTE OF THE DAY</Text>

          {loading ? (
            <View style={styles.state}>
              <ActivityIndicator size="large" color={colors.cyan} />
              <Text style={styles.stateText}>Finding a quote...</Text>
            </View>
          ) : error ? (
            <View style={styles.state}>
              <Text style={styles.stateTitle}>Unable to load quote</Text>
              <Text style={styles.stateText}>{error}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => void fetchQuote()}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>TRY AGAIN</Text>
              </Pressable>
            </View>
          ) : quote ? (
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>"{quote.quote}"</Text>
              <View style={styles.authorRow}>
                <View style={styles.authorRule} />
                <Text style={styles.authorText}>— {quote.author}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.state}>
              <Text style={styles.stateTitle}>No quote available</Text>
              <Text style={styles.stateText}>
                Tap the button to try again.
              </Text>
            </View>
          )}

          <View style={styles.cardFooter}>
            <View style={styles.footerDot} />
            <Text style={styles.footerText}>A MOMENT FOR YOURSELF</Text>
            <View style={styles.footerDot} />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => void fetchQuote()}
          disabled={loading}
          style={({ pressed }) => [
            styles.newQuoteButton,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.newQuoteText}>
            {loading ? 'LOADING...' : 'NEW QUOTE'}
          </Text>
        </Pressable>

        <Text style={styles.footerNote}>
          Take a breath. Find a new perspective.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  background: '#EAF4F5',
  navy: '#102D70',
  cyan: '#14A8CE',
  text: '#172943',
  muted: '#68788A',
  pale: '#D7E9ED',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.navy,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 7,
    textAlign: 'center',
  },
  quoteCard: {
    minHeight: 330,
    justifyContent: 'space-between',
    backgroundColor: colors.navy,
    borderRadius: 24,
    paddingHorizontal: 25,
    paddingTop: 26,
    paddingBottom: 20,
    shadowColor: colors.navy,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 9 },
    elevation: 7,
  },
  cardLabel: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.8,
    textAlign: 'center',
  },
  quoteContent: {
    alignItems: 'center',
    paddingVertical: 26,
  },
  quoteText: {
    color: '#F4F7FA',
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 35,
    textAlign: 'center',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  authorRule: {
    width: 20,
    height: 2,
    backgroundColor: colors.cyan,
    marginRight: 10,
  },
  authorText: {
    color: '#DCE8F2',
    fontSize: 15,
    fontWeight: '600',
  },
  state: {
    flex: 1,
    minHeight: 225,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  stateTitle: {
    color: '#F4F7FA',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 13,
    textAlign: 'center',
  },
  stateText: {
    color: '#C5D1E0',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  retryButton: {
    borderColor: '#6481B4',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  retryText: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#344A7C',
    borderTopWidth: 1,
    paddingTop: 15,
  },
  footerDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.cyan,
  },
  footerText: {
    color: '#AEBED6',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginHorizontal: 9,
  },
  newQuoteButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cyan,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: colors.cyan,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  newQuoteText: {
    color: '#F5FCFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  footerNote: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 22,
    textAlign: 'center',
  },
});