const BASE_URL = 'https://dummyjson.com';

export type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
};

export type LoginResponse = Profile & {
  accessToken: string;
  refreshToken: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  // TODO 1: If response.ok is false, throw a clear Error.
  if (!response.ok) {
    let message = `Login failed (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        message = `Login failed: ${errorBody.message}`;
      }
    } catch {
      // Body wasn't JSON; keep the generic message.
    }
    throw new ApiError(message, response.status);
  }

  // TODO 2: Convert the response body to JSON.
  const data: LoginResponse = await response.json();

  // TODO 3: Return the resulting user and token data.
  return data;
}

export async function getCurrentUser(token: string): Promise<Profile> {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      // TODO 1: Add the Bearer token to the Authorization header.
      Authorization: `Bearer ${token}`,
    },
  });

  // TODO 2: Throw an Error when the response is not successful.
  if (!response.ok) {
    throw new ApiError(`Could not load profile (${response.status})`, response.status);
  }

  // TODO 3: Return the parsed JSON profile.
  return response.json();
}