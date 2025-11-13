// API Configuration
// In production (Vercel), use relative URLs so the proxy works
// In development, use localhost

const getApiUrl = () => {
  // Check if we're in production (Vercel)
  if (process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Use relative URL - Vercel proxy will handle it
    return '';
  }
  // Development - use localhost
  return 'http://127.0.0.1:5000';
};

export const API_BASE = getApiUrl();

// Helper function to build API URLs
export const apiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE}${cleanEndpoint}`;
};

