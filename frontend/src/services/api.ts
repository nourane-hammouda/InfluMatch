/**
 * API service for communicating with Django backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Debug: log API URL in development
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

// Token storage
const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

const clearTokens = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// API request wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle token refresh on 401
  if (response.status === 401 && getRefreshToken()) {
    try {
      const newToken = await refreshAccessToken();
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });
        if (!retryResponse.ok) {
          throw new Error(`API error: ${retryResponse.statusText}`);
        }
        return retryResponse.json();
      }
    } catch (error) {
      clearTokens();
      throw new Error('Session expired. Please login again.');
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || error.message || `API error: ${response.statusText}`);
  }

  return response.json();
}

// Refresh access token
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = await response.json();
    setTokens(data.access, refreshToken);
    return data.access;
  } catch (error) {
    clearTokens();
    return null;
  }
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: response.statusText }));
        const errorMessage = error.detail || error.message || error.non_field_errors?.[0] || 'Login failed';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setTokens(data.access, data.refresh);
      return data;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error('Erreur de connexion au serveur. Vérifiez que le backend est lancé.');
    }
  },

  signup: async (email: string, password: string, type: 'influencer' | 'company') => {
    try {
      // Map frontend type to Django type
      const djangoType = type === 'influencer' ? 'influenceur' : 'entreprise';
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, type_utilisateur: djangoType }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: response.statusText }));
        const errorMessage = error.error || error.detail || error.message || 'Signup failed';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // If registration returns tokens, store them
      if (data.access && data.refresh) {
        setTokens(data.access, data.refresh);
      }
      return data;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error('Erreur de connexion au serveur. Vérifiez que le backend est lancé.');
    }
  },

  logout: () => {
    clearTokens();
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/user/');
  },

  updateProfile: async (profileData: any) => {
    return apiRequest('/profile/update/', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },
};

// Generic API methods
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: <T>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  patch: <T>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
};

export { getToken, clearTokens };

