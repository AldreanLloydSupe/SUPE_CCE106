import Constants from 'expo-constants';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Quote = {
  id: number;
  quote: string;
  author: string;
};

const HOST = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
const QUOTE_URL = 'http://' + HOST + ':3000/api/quotes/random';

export default function QuoteAppView() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuote = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(QUOTE_URL);

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
        'Could not connect to the quote API. Check that the server is running.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuote();
  }, [loadQuote]);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>A LITTLE INSPIRATION</Text>
      <Text style={styles.title}>Quote of the Day</Text>
      <Text style={styles.subtitle}>A fresh thought to carry with you.</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>QUOTE OF THE DAY</Text>

        {loading ? (
          <View style={styles.state}>
            <ActivityIndicator color={colors.cyan} size="large" />
            <Text style={styles.stateText}>Finding a quote...</Text>
          </View>
        ) : error ? (
          <View style={styles.state}>
            <Text style={styles.stateTitle}>Unable to load quote</Text>
            <Text style={styles.stateText}>{error}</Text>
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
            <Text style={styles.stateText}>Tap below to try again.</Text>
          </View>
        )}

        <Text style={styles.cardFooter}>A MOMENT FOR YOURSELF</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={() => void loadQuote()}
        style={({ pressed }) => [
          styles.newQuoteButton,
          pressed && styles.pressed,
          loading && styles.disabled,
        ]}
      >
        <Text style={styles.newQuoteText}>
          {loading ? 'LOADING...' : 'NEW QUOTE'}
        </Text>
      </Pressable>
    </View>
  );
}

const colors = {
  navy: '#102D70',
  cyan: '#14A8CE',
  muted: '#68788A',
};

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  title: {
    color: colors.navy,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 18,
  },
  card: {
    minHeight: 300,
    justifyContent: 'space-between',
    backgroundColor: colors.navy,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  cardLabel: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  state: {
    flex: 1,
    minHeight: 205,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  stateTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  stateText: {
    color: '#CBD6E5',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    textAlign: 'center',
  },
  quoteContent: {
    alignItems: 'center',
    paddingVertical: 26,
  },
  quoteText: {
    color: '#F4F7FA',
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 33,
    textAlign: 'center',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },
  authorRule: {
    width: 20,
    height: 2,
    backgroundColor: colors.cyan,
    marginRight: 9,
  },
  authorText: {
    color: '#DCE8F2',
    fontSize: 14,
    fontWeight: '600',
  },
  cardFooter: {
    color: '#AEBED6',
    borderTopColor: '#344A7C',
    borderTopWidth: 1,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    paddingTop: 14,
    textAlign: 'center',
  },
  newQuoteButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cyan,
    borderRadius: 14,
    marginTop: 16,
  },
  newQuoteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  pressed: {
    opacity: 0.82,
  },
  disabled: {
    opacity: 0.65,
  },
});