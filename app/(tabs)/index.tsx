import QuoteAppView from './quote-view';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Student = {
  id: string;
  fullName: string;
  email: string;
  program: string;
  year: string;
  role: string;
};

type LoginResponse = {
  accessToken: string;
  tokenType: 'Bearer';
  expiresAt: string;
  user: Student;
};

type ProfileResponse = {
  user: Student;
};

const TOKEN_KEY = 'cce106.student-portal.token';
const HOST = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
const API_URL = `http://${HOST}:3000`;

let browserSessionToken: string | null = null;

async function readToken() {
  if (Platform.OS === 'web') return browserSessionToken;
  return SecureStore.getItemAsync(TOKEN_KEY);
}

async function saveToken(token: string) {
  if (Platform.OS === 'web') {
    browserSessionToken = token;
    return;
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

async function removeToken() {
  if (Platform.OS === 'web') {
    browserSessionToken = null;
    return;
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function readResponse<T>(response: Response): Promise<T> {
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error ?? 'Something went wrong. Please try again.');
  }

  return body as T;
}

export default function StudentPortalScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<'profile' | 'quotes'>('profile');

  const restoreSession = useCallback(async () => {
    setRestoring(true);
    setError('');

    try {
      const savedToken = await readToken();

      if (!savedToken) {
        setStudent(null);
        setToken(null);
        return;
      }

      const response = await fetch(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });

      if (response.status === 401) {
        await removeToken();
        setStudent(null);
        setToken(null);
        setError('Your session expired. Please sign in again.');
        return;
      }

      const data = await readResponse<ProfileResponse>(response);
      setStudent(data.user);
      setToken(savedToken);
    } catch {
      setError('Could not restore your session. Check that the API server is running.');
      setStudent(null);
      setToken(null);
    } finally {
      setRestoring(false);
    }
  }, []);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const isValidEmail = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  );

  const signIn = async () => {
    setError('');

    if (!isValidEmail) {
      setError('Enter a valid school email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await readResponse<LoginResponse>(response);

      if (!data.accessToken || !data.user) {
        throw new Error('The login response is missing the accessToken or user.');
      }

      await saveToken(data.accessToken);
      setToken(data.accessToken);
      setStudent(data.user);
      setPassword('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to sign in. Check your connection and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const refreshProfile = async () => {
    if (!token) return;

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        await removeToken();
        setStudent(null);
        setToken(null);
        setError('Your session expired. Please sign in again.');
        return;
      }

      const data = await readResponse<ProfileResponse>(response);
      setStudent(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load your profile.');
    } finally {
      setSubmitting(false);
    }
  };

  const signOut = async () => {
    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // Clear local session even if the server cannot be reached.
      }
    }

    await removeToken();
    setToken(null);
    setStudent(null);
    setPassword('');
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.page}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>C</Text>
            </View>
            <View>
              <Text style={styles.brand}>CCE106</Text>
              <Text style={styles.brandCaption}>STUDENT SERVICES</Text>
            </View>
            <View style={styles.secureBadge}>
              <View style={styles.secureDot} />
              <Text style={styles.secureLabel}>SECURE PORTAL</Text>
            </View>
          </View>

          {restoring ? (
            <View style={styles.loadingScreen}>
              <ActivityIndicator size="large" color={colors.cyan} />
              <Text style={styles.loadingTitle}>Restoring your session</Text>
              <Text style={styles.bodyMuted}>Please wait a moment...</Text>
            </View>
          ) : student ? (
            <View style={styles.dashboard}>
              <Text style={styles.eyebrow}>STUDENT PORTAL</Text>
              <Text style={styles.heading}>Welcome back,</Text>
              <Text style={styles.headingAccent}>{student.fullName.split(' ')[0]}.</Text>
              <Text style={styles.bodyMuted}>
                Your student information is ready.
              </Text>

              <PortalNavigation
                activeSection={activeSection}
                onChange={setActiveSection}
              />
              {activeSection === 'profile' ? (
                <View style={styles.profileContent}>
                  <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {student.fullName
                            .split(' ')
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.profileHeading}>
                        <Text style={styles.studentName}>{student.fullName}</Text>
                        <Text style={styles.studentEmail}>{student.email}</Text>
                      </View>
                    </View>

                    <View style={styles.roleBadge}>
                      <Text style={styles.roleText}>
                        {student.role.toUpperCase()}
                      </Text>
                      <Text style={styles.roleDot}>  /  ACTIVE SESSION</Text>
                    </View>

                    <View style={styles.divider} />
                    <ProfileRow label="PROGRAM" value={student.program} />
                    <ProfileRow label="YEAR LEVEL" value={student.year} />
                    <ProfileRow label="STUDENT ID" value={student.id} />
                  </View>

                  {error ? <ErrorMessage message={error} /> : null}

                  <Pressable
                    accessibilityRole="button"
                    disabled={submitting}
                    onPress={() => void refreshProfile()}
                    style={({ pressed }) => [
                      styles.secondaryButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    {submitting ? (
                      <ActivityIndicator color={colors.navy} />
                    ) : (
                      <Text style={styles.secondaryButtonText}>
                        REFRESH PROTECTED PROFILE
                      </Text>
                    )}
                  </Pressable>
                </View>
              ) : (
                <QuoteAppView />
              )}

              <Pressable
                accessibilityRole="button"
                onPress={() => void signOut()}
                style={({ pressed }) => [
                  styles.logoutButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.logoutText}>SIGN OUT</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.loginArea}>
              <View style={styles.welcomeBlock}>
                <Text style={styles.eyebrow}>YOUR CAMPUS, IN ONE PLACE</Text>
                <Text style={styles.heading}>Welcome</Text>
                <Text style={styles.headingAccent}>back.</Text>
                <Text style={styles.description}>
                  Sign in with your student account to securely access your
                  profile and campus information.
                </Text>
              </View>

              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Sign in</Text>
                <Text style={styles.formSubtitle}>
                  Enter your school credentials below.
                </Text>

                <Text style={styles.inputLabel}>SCHOOL EMAIL</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="you@school.edu"
                  placeholderTextColor={colors.placeholder}
                  returnKeyType="next"
                  style={styles.input}
                  value={email}
                />

                <Text style={styles.inputLabel}>PASSWORD</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="password"
                  onChangeText={setPassword}
                  onSubmitEditing={() => void signIn()}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.placeholder}
                  returnKeyType="go"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                />

                {error ? <ErrorMessage message={error} /> : null}

                <Pressable
                  accessibilityRole="button"
                  disabled={submitting}
                  onPress={() => void signIn()}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                    submitting && styles.disabledButton,
                  ]}
                >
                  {submitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.primaryButtonText}>SIGN IN</Text>
                  )}
                </Pressable>

                <View style={styles.demoBox}>
                  <Text style={styles.demoTitle}>DEMO ACCOUNT</Text>
                  <Text style={styles.demoText}>
                    student@cce106.edu.ph
                  </Text>
                  <Text style={styles.demoText}>CCE106pass!</Text>
                </View>
              </View>

              <Text style={styles.loginFooter}>
                Your session is protected and stored securely on this device.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function PortalNavigation({
  activeSection,
  onChange,
}: {
  activeSection: 'profile' | 'quotes';
  onChange: (section: 'profile' | 'quotes') => void;
}) {
  return (
    <View style={styles.portalNavigation}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onChange('profile')}
        style={[
          styles.portalNavButton,
          activeSection === 'profile' && styles.portalNavButtonActive,
        ]}
      >
        <Text
          style={[
            styles.portalNavText,
            activeSection === 'profile' && styles.portalNavTextActive,
          ]}
        >
          MY PROFILE
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => onChange('quotes')}
        style={[
          styles.portalNavButton,
          activeSection === 'quotes' && styles.portalNavButtonActive,
        ]}
      >
        <Text
          style={[
            styles.portalNavText,
            activeSection === 'quotes' && styles.portalNavTextActive,
          ]}
        >
          DAILY QUOTE
        </Text>
      </Pressable>
    </View>
  );
}
function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value}</Text>
    </View>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const colors = {
  background: '#EEF4F7',
  surface: '#FFFFFF',
  navy: '#14294A',
  navyDeep: '#10213E',
  cyan: '#139FBD',
  cyanLight: '#E3F5F7',
  text: '#1C2E49',
  muted: '#75849A',
  placeholder: '#A1ADBA',
  border: '#E2E9EF',
  error: '#A3313B',
  errorBackground: '#FFF0F0',
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 36,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
  logoMark: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navy,
    borderRadius: 13,
    marginRight: 11,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
  },
  brand: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  brandCaption: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.3,
    marginTop: 3,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    borderColor: '#C8D8E2',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  secureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#159B76',
    marginRight: 6,
  },
  secureLabel: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  loginArea: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeBlock: {
    marginBottom: 25,
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  heading: {
    color: colors.navy,
    fontSize: 43,
    fontWeight: '900',
    letterSpacing: -1.2,
    lineHeight: 47,
  },
  headingAccent: {
    color: colors.cyan,
    fontSize: 43,
    fontWeight: '900',
    letterSpacing: -1.2,
    lineHeight: 47,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 360,
    marginTop: 12,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    padding: 22,
    shadowColor: colors.navy,
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },
  formTitle: {
    color: colors.navy,
    fontSize: 21,
    fontWeight: '800',
  },
  formSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 22,
  },
  inputLabel: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  input: {
    height: 50,
    color: colors.text,
    backgroundColor: '#F9FBFC',
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
    paddingHorizontal: 14,
    marginBottom: 17,
  },
  errorBox: {
    backgroundColor: colors.errorBackground,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
    marginBottom: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cyan,
    borderRadius: 12,
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  disabledButton: {
    opacity: 0.65,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  demoBox: {
    backgroundColor: '#F4F8FA',
    borderRadius: 12,
    marginTop: 18,
    padding: 13,
  },
  demoTitle: {
    color: colors.cyan,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
    marginBottom: 5,
  },
  demoText: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
  },
  loginFooter: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 18,
  },
  loadingScreen: {
    flex: 1,
    minHeight: 420,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 15,
  },
  bodyMuted: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 7,
  },
  dashboard: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  profileContent: {
    width: '100%',
  },
  portalNavigation: {
    flexDirection: 'row',
    backgroundColor: '#E2EAF0',
    borderRadius: 12,
    padding: 4,
    marginTop: 20,
    marginBottom: 8,
  },
  portalNavButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    borderRadius: 9,
  },
  portalNavButtonActive: {
    backgroundColor: colors.navy,
  },
  portalNavText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  portalNavTextActive: {
    color: '#FFFFFF',
  },  profileCard: {
    backgroundColor: colors.navy,
    borderRadius: 22,
    marginTop: 27,
    padding: 22,
    shadowColor: colors.navy,
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24517D',
    borderRadius: 18,
  },
  avatarText: {
    color: '#DDF7FB',
    fontSize: 19,
    fontWeight: '900',
  },
  profileHeading: {
    flex: 1,
    marginLeft: 13,
  },
  studentName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  studentEmail: {
    color: '#B8C9DA',
    fontSize: 12,
    marginTop: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#1B3E68',
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  roleText: {
    color: '#6CD3D6',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  roleDot: {
    color: '#B8C9DA',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: '#344A69',
    marginTop: 20,
    marginBottom: 4,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#344A69',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  profileLabel: {
    color: '#B8C9DA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  profileValue: {
    flexShrink: 1,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 12,
    textAlign: 'right',
  },
  secondaryButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cyanLight,
    borderRadius: 12,
    marginTop: 18,
    paddingHorizontal: 14,
  },
  secondaryButtonText: {
    color: colors.navy,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  logoutButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#CAD6E0',
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
  },
  logoutText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
});