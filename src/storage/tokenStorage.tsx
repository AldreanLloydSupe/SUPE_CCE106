import * as SecureStore from 'expo-secure-store';

// DEBUG: remove once the error is fixed
console.log('SecureStore keys:', Object.keys(SecureStore));

const TOKEN_KEY = 'access_token';

export async function saveToken(token: string): Promise<void> {
  // TODO: securely store token using TOKEN_KEY
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  // TODO: return the stored token, or null when none exists
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken(): Promise<void> {
  // TODO: remove the stored token
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}