import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { getCurrentUser, loginUser, type Profile } from '../service/authService';
import { deleteToken, getToken, saveToken } from '../storage/tokenStorage';

export default function App() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);

  // Session restore: runs once when the app first loads
  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const me = await getCurrentUser(token);
        if (!cancelled) setProfile(me);
      } catch (err: any) {
        console.error('Session restore error:', err);
        if (err?.status === 401 || err?.status === 403) {
          // Stored token was rejected: delete it and show the login screen
          await deleteToken();
        } else if (!cancelled) {
          setError('Could not restore your session. Please log in again.');
        }
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogin = async () => {
    // DEBUG: whichever prints "undefined" is the function that isn't exported. Remove when fixed.
    console.log(typeof loginUser, typeof saveToken, typeof getCurrentUser);

    // 1. Clear any earlier error and start loading
    setError('');
    setLoading(true);

    try {
      // 2. Call loginUser with the form values
      const data = await loginUser(username.trim(), password);

      // 3. Securely save the access token
      await saveToken(data.accessToken);

      // 4. Request the protected profile
      const me = await getCurrentUser(data.accessToken);
      setProfile(me);
    } catch (err: any) {
      // 5. Show a user-friendly message
      console.error('Login error:', err);
      if (err?.message?.includes('Invalid credentials')) {
        setError('Incorrect username or password.');
      } else if (err?.message?.includes('Network request failed')) {
        setError('Unable to connect. Check your internet connection and try again.');
      } else {
        setError('Something went wrong while signing in. Please try again.');
      }
    } finally {
      // 6. Always stop loading
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // 1. Delete the stored token
      await deleteToken();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // 2. Set profile to null
      setProfile(null);
      // 3. Clear any error message
      setError('');
      // 4. With profile null, the render logic shows the login form again
    }
  };

  // Session check in progress
  if (checkingSession) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.detail}>Checking session...</Text>
      </SafeAreaView>
    );
  }

  // Authenticated screen
  if (profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: profile.image }} style={styles.avatar} />
          <Text style={styles.heading}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.detail}>Username: {profile.username}</Text>
          <Text style={styles.detail}>Email: {profile.email}</Text>
          <Text style={styles.detail}>ID: {profile.id}</Text>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Logged-out screen
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Secure Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          editable={!loading}
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.row}>
              <ActivityIndicator color="#fff" />
              <Text style={[styles.buttonText, styles.loadingText]}>Logging in...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>

        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f4f7',
    padding: 20,
  },
  centered: {
    alignItems: 'center',
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    gap: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd2d9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#93b4f5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
  error: {
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    textAlign: 'center',
  },
});