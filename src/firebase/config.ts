import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

    // Your web app's Firebase configuration (from Firebase Console)
    // Use environment variables (e.g., import.meta.env.VITE_... for Vite/React)
const firebaseConfig = {
        apiKey: 'AIzaSyBlME2-w5Jq6ch2iXRgE9i0KItuc3MIH80',
        authDomain: 'darahim-loyalty.firebaseapp.com',
        projectId: 'darahim-loyalty',
        storageBucket: 'darahim-loyalty.firebasestorage.app',
        messagingSenderId: '115456416589',
        appId: '1:115456416589:web:2a6a3a86b1e50d47907504',
};

    // Validate that environment variables are loaded
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
        console.error("Firebase configuration environment variables are missing!");
        // Handle this error appropriately - maybe show an error message to the user
        // or throw an error to stop the app load.
}


    // Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

   
export const auth: Auth = getAuth(app);

   
export default app;
    