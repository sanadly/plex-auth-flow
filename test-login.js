import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// --- Use your Firebase project's WEB config ---
const firebaseConfig = {
  apiKey: 'AIzaSyBlME2-w5Jq6ch2iXRgE9i0KItuc3MIH80',
  authDomain: 'darahim-loyalty.firebaseapp.com',
  projectId: 'darahim-loyalty',
  storageBucket: 'darahim-loyalty.firebasestorage.app',
  messagingSenderId: '115456416589',
  appId: '1:115456416589:web:2a6a3a86b1e50d47907504',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = 'owner.test.postman@example.com'; // User created in Firebase Console
const password = 'the-password-you-set';

signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;
    console.log(`Logged in as: ${user.email}`);
    const idToken = await user.getIdToken();
    console.log('\n--- Firebase ID Token ---');
    console.log(idToken); // <-- COPY THIS TOKEN
    console.log('--- End Token ---\n');
  })
  .catch((error) => {
    console.error('Login failed:', error.code, error.message);
  });
