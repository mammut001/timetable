// Import the Firebase modules you need
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Example: Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Example: Firebase Firestore
import { getStorage } from 'firebase/storage'; // Example: Firebase Storage


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-KDHGYP30GT"
};
// Initialize Firebase


let firebase_app:FirebaseApp
if(!getApps().length)
  {
    firebase_app = initializeApp(firebaseConfig)
  }
else
{
    firebase_app = getApp()
}


// Export Firebase services
export const app = firebase_app;
export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);
export const storage = getStorage(firebase_app);

