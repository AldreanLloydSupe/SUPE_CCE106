import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Profile() {
  const [name, setName] = useState('Aldrean Lloyd Supe');
  const [email, setEmail] = useState('a.supe.143998.tc@umindanao.edu.ph');
  const [savedName, setSavedName] = useState('Aldrean Lloyd Supe');
  const [savedEmail, setSavedEmail] = useState('a.supe.143998.tc@umindanao.edu.ph');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<'contact' | 'security' | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const initials = name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 3).toUpperCase() || 'STU';

  function saveProfile() {
    if (!name.trim()) {
      setError('Full Name is required.');
      setSaved(false);
      return;
    }
    if (!email.trim()) {
      setError('Email is required.');
      setSaved(false);
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Enter a valid email address with @ and .');
      setSaved(false);
      return;
    }
    setError('');
    setSavedName(name.trim());
    setSavedEmail(email.trim());
    setSaved(true);
  }

  function toggleSection(section: 'contact' | 'security') {
    if (activeSection === section && section === 'contact') {
      setName(savedName);
      setEmail(savedEmail);
    }
    setActiveSection(activeSection === section ? null : section);
    setSaved(false);
    setError('');
  }

  function resetPassword() {
    if (newPassword.length < 8) {
      setPasswordMessage('Your new password must contain at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage('The password confirmation does not match.');
      return;
    }
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMessage('Password reset successfully for this local profile.');
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.eyebrow}>STUDENT ACCOUNT</Text>
      <Text style={styles.heading}>Profile information</Text>
      <Text style={styles.subtitle}>Review and update your contact details for campus event communications.</Text>

      <View style={styles.identityCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
        <View style={styles.identityText}>
          <Text style={styles.studentName}>{name || 'Student name'}</Text>
          <Text style={styles.studentProgram}>BSIT · Third Year</Text>
          <View style={styles.statusBadge}><Text style={styles.statusText}>ACTIVE STUDENT</Text></View>
        </View>
      </View>

      <View style={styles.settingsButtons}>
        <Pressable onPress={() => toggleSection('contact')} style={[styles.settingsButton, activeSection === 'contact' && styles.settingsButtonActive]}>
          <Text style={[styles.settingsButtonTitle, activeSection === 'contact' && styles.settingsButtonTitleActive]}>Contact details</Text>
          <Text style={[styles.settingsButtonText, activeSection === 'contact' && styles.settingsButtonTextActive]}>Update your name and university email</Text>
        </Pressable>
        {activeSection === 'contact' && <View style={[styles.formCard, styles.inlineFormCard]}>
          <Text style={styles.formTitle}>Edit contact details</Text>
          <Text style={styles.formDescription}>These details are used for your local event profile.</Text>
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter your full name" placeholderTextColor="#7890A4" />
          <Text style={styles.label}>UNIVERSITY EMAIL ADDRESS</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" placeholder="name@umindanao.edu.ph" placeholderTextColor="#7890A4" />
          {!!error && <Text style={styles.error}>{error}</Text>}
          {saved && <Text style={styles.success}>Your profile information has been saved.</Text>}
          <Pressable onPress={saveProfile} style={styles.button}><Text style={styles.buttonText}>Save changes</Text></Pressable>
        </View>}
        <Pressable onPress={() => toggleSection('security')} style={[styles.settingsButton, activeSection === 'security' && styles.settingsButtonActive]}>
          <Text style={[styles.settingsButtonTitle, activeSection === 'security' && styles.settingsButtonTitleActive]}>Security settings</Text>
          <Text style={[styles.settingsButtonText, activeSection === 'security' && styles.settingsButtonTextActive]}>Reset your local profile password</Text>
        </Pressable>
        {activeSection === 'security' && <View style={[styles.formCard, styles.inlineFormCard]}>
          <Text style={styles.formTitle}>Security settings</Text>
          <Text style={styles.formDescription}>Reset your password for this local EventMate profile.</Text>
          <Text style={styles.label}>NEW PASSWORD</Text>
          <TextInput value={newPassword} onChangeText={setNewPassword} secureTextEntry style={styles.input} placeholder="At least 8 characters" placeholderTextColor="#7890A4" />
          <Text style={styles.label}>CONFIRM NEW PASSWORD</Text>
          <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} placeholder="Re-enter your new password" placeholderTextColor="#7890A4" />
          {!!passwordMessage && <Text style={passwordMessage.startsWith('Password reset') ? styles.success : styles.error}>{passwordMessage}</Text>}
          <Pressable onPress={resetPassword} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Reset password</Text></Pressable>
        </View>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#F7FAFC', flexGrow: 1, padding: 22, paddingBottom: 36 },
  eyebrow: { color: '#177E89', fontSize: 12, fontWeight: '800', letterSpacing: 1.1, marginTop: 4 },
  heading: { color: '#16324F', fontSize: 27, fontWeight: '800', marginTop: 7 },
  subtitle: { color: '#58708A', fontSize: 14, lineHeight: 20, marginTop: 6 },
  identityCard: { alignItems: 'center', backgroundColor: '#16324F', borderRadius: 18, flexDirection: 'row', marginTop: 22, padding: 18 },
  avatar: { alignItems: 'center', backgroundColor: '#E5F4F5', borderRadius: 33, height: 66, justifyContent: 'center', width: 66 },
  avatarText: { color: '#177E89', fontSize: 21, fontWeight: '800' },
  identityText: { flex: 1, marginLeft: 14 },
  studentName: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  studentProgram: { color: '#C7DDEA', fontSize: 13, marginTop: 3 },
  statusBadge: { alignSelf: 'flex-start', backgroundColor: '#DDF4E6', borderRadius: 10, marginTop: 9, paddingHorizontal: 8, paddingVertical: 4 },
  statusText: { color: '#216E45', fontSize: 10, fontWeight: '800', letterSpacing: 0.4 },
  formCard: { backgroundColor: '#FFFFFF', borderColor: '#E0EAF0', borderRadius: 18, borderWidth: 1, marginTop: 16, padding: 18 },
  inlineFormCard: { marginTop: 0 },
  settingsButtons: { gap: 10, marginTop: 16 },
  settingsButton: { backgroundColor: '#FFFFFF', borderColor: '#E0EAF0', borderRadius: 14, borderWidth: 1, padding: 16 },
  settingsButtonActive: { backgroundColor: '#E5F4F5', borderColor: '#177E89' },
  settingsButtonTitle: { color: '#16324F', fontSize: 16, fontWeight: '800' },
  settingsButtonTitleActive: { color: '#177E89' },
  settingsButtonText: { color: '#58708A', fontSize: 13, marginTop: 3 },
  settingsButtonTextActive: { color: '#356A76' },
  formTitle: { color: '#16324F', fontSize: 18, fontWeight: '800' },
  formDescription: { color: '#58708A', fontSize: 13, lineHeight: 18, marginBottom: 21, marginTop: 4 },
  label: { color: '#46627C', fontSize: 11, fontWeight: '800', letterSpacing: 0.5, marginBottom: 7 },
  input: { backgroundColor: '#F9FCFE', borderColor: '#C9D7E4', borderRadius: 10, borderWidth: 1, color: '#16324F', fontSize: 15, marginBottom: 18, padding: 13 },
  error: { backgroundColor: '#FDECEA', borderRadius: 9, color: '#B42318', marginBottom: 15, padding: 11 },
  success: { backgroundColor: '#DDF4E6', borderRadius: 9, color: '#216E45', marginBottom: 15, padding: 11 },
  button: { alignItems: 'center', backgroundColor: '#177E89', borderRadius: 10, padding: 15 },
  buttonText: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  secondaryButton: { alignItems: 'center', borderColor: '#177E89', borderRadius: 10, borderWidth: 1, padding: 14 },
  secondaryButtonText: { color: '#177E89', fontSize: 15, fontWeight: '800' },
});

