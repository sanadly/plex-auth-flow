import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { auth } from '../firebase/config'; // Import your initialized Firebase auth instance
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import apiClient from '../lib/apiClient'; // Import your configured Axios instance
import axios from 'axios'; // Import axios to use isAxiosError

// Define roles matching your backend/DB role names
export type UserRole = 'Super Admin' | 'Business Owner' | 'Store Staff';

// Updated User type
interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole | null; // <-- Store the role NAME
  businessId: string | null;
  username?: string;
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  // idToken removed - managed by apiClient
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signupOwner: (email: string, password: string, fullName: string, businessName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch user profile from your NestJS backend
  const fetchUserProfile = async (fbUser: FirebaseUser): Promise<AppUser | null> => {
      if (!fbUser) return null;
      try {
          const response = await apiClient.get('/users/me/profile');
          const profileData = response.data;
          console.log("Fetched backend profile:", profileData);

         
          const roleName = profileData?.role?.name as UserRole | null;
          console.log("Extracted Role Name:", roleName);

          return {
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName || profileData?.username || '',
              role: roleName,
              businessId: profileData?.business_id || null,
              username: profileData?.username,
          };
          // --- End FIX ---
      } catch (error: unknown) {
          // ... (keep existing error handling) ...
           let errorMessage = "Failed to fetch user profile.";
           if (axios.isAxiosError(error) && error.response) { /*...*/ console.error("Failed to fetch user profile from backend:", errorMessage); }
           else if (error instanceof Error) { /*...*/ console.error("Failed to fetch user profile from backend:", error.message); errorMessage = error.message; }
           else { console.error("An unknown error occurred fetching profile", error); }
          return { uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName, role: null, businessId: null, };
      }
  };


  // Listener for Firebase auth state changes
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        console.log("onAuthStateChanged: User detected", fbUser.uid);
        setFirebaseUser(fbUser);
        const appProfile = await fetchUserProfile(fbUser);
        setUser(appProfile);
      } else {
        console.log("onAuthStateChanged: No user");
        setUser(null);
        setFirebaseUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const appProfile = await fetchUserProfile(userCredential.user);
      setUser(appProfile); // Update state
      toast.success(`Welcome back!`);
      redirectBasedOnRole(appProfile?.role); // Redirect using role name
      return { success: true };
    } catch (error: unknown) {
        // ... (keep existing error handling) ...
        console.error("Firebase Login Error:", error);
        let errorMessage = 'Login failed.';
        if (typeof error === 'object' && error !== null && 'code' in error) { /*...*/ }
        else if (error instanceof Error) { errorMessage = error.message; }
        setAuthError(errorMessage); toast.error(errorMessage); setLoading(false);
        return { success: false, error: errorMessage };
    }
  };

  // Owner Signup function
  const signupOwner = async (email: string, password: string, fullName: string, businessName: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setAuthError(null);
    let firebaseUser: FirebaseUser | null = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCredential.user;
      console.log('Firebase Auth user created:', firebaseUser.uid);

      const idToken = await firebaseUser.getIdToken();
      console.log('Obtained Firebase ID Token for profile initiation.');
      const profileData = { fullName, businessName };

      await apiClient.post('/auth/initiate-profile', profileData, {
          headers: { Authorization: `Bearer ${idToken}` }
      });
      console.log('Successfully triggered profile creation in backend.');

      // Manually fetch profile immediately after successful backend call
      const appProfile = await fetchUserProfile(firebaseUser);
      setUser(appProfile); // Update state
      toast.success('Registration successful! Welcome.');
      redirectBasedOnRole(appProfile?.role); // Redirect using role name
      return { success: true };

    } catch (error: unknown) {
        // -----> ENHANCED ERROR HANDLING <-----
        console.error("Signup or Profile Sync Error:", error);
        let errorMessage = 'Signup failed.'; // Default message

        if (axios.isAxiosError(error)) {
            // Error from the backend API call
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("API Error Data:", error.response.data);
                console.error("API Error Status:", error.response.status);
                // Try to get message from backend response, fallback to generic status text
                errorMessage = error.response.data?.message || `API Error: ${error.response.status}`;
                // Specific handling for common errors
                if (error.response.status === 409) {
                    errorMessage = error.response.data?.message || 'Conflict: Profile or business might already exist.';
                } else if (error.response.status === 400) {
                    errorMessage = error.response.data?.message || 'Bad Request: Please check your input.';
                } else if (error.response.status === 401 || error.response.status === 403) {
                    errorMessage = 'Authentication/Authorization failed. Please try logging in again.';
                } else if (error.response.status >= 500) {
                    errorMessage = 'Server error during profile creation. Please try again later.';
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Network Error: No response received", error.request);
                errorMessage = 'Network Error: Could not reach the server. Please check your connection.';
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Axios Setup Error:', error.message);
                errorMessage = `Error: ${error.message}`;
            }
        } else if (typeof error === 'object' && error !== null && 'code' in error) {
             // Handle Firebase specific errors (like 'auth/email-already-in-use')
            const firebaseErrorCode = (error as { code: string }).code;
            console.error("Firebase Auth Error Code:", firebaseErrorCode);
            switch(firebaseErrorCode) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email address is already registered.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak. Please use a stronger password.';
                    break;
                // Add other Firebase error codes as needed
                default:
                    errorMessage = `Authentication error: ${firebaseErrorCode}`;
            }
        } else if (error instanceof Error) {
            // Generic JavaScript error
            errorMessage = error.message;
        }

        // Clean up Firebase user if profile creation failed (Optional but recommended)
        // If the error happened *after* Firebase user creation, we might want to delete the Firebase user
        if (firebaseUser) {
             console.warn("Profile creation failed after Firebase user was created. Consider implementing Firebase user cleanup.");
             // Example cleanup (add error handling around this too):
             // await firebaseUser.delete().catch(delErr => console.error("Failed to clean up Firebase user:", delErr));
        }
        // -----> END ENHANCED ERROR HANDLING <-----

        setAuthError(errorMessage);
        toast.error(errorMessage); // Show the more specific error message
        setLoading(false);
        return { success: false, error: errorMessage };
    }
  };


  // Logout function
  const logout = async () => {
    // ... (keep existing logout logic) ...
    setLoading(true);
    try { await signOut(auth); toast.info('You have been logged out'); navigate('/login'); }
    catch (error: unknown) { console.error("Logout failed:", error); toast.error("Logout failed."); }
    finally { setLoading(false); }
  };

  const redirectBasedOnRole = (role: UserRole | null) => {
    if (!role) {
        console.log("No role found, redirecting to default '/'");
        navigate('/'); return;
    }
    console.log(`Redirecting based on role: ${role}`) 
    switch (role) {
      // --- FIX: Ensure these cases match your UserRole type and DB role names ---
      case 'Super Admin': navigate('/admin'); break;
      case 'Business Owner': navigate('/business'); break;
      case 'Store Staff': navigate('/store'); break;
      default: navigate('/');
    }
  };

  const value = {
    user, firebaseUser, loading, error: authError,
    idToken: null, // Not needed externally now
    login, signupOwner, logout, isAuthenticated: !!user && !!user.role,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) { throw new Error('useAuth must be used within an AuthProvider'); }
  return context;
};
