// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
    initializeAuth,
    getReactNativePersistence
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWaT48CEFIbeEJMao9j4Z1JdrZT990EtA",
    authDomain: "to-do-app-6945a.firebaseapp.com",
    projectId: "to-do-app-6945a",
    storageBucket: "to-do-app-6945a.firebasestorage.app",
    messagingSenderId: "123155057291",
    appId: "1:123155057291:web:b23656e6381e828988228e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };