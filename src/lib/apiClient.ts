
import axios from 'axios';
import { auth } from '../firebase/config'; // Import your initialized auth instance
import { signOut } from 'firebase/auth';

    // Define your NestJS backend base URL
    // Use environment variables for flexibility
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Default to localhost:3000

const apiClient = axios.create({
      baseURL: API_BASE_URL,
});

    // Add a request interceptor to attach the Firebase ID Token
apiClient.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser; // Get the currently signed-in user
        if (user) {
          try {
            const token = await user.getIdToken(); // Get the current ID token
            config.headers.Authorization = `Bearer ${token}`;
            // console.log('Attaching token to request:', token); // For debugging
          } catch (error) {
            console.error('Error getting ID token for API request:', error);
            // Optionally handle error, e.g., sign out user if token fails
            // await signOut(auth);
            // return Promise.reject(new Error("Failed to get authentication token"));
          }
        } else {
            // console.log('No user logged in, sending request without token.');
        }
    return config;
    },
    (error) => {
        // Handle request error
    return Promise.reject(error);
}
);

    // Add a response interceptor to handle common errors like 401/403
apiClient.interceptors.response.use(
      (response) => response, // Simply return successful responses
      async (error) => {
        console.error('API Response Error:', error.response?.status, error.response?.data);
        const originalRequest = error.config;

        // Handle Unauthorized (401) or Forbidden (403) errors
        if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
           originalRequest._retry = true; // Mark request to prevent infinite retry loops

           // Check if it's specifically a token expiry issue (Firebase often returns 401/403 for this)
           // Try forcing a token refresh
           const user = auth.currentUser;
           if (user) {
               try {
                   console.log('Attempting token refresh due to 401/403...');
                   const freshToken = await user.getIdToken(true); // Force refresh
                   // Update the header in the original request config
                   originalRequest.headers.Authorization = `Bearer ${freshToken}`;
                   // Retry the original request with the new token
                   console.log('Retrying original request with refreshed token.');
                   return apiClient(originalRequest);
               } catch (refreshError) {
                   console.error('Failed to refresh token or retry request:', refreshError);
                   // If refresh fails, sign out the user
                   await signOut(auth);
                   // Redirect to login or handle as appropriate
                   window.location.href = '/login'; // Example redirect
                   return Promise.reject(refreshError);
               }
           } else {
               // No user, sign out just in case and redirect
               await signOut(auth);
               window.location.href = '/login';
           }
        }

        // For other errors, just reject the promise
    return Promise.reject(error);
    }
);


export default apiClient;
    